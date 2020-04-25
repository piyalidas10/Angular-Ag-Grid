import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-table-group',
  templateUrl: './table-group.component.html',
  styleUrls: ['./table-group.component.scss']
})
export class TableGroupComponent implements OnInit {
  lists = [];
  columnDefs = [];
  rowData = [];
  autoGroupColumnDef = {};
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;

  constructor(private apiService: ApiService) {
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
    datakeys.forEach((ele, index) => {
      let eachData = {};
      if (ele === 'Origin') {
        this.autoGroupColumnDef = {
          headerName: ele.toUpperCase(),
          field: ele,
          cellRenderer: 'agGroupCellRenderer',
          cellRendererParams: {
            checkbox: true
          }
        };
      } else {
        eachData = {
          headerName: ele.toUpperCase(),
          field: ele
        };
      }
      if (index === 0) {
        Object.assign(eachData, {rowGroup: true});
      }
      this.columnDefs.push(eachData);
    });
    console.log('columnDefs => ', this.columnDefs);
    this.rowData = gridata;
  }

}
