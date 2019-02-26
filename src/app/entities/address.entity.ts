import {Entrance} from './entrance.entity';
import {Street} from './street.entity';

export class Address {

  streetId: number;
  house: string;
  maxEntrance: number;
  entrances: Entrance[];
  street: Street;
  id: number;

  constructor(streetId: number, house: string, maxEntrance: number, entrances: Entrance[], id?: number) {
    this.streetId = streetId;
    this.house = house;
    this.maxEntrance = maxEntrance;
    this.entrances = entrances;
    this.id = id;
  }
}
