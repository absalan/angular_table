import { Directive, Input, EventEmitter, SimpleChange, OnChanges, DoCheck, IterableDiffers, IterableDiffer, Output
} from '@angular/core';
import * as lodash from 'lodash';
import { ReplaySubject } from 'rxjs';

export interface SortEvent {
  sortBy: string | string[];
  sortOrder: string;
}

export interface PageEvent {
  activePage: number;
  rowsOnPage: number;
  dataLength: number;
}

export interface DataEvent {
  length: number;
}

@Directive({
  selector: 'table[Data]',
  exportAs: 'tableDataVar'
})
export class TableData implements OnChanges, DoCheck {
  private diff: IterableDiffer<string>;
  @Input('Data') public inputData: any[] = [];
  @Input('sortBy') public sortBy: string | string[] = '';
  @Input('sortOrder') public sortOrder = 'asc';
  @Input('rowsOnPage') public rowsOnPage = 1000;
  @Input('activePage') public activePage = 1;
  @Output('sortByChange') public sortByChange = new EventEmitter<string | string[]>();
  @Output('sortOrderChange') public sortOrderChange = new EventEmitter<string>();

  private recalculateData = false;

  public data: any[];

  public onSortChange = new ReplaySubject<SortEvent>(1);
  public onPageChange = new EventEmitter<PageEvent>();

  public constructor(private differs: IterableDiffers) {
    this.diff = differs.find([]).create(null);
  }

  public getSort(): SortEvent {
    return { sortBy: this.sortBy, sortOrder: this.sortOrder };
  }

  public setSort(sortBy: string | string[], sortOrder: string): void {
    if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
      this.sortBy = sortBy;
      this.sortOrder = lodash.includes(['asc', 'desc'], sortOrder)
        ? sortOrder
        : 'asc';
      this.recalculateData = true;
      this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
      this.sortByChange.emit(this.sortBy);
      this.sortOrderChange.emit(this.sortOrder);
    }
  }

  public getPage(): PageEvent {
    return {
      activePage: this.activePage,
      rowsOnPage: this.rowsOnPage,
      dataLength: this.inputData.length
    };
  }

  public setPage(activePage: number, rowsOnPage: number): void {
    if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
      this.activePage =
        this.activePage !== activePage
          ? activePage
          : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
      this.rowsOnPage = rowsOnPage;
      this.recalculateData = true;
      this.onPageChange.emit({
        activePage: this.activePage,
        rowsOnPage: this.rowsOnPage,
        dataLength: this.inputData ? this.inputData.length : 0
      });
    }
  }

  private calculateNewActivePage(
    previousRowsOnPage: number,
    currentRowsOnPage: number
  ): number {
    const firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
    const newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
    return newActivePage;
  }

  private recalculatePage() {
    const lastPage = Math.ceil(this.inputData.length / this.rowsOnPage);
    this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
    this.activePage = this.activePage || 1;

    this.onPageChange.emit({
      activePage: this.activePage,
      rowsOnPage: this.rowsOnPage,
      dataLength: this.inputData.length
    });
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    const rowsOnPage = 'rowsOnPage';
    const sortBy = 'sortBy';
    const sortOrder = 'sortOrder';
    const inputData = 'inputData';

    if (changes[rowsOnPage]) {
      this.rowsOnPage = changes[rowsOnPage].previousValue;
      this.setPage(this.activePage, changes[rowsOnPage].currentValue);
      this.recalculateData = true;
    }
    if (changes[sortBy] || changes[sortOrder]) {
      if (!lodash.includes(['asc', 'desc'], this.sortOrder)) {
        console.warn(
          `Value for input sortOrder must be one of ['asc', 'desc'], but is:`,
          this.sortOrder
        );
        this.sortOrder = 'asc';
      }
      if (this.sortBy) {
        this.onSortChange.next({
          sortBy: this.sortBy,
          sortOrder: this.sortOrder
        });
      }
      this.recalculateData = true;
    }
    if (changes[inputData]) {
      this.inputData = changes[inputData].currentValue || [];
      this.recalculatePage();
      this.recalculateData = true;
    }
  }

  public ngDoCheck(): any {
    const changes = this.diff.diff(this.inputData);
    if (changes) {
      this.recalculatePage();
      this.recalculateData = true;
    }
    if (this.recalculateData) {
      this.fillData();
      this.recalculateData = false;
    }
  }

  private fillData(): void {
    this.activePage = this.activePage;
    this.rowsOnPage = this.rowsOnPage;

    const offset = (this.activePage - 1) * this.rowsOnPage;
    let data = this.inputData;
    const sortBy = this.sortBy;
    if (typeof sortBy === 'string' || sortBy instanceof String) {
      data = lodash.orderBy(data, this.caseInsensitiveIterate(sortBy as string), [
        this.sortOrder
      ]);
    } else {
      data = lodash.orderBy(data, sortBy, [this.sortOrder]);
    }
    data = lodash.slice(data, offset, offset + this.rowsOnPage);
    this.data = data;
  }

  private caseInsensitiveIterate(sortBy: string) {
    return (row: any): any => {
      let value = row;
      for (const sortByProperty of sortBy.split('.')) {
        if (value) {
          value = value[sortByProperty];
        }
      }
      if ((value && typeof value === 'string') || value instanceof String) {
        return value.toLowerCase();
      }
      return value;
    };
  }
}
