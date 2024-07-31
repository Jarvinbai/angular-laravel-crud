import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private apiURL = 'https://jsonplaceholder.typicode.com'

  private apiURL = 'http://127.0.0.1:8000/api'

  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  //get all methods
  getAll():Observable<any>{
    return this.httpClient.get(this.apiURL+'/posts/').pipe(catchError(this.errorHandler))
  }

  //create
  create(post:Post):Observable<any>{
    return this.httpClient.post(this.apiURL+'/posts/',JSON.stringify(post),this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  // find data
  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL+'/posts/'+id)
      .pipe(catchError(this.errorHandler));
  }

  //update
  update(id:number, post:Post):Observable<any>{
    return this.httpClient.put(this.apiURL+'/posts/'+id, JSON.stringify(post),this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  //delete
  delete(id:number){
    return this.httpClient.delete(this.apiURL+'/posts/'+id)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error:any){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    }
    else{
      errorMessage = `Error code:${error.status}\nMessage:${error.message}`;
    }
    return throwError(errorMessage);
  }
}
