import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { FavouriteRoutingModule } from "./favourites-routing.module";
import { FavouriteComponent } from "./favourites.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        FavouriteRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        FavouriteComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FavouriteModule { }
