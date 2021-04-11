import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { PokemonRoutingModule } from "./pokemon-routing.module";
import { PokemonComponent } from "./pokemon.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        PokemonRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        PokemonComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PokemonModule { }
