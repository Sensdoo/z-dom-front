export class User {

  email: string;
  username: string;
  name: string;
  password: string;
  role: string[];
  id?: number;

  constructor(email: string, username: string, name: string, password: string, id?: number) {
    this.email = email;
    this.username = username;
    this.name = name;
    this.password = password;
    this.role = ['user'];
    this.id = id;
  }
}
