import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../service/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from '@nativescript/angular';
import { FavouriteService } from '../service/favourite.service';
import { Color } from '@nativescript/core';
import { CommentModalComponent } from '../commentmodal/commentmodal.component';
import { FormGroup } from '@angular/forms';
import { ToastDuration, ToastPosition, Toasty } from '@triniwiz/nativescript-toasty';

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

  constructor(private dishservice: DishService,
    private favouriteservice : FavouriteService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef ) { }

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

}
