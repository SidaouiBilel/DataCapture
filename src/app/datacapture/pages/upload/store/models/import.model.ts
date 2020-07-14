export interface Import {
  imported: boolean ;
  importing: boolean ;
  selectedFile: FileData ;
  selectedSheet: number;
  fileData: Sheet;
  progress: number;
  fileType: string;
  cedantName: string;
  currency: string;
  writtenEarned: string;
  programName: string;
  uwy: string;
  dataType: string;
  dataAOD: Date;
}

export interface SheetData {
  headers: any;
  data: any;
}

export interface Sheet {
  metaData: any;
  data: SheetData[];
  sheets: string[];
}
export interface FileData {
  token: string;
  sheets: string[];
  numberOfRows: string[];
  extension: string;
  data: any[];
  headers: any[];
  file: any;
}
