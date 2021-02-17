import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProcessHTTPMsgService } from './service/process-http.service';
import { DishService } from './service/dish.service';
import { LeaderService } from './service/leader.service';
import { PromotionService } from './service/promotion.service';
import { PokemonService } from './service/pokemon.service';
import { FavouriteService } from './service/favourite.service';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptHttpClientModule } from "@nativescript/angular";
import { DishdetailComponent } from './dishdetail/dish-detail.component';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { ReservationModalComponent } from "./reservationmodel/reservationmodal.component";
import { CommentModalComponent } from './commentmodal/commentmodal.component';
import { CouchbaseService } from "./service/couchbase.service";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        HttpClientModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    exports: [ReservationModalComponent],
    declarations: [
        AppComponent,
        DishdetailComponent,
        ReservationModalComponent,
        CommentModalComponent
    ],
    entryComponents: [ReservationModalComponent],
    providers: [ProcessHTTPMsgService, DishService, LeaderService, PromotionService, FavouriteService, PokemonService, CouchbaseService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
