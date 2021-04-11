import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ObservableArray, View } from '@nativescript/core';
import { Application, isAndroid, isIOS } from '@nativescript/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { FavouriteService } from '../service/favourite.service';
import { Dish } from '../shared/dish';
import { confirm } from "@nativescript/core";
import { ToastDuration, ToastPosition, Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'app-favourite',
  moduleId: module.id,
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  providers: [FavouriteService]
})
export class FavouriteComponent implements OnInit {

    favourites: ObservableArray<Dish>;
    errMess: string;

    @ViewChild('myListView') listViewComponent: RadListViewComponent;

    constructor(private favouritesService: FavouriteService) {
    }

    ngOnInit() {
        this.favouritesService.getFavourites()
            .subscribe(favourites => this.favourites = new ObservableArray(favourites),
                errmess => this.errMess = errmess);
    }

    public onCellSwiping(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        if(args.data.x > 200) {

        }
        else if (args.data.x < -200) {

        }
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];

        var leftItem = swipeView.getViewById<View>('mark-view');
        var rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth()/2;
    }

    public onSwipeCellFinished(args: ListViewEventData) {

    }

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log('Left swipe click');
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args: ListViewEventData) {
        this.deleteFavourite(args.object.bindingContext.id);
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    deleteFavourite(id: string) {
        console.log('delete', id);

        let options = {
            title: "Confirm Delete",
            message: 'Do you want to delete Dish '+ id,
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };

        confirm(options).then((result: boolean) => {
            if(result) {

              this.favourites = null;

              this.favouritesService.deleteFavourite(id)
                  .subscribe(favourites => {
                    const toast = new Toasty({text:"Deleted Dish" + id}).setToastDuration(ToastDuration.LONG).setToastPosition(ToastPosition.BOTTOM);
                    toast.show();
                    this.favourites = new ObservableArray(favourites);
                  },
                  errmess => this.errMess = errmess);
            }
            else {
              console.log('Delete cancelled');
            }
        });

      }

    onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
    }


}
