import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import { Application, login, LoginResult } from "@nativescript/core";
import { getString, setString } from "@nativescript/core/application-settings";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    displayLoginDialog() {
        let options = {
            title: "Login",
            message: 'Type Your Login Credentials',
            userName: getString("userName", ""),
            password: getString("password",""),
            okButtonText: "Login",
            cancelButtonText: "Cancel"
        }

        login(options)
            .then((loginResult: LoginResult) => {
                setString("userName", loginResult.userName);
                setString("password", loginResult.password);
            },
            () => { console.log('Login cancelled');
        });
    }

    ngOnInit(): void {
        this._activatedUrl = "/menu";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
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
