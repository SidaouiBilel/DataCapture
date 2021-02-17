export interface MultiImport {
  domain_id: string,
  domain: any
  super_domain_id: string,
  sources: DataSource[]
}

export interface DataSource{
  type: string,
  sheet_id: string,
  headers: string[]
  file_id: string,
}

