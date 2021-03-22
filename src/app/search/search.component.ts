import { Component } from "@angular/core";
import { SearchBar } from "@nativescript/core";

@Component({
    selector:'search',
    templateUrl:'./search.component.html'
})
export class SearchComponent {

    searchPhrase: string;

    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Searching for ${searchBar.text}`);
    }

    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Input changed! New value: ${searchBar.text}`);
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Clear event raised`);
    }

}
