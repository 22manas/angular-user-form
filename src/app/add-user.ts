export class AddUser {
  email: string;
  username: string;

  constructor( email?:string, username?:string) {
    this.email = email ? email : '';
    this.username = username ? username : '';
  }
}