import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  endpointURL: string = 'https://http-training-4a130-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL: string = this.endpointURL+'post.json';

  constructor(private http: HttpClient) {}

  // Fetching Data
  fetch() {
    return this.http.get<{[key: string] : Post}>(this.postURL)
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
    )
  }

  // Posting Data
  post(payload: Post) {
    return this.http.post<{name: string}>(this.postURL, payload);
  }

  // Patching Data
  patch(payload) {
    return this.http.patch<{name: string}>(this.postURL, payload);
  }

  // Deleting Data
  delete() {
    return this.http.delete(this.postURL);
  }

}
