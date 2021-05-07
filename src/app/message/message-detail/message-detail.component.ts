import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IMessage} from '../../model/imessage';
import {MessageService} from '../../service/message/message.service';
import {PostService} from '../../service/post/post.service';
// import * as Stomp from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit, OnDestroy {

  // @Input()
  // conversationId: number;

  // messageList: IMessage[] = [];

  // public chatMessageStompClient: any;
  //
  // message: IMessage = {
  //   id: -1,
  //   conversation: null,
  //   createdAt: new Date(),
  //   sender: null,
  //   receiver: null,
  //   content: '',
  //   type: null
  // };

  // currentUserId: number;

  constructor(public messageService: MessageService,
              public postService: PostService) {
    // this.postService.getCurrentUser().subscribe(next => {
    //   this.currentUserId = next.id;
    // });
  }

  ngOnInit(): void {
    // this.getChatMessageByConversationId();
    // console.log('start message detail');
    //
    // this.disconnectSocket();
    // this.openSocketForChat();
  }

  ngOnDestroy() {
    // this.disconnectSocket();
  }

  // getChatMessageByConversationId() {
  //   this.messageService.getChatMessageByConversationId(this.conversationId).subscribe(next => {
  //     this.messageList = next;
  //   });
  //
  // }

  // sendMessage() {
  //   // console.log(this.conversationId)
  //   this.chatMessageStompClient.send('/app/messenger/create/' + this.conversationId + '/' + this.currentUserId, {}, JSON.stringify(this.message));
  //
  //   this.message.content = '';
  // }
  //
  //
  // public openSocketForChat() {
  //
  //   const socket = new SockJS('http://localhost:8080/socket');
  //
  //   this.chatMessageStompClient = Stomp.Stomp.over(socket);
  //
  //   const _this = this;
  //
  //   this.chatMessageStompClient.connect({}, function(frame) {
  //     console.log('Connected: ' + frame);
  //     _this.chatMessageStompClient.subscribe('/message/getMessage/'+_this.currentUserId, data => {
  //       _this.messageList.push(JSON.parse(data.body));
  //     });
  //   });
  // }
  //
  // public disconnectSocket() {
  //   if (this.chatMessageStompClient != null) {
  //     this.chatMessageStompClient.disconnect;
  //     console.log('Disconnected!');
  //   }
  // }
}
