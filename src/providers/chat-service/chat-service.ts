import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire,FirebaseObjectObservable } from 'angularfire2';
import { Chat } from '../../models/chat-model';

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatServiceProvider {

  constructor(
    public http: Http,
    public af: AngularFire,
  
  )
  {
   
  }

  create(chat:Chat,userId1:string,userId2:string):firebase.Promise<void>
  {
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
    .set(chat)
    .catch((error:Error)=>{
      console.log(error);
    })
  }

  getDeepChat(userId1:String,userId2:string):FirebaseObjectObservable<Chat>{
    return this.af.database.object(`/chats/${userId1}/${userId2}`);
   
  }
}
