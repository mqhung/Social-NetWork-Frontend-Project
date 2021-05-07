import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../service/message/message.service';
import {IMessage} from '../model/imessage';
import {PostService} from '../service/post/post.service';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {IAppUser} from '../model/IAppUser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {


  messageList: IMessage[] = [];

  public chatMessageStompClient: any;

  message: IMessage = {
    id: -1,
    conversation: null,
    createdAt: new Date(),
    sender: null,
    receiver: null,
    content: '',
    type: null
  };

  currentUserId: number;
  currentUser: IAppUser;

  currentConversationId: number;


  constructor(public messageService: MessageService,
              public postService: PostService) {
    const firstElement = 0;
    this.messageService.getConversationList().subscribe(next => {
      this.messageService.conversations = next;
      this.currentConversationId = next[firstElement].id;
      this.getChatMessageByConversationId(this.currentConversationId);

    });
    this.postService.getCurrentUser().subscribe(next => {
      this.currentUser = next;
      this.currentUserId = next.id;
    });
  }

  ngOnInit(): void {
    // this.getChatMessageByConversationId(this.currentConversationId);
    // console.log('start message detail');

    this.disconnectSocket();
    this.openSocketForChat();

  }

  ngOnDestroy(): void {
    this.disconnectSocket();
  }

  public openSocketForChat() {

    const socket = new SockJS('http://localhost:8080/socket');

    this.chatMessageStompClient = Stomp.Stomp.over(socket);

    const _this = this;

    this.chatMessageStompClient.connect({}, function(frame) {
      console.log('Connected: ' + frame);
      _this.chatMessageStompClient.subscribe('/message/getMessage/' + _this.currentUserId, data => {
        _this.messageList.push(JSON.parse(data.body));
      });
    });
  }

  public disconnectSocket() {
    if (this.chatMessageStompClient != null) {
      this.chatMessageStompClient.disconnect;
      console.log('Disconnected!');
    }
  }

  getChatMessageByConversationId(conversationId: number) {
    this.messageService.getChatMessageByConversationId(conversationId).subscribe(next => {
      this.messageList = next;
    });
    this.currentConversationId = conversationId;
    // window.scrollTo(0,document.body.scrollHeight);
    let objDiv = document.getElementById('chat-content');
    objDiv.scrollTop;

  }

  sendMessage() {
    // console.log(this.conversationId)
    this.chatMessageStompClient.send('/app/messenger/create/' +
      this.currentConversationId + '/' + this.currentUserId, {}, JSON.stringify(this.message));
    this.message.content = '';
    //can not scroll down because i dont have time
    // $("#chat-content").scrollTop($("#chat-content")[0].scrollHeight);
    // let objDiv = document.getElementById('chat-content');
    // objDiv.scrollTop = objDiv.scrollHeight;

  }
}
