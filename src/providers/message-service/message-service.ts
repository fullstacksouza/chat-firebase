import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseListObservable } from 'angularfire2/database';
import { Message } from '../../models/message-model';
import { AngularFire } from 'angularfire2';
import { BaseService } from '../base-service/base.service';

@Injectable()
export class MessageServiceProvider extends BaseService{

  constructor(
    
    public http: Http,
    public af:AngularFire
  ){super();}

create(message:Message,listMessage:FirebaseListObservable<Message[]>):firebase.Promise<void>{
  return listMessage.push(message)
  .catch(this.handlePromiseError);
}

  getMessage(userId1:string,userId2:string):FirebaseListObservable<Message[]>
  {
    return <FirebaseListObservable<Message[]>>this.af.database.list(`messages/${userId1}-${userId2}`,{
      query:{
        orderByChild:"timestamp",
        limitToLast:30
      }
    }).catch(this.handleObservableError);
  }
}
