import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { UserAuthRoutingModule } from "./userauth-routing.module";
import { UserAuthComponent } from "./userauth.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        UserAuthRoutingModule
    ],
    declarations: [
        UserAuthComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserAuthModule { }
