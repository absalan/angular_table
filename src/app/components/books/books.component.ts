import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books = [];
  totalBooks = 1000;
  authors = [
    'Henri Kalbfleisch',
    'Jean-Yves Boisvert',
    'Emerson Sutton',
    'Gerald Sundin',
    'Adrian Gregg',
    'Jason LaFayette',
    'Andy Levandoski',
    'Juraj Boh',
    'Roger Mongeau',
    'Griffin Rossignol'
  ];

  bookNames = [
    'Harry Potter',
    'The Hunger Games',
    'Ender\'s Game',
    'East of Eden',
    'Animal Farm',
    'The Kite Runner',
    'The Stand',
    'The Hobbit',
    'A Game of Thrones',
    'Pride and Prejudice'
  ];
  constructor() {
    this.generateBooks();
  }

  ngOnInit() {}

  generateBooks() {
    const thisCl = this;
    for (let i = 0; i < this.totalBooks; i++) {
      this.books.push({
        id: i,
        name: this.bookNames[this.randomNum(0, 9)],
        author: this.genAuthorsName(),
        year: this.randomNum(1990, 2019),
        pages: this.randomNum(300, 800),
        price: this.randomNum(20, 150)
      });
    }
  }

  genAuthorsName() {
    const authors = [];
    const runNum = this.randomNum(10);
    for (let i = 1; i <= this.randomNum(1, 3); i++) {
      authors.push(this.authors[runNum]);
    }
    return authors;
  }

  randomNum(min: number, max: number = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
