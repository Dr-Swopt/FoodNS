import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { UserAuthComponent } from "./userauth.component";

const routes: Routes = [
    { path: "", component: UserAuthComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UserAuthRoutingModule { }
