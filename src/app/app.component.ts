import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import { Application, login, LoginResult } from "@nativescript/core";
import { getString, setString } from "@nativescript/core/application-settings";
import { Leader } from "./shared/leader";
import { LeaderService } from "./service/leader.service";
import { PlatformService } from "./service/platform.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    leaders: Leader[];
    errMess: any;

    constructor(private router: Router,
         private routerExtensions: RouterExtensions,
         private leaderService: LeaderService,
         private platformService: PlatformService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/menu";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.leaderService.getLeaders()
        .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);

        this.platformService.printPlatformInfo();
        this.platformService.startMonitoringNetwork()
        .subscribe((message: string) => {
        console.log(message);

    });
    }

    ngOnDestroy() {
        this.platformService.stopMonitoringNetwork();
      }


    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer><unknown>Application.getRootView();
        sideDrawer.closeDrawer();
    }
 }
