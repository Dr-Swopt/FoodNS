import { Component, OnInit, Inject } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { LeaderService } from '../service/leader.service';
import { Leader } from '../shared/leader';
@Component({
  selector: 'app-leader',
  moduleId: module.id,
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css'],
  providers: [LeaderService]
})
export class LeaderComponent implements OnInit {

    errMess: string;
    leaders: Leader[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);

        /* this.extractData(); */
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
}

}
