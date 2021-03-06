import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { Application, Enums, EventData, Label, Page, ScrollView, StackLayout, Switch, TextField } from '@nativescript/core';
import { AnimationCurve } from '@nativescript/core/ui/enums';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { ReservationModalComponent } from '../reservationmodel/reservationmodal.component';

@Component({
  selector: 'app-reservation',
  moduleId: module.id,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: []
})
export class ReservationComponent implements OnInit {

    reservation: FormGroup;
    view: ScrollView;

    constructor(private formBuilder: FormBuilder,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef) {
            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });
    }

    ngOnInit() {
    }

    // Event handler for Page "pageLoaded" event attached in home-page.xml
    pageLoaded(args: EventData) {
        let page = <StackLayout>args.object;
        this.view = <ScrollView>page.getViewById("scroll1")
        // Get reference to object we want to animate with code
        /* this.view = <Label>page.getViewById("lblNS"); */
    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text});
    }

    onSubmit() {
        console.log(JSON.stringify(this.reservation.value));
        this.view.animate({
            opacity: 0,
            duration: 500,
            curve: AnimationCurve.easeInOut,
        });
    }

    createModalView(args) {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });

    }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
}

}
