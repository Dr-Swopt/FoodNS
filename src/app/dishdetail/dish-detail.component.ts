import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../service/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from '@nativescript/angular';
import { FavouriteService } from '../service/favourite.service';
import { Animation, AnimationDefinition, Color, ImageSource, Page, SwipeDirection, SwipeGestureEventData, View } from '@nativescript/core';
import { CommentModalComponent } from '../commentmodal/commentmodal.component';
import { FormGroup } from '@angular/forms';
import { ToastDuration, ToastPosition, Toasty } from '@triniwiz/nativescript-toasty';
import * as enums from "@nativescript/core/ui/enums";
import { fromUrl } from '@nativescript/core/image-source';
import * as SocialShare from "nativescript-social-share";
@Component({
  selector: 'app-dishdetail',
    moduleId: module.id,
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  avgstars: string;
  numcomments: number;
  favourite: boolean = false;
  dish: Dish;
  comment: Comment;
  errMess: string;
  comments: FormGroup;
  dishIds: number[];
  prev: number;
  next: number;
  showComments: boolean = false;

  cardImage: View;
  commentList: View;
  cardLayout: View;
  private BaseURL = "http://10.0.2.2:3000/dishes/";

  constructor(private dishservice: DishService,
    private favouriteservice : FavouriteService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef,
    private page: Page,  ) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => {
          this.dish = dish;
          this.favourite = this.favouriteservice.isFavourite(this.dish.id);
          this.numcomments = this.dish.comments.length;

          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating);
          this.avgstars = (total/this.numcomments).toFixed(2);
        },
        errmess => { this.dish = null; this.errMess = <any>errmess; });
    }


  addToFavourites() {
    if (!this.favourite) {
      console.log('Adding to Favourites', this.dish.id);
      this.favourite = this.favouriteservice.addFavourite(this.dish.id);
      const toast = new Toasty({text:"Added Dish " + this.dish.id}).setToastDuration(ToastDuration.SHORT).setToastPosition(ToastPosition.BOTTOM)
      .setTextColor(new Color('white'))
      .setBackgroundColor('#ff9999');
      toast.show();
    }
  }

  createModalView(args) {

    let options: ModalDialogOptions = {
        viewContainerRef: this.vcRef,
        context: args,
        fullscreen: false
    };

    this.modalService.showModal(CommentModalComponent, options)
    .then((result: any) => {
        if (args === "rating") {
            this.comments.patchValue({guests: result});
        }
    });
}

  goBack(): void {
    this.routerExtensions.back();
  }

  onSwipe(args: SwipeGestureEventData) {

    if (this.dish) {
      this.cardImage = <View>this.page.getViewById<View>("cardImage");
      this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
      this.commentList = <View>this.page.getViewById<View>("commentList");

      if (args.direction === SwipeDirection.up && !this.showComments ) {
        this.animateUp();
      }
      else if (args.direction === SwipeDirection.down && this.showComments ) {
        this.showComments = false;
        this.animateDown();
      }
    }

  }

  showAndHideComments() {
      this.cardImage = <View>this.page.getViewById<View>("cardImage");
      this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
      this.commentList = <View>this.page.getViewById<View>("commentList");

      if (!this.showComments ) {
        this.animateUp();
      }
      else if (this.showComments ) {
        this.showComments = false;
        this.animateDown();
      }
  }

  animateUp() {
    let definitions = new Array<AnimationDefinition>();
    let a1: AnimationDefinition = {
        target: this.cardImage,
        scale: { x: 1, y: 0 },
        translate: { x: 0, y: -200 },
        opacity: 0,
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a1);

    let a2: AnimationDefinition = {
        target: this.cardLayout,
        backgroundColor: new Color("#e0e0e0"),
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a2);

    let animationSet = new Animation(definitions);

    animationSet.play().then(() => {
      this.showComments = true;
    })
    .catch((e) => {
        console.log(e.message);
    });
  }

  animateDown() {
    let definitions = new Array<AnimationDefinition>();
    let a1: AnimationDefinition = {
        target: this.cardImage,
        scale: { x: 1, y: 1 },
        translate: { x: 0, y: 0 },
        opacity: 1,
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a1);

    let a2: AnimationDefinition = {
        target: this.cardLayout,
        backgroundColor: new Color("#ffffff"),
        duration: 500,
        curve: enums.AnimationCurve.easeIn
    };
    definitions.push(a2);

    let animationSet = new Animation(definitions);

    animationSet.play().then(() => {
    })
    .catch((e) => {
        console.log(e.message);
    });
  }

    socialShare() {
    ImageSource.fromUrl("https://www.nraboy.com/images/nraboy.png").then((image) => {
        SocialShare.shareImage(image);
    });
}

}
