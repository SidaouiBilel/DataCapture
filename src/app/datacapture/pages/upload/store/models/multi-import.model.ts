export interface MultiImport {
  domain_id: String,
  domain: any
  super_domain_id: String,
  sources: DataSource[]
}

export interface DataSource{
  type: String,
  sheet_id: String,
  headers: String[]
  file_id: String,
}

