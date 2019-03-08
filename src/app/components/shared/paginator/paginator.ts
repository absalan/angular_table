import { Component, Input, SimpleChange, OnChanges, Optional } from '@angular/core';
import { TableData, PageEvent } from '../../../directives/table';

@Component({
  selector: 'paginator',
  template: `
    <ng-content></ng-content>
  `
})
export class PaginatorComponent implements OnChanges {
  @Input('Table') inputTable: TableData;

  private Table: TableData;

  public activePage: number;
  public rowsOnPage: number;
  public dataLength: number = 0;
  public lastPage: number;

  public constructor(@Optional() private injectTable: TableData) {}

  public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    this.Table = this.inputTable || this.injectTable;
    this.onPageChangeSubscriber(this.Table.getPage());
    this.Table.onPageChange.subscribe(this.onPageChangeSubscriber);
  }

  public setPage(pageNumber: number): void {
    this.Table.setPage(pageNumber, this.rowsOnPage);
  }

  public setRowsOnPage(rowsOnPage: number): void {
    this.Table.setPage(this.activePage, rowsOnPage);
  }

  private onPageChangeSubscriber = (event: PageEvent) => {
    this.activePage = event.activePage;
    this.rowsOnPage = event.rowsOnPage;
    this.dataLength = event.dataLength;
    this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
  };
}
