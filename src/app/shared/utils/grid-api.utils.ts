import { formatDate, isInDateFormat, isInDoubleFormat, isInIntegerFormat } from './strings.utils';

export const INDEX_NAME = '$_NODE_INDEX';
export const INDEX_HEADER = {
  headerName: '',
  colId: INDEX_NAME,
  valueGetter: 'node.rowIndex + 1',
  width : 70,
  minWidth : 70,
  maxWidth : 150,
  suppressSizeToFit : false,
  suppressMenu : true,
  resizable : true,
  editable : false,
  pinned: 'left',
  floatingFilter: false,
  filter: false,
  cellClass : (params) => 'index-cell',
  onCellClicked: (params) => {
        params.api.clearRangeSelection();
  }
};

export const GAPIColumnsInRange = (api) => {
  const columns = [];
  const ranges = api.getCellRanges();
  for (const range of ranges) {
      columns.push(...range.columns.map( (c) => c.colDef.field ));
  }
  return columns;
};

export const GAPICellValue = (api, colId, rowIndex) => {
  const rowModel = api.rowModel;
  const rowNode = rowModel.getRow(rowIndex);
  return (rowNode) ? rowNode.data[colId] : null;
};

export const GAPSeletedRowRange = (api) => {
  const range = api.getCellRanges()[0];
  let from = 1;
  let to = 1;
  if (range) {
      const start = range.startRow.rowIndex + 1;
      const end =  range.endRow.rowIndex + 1;
      from  = Math.min(start, end);
      to    = Math.max(start, end);
  }
  return {from, to};
};


export const GAPIGridSelectionOverride = event => {
  const cellRanges = event.api.getCellRanges();
  if (!cellRanges || cellRanges.length === 0) { return; }
  let excludeColumn = false;
  const params = [];
  for (const range of cellRanges) {
    excludeColumn = excludeColumn || range.columns.find(el => el.getColId() === INDEX_NAME);
    params.push({
      rowStartIndex: range.startRow.rowIndex,
      rowStartPinned: range.startRow.rowPinned,
      rowEndIndex: range.endRow.rowIndex,
      rowEndPinned: range.endRow.rowPinned,
      columns: range.columns.map(el => el.getColId()).filter(el => el !== INDEX_NAME),
    });
  }
  if (!excludeColumn) { return; }
  event.api.clearRangeSelection();
  for (const rangeParams of params) {
    event.api.addCellRange(rangeParams);
  }
};

export function GAPIformatCell(params) {
  const value = params.value.toString();

  if (isInDoubleFormat(value)) {
    return parseFloat(value).toFixed(2);
  } else if (isInDateFormat(value)) {
    return formatDate(value)
  } else if (isInIntegerFormat(value)) {
    return value;
  } else {
    return value;
  }
}

export function GAPIFilters(filterModel) {
  const adaptedFilter = [];
  Object.keys(filterModel).forEach((column) => {
    const filter = filterModel[column];
    console.log(filter);
    const payload: any = {
        column,
        operator: filter.type,
        value : filter.filter
    };
    if (filter.filterType === 'set') {
        payload.value = filter.values;
        payload.operator = filter.filterType;
    }
    adaptedFilter.push(payload);
  });
  return adaptedFilter;
}

export function GAPIFilterComponenet(type) {
    switch (type) {
        case 'string':
            return 'agTextColumnFilter';
        case 'double':
        case 'int':
            return 'agNumberColumnFilter';
        case 'date':
            return 'agDateColumnFilter';
        case 'flow_tags':
            return 'agSetColumnFilter';
        default:
            return null;
    }
}

export function GAPIFormatterComponenet(type) {
    switch (type) {
        case 'string':
        case 'double':
          return currencyFormatter;
        case 'int':
        case 'date':
          return dateFormatter;
        case 'flow_tags':
        default:
            return null;
    }
}

export function currencyFormatter(params) {
  let parts;
  if (params.value) {
    if (params.value.toString().indexOf('E') >= 0) {
      parts = Number(params.value).toString().split('.');
    } else {
      parts = params.value.toString().split('.');
    }
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts[1]) { parts[1] = parts[1].substring(0, 2); }
    return parts.join('.');
  }
  return params.value;
}

export function dateFormatter(params) {
  if (params.value) {
    const parts: string[] = params.value.toString().split('-');
    const yyyy = parts[0];
    const mm = parts[1];
    const dd = parts[2];
    let validDate = true;
    if (parts.length !== 3 ) { validDate = false; }
    if (validDate) {
      return [mm, dd, yyyy].join('/');
    } else { return params.value.toString(); }
  }
  return params.value;
}
