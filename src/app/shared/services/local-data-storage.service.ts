import {Injectable} from '@angular/core';

@Injectable()
export class LocalDataStorageService {

  constructor() {}

  saveData(data: any, itemName: string) {
    if (!window.localStorage.getItem(itemName)) {
      window.localStorage.setItem(itemName, JSON.stringify(data));
    }
  }

  getData(itemName: string) {
    return JSON.parse(window.localStorage.getItem(itemName));
  }

  clearAll() {
    window.localStorage.clear();
  }
}
