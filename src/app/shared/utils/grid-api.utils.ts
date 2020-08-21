export const INDEX_NAME = '$_NODE_INDEX'
    export const INDEX_HEADER = {
        headerName: "#",
        colId: INDEX_NAME,
        valueGetter: "node.rowIndex + 1",
        width : 40,
        minWidth : 40,
        // maxWidth : 60,
        suppressSizeToFit : false,
    suppressMenu : true,
    resizable : false,
    editable : false,
    pinned: 'left',
    cellStyle : {'font-family': 'Roboto,Helvetica,Arial,sans-serif', color: '#363636', 'border-right': '1px solid #ccc'},
    cellClass : (params) => 'index-cell',
    onCellClicked: (params)=> {
        params.api.clearRangeSelection()
    }
}

export const GAPIColumnsInRange = (api) => {
    const columns = []
    const ranges = api.getCellRanges()
    for (let range of ranges){
        columns.push(...range.columns.map( (c) => c.colId ))
    }
    return columns
}

export const GAPICellValue = (api, colId, rowIndex) => {
    const rowModel = api.rowModel
    const rowNode = rowModel.getRow(rowIndex)
    return (rowNode)? rowNode.data[colId]: null
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