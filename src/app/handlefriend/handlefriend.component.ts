import { Component, OnInit } from '@angular/core';
import {FriendService} from '../service/friend.service';
import {JwtService} from '../service/auth/jwt.service';

@Component({
  selector: 'app-handlefriend',
  templateUrl: './handlefriend.component.html',
  styleUrls: ['./handlefriend.component.css']
})
export class HandlefriendComponent implements OnInit {

  constructor(private friendService: FriendService, private jwtService: JwtService) { }

  ngOnInit(): void {
  }

}
