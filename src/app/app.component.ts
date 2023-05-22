import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  endpointUrl: string = 'https://http-training-4a130-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl: string = this.endpointUrl+'post.json';
  loadedPosts = [];
  showLoading = false;

  selected = {
    id : '',
    title : '',
    content : '',
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onFetchPosts() {
    // Send Http request
    this.showLoading = true;
    this.http.get<{[key: string] : Post}>(this.postUrl)
    .pipe(
      map( response => {
        const arr: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            arr.push({...response[key], id: key})
          }
        }
        return arr;
      })
    ).subscribe(
      posts => {
        this.showLoading = false;
        this.loadedPosts = posts;
      }
    )
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{name: string}>(this.postUrl, postData).subscribe(
      (_data) => {
        this.onFetchPosts();
      }
    )
  }

  onPatchPost(post) {
    let payload = {
      [post.id] : {content: post.content, title: post.title}
    }
    this.http.patch<{name: string}>(this.postUrl, payload).subscribe(
      (_data) => {
        this.onFetchPosts();
        this.onClearPatch();
      }
    )
  }

  // onClearPosts() {
  //   // Send Http request
  // }

  onLoadPostItem(post) {
    this.selected.id = post.id;
    this.selected.title = post.title;
    this.selected.content = post.content;
  }

  onClearPatch() {
    this.selected.id = '';
    this.selected.title = '';
    this.selected.content = '';
  }
}
