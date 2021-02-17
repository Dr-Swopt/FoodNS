import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { FavouriteComponent } from "./favourites.component";

const routes: Routes = [
    { path: "", component: FavouriteComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FavouriteRoutingModule { }
