import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sens-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
