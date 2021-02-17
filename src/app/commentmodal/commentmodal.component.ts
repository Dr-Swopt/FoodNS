import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
import { Page, DatePicker, TimePicker, ListPicker } from '@nativescript/core';

@Component({
    moduleId: module.id,
    templateUrl: './commentmodal.component.html'
})
export class CommentModalComponent implements OnInit {


    guestArray=[1, 2, 3, 4, 5, 6];
    guests: number;
    isDateTime: boolean = false;
    @ViewChild("datePicker") datePickerElement: ElementRef;
    @ViewChild("timePicker") timePickerElement: ElementRef;
    @ViewChild("guestPicker") guestPickerElement: ElementRef;

    constructor(private params: ModalDialogParams,
        private page: Page) {

            if(params.context === "guest") {
                this.isDateTime = false;
            }
            else if(params.context === "date-time") {
                this.isDateTime = true;
            }
    }

    ngOnInit() {

        if (this.isDateTime) {

            let datePicker: DatePicker = <DatePicker>this.datePickerElement.nativeElement;

            console.log(datePicker);

            let currentdate: Date = new Date();
            datePicker.year = currentdate.getFullYear();
            datePicker.month = currentdate.getMonth() + 1;
            datePicker.day = currentdate.getDate();
            datePicker.minDate = currentdate;
            datePicker.maxDate = new Date(2045, 4, 12);

            let timePicker: TimePicker = <TimePicker>this.timePickerElement.nativeElement;
            timePicker.hour = currentdate.getHours();
            timePicker.minute = currentdate.getMinutes();
        }
    }

    public submit() {
        if (this.isDateTime) {
            let datePicker: DatePicker = <DatePicker>this.datePickerElement.nativeElement;
            let selectedDate = datePicker.date;
            let timePicker: TimePicker = <TimePicker>this.timePickerElement.nativeElement;
            let selectedTime = timePicker.time;
            let reserveTime = new Date(selectedDate.getFullYear(),
                                        selectedDate.getMonth(),
                                        selectedDate.getDate(),
                                        selectedTime.getHours(),
                                        selectedTime.getMinutes());
            this.params.closeCallback(reserveTime.toISOString());
        }
        else {
            let picker = <ListPicker> this.guestPickerElement.nativeElement;
            this.params.closeCallback(this.guestArray[picker.selectedIndex])
        }
    }
}
