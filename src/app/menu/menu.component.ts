import { Component, OnInit, Inject } from '@angular/core';
import { Application, isAndroid, isIOS, SearchBar } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { DishService } from '../service/dish.service';
import { Dish } from '../shared/dish';

declare const IQKeyboardManager: any;
@Component({
  selector: 'app-menu',
  moduleId: module.id,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [DishService]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  actionAndroid;
    errMess: string;
    filteredDish: Dish[];
    searching: boolean = false;

  constructor(private dishService: DishService) {
    this.actionAndroid = isAndroid;

    if (isIOS) {
        var keyboard = IQKeyboardManager.sharedManager();
        keyboard.shouldResignOnTouchOutside = true;
    }
   }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);

        /* this.extractData(); */
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
}

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
        searchBar.dismissSoftInput();
    }

    onSearch(searchValue) {
        if (searchValue !== "") {
            this.filteredDish = this.dishes.filter((e) => {
                return (e.image && e.name && e.description) &&
                    (e.description.toLowerCase().includes(searchValue) || e.name.toLowerCase().includes(searchValue));
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a dish and press enter";
        this.dishes.forEach(item => {
            this.filteredDish.push(item);
            this.searching = false;
        });
    }

    public onTextChange(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
    }

}
