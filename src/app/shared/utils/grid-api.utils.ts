import { formatDate, isInDateFormat, isInDoubleFormat, isInIntegerFormat } from './strings.utils'

export const INDEX_NAME = '$_NODE_INDEX'
    export const INDEX_HEADER = {
        headerName: "",
        colId: INDEX_NAME,
        valueGetter: "node.rowIndex + 1",
        width : 50,
        minWidth : 0,
        maxWidth : 100,
        suppressSizeToFit : false,
    suppressMenu : true,
    resizable : false,
    editable : false,
    pinned: 'left',
    cellClass : (params) => 'index-cell',
    onCellClicked: (params)=> {
        params.api.clearRangeSelection()
    }
}

export const GAPIColumnsInRange = (api) => {
    const columns = []
    const ranges = api.getCellRanges()
    for (let range of ranges){
        columns.push(...range.columns.map( (c) => c.colDef.field ))
    }
    return columns
}

export const GAPICellValue = (api, colId, rowIndex) => {
    const rowModel = api.rowModel
    const rowNode = rowModel.getRow(rowIndex)
    return (rowNode)? rowNode.data[colId]: null
}

export const GAPSeletedRowRange = (api) => {
    const range = api.getCellRanges()[0]
    let from = 1
    let to = 1
    if(range){
        const start = range.startRow.rowIndex + 1
        const end =  range.endRow.rowIndex + 1
        from  = Math.min(start, end)
        to    = Math.max(start, end)
    }
    return {from, to}
}


export const GAPIGridSelectionOverride = event => {
var cellRanges = event.api.getCellRanges();
if (!cellRanges || cellRanges.length === 0) return;
var excludeColumn = false
const params = []
for(let range of cellRanges){
    excludeColumn = excludeColumn || range.columns.find(
        el => el.getColId() === INDEX_NAME
        );
        params.push({
            rowStartIndex: range.startRow.rowIndex,
            rowStartPinned: range.startRow.rowPinned,
            rowEndIndex: range.endRow.rowIndex,
            rowEndPinned: range.endRow.rowPinned,
            columns: range.columns
            .map(el => el.getColId())
            .filter(el => el !== INDEX_NAME),
        })
    }
    if (!excludeColumn) return;
    event.api.clearRangeSelection();
    for(let rangeParams of params)
    event.api.addCellRange(rangeParams);
}

export function GAPIformatCell(params){
    const value = params.value.toString()

    if(isInDoubleFormat(value)){
      return parseFloat(value).toFixed(2);
    }
    else if(isInDateFormat(value)){
      return formatDate(value)
    }else if(isInIntegerFormat(value)){
      return value
    }else{
      return value
    }
  }