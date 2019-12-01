import { Component } from "@angular/core";

//Interfaces
import { contactsInterface } from "../../interfaces/contactsInterface";

//Services
import { ContactsService } from "../../services/contacts.service";

//Animations
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  animations: [
    trigger("openAddContact", [
      state(
        "true",
        style({
          left: "310px",
          zIndex: "1"
        })
      ),
      state(
        "false",
        style({
          left: "-205px"
        })
      )
    ])
  ]
})
export class UserComponent {
  //the service that contains the contact list is called and added to a list in this component
  constructor(private _contactsService: ContactsService) {
    this.list = _contactsService.getList();

    //the contact counter is initialized with the current quantity
    this.contactsCount = this.list.length;
  }
  //Evaluate a Boolean value to present or hide the interface of adding new contacts
  isAddContact: boolean = false;

  list: contactsInterface[] = [];
  contactsCount: number = 0;

  //Object that receives the data of the new contact to add
  newContact: contactsInterface = {
    name: "",
    ocupation: "",
    imgUrl: ""
  };

  //function that takes the data of the new contact, evaluates them and sends them to the interface
  addNewContact(addContact: contactsInterface) {
    let addFriend = Object.assign({}, this.newContact);

    if (!addFriend.ocupation) {
      addFriend.ocupation = "Without adding";
    }
    if (!addFriend.imgUrl) {
      addFriend.imgUrl =
        "https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-13.jpg";
    }

    //Data delivery
    this._contactsService.addNewContact(addFriend);

    //The object is cleaned
    (this.newContact.name = ""),
      (this.newContact.ocupation = ""),
      (this.newContact.imgUrl = "");

    //The list is reassessed to count the number of contacts
    this.contactsCount = this.list.length;
  }
}
