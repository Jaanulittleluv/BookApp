import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `https://www.googleapis.com/books/v1/volumes?q=`;

  private http = inject(HttpClient);

  getBooks(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${query}&key=${environment.googleBooksApiKey}`);
  }

  getBookDetails(id: string): Observable<any> {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${environment.googleBooksApiKey}`);
  }
}
