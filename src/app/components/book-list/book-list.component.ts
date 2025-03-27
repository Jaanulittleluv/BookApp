import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CardModule } from '@coreui/angular';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,CardModule],
  styleUrls:['./book-list.component.css'],
  template: `
  <div class="container">
  <div class="card glass-effect" [ngClass]="{'expanded': books.length > 0}" style="width: 80rem; margin:10px; background:transparent">
  <div class="card-body">
    <h1 class="card-title" style="text-align: center; color:white; font-family:IBM Plex Sans Condensed, sans-serif; font-weight:bold; font-size:100px;">Book List</h1>
    <h6 class="card-subtitle mb-2" style="text-align: center; color:white; font-family:IBM Plex Sans Condensed, sans-serif; font-weight:bold; font-size:50px;">Enter Your Keyword</h6>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <input [(ngModel)]="query" (keyup.enter)="searchBooks()" placeholder="Search books" class="form-control mb-3" />
        </div>
      </div>
    <!-- Bookshelf Layout -->
    <div class="bookshelf">
      <div class="book" *ngFor="let book of books" (click)="selectBook(book)">
        <img [src]="book.volumeInfo.imageLinks?.thumbnail" alt="Book Cover">
      </div>
    </div>

    <!-- Expanded Book Details -->
    <div class="overflow-hidden">
      <div *ngIf="selectedBook" class="book-details">
        <button (click)="selectedBook = null" class="close-btn">✖</button>
        <h3>{{ selectedBook.volumeInfo.title }}</h3>
        <img [src]="selectedBook.volumeInfo.imageLinks?.thumbnail" alt="Book Cover">
        <p>{{ selectedBook.volumeInfo.description || 'No description available.' }}</p>
        <a [href]="selectedBook.volumeInfo.previewLink" target="_blank">Preview Book</a>
      </div>
    </div>
  </div>
  </div>
</div>
    
    

    


  `
})
export class BookListComponent {
  query = '';
  books: any[] = [];
  selectedBook: any = null;

  private bookService = inject(BookService);

  searchBooks() {
    this.bookService.getBooks(this.query).subscribe((data) => {
      this.books = data.items || [];
    });
  }

  selectBook(book: any) {
    this.selectedBook = book;
  }
}
