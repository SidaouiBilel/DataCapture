export interface Dataset{
    file_name: string
    file_id: string
    sheet_id: string
    id: string,
    type: string
}
export interface Operation{
    // used to get calculation tree
    dataset_ids: string[]
}
