import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { Application, Page } from '@nativescript/core';
import { getString, setString } from '@nativescript/core/application-settings';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Image } from '@nativescript/core';
import * as camera from "@nativescript/camera";
import * as imagepicker from "nativescript-imagepicker";
@Component({
    selector: 'app-auth',
    moduleId: module.id,
    templateUrl: './userauth.component.html'
})
export class UserAuthComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;
    tabSelectedIndex: number = 0;
    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = true;
    thumbSize: number = 80;
    previewSize: number = 300;

    constructor(private page: Page,
        private routerExtensions: RouterExtensions,
        private formBuilder: FormBuilder) {

        this.loginForm = this.formBuilder.group({
            userName: [getString('userName', ''), Validators.required],
            password: [getString('password', ''), Validators.required]
        });

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            password: ['', Validators.required],
            telnum: ['', Validators.required],
            email: ['', Validators.required]
        });

    }

    ngOnInit() {

    }

    takePicture() {
        let isAvailable = camera.isAvailable();
        if (isAvailable) {
            camera.requestPermissions();
            var options = { width: 100, height: 100, keepAspectRatio: false, saveToGallery: true};

            camera.takePicture(options)
                .then((imageAsset) => {
                    let image = <Image>this.page.getViewById<Image>('myPicture');
                    image.src = imageAsset;
                })
                .catch((err) => console.log('Error -> ' + err.message));
        }

    }

    /* selectPicture(){
        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        context.authorize().then(function() {
        return context.present();
    })
    .then(function(selection) {
        selection.forEach(function(selected) {
            // process the selected image
        });
        list.items = selection;
    }).catch(function (e) {
        // process error
    });
    } */

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }


    private startSelection(context) {
        let that = this;

        context
        .authorize()
        .then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });

            that.imageAssets = selection;
        }).catch(function (e) {
            console.log(e);
        });
    }

    register() {
        this.tabSelectedIndex = 1;
    }

    onLoginSubmit() {
        console.log(JSON.stringify(this.loginForm.value));

        setString("userName", this.loginForm.get('userName').value);
        setString("password", this.loginForm.get('password').value);

        this.routerExtensions.navigate(["/home"], { clearHistory: true })
    }

    onRegisterSubmit() {
        console.log(JSON.stringify(this.registerForm.value));

        setString("userName", this.registerForm.get('userName').value);
        setString("password", this.registerForm.get('password').value);

        this.loginForm.patchValue({
            'userName': this.registerForm.get('userName').value,
            'password': this.registerForm.get('password').value});

            this.tabSelectedIndex = 0;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

}
