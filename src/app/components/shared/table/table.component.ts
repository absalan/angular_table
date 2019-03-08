import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Book } from '../../../models/books';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() lists: Book;
  books;
  constructor() {}

  ngOnInit() {
    this.books = this.lists;
  }

}
