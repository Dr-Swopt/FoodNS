import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptHttpClientModule } from "@nativescript/angular";

import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        MenuRoutingModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        MenuComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MenuModule { }
