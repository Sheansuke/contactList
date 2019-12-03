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
import { isNumber } from "util";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  animations: [
    //Style to addContact menu
    trigger("openAddContact", [
      state(
        "true",
        style({
          left: "350px",
          zIndex: "1"
        })
      ),
      state(
        "false",
        style({
          left: "-205px"
        })
      )
    ]),

    //Style to editContact menu
    trigger("openEditContact", [
      state(
        "true",
        style({
          left: "350px",
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
    _contactsService.getUsers();
    this.list = _contactsService.getList();
  }

  //Evaluate a Boolean value to present or hide the interface of adding new contacts/edit contacts
  isAddContact: boolean = false;
  isEditContact: boolean = false;
  list: object[] = [];

  //Object that receives the data of the new contact to add
  newContact: contactsInterface = {
    name: "",
    email: "",
    phone: ""
  };

  //empty array to be filled when selecting edit a contact
  editFriend: contactsInterface = {
    name: "",
    email: "",
    phone: ""
  };

  //function that takes the data of the new contact, evaluates them and sends them to the interface
  addNewContact(addContact: contactsInterface) {
    let addFriend = Object.assign({}, this.newContact);
    if (!addFriend.name) {
      alert("Name is require");
      return false;
    }

    if (addFriend.email) {
      if (
        !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          addFriend.email
        )
      ) {
        alert("invalid email.");
        return false;
      }
    } else {
      addFriend.email = "No Email";
    }
    if (!addFriend.phone) {
      addFriend.phone = "No phone";
    }
    //Data delivery
    this._contactsService.addNewContact(addFriend);

    //The object is cleaned
    (this.newContact.name = ""),
      (this.newContact.email = ""),
      (this.newContact.phone = "");
  }

  //the contact that has been selected is saved here
  targetContact: contactsInterface = {
    index: null,
    name: "",
    email: "",
    phone: ""
  };

  //method that selects the clicked contact
  selectContact(ev) {
    this.targetContact = ev;
    this.targetContact.index = this.list.indexOf(this.targetContact);
    this.editFriend = Object.assign({}, this.targetContact);
  }

  //this method copies the selected contact to a new object
  editContact() {
    setTimeout(() => {
      this.editFriend = Object.assign({}, this.targetContact);
    }, 100);
  }

  doneContact() {
    if (!this.targetContact.name) {
      alert("Name is require");
      return false;
    }

    if (this.targetContact.email) {
      if (
        !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          this.targetContact.email
        )
      ) {
        alert("invalid email.");
        return false;
      }
    } else {
      this.targetContact.email = "No Email";
    }
    if (!this.targetContact.phone) {
      this.targetContact.phone = "No phone";
    }

    this.isEditContact = false;
  }

  //this method cancels the contact issue and returns everything to how it was
  cancelEdit(): void {
    setTimeout(() => {
      this.targetContact.name = this.editFriend.name;
      this.targetContact.email = this.editFriend.email;
      this.targetContact.phone = this.editFriend.phone;
    }, 100);
  }

  //this method eliminates contact
  removeContact(): void {
    setTimeout(() => {
      this.list.splice(this.targetContact.index, 1);
    }, 100);
  }
}
