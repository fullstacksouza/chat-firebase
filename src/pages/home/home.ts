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
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import { Chat } from '../../models/chat-model';
import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public view:string;

  users:FirebaseListObservable<User[]>;
  chats:FirebaseListObservable<Chat[]>;
  constructor(
    public navCtrl: NavController,
    public userService: UserServiceProvider,
    public authService: AuthServiceProvider,
    public chatService: ChatServiceProvider
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
    this.chats = this.chatService.chats;
    console.log("Chats:"+this.chats);
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
    this.userService.currentUser
    .subscribe((currentUser:User)=>{
      this.chatService.getDeepChat(currentUser.$key,recipientUser.$key)// /users/id1/id2
      .first()
      .subscribe((chat:Chat)=>{
        console.log("chat:" + chat);
        
        if(chat.hasOwnProperty('$value')) // se esse objeto tiver a propriedade value dentro dele, entao nao existe o chat
        {
          //criando chat
          let timestamp:Object = firebase.database.ServerValue.TIMESTAMP;
          let chat1 =  new Chat('',timestamp,recipientUser.name,'');
          this.chatService.create(chat1,currentUser.$key,recipientUser.$key);
          
          let chat2 = new Chat('',timestamp,currentUser.name,'');
          this.chatService.create(chat2,recipientUser.$key,currentUser.$key);

        }
        
      })
    })
    this.navCtrl.push(ChatPage,{
      recipientUser:recipientUser
    });
  }

  onChatOpen(chat:Chat):void{
    let recipientUserId:string = chat.$key;
    this.userService.get(recipientUserId)
    .first()
    .subscribe((user:User)=>{
        this.navCtrl.push(ChatPage,{
          recipientUser:user
        });
    })
  }
}
