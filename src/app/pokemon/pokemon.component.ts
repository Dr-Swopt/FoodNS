import { Component, OnInit, Inject } from '@angular/core';
import { Application, isAndroid, isIOS } from '@nativescript/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../shared/pokemon';

@Component({
  selector: 'app-pokemon',
  moduleId: module.id,
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  providers: [PokemonService]
})
export class PokemonComponent implements OnInit {

  pokemons: Pokemon[];
  errMess: string;

  constructor(private pokemonService: PokemonService) { }

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

}
