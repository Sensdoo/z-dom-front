import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Street} from '../../../entities/street.entity';
import {ApiAddressService} from '../../../shared/services/api-services/api-address.service';
import {Address} from '../../../entities/address.entity';

@Component({
  selector: 'sens-street-list-page',
  templateUrl: './street-list-page.component.html',
  styleUrls: ['./street-list-page.component.scss']
})
export class StreetListPageComponent implements OnInit {

  addresses: Array<Address> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: ApiAddressService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.addressService.getByStreetId(params.streetId).subscribe(addresses => {
        console.log(addresses);
        this.addresses = addresses;
      });
    }, error2 => console.log(error2));
  }

  onClick(id: number) {
    this.router.navigate(['main-page/address-page', id]);
  }

}
