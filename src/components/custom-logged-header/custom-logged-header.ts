import { Component,Input } from '@angular/core';
import { BaseComponent } from '../base-component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the CustomLoggedHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent{

  @Input() title:string; //par apoder passar parametro no seletor

  constructor(
    public alertCtrl:AlertController,
    public authService:AuthServiceProvider,
    public app: App,
    public menuCtrl:MenuController
  ) {
    super(alertCtrl,authService,app,menuCtrl);
  }

}
