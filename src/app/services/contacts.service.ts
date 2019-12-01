import { Injectable } from "@angular/core";

//Interfaces
import { contactsInterface } from "../interfaces/contactsInterface";

@Injectable({
  providedIn: "root"
})
export class ContactsService {
  constructor() {}

  //Main contact list
  list: contactsInterface[] = [
    {
      name: "Sheansuke",
      ocupation: "FrontEnd Developer",
      imgUrl:
        "https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-13.jpg"
    }
  ];

  //function to get the contact list
  getList():contactsInterface[] {
    return this.list;
  }

  //function to add new contacts
  addNewContact(newContact: contactsInterface) {
    this.list.push(newContact);
  }
}
