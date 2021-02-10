import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProcessHTTPMsgService } from './service/process-http.service';
import { DishService } from './service/dish.service';
import { LeaderService } from './service/leader.service';
import { PromotionService } from './service/promotion.service';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptHttpClientModule } from "@nativescript/angular";
import { DishdetailComponent } from './dishdetail/dish-detail.component';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
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
    ],
    declarations: [
        AppComponent,
        DishdetailComponent
    ],
    providers: [ProcessHTTPMsgService, DishService, LeaderService, PromotionService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
