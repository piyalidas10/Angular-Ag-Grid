import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { TableComponent } from './table/table.component';
import { TableGroupComponent } from './table-group/table-group.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
