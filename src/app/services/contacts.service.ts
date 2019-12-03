import { Injectable } from "@angular/core";
import { observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
//Interfaces
import { contactsInterface } from "../interfaces/contactsInterface";

@Injectable({
  providedIn: "root"
})
export class ContactsService {
  constructor(private http: HttpClient) {}


  //User request and subsequent push to the contact list
  async getUsers() {
    for (let i = 1; i <= 5; i++) {
      const random = Math.floor(Math.random() * (10 - 1)) + 1;
      const response = this.http
        .get(`https://jsonplaceholder.typicode.com/users/${random}`)
        .subscribe(res => this.list.push(res));
    }
  }

  //Main contact list
  list: object[] = [];

  //function to get the contact list
  getList(): object[] {
    return this.list;
  }

  //function to add new contacts
  addNewContact(newContact) {
    this.list.push(newContact);
  }
}
