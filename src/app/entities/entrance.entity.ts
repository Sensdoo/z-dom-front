import {Address} from './address.entity';

export class Entrance {

  editor: string;
  lastUpdate: Date;
  entranceNumber: number;
  addressId: number;
  descriptionInterzet: string;
  descriptionDomru: string;
  access: boolean;
  address: Address;
  isEdit: boolean;
  isBlocked: boolean;
  id: number;

  constructor(editor: string, lastUpdate: Date, entranceNumber: number, addressId: number,
              descriptionInterzet: string, descriptionDomru: string, access?: boolean, id?: number) {
    this.editor = editor;
    this.lastUpdate = lastUpdate;
    this.entranceNumber = entranceNumber;
    this.addressId = addressId;
    this.descriptionInterzet = descriptionInterzet;
    this.descriptionDomru = descriptionDomru;
    this.access = access;
    this.id = id;
  }
}
