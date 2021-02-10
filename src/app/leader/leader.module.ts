import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { LeaderRoutingModule } from "./leader-routing.module";
import { LeaderComponent } from "./leader.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        LeaderRoutingModule
    ],
    declarations: [
        LeaderComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LeaderModule { }
