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

export const INDEX_NAME = '$_NODE_INDEX_$'

export const GAPISelectRowRange = (api, rowIndex) => {
    const columns = api.columnController.getAllGridColumns().map(c=>c.colId).filter(e=>e!=INDEX_NAME)
    console.log({columns})
    api.clearRangeSelection()
    api.rangeController.setCellRange({rowStartIndex:rowIndex, rowEndIndex: rowIndex, columns:columns})
}

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