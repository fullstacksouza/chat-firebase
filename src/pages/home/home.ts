import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FirebaseListObservable } from 'angularfire2/database';
import { User } from '../../models/user-model';
import { SigninPage } from '../signin/signin';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Promise } from 'firebase';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public view:string;

   users:FirebaseListObservable<User[]>;
  constructor(
    public navCtrl: NavController,
    public userService: UserServiceProvider,
    public authService: AuthServiceProvider
  ) {
  }

  ionViewCanEnter():Promise<boolean>
  {
    return this.authService.authenticated
    .catch(()=>{
      this.navCtrl.setRoot(SigninPage)
    })
    ;
 
  }
  ionViewDidLoad() {
    
    this.users = this.userService.users;
    console.log(this.users);
  }
  onSignup():void
  {
    this.navCtrl.push(SignupPage);
  }
  
  onSignin():void
  {
    this.navCtrl.push(SigninPage);
  }
  onCreateChat(recipientUser:User):void
  {
    this.navCtrl.push(ChatPage,{
      recipientUser:recipientUser
    });
  }
}
