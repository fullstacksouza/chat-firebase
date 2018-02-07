import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Promise } from 'firebase';
import { User } from '../../models/user-model';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Message } from '../../models/message-model';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import firebase from 'firebase';
import { Chat } from '../../models/chat-model';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
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

  @ViewChild(Content) content: Content;
  pageTitle: string
  sender: User;
  recipient: User;
  messages: FirebaseListObservable<Message[]>;
  //sender
  private chat1: FirebaseObjectObservable<Chat>;
  //recipient
  private chat2: FirebaseObjectObservable<Chat>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public userService: UserServiceProvider,
    public messageService: MessageServiceProvider,
    public chatService: ChatServiceProvider

  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;

  }

  sendMessage(message: string): void {
    if (message) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      this.messageService.create(new Message(
        this.sender.$key,
        message,
        currentTimestamp
      ), this.messages
      ).then(() => {

        this.chat1
          .update({
            lastMessage: message,
            timestamp: currentTimestamp
          });

        this.chat2
          .update({
            lastMessage: message,
            timestamp: currentTimestamp
          });
      });
    }
  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50)
  }
  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        let doSubscription = () =>{
          this.messages
          .subscribe((message:Message[])=>{
            this.scrollToBottom();
          })
        }
        this.messages = this.messageService
          .getMessage(this.sender.$key, this.recipient.$key);

        this.messages
          .first()
          .subscribe((message: Message[]) => {
            if (message.length === 0) {
              this.messages = this.messageService
                .getMessage(this.recipient.$key, this.sender.$key);

                doSubscription();
            }else{
              doSubscription()
            }
          })
      })

  }

}
