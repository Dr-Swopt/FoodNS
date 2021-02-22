import { Component, OnInit, Inject } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as Email from 'nativescript-email';
@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendEmail() {

    Email.available()
      .then((avail: boolean) => {
        if (avail) {
          Email.compose({
            to: ['confusion@food.net'],
            subject: '[ConFusion]: Query',
            body: 'Dear Sir/Madam:'
          });
        }
        else
          console.log('No Email Configured');
      })

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
}

}
