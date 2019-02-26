import {Address} from '../../entities/address.entity';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ShareDataService {

  shareUsername: EventEmitter<string> = new EventEmitter();
  private username: string;

  emitUsername(username: string) {
    this.shareUsername.emit(username);
  }

  getUsername(): string {
    return this.username;
}

  setUsername(username: string) {
    this.username = username;
  }
}
