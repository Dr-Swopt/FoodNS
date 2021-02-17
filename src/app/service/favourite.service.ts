import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { CouchbaseService } from './couchbase.service';
import { DishService } from './dish.service';

@Injectable()
export class FavouriteService {

    favourites: Array<number>;
    docId: string = "favourites";

    constructor(private dishservice: DishService,
        private couchbaseService: CouchbaseService) {
            this.favourites = [];

            let doc = this.couchbaseService.getDocument(this.docId);
            if( doc == null) {
              this.couchbaseService.createDocument({"favourites": []}, this.docId);
            }
            else {
              this.favourites = doc.favourites;
            }
    }

    isFavourite(id: number): boolean {
        return this.favourites.some(el => el === id);
    }

    addFavourite(id: number): boolean {
        if (!this.isFavourite(id)) {
          this.favourites.push(id);
          this.couchbaseService.updateDocument(this.docId, {"favourites": this.favourites});
        }

        return true;
      }

    getFavourites(): Observable<Dish[]> {
        return this.dishservice.getDishes()
            .pipe(map(dishes => dishes.filter(dish => this.favourites.some(el => el === dish.id))));
    }

    deleteFavourite(id: number): Observable<Dish[]> {
        let index = this.favourites.indexOf(id);
        if (index >= 0) {
          this.favourites.splice(index,1);
          this.couchbaseService.updateDocument(this.docId, {"favourites": this.favourites});
          return this.getFavourites();
        }
        else {
          return throwError('Deleting non-existant favourite');
        }
      }
}
