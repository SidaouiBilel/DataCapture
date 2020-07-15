import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Module, AllCommunityModules } from '@ag-grid-community/all-modules';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { GridOptions } from 'ag-grid-community';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataGridComponent {

  @Input() loading = false;
  @Input() headers = [];
  @Input() rowData = [];
  @Input() totalRecords = 0;
  @Input() numberOfRecords = 0;
  @Input() nrows = 0;
  @Input() selectedSheet = 1;


  @Output() newData = new EventEmitter<any>();
  @Output() newNrows = new EventEmitter<any>();
  @Output() lazyload = new EventEmitter<any>();
  // mei3
  @Output() sizePageChanged = new EventEmitter<any>();
  @Output() goToLastPage = new EventEmitter<any>();

  rowClickedValue = '';
  public gridApi;
  public gridColumnApi;
  public rowsData;
  public dataLoaded;
  public columnDefs;
  public defaultColDef;
  public lastRowLoaded = 0;
  public currentPage = 1;
  public newRows;
  public oldRow;
  public fileMetaData;
  public fileData;
  public fileImported;
  public gridOptions: GridOptions;
  public isFirstLoaded = true;
  public rowBuffer;
  public rowSelection;
  public components;
  public oldRowIndex;
  public newRowIndex;
  public indicesRow = [];
  public newValueTemp;
  public indexRowTemp;
  public contentsTemp = {};
  public indexRowToSave = [];
  public contents = [];
  public newRowsData;
  public rowIdFocused;
  public colIdFocused;
  public colFocused;
  public colRangeFocused;
  public loadingCellRenderer;
  public loadingCellRendererParams;
  public modules: Module[] = AllCommunityModules;
  public data$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public headerLoaded;
  public paginationPageSize;
  public sideBar: false;

  constructor(private importService: FileImportService, private store$: Store<AppState>) {
    this.gridOptions = {} as GridOptions;
    this.defaultColDef = {
        resizable: true,
        sortable: true,
        editable: true,
        scrollable: true,
        paginator: true,
        filter: 'agTextColumnFilter',
        cellStyle: {'border-left': '1px solid #cdcdce'},
    };
    this.loadingCellRenderer = 'customLoadingCellRenderer';
    this.loadingCellRendererParams = { loadingMessage: 'One moment please...'};
    this.paginationPageSize = 50;
    // // mei2 solution v1
    // importContainer.headers$.subscribe((header) => {
    //   // console.log('= header =');
    //   // console.log(header)
    //   this.headerLoaded = header;
    //   this.getLoadedData();
    //   });
    // importContainer.data$.subscribe((data) => {
    //   // console.log('= data =');
    //   // console.log(data)
    // this.dataLoaded = data;
    // this.getLoadedData();
    // });
    // importContainer.fileMetaData$.subscribe((data) => {
    //   this.fileMetaData = data;
    //   this.getLoadedData();

    // });
    // importContainer.importData$.subscribe((data) => {
    //   // console.log('= imported data =')
    //   // console.log(data)
    //   this.fileImported = data;
    //   this.fileData = data.fileData;
    //   this.selectedSheet = data.selectedSheet;
    //   this.getLoadedData();
    // });
  }

  public getLoadedData() {
    if (this.headerLoaded && this.dataLoaded) {
      this.createColumnDefs(this.headerLoaded);
      this.createRowData(this.dataLoaded, this.headerLoaded);
    }
  }

  private createColumnDefs(headers) {
    const headersModel: any[] = [];
    for (let i = 0; i < headers.length; i++){
      headersModel.push({
        headerName: headers[i],
        field: createFieldCode(headers[i])
      });
    }
    this.columnDefs = headersModel;
  }

  private createRowData(rowData, headers) {
    const rowDataModel: any[] = [];
    for (let i = 0; i < rowData.length; i++) {
      const obj: any = {};
      for (let j = 0; j < headers.length; j++) {
        obj[createFieldCode(headers[j])] = rowData[i][j];
      }
      rowDataModel.push(obj);
    }
    this.rowsData = rowDataModel;
  }

  // mei2
  // i############################## Update cell ##############################
  onCellValueChanged($event) {
    console.log('= onCellValueChanged =');
    const newValue = $event.newValue;
    const oldValue = $event.oldValue;
    const rowIndex = $event.rowIndex;
    const colId = $event.column.colId;
    const newRowData = $event.data;
    if (oldValue === newValue) {
      // console.log('-- No change --');
    } else if (newValue === '') {
      // console.log('-- change to empty value not allowed --');
    } else {
      this.newValueTemp = newValue;
      this.indexRowTemp = rowIndex;
      this.contentsTemp[colId] = newValue;
      this.newRowsData = $event.api.gridOptionsWrapper.gridOptions.rowData;
    }
  }

  onCellFocused($event) {
    if ($event.column && ($event.rowIndex || $event.rowIndex === 0)) {
      const rowIndex = $event.rowIndex;
      this.newRowIndex = rowIndex;
      if (this.oldRowIndex === this.newRowIndex) {
        if (this.contentsTemp && this.indexRowTemp) {
          this.indexRowToSave.push(this.indexRowTemp);
          this.contents.push(this.contentsTemp);
          this.contentsTemp = {};
          this.indexRowTemp = null;
        }
        this.indexRowTemp = null;
        this.contentsTemp = {};
      } else {
        this.oldRowIndex = rowIndex;
        if (this.indexRowToSave.length > 0 && this.contents.length > 0) {
          const bodyRequest = {
            allNum: this.indexRowToSave,
            newValues: this.contents
          };
          this.rowIdFocused = rowIndex;
          this.colIdFocused = $event.column.getColId();
          if (this.gridOptions.api) {
            const cell = this.gridOptions.api.getFocusedCell();
            const allDisplayedCol = this.gridOptions.columnApi.getAllDisplayedColumns();
            // console.log('*+ focused +*')
            if (cell && allDisplayedCol) {
              this.colFocused = this.getColumnToShow(this.colIdFocused, allDisplayedCol);
              this.colRangeFocused = this.getRangeColumnToShow(this.colIdFocused, allDisplayedCol);
            }
          }
          this.saveUpdatedRow(bodyRequest);
          this.indexRowToSave = [];
          this.contents = [];
        } else {
          // init all
          this.indexRowToSave = [];
          this.contents = [];
        }
      }
    }
  }

  getColumnToShow(fieldCode, colList) {
    if (colList) {
      for (let i = 0; i < colList.length; i++) {
        if (fieldCode === colList[i].colId || fieldCode === this.getExactColId(colList[i].colId)) {
          return colList[i];
        }
      }
    }
    return null;
  }

  getRangeColumnToShow(fieldCode, colList) {
    if (colList) {
      for (let i = 0; i < colList.length; i++) {
        if (fieldCode === colList[i].colId || fieldCode === this.getExactColId(colList[i].colId)) {
          return i;
        }
      }
    }
    return null;
  }

  private saveUpdatedRow(bodyRequest) {
    const newLines = [];
    const newNums = [];
    const fileInfo = {
      filename: this.fileMetaData.filename,
      sheet: this.fileMetaData.worksheet[this.selectedSheet],
      page: this.currentPage,
      worksheet_id: this.fileMetaData.filename + '_' + this.fileMetaData.worksheet[this.selectedSheet],
      nrows: this.fileMetaData.nrows,
    };
    const indexRowModified = bodyRequest.allNum[0];
    const oldRow = this.dataLoaded[bodyRequest.allNum[0]];
    const newRow = this.transformObjToArray(this.newRowsData[indexRowModified]);
    const newData = this.getNewData(this.newRowsData);
    newLines.push(newRow);
    newNums.push(indexRowModified);
    bodyRequest.lines = newLines;
    bodyRequest.num = newNums;
    this.importService
    .updateRow(fileInfo.filename, fileInfo.sheet, fileInfo.worksheet_id, fileInfo.nrows, fileInfo.page, bodyRequest.num, bodyRequest.lines)
    .subscribe((data) => {
      // update the store ok
      // this.store$.dispatch(new ActionGetDataImported({ data: newData }));
      this.rowsData = this.newRowsData;
      if (this.gridOptions.api) {
        this.gridOptions.api.setRowData(this.rowsData);
      }
      this.refreshAfterUpdate();
      this.bringFocusBack();
    });
  }

  public getExactColId(colId) {
    const colId1 = colId.split('_1').slice(0, -1).join('_1');
    if (colId1) {
      colId = colId1;
    }
    return colId;
  }

  refreshAfterUpdate() {
    const params = { force: false };
    if (this.gridApi && this.rowsData) {
      this.gridApi.refreshCells(params);
    }
    this.bringFocusBack();
  }

  public getInverseColId(colId) {
    const colId1 = colId.split('_1').slice(0, -1).join('_1');
    if (colId1) {
      return colId1;
    }
    return colId + '_1';
  }

  private bringFocusBack() {
    if (this.gridApi && this.rowIdFocused && this.colIdFocused) {
      const inverseColId = this.getInverseColId(this.colIdFocused);
      this.gridApi.setFocusedCell(this.rowIdFocused, inverseColId, null);
      this.gridApi.setFocusedCell(this.rowIdFocused, this.colIdFocused, null);
    }
  }

  transformObjToArray(obj) {
    const arr = [];
    for (const [key0, value0] of Object.entries(obj)) {
      arr.push(value0);
    }
    return arr;
  }

  getNewData(rowData) {
    const newData = [];
    for (let i = 0; i < rowData.length; i++) {
      newData.push(this.transformObjToArray(rowData[i]));
    }
    return newData;
  }

  localUpdateData(indexRowModified, newRow, dataLoaded) {
    const dataTemp = dataLoaded[indexRowModified];
    for (const [key0, value0] of Object.entries(dataTemp)) {
      if (dataTemp[key0] !== newRow[key0]) {
        dataLoaded[indexRowModified][key0] = newRow[key0];
      }
    }
    return dataLoaded;
  }

  onCellClicked($event) {
    const colId = $event.column.colId;
    const data = $event.data;
    let clickedCellValue;
    if (data && colId) {
      for (const [key, value] of Object.entries(data)) {
        if (key === colId) {
          clickedCellValue = value;
        }
      }
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // f############################## Update cell ##############################

  onValueChanged(change) {
    this.newData.emit(change);
  }

  // mei3
  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    console.log('here');
    // this.gridApi.paginationGoToLastPage();
    const lastPage = Math.trunc((this.totalRecords / this.gridApi.paginationGetPageSize()) + 1);
    const lastPageChanged = {
      lastPage,
      newNrows: this.gridApi.paginationGetPageSize(),
      selectedSheet: this.selectedSheet,
      totalRows: this.gridApi.paginationGetPageSize()
    };
    if ( this.gridApi.paginationGetTotalPages() < lastPage) {
      this.goToLastPage.emit(lastPageChanged);
    } else {
      this.gridApi.paginationGoToLastPage();
    }
  }

  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  onBtPageThree() {
    this.gridApi.paginationGoToPage(2);
  }

  onPageSizeChanged(newPageSize) {
    const value = (document.getElementById('pageSize') as HTMLInputElement).value;
    this.gridApi.paginationSetPageSize(Number(value));
    this.sizePageChanged.emit(Number(value));
  }

  loadDataOnScroll(event: any) {
    this.lazyload.emit(event);
  }

}

function createFieldCode(str) {
  return str.replace(/\s/g, '');
}

