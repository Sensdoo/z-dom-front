import {User} from '../auth/entities/user.entity';

export class News {

  id: number;
  userName: string;
  date: Date;
  header: string;
  text: string;
  isEdit = false;
  isBlocked = false;

  constructor(id: number, date: Date, header: string, text: string, userName: string) {
    this.id = id;
    this.date = date;
    this.header = header;
    this.text = text;
    this.userName = userName;
  }
}
