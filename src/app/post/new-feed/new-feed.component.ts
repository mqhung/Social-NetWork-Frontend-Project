import { Component, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})
export class NewFeedComponent implements OnInit {
  currentUser: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem("currentUser");
    if (this.currentUser == null) {
      alert("Bạn phải đăng nhập trước!");
      this.router.navigate(['/login']);
    }
  }

}
