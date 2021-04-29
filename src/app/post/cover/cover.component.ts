import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../service/post/post.service';
import {IAppUser} from '../../model/IAppUser';
import {UserService} from '../../service/user.service';
import {FriendService} from '../../service/friend.service';
import {JwtService} from '../../service/auth/jwt.service';

@Component({
    selector: 'app-cover',
    templateUrl: './cover.component.html',
    styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

    @Input()
    guestUserId: number;
    guestUser: IAppUser;

    contentToSearch: string;

    currentUser: IAppUser;

    constructor(private postService: PostService) {
        this.postService.getCurrentUser().subscribe(next => {
            this.currentUser = next;
        });

    }

    ngOnInit(): void {
        this.postService.getUserById(this.guestUserId).subscribe(user => {
            this.guestUser = user;
        });
    }

    searchPostByContent() {
        this.postService.searchPostByContent(this.contentToSearch, this.guestUserId).subscribe(listPost => {
            this.postService.postListTimeline = listPost;
            this.contentToSearch = '';
        });
    }

}
