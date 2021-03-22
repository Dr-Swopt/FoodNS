import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { PokemonV2Component } from "./pokemonV2.component";

const routes: Routes = [
    { path: "", component: PokemonV2Component }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PokemonV2RoutingModule { }
