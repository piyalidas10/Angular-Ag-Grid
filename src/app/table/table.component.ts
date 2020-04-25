import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  lists = [];
  columnDefs = [];
  rowData = [];
  autoGroupColumnDef = {};
  private paginationPageSize;
  private cacheBlockSize;
  private processChartOptions;
  private defaultColDef;
  private getRowHeight;
  private pinnedTopRowData;
  private pinnedBottomRowData;

  constructor(private apiService: ApiService) {
    this.paginationPageSize = 10;
    this.cacheBlockSize = 10;
    this.defaultColDef = {
      sortable: true,
      resizable: false,
      filter: true,
    };
    this.getRowHeight = 50;
    this.pinnedTopRowData = this.createData(1, 'Top');
    this.pinnedBottomRowData = this.createData(1, 'Bottom');
    this.fetchData();
  }

  ngOnInit() {
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
    console.log('datakeys => ', datakeys);
    datakeys.forEach((ele, index) => {
      let eachData = {};
      eachData = {
        headerName: ele.toUpperCase(),
        field: ele
      };
      if (index === 0) {
        Object.assign(eachData, {checkboxSelection: true});
      }
      if (ele === 'Miles_per_Gallon') {
        Object.assign(eachData, {valueFormatter: 'x + " miles"', chartDataType: 'series'}); // add miles unit in Miles_per_Gallon field
      }
      if (ele === 'Cylinders') {
        Object.assign(eachData, {editable: true}); // make Cylinders filed editable
      }
      this.columnDefs.push(eachData);
    });
    console.log('columnDefs => ', this.columnDefs);
    this.rowData = gridata;
  }

  createData(count, prefix) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        athlete: prefix + ' Athlete ' + i,
        age: prefix + ' Age ' + i,
        country: prefix + ' Country ' + i,
        year: prefix + ' Year ' + i,
        date: prefix + ' Date ' + i,
        sport: prefix + ' Sport ' + i,
        sport1: prefix + ' Sport ' + i
      });
    }
    return result;
  }

}
