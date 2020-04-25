import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anguar-ag-grid';
  lists = [];
  columnDefs = [];
  rowData = [];
  autoGroupColumnDef = {};

  constructor(private apiService: ApiService) {
    this.fetchData();
  }

  fetchData() {
    try {
      this.apiService.getData()
        .subscribe(
          data => {
            this.lists = data;
            console.log('data => ', this.lists);
            this.convertToGridData(this.lists);
          },
          err => {
            console.log('Error => ', err);
          }
        );
    } catch (error) {
      console.log('error => ', error);
    }
  }

  convertToGridData(gridata) {
    const datakeys = Object.keys(gridata[0]);
    datakeys.forEach((ele, index) => {
      let rowData = {};
      rowData = {
        headerName: ele.toUpperCase(),
        field: ele,
        sortable: true,
        filter: true
      };
      if (index === 0) {
        Object.assign(rowData, {checkboxSelection: true});
      }
      this.columnDefs.push(rowData);
    });
    console.log('columnDefs => ', this.columnDefs);
    this.rowData = gridata;
  }

}
