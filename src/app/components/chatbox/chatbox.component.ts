import { Component } from '@angular/core';
import { Observable, Subject, interval, merge } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';

import { Message, User, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent{

  public readonly user: User = {
    id: 1
  };

  public readonly bot: User = {
    id: 0
  };

  public feed: Observable<Message[]>;
  private local: Subject<Message> = new Subject<Message>();

  constructor(public service : CustomerService) {
    // const mockStream = interval(1000).pipe(
    //     // Make a message
    //     map((x: number): Message =>  {
    //       return {
    //         author: this.bot,
    //         text: `Message # ${x + 1}`
    //       };
    //     })
    // );

    this.feed = merge(
      this.local
    ).pipe(
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
  }

  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);
    // console.log(typeof(e.message.text));
    
    // console.log(e.message.text);
    
    this.service.sendMessage(e.message.text).subscribe( res => {
      console.log(res[0]['text']);
      res.forEach(element => {
        this.local.next({
          author: this.bot,
          text: element['text']
        });
      });
    })
  }

}
