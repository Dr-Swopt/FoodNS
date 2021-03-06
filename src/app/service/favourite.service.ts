import { Injectable } from '@angular/core';
import { LocalNotifications } from 'nativescript-local-notifications';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { CouchbaseService } from './couchbase.service';
import { DishService } from './dish.service';

@Injectable()
export class FavouriteService {

    favourites: Array<string>;
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

    isFavourite(id: string): boolean {
        return this.favourites.some(el => el === id);
    }

    addFavourite(id: string): boolean {
        if (!this.isFavourite(id)) {
          this.favourites.push(id);
          this.couchbaseService.updateDocument(this.docId, {"favourites": this.favourites});
          LocalNotifications.schedule([{
            id: +id,
            title: "ConFusion Favorites",
            body: 'Dish ' + id + ' added successfully'
          }])
          .then(() => console.log('Notification scheduled'),
            (error) => console.log('Error showing nofication ' + error));
        }

        return true;
      }

    getFavourites(): Observable<Dish[]> {
        return this.dishservice.getDishes()
            .pipe(map(dishes => dishes.filter(dish => this.favourites.some(el => el === dish.id))));
    }

    deleteFavourite(id: string): Observable<Dish[]> {
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
