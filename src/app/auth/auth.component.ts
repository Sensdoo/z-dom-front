import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sens-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // для редиректа на страницу логина
    this.router.navigate(['/login']);
  }

}
