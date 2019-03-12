import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ngxLoadingAnimationTypes , NgxLoadingComponent} from 'ngx-loading';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    @Input() public loading: boolean;
    @Input() public loadingConfig: any = {};

    @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
    @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;

    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    public primaryColour = PrimaryWhite;
    public secondaryColour = SecondaryGrey;
    public coloursEnabled = false;
    public loadingTemplate: TemplateRef<any>;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.loading = false;
        this.loadingConfig = {
            animationType: this.ngxLoadingAnimationTypes.threeBounce,
            primaryColour: this.primaryColour,
            secondaryColour: this.secondaryColour,
            tertiaryColour: this.primaryColour,
            backdropBorderRadius: '3px'
        };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.chasingDots,
        //     primaryColour: this.primaryColour,
        //     secondaryColour: this.secondaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     primaryColour: this.primaryColour,
        //     secondaryColour: this.secondaryColour,
        //     tertiaryColour: this.primaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.doubleBounce,
        //     primaryColour: this.primaryColour,
        //     secondaryColour: this.secondaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.circle,
        //     primaryColour: this.primaryColour,
        //     secondaryColour: this.secondaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.circleSwish,
        //     primaryColour: this.primaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.cubeGrid,
        //     primaryColour: this.primaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.pulse,
        //     primaryColour: this.primaryColour,
        //     secondaryColour: this.secondaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.rectangleBounce,
        //     primaryColour: this.primaryColour,
        //     backdropBorderRadius: '3px'
        // };
        // this.loadingConfig = {
        //     animationType: this.ngxLoadingAnimationTypes.rotatingPlane,
        //     primaryColour: this.primaryColour,
        //     backdropBorderRadius: '3px'
        // };
    }

    toggleColours(): void {
        this.coloursEnabled = !this.coloursEnabled;

        if (this.coloursEnabled) {
            this.primaryColour = PrimaryRed;
            this.secondaryColour = SecondaryBlue;
        } else {
            this.primaryColour = PrimaryWhite;
            this.secondaryColour = SecondaryGrey;
        }
    }

    toggleTemplate(): void {
        if (this.loadingTemplate) {
            this.loadingTemplate = null;
        } else {
            this.loadingTemplate = this.customLoadingTemplate;
        }
    }

    public showAlert(): void {
        alert('ngx-loading rocks!');
    }
}
