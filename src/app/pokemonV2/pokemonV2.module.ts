import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SearchModule } from "../search/search.module";

import { PokemonV2RoutingModule } from "./pokemonV2-routing.module";
import { PokemonV2Component } from "./pokemonV2.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        PokemonV2RoutingModule,
        NativeScriptUIListViewModule,
        SearchModule
    ],
    declarations: [
        PokemonV2Component,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PokemonV2Module { }
