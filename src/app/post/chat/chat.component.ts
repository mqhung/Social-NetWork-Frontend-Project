import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Chat} from '../../model/chat';
import {ChatService} from '../../service/chat.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../service/user.service';
import {FriendService} from '../../service/friend.service';
import {IAppUser} from '../../model/IAppUser';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/socket';
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;
  form: FormGroup;
  userForm: FormGroup;
  messages: Chat[] = [];
  users:IAppUser[];
  userLogin: IAppUser;
  userTarget: IAppUser;
  constructor(private chatService: ChatService, private toastr: ToastrService,
              private userService: UserService, private friendService: FriendService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.userLogin = <IAppUser> res;
        this.userTarget = <IAppUser> res;
      }
    )
    this.userService.getCurrentUser().subscribe(
      res=>{ this.userLogin = <IAppUser>res;
        this.friendService.getFriendList(this.userLogin.id).subscribe(
          response => {this.users = <IAppUser[]>response},
          error => console.error(error)
        )
      }
    )
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    })
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    })
    this.initializeWebSocketConnection();
  }

  setUserTarget(value){
    this.userService.findUserById(value).subscribe(
      response => {this.userTarget = <IAppUser>response;
      }
    )
    if (this.isCustomSocketOpened ==false){
      this.openSocket();
    }
    this.messages=[];
  }

  sendMessageUsingSocket() {
    // @ts-ignore
    let message: Message = { message: this.form.value.message, fromId:this.userLogin.userId.toString(), toId: this.userTarget.userId.toString()};
    this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
    this.form.reset();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.isLoaded = true;
      that.openGlobalSocket()
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.userService.getCurrentUser().subscribe(
        response => {this.userLogin = <IAppUser>response;
          this.isCustomSocketOpened = true;
          this.stompClient.subscribe("/socket-publisher/"+this.userLogin.id.toString(), (message) => {
            this.handleResult(message);
          });
        }
      )
    }
  }

  handleResult(message){
    if (message.body) {
      let messageResult: Chat = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      this.toastr.success("new message received", null, {
        'timeOut': 3000
      });
    }
  }

}
