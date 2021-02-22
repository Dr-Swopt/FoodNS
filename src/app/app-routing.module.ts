import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { DishdetailComponent } from "./dishdetail/dish-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "menu", loadChildren: () => import("./menu/menu.module").then((m) => m.MenuModule) },
    { path: "about", loadChildren: () => import("./about/about.module").then((m) => m.AboutModule) },
    { path: "leader", loadChildren: () => import("./leader/leader.module").then((m) => m.LeaderModule) },
    { path: "contact", loadChildren: () => import("./contact/contact.module").then((m) => m.ContactModule) },
    { path: "home", loadChildren: () => import("./home/home.module").then((m) => m.HomeModule) },
    { path: "pokemon", loadChildren: () => import("./pokemon/pokemon.module").then((m) => m.PokemonModule) },
    { path: "favourites", loadChildren: () => import("./favourites/favourites.module").then((m) => m.FavouriteModule) },
    { path: "reservation", loadChildren: () => import("./reservations/reservation.module").then((m) => m.ReservationModule) },
    { path: "userAuth", loadChildren: () => import("./userauth/userauth.module").then((m) => m.UserAuthModule) },
    { path: 'dishdetail/:id',     component: DishdetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
