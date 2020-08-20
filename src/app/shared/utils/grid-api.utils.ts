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