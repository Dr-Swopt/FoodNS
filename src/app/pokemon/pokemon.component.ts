import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Application, isAndroid, isIOS, Page, SearchBar } from '@nativescript/core';
import { Carousel, CarouselItem } from 'nativescript-carousel';
import { ListViewEventData } from 'nativescript-ui-listview';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../shared/pokemon';
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);
declare const IQKeyboardManager: any;
@Component({
  selector: 'app-pokemon',
  moduleId: module.id,
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {

  pokemons: Pokemon[];
  actionAndroid;
  errMess: string;
  poke: Pokemon[];
  searching: boolean = false;
  tabSelectedIndex: number = 0;

  constructor(private pokemonService: PokemonService) {
        this.actionAndroid = isAndroid;

        if (isIOS) {
            var keyboard = IQKeyboardManager.sharedManager();
            keyboard.shouldResignOnTouchOutside = true;
        }

     }

    @ViewChild("myCarousel", { static: false }) carouselView: ElementRef<Carousel>;

    myTapPageEvent(args) {
    console.log('Tapped page index: ' + (this.carouselView.nativeElement.selectedPage));
    }

    myChangePageEvent(args) {
    console.log('Page changed to index: ' + args.index);
    };

  ngOnInit() {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons,
        errmess => this.errMess = <any>errmess);

        /* this.extractData(); */
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
    }

    templateSelector(item: any, index: number, items: any): string {
        return item.expanded ? "expanded" : "default";
    }

  onItemTap(event: ListViewEventData) {
    const listView = event.object,
        rowIndex = event.index,
        dataItem = event.view.bindingContext;

    dataItem.expanded = !dataItem.expanded;
    if (isIOS) {
            var indexPaths = NSMutableArray.new();
            indexPaths.addObject(NSIndexPath.indexPathForRowInSection(rowIndex, event.groupIndex));
            listView.ios.reloadItemsAtIndexPaths(indexPaths);
    }
    if (isAndroid) {
        listView.androidListView.getAdapter().notifyItemChanged(rowIndex);
    }
  }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
        searchBar.dismissSoftInput();
    }

    onSearch(searchValue) {
        if (searchValue !== "") {
            this.searching = true;
            this.poke = this.pokemons.filter((e) => {
                return (e.image && e.name && e.description) &&
                    (e.description.toLowerCase().includes(searchValue) || e.name.toLowerCase().includes(searchValue));
            });
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a pokemon and press enter";
        this.pokemons.forEach(item => {
            this.poke.push(item);
            this.searching = false;
        });
    }

    public onTextChange(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
    }


}
