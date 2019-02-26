import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TokenStorageService} from '../shared/services/token-storage.service';
import {Router} from '@angular/router';
import {LocalDataStorageService} from '../shared/services/local-data-storage.service';
import {ShareDataService} from '../shared/services/share-data.service';

@Component({
  selector: 'sens-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  username: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private localStorage: LocalDataStorageService,
    private share: ShareDataService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.share.shareUsername.subscribe(data => this.username = data);
    // this.username = this.share.getUsername();
    this.username = this.tokenStorage.getUsername();
    console.log('header -> ngOnInit: ', this.tokenStorage.getUsername());
    // window.location.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('header -> ngOnChanges: ', this.tokenStorage.getUsername());
  }

  logout() {
    this.tokenStorage.signOut();
    this.localStorage.clearAll();
    this.router.navigate(['/login']);
  }
}
