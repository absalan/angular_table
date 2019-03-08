import { Component, Input, OnChanges } from '@angular/core';
import { TableData } from '../../../directives/table';
import * as lodash from 'lodash';

@Component({
  selector: 'paginatorContainer',
  template: `
  <paginator #p [Table]="Table">
        <div class="col6">
          <ul class="pagination" *ngIf="p.dataLength > p.rowsOnPage">
              <li [class.disabled]="p.activePage <= 1" (click)="p.setPage(1)">
                  <a class="prev">
                    <i class="fas fa-angle-double-left"></i>
                  </a>
              </li>
              <li *ngIf="p.activePage > 4 && p.activePage + 1 > p.lastPage" (click)="p.setPage(p.activePage - 4)">
                  <a class="page">{{p.activePage-4}}</a>
              </li>
              <li *ngIf="p.activePage > 3 && p.activePage + 2 > p.lastPage" (click)="p.setPage(p.activePage - 3)">
                  <a class="page">{{p.activePage-3}}</a>
              </li>
              <li *ngIf="p.activePage > 2" (click)="p.setPage(p.activePage - 2)">
                  <a class="page">{{p.activePage-2}}</a>
              </li>
              <li *ngIf="p.activePage > 1" (click)="p.setPage(p.activePage - 1)">
                  <a class="page">{{p.activePage-1}}</a>
              </li>
              <li>
                  <a class="page active">{{p.activePage}}</a>
              </li>
              <li *ngIf="p.activePage + 1 <= p.lastPage" (click)="p.setPage(p.activePage + 1)">
                  <a class="page">{{p.activePage+1}}</a>
              </li>
              <li *ngIf="p.activePage + 2 <= p.lastPage" (click)="p.setPage(p.activePage + 2)">
                  <a class="page">{{p.activePage+2}}</a>
              </li>
              <li *ngIf="p.activePage + 3 <= p.lastPage && p.activePage < 3" (click)="p.setPage(p.activePage + 3)">
                  <a class="page">{{p.activePage+3}}</a>
              </li>
              <li *ngIf="p.activePage + 4 <= p.lastPage && p.activePage < 2" (click)="p.setPage(p.activePage + 4)">
                  <a class="page">{{p.activePage+4}}</a>
              </li>
              <li [class.disabled]="p.activePage >= p.lastPage" (click)="p.setPage(p.lastPage)">
                  <a class="next">
                    <i class="fas fa-angle-double-right"></i>
                  </a>
              </li>
          </ul>
        </div>
        <div class="col6">
          <ul class="pagination pull-right" *ngIf="p.dataLength > minRowsOnPage">
              <li *ngFor="let rows of rowsOnPageSet" [class.active]="p.rowsOnPage===rows" (click)="p.setRowsOnPage(rows)">
                  <a class="page">{{rows}}</a>
              </li>
          </ul>
        </div>
    </paginator>
  `
})
export class PaginationComponent implements OnChanges {
  @Input('rowsOnPageSet') rowsOnPageSet = [];
  @Input('Table') Table: TableData;

  minRowsOnPage = 0;

  ngOnChanges(changes: any): any {
    if (changes.rowsOnPageSet) {
      this.minRowsOnPage = lodash.min(this.rowsOnPageSet);
    }
  }
}
