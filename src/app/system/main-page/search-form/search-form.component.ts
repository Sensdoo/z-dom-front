import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Street} from '../../../entities/street.entity';
import {ApiStreetService} from '../../../shared/services/api-services/api-street.service';
import {LocalDataStorageService} from '../../../shared/services/local-data-storage.service';
import {ApiAddressService} from '../../../shared/services/api-services/api-address.service';
import {Address} from '../../../entities/address.entity';
import {Router} from '@angular/router';

@Component({
  selector: 'sens-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  form: FormGroup;
  addresses = [];
  streets = [];
  houses = [];
  message: string;
  type: string;

  constructor(private streetService: ApiStreetService,
              private addressService: ApiAddressService,
              private localStorage: LocalDataStorageService,
              private router: Router) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      streetId: new FormControl(null, [Validators.required]),
      house: new FormControl(null, []),
      building: new FormControl(null, []),
      entrance: new FormControl({value: '', disabled: true}, [])
    });

    if (this.localStorage.getData('streets')) {
      this.streets = this.localStorage.getData('streets');
      // console.log(this.streets);
    } else {
      this.streetService.getAll().subscribe((streets: Street[]) => {
        this.streets = streets;
        this.localStorage.saveData(streets, 'streets');
      }, error => {
        this.showMessage('danger', error.error.message);
      });
    }
  }

  onSubmit() {
    const data = this.form.value;
    console.log(data);
    if (data.house === null) {
      // todo result-list
      this.router.navigate(['main-page/street-list-page', data.streetId]);
    } else {
      const selectedAddress = this.addresses.filter(item => item.house === data.house);
      this.router.navigate(['main-page/address-page', selectedAddress[0].id]);
      // console.log(selectedAddress);
    }
  }

  onChangeStreet() {
    const streetId = this.form.value.streetId;
    this.addresses = [];
    this.houses = [];

    this.addressService.getByStreetId(streetId).subscribe((addresses: Array<Address>) => {
      this.addresses = addresses;
      this.addresses.sort((a, b) => {
        return parseInt(a.house) - parseInt(b.house);
      });
      // console.log(addresses);
      this.addresses.forEach(address => {
        this.houses.push(address.house);
      });
    }, error => {
      this.showMessage('danger', error.error.message);
    });
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
