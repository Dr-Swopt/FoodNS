import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Application, EventData, isAndroid, isIOS, Page, SearchBar } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { NewsService } from '../service/news.service';
import { DataItem } from '../shared/DataItem';
declare const IQKeyboardManager: any;
@Component({
  selector: 'app-pokemonV2',
  moduleId: module.id,
  templateUrl: './pokemonV2.component.html',
  styleUrls: ['./pokemonV2.component.css'],
  providers: [NewsService]
})
export class PokemonV2Component implements OnInit {

    news: DataItem[];

    actionAndroid;
    errMess: string;
    allnews: DataItem[];
    searching : boolean = false;

    ngOnInit() {
        this.newsService.getNews()
          .subscribe(allnews => this.allnews = allnews,
            errmess => this.errMess = <any>errmess);

            /* this.extractData(); */
      }

    constructor(private newsService: NewsService) {
        this.actionAndroid = isAndroid;

        if (isIOS) {
            var keyboard = IQKeyboardManager.sharedManager();
            keyboard.shouldResignOnTouchOutside = true;
        }
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
            this.news = this.allnews.filter((e) => {
                return (e.urlToImage && e.title && e.description && e.source.name) &&
                    (e.description.toLowerCase().includes(searchValue) || e.title.toLowerCase().includes(searchValue));
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a news and press enter";
        this.allnews.forEach(item => {
            this.news.push(item);
            this.searching = false;
        });
    }

    public onTextChange(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
    }

}
