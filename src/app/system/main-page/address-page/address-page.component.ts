import {Component, OnInit} from '@angular/core';
import {Address} from '../../../entities/address.entity';
import {ApiEntranceService} from '../../../shared/services/api-services/api-entrance.service';
import {Entrance} from '../../../entities/entrance.entity';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'sens-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.scss']
})
export class AddressPageComponent implements OnInit {

  form: FormGroup;
  address: Address;
  entrances: Array<Entrance> = [];
  role = 'user';
  company = 'Интерзет';
  message: string;
  type: string;

  constructor(
    private token: TokenStorageService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private entranceService: ApiEntranceService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.tokenStorage.getAuthorities().forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.role = 'admin';
      }
    });

    this.route.params.subscribe(params => {
      this.entranceService.getByAddressId(params.addressId)
        .subscribe((entrances: Array<Entrance>) => {
          this.address = entrances[0].address;
          this.entrances = entrances;

          this.entrances.sort((a, b) => a.entranceNumber - b.entranceNumber);

          console.log('address-page -> ngOnInit: ', entrances);
        }, error => {
          console.log(error);
          this.showMessage('danger', error.error.message);
        });
    });
  }

  addEntrance() {
    this.entrances.forEach(entr => entr.isBlocked = true);
    const newEntrance = new Entrance(this.token.getUsername(), new Date(), null, this.address.id, '', '', false, null);
    newEntrance.isEdit = true;
    this.form = this.fb.group({
      'entranceNumber': [null, [Validators.required, Validators.pattern('[0-9]')]],
      'descIzet': ['', [Validators.minLength(3), Validators.maxLength(255)]],
      'descDomru': ['', [Validators.minLength(3), Validators.maxLength(255)]]
    });
    this.entrances.unshift(newEntrance);
  }

  editEntrance(entrance: Entrance) {
    if (entrance.isEdit) {
      const data = this.form.value;
      console.log(data);
      entrance.entranceNumber = data.entranceNumber;
      entrance.descriptionInterzet = data.descIzet || 'нет данных';
      entrance.descriptionDomru = data.descDomru || 'нет данных';
      if (!entrance.addressId) {
        entrance.addressId = this.address.id;
      }
      entrance.isEdit = false;
      this.saveChanges(entrance);
    } else {
      this.entrances.forEach(entr => entr.isBlocked = true);
      entrance.isEdit = true;
      this.form = this.fb.group({
        'entranceNumber': [entrance.entranceNumber, [Validators.required, Validators.pattern('[0-9]{1,2}')]],
        'descIzet': [entrance.descriptionInterzet, [Validators.minLength(3), Validators.maxLength(255)]],
        'descDomru': [entrance.descriptionDomru, [Validators.minLength(3), Validators.maxLength(255)]]
      });
    }
  }

  deleteEntrance(id: number) {
    this.entranceService.deleteEntrance(id).subscribe(response => {
      // console.log(response);
      this.entrances = this.entrances.filter(entr => entr.id !== id);
      this.showMessage('success', response.message);
    }, error2 => {
      this.showMessage('danger', error2.error.message);
      // window.location.reload();
    });
  }

  cancel() {
    window.location.reload();
  }

  onSwitch() {
    if (this.company === 'Интерзет') {
      this.company = 'Домру';
    } else {
      this.company = 'Интерзет';
    }
  }

  private saveChanges(entrance: Entrance) {
    console.log('address-page -> saveChanges: ', entrance);
    this.entrances.forEach(entr => entr.isBlocked = false);
    if (entrance.id) {
      this.entranceService.editEntrance(entrance).subscribe(response => {
        console.log('address-page -> saveChanges -> response: ', response);
        this.showMessage('success', 'Парадная успешно добавлена/отредактирована.');
        entrance.editor = response.editor;
        entrance.lastUpdate = response.lastUpdate;
      }, error2 => {
        console.log(error2);
        this.showMessage('danger', error2.error.message);
      });
    } else {
      this.entranceService.addEntrance(entrance).subscribe(response => {
        console.log('address-page -> saveChanges -> response: ', response);
        this.showMessage('success', 'Парадная успешно добавлена/отредактирована.');
        if (entrance.id === null) {
          entrance.id = response.id;
        }
      }, error2 => {
        console.log(error2);
        this.showMessage('danger', error2.error.message);
        this.entrances = this.entrances.filter(entr => entr.id);
      });
    }
  }

  private showMessage(type: string, message: string) {
    this.type = type;
    this.message = message;
    window.setTimeout(() => {
      this.message = '';
      this.type = '';
    }, 5000);
  }
}
