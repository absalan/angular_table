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

  priceIcon(price) {
    let pricePadge = '';
    const val = price;
    switch (true) {
      case val <= 50:
        pricePadge = 'low';
        break;
      case val > 50 && val <= 100:
        pricePadge = 'middle';
        break;
      case val > 100:
        pricePadge = 'premium';
        break;
    }
    return pricePadge;
  }
}
