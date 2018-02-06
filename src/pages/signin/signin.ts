import { Component } from '@angular/core';
import { NavController, NavParams, Loading,AlertController } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { HomePage } from '../home/home';
import { ErrorHandler } from '../../errorHandle/errorHandle';
/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage extends ErrorHandler {
  signinForm: FormGroup;
  
  constructor(
    
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public authService:AuthServiceProvider,
    public alertCtrl:AlertController,
    public loadCtlr:LoadingController
  ){
    super();
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
         email: ['',[Validators.compose([Validators.required,Validators.pattern(emailRegex)])]],
         password: ['',[Validators.required,Validators.minLength(6)]]
       });
  }

  onSubmit():void{

    let load  = this.showLoading();
    load.present();
    this.authService.signinWithEmail(this.signinForm.value)
    .then((isLogged:boolean)=>{
      //verifica se consegui logar
      if(isLogged)
      {
        this.navCtrl.setRoot(HomePage);
        load.dismiss();
      }else
      {
        load.dismiss();
        this.showAlert(this.translateError("Credenciais Invalidas"))
        
      }
    }).catch((error:any)=>{
        console.log(error);
     
    });
  }

  onSignup():void
  {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }


  private showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: "Erro",
      message: message,
      buttons: ['ok']
    });
    alert.present();

  }

  private showLoading(): Loading {
    let load = this.loadCtlr.create({
      content: "Por favor aguarde"
    });
    return load;
  }

  
}


