import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { ReservationRoutingModule } from "./reservation-routing.module";
import { ReservationComponent } from "./reservation.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReservationRoutingModule,
    ],
    declarations: [
        ReservationComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReservationModule { }
