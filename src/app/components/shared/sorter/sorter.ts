import { Component, Input, OnInit } from '@angular/core';
import { TableData, SortEvent } from '../../../directives/table';

@Component({
  selector: 'fieldSorter',
  template: `
    <a style="cursor: pointer" (click)="sort()" class="text-nowrap">
      <ng-content></ng-content>
      <span
        *ngIf="isSortedByAsc"
        class="fa fa-caret-up"
        aria-hidden="true"></span>
      <span
        *ngIf="isSortedByDesc"
        class="fa fa-caret-down"
        aria-hidden="true"></span>
    </a>
  `
})
export class SorterComponent implements OnInit {
  @Input('by') sortBy: string;

  isSortedByAsc: boolean = false;
  isSortedByDesc: boolean = false;

  public constructor(private table: TableData) {}

  public ngOnInit(): void {
    this.table.onSortChange.subscribe((event: SortEvent) => {
      this.isSortedByAsc =
        event.sortBy == this.sortBy && event.sortOrder == 'asc';
      this.isSortedByDesc =
        event.sortBy == this.sortBy && event.sortOrder == 'desc';
    });
  }

  sort() {
    if (this.isSortedByAsc) {
      this.table.setSort(this.sortBy, 'desc');
    } else {
      this.table.setSort(this.sortBy, 'asc');
    }
  }
}
