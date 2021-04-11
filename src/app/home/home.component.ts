import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Application, Observable, Page, SwipeDirection, SwipeGestureEventData, View } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { DishService } from '../service/dish.service';
import { LeaderService } from '../service/leader.service';
import { PromotionService } from '../service/promotion.service';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';
import * as enums from "@nativescript/core/ui/enums";
import { Carousel, CarouselItem } from 'nativescript-carousel';
import { registerElement } from '@nativescript/angular';
import { combineLatest, merge } from 'rxjs';
import { combineAll } from 'rxjs/operators';
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);
@Component({
  selector: 'app-menu',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DishService]
})
export class HomeComponent implements OnInit {
@ViewChild("myCarousel", { static: false }) carouselView: ElementRef<Carousel>;

    dish: Dish;
    promotion: Promotion;
    leader: Leader;
    dishErrMess: string;
    promoErrMess: string;
    leaderErrMess: string;
    dishes: Dish[];
    //featured: Dish[] | Leader[] | Promotion[];
    featured: any[]= [];

    constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    private page: Page,) { }

  ngOnInit() {
    let getFeaturedDish = this.dishservice.getFeaturedDish().subscribe(res => {
        this.dish = res;
        this.featured.push(res);
    });
    let getFeaturedLeader = this.leaderservice.getFeaturedLeader().subscribe(res => {
        this.leader = res;
        this.featured.push(res);
    });
    let getFeaturedPromotion = this.promotionservice.getFeaturedPromotion().subscribe(res => {
        this.promotion = res;
        this.featured.push(res);
        console.log(res);
    }, error => console.error(error));

    /*
    merge([getFeaturedDish,getFeaturedLeader,getFeaturedPromotion]).subscribe(([dish,leader,promo]:any) => {
         this.featured = [];
         if(dish) {
             this.dish = dish;
             this.featured.push(this.dish);
         } else if(leader) {
             this.leader = leader;
             this.featured.push(this.leader);
         } else if(promo) {
             this.promotion = promo;
             this.featured.push(this.promotion);
         }
         console.log(this.featured);
     }, error => console.error(error))
    */
  }

  myChangePageEvent(args) {
    console.log('Page changed to index: ' + args.index);
    };


  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
}

}
