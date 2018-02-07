import { Component,Input } from '@angular/core';
import { Message } from '../../models/message-model';
/*
<message-box [style.justify-content]=""></message-box>
*/
@Component({
  selector: 'message-box',
  templateUrl: 'message-box-component.html',
  //se a mensagem foi enviada pelo usuario atual, posicionamos o messge-box na direita, e  os textos tbm
  host:{
    '[style.justify-content]':'((!isFromSender) ? "flex-start":"flex-end")',
    '[style.text-align]':'((!isFromSender) ? "left":"right")',
  }
})
export class MessageBoxComponent {

  @Input()  message: Message;
  @Input() isFromSender:boolean;
  constructor() {

  }

}
