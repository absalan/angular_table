import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/shared/pagination/pagination.component';
import { PaginatorComponent } from '../../components/shared/paginator/paginator';
import { SorterComponent } from '../../components/shared/sorter/sorter';
import { TableData } from '../../directives/table';

@NgModule({
  declarations: [
        TableData,
        SorterComponent,
        PaginatorComponent,
        PaginationComponent
    ],
    exports: [
        TableData,
        SorterComponent,
        PaginatorComponent,
        PaginationComponent
    ],
  imports: [
    CommonModule
  ]
})
export class TableModule { }
