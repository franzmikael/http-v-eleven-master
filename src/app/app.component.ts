import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = false;
  error = null;
  loadedPosts = [];
  patchFormModel = {
    id : '',
    title : '',
    content : '',
  }

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onFetchPosts() {
    this.loading = true;
    this.postService.fetch()
    .subscribe(
      posts => {
        this.loadedPosts = posts;
        this.loading = false;
      },
      error => {
        this.error = error
        this.loading = false;
      }
    )
  }

  onCreatePost(postData: Post) {
    this.loading = true;
    this.postService.post(postData)
    .subscribe( 
      _posts => {
        this.onFetchPosts();
        this.loading = false;
      },
      error => {
        this.error = error
        this.loading = false;
      }
    )
  }

  onPatchPost(postData: Post) {
    this.loading = true;
    let payload = {
      [this.patchFormModel.id] : {content: postData.content, title: postData.title}
    }
    this.postService.patch(payload)
    .subscribe(
      _posts => {
        this.onFetchPosts();
        this.onClearPatchForm();
        this.loading = false;
      },
      error => {
        this.error = error
        this.loading = false;
      }
    )
  }

  onClearPosts() {
    this.loading = true;
    this.postService.delete()
    .subscribe(
      _posts => {
        this.onFetchPosts();
        this.loading = false;
      },
      error => {
        this.error = error
        this.loading = false;
      }
    )
  }

  onLoadPatchForm(post) {
    this.patchFormModel.id = post.id;
    this.patchFormModel.title = post.title;
    this.patchFormModel.content = post.content;
  }

  onClearPatchForm() {
    this.patchFormModel.id = '';
    this.patchFormModel.title = '';
    this.patchFormModel.content = '';
  }

  onClearError() {
    this.error = null;
  }
}