import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Promise } from 'firebase';
import { User } from '../../models/user-model';
import { UserServiceProvider } from '../../providers/user-service/user-service';
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  pageTitle:string;
  sender: User;
  recipient:User;
  messages:string[] = [];
    constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public userService:UserServiceProvider

  
  ) {
  }

  ionViewCanEnter():Promise<boolean>
  {
    return this.authService.authenticated;
 
  }

  sendMessage(message:string):void
  {
    this.messages.push(message);
  }

  ionViewDidLoad(){
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser
    .first()
    .subscribe((currentUser:User)=>{
      this.sender = currentUser;
    })
    
  }

}
