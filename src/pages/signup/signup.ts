import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../models/user-model';
import { FirebaseAuthState } from 'angularfire2';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import "rxjs/add/operator/first";
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public auth: AuthServiceProvider,
    private alertCtlr: AlertController,
    private loadCtlr: LoadingController,
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.compose([
        Validators.required,Validators.pattern(emailRegex)
      ])]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit(): void {
    let userForm = this.signupForm.value;
    let loading: Loading = this.showLoading();
    loading.present();
    //pegando o username do form
    let username = userForm.username;

    //verificando se ja existe o username cadastrado
    this.userService.userExist(username)
      .first()
      .subscribe((userExists: boolean) => {
        //caso nao exista
        if (!userExists) {
          
          this.auth.createAuthUser({
            email: userForm.email,
            password: userForm.password
          })
            .then((authSate: FirebaseAuthState) => {

              //logar o usuario e redirecionar para a home
            
              delete userForm.password;

              let userId:string = authSate.auth.uid;

              this.userService.create(userForm,userId)
                .then(() => {
                  console.log("Usuario cadastrado")
                  this.navCtrl.setRoot(HomePage)
                  loading.dismiss();

                  

                })

            }).catch((error: any) => {
              console.log(error.code)
              this.showAlert(this.translateError(error.code));

              loading.dismiss();
            });

        } else {
          this.showAlert(`O username ${username} já está sendo usado em outra conta`);
          loading.dismiss()
        }
      });



  }

  private showAlert(message: string) {
    let alert = this.alertCtlr.create({
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

  translateError(error: string): string {
    let erro: string = "";
    if (error.match("auth/invalid-email")) {
      erro = "Digite um endereço de email válido";
    } else if (error.match("auth/email-already-in-use")) {
      erro = "Este email já esta sendo usado por outra conta";
    }

    return erro;
  }
}

