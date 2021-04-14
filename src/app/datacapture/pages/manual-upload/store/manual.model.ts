interface Dataset{
    file_id: string
    sheet_id: string
    id: string,
    type: string
}
interface Operation{
    // used to get calculation tree 
    dataset_ids: string[]
}