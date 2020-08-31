import { createSelector } from '@ngrx/store';
import { selectupload, UploadState } from '../upload.state';
import { SelectUploading } from '../upload.selectors';
import { Uploading } from '../models/uploading.model';

export const selectUploadOverview = createSelector(
  selectupload,
  (object: UploadState) => {
    return {
      fileName: object.import.selectedFile.token,
      fileExtension: object.import.selectedFile.extension,
      sheet: object.import.fileData.sheets[object.preview.selectedSheet],
      domain: object.import.selectedDomain.name,
      pipe: object.transformation.activePipe.name,
      mappingName: object.mapping.mappingName,
      domainId: object.import.selectedDomain.id,
      fileId: object.import.fileData.metaData.file_id,
      transformationId: object.transformation.transformedFilePath,
      cleansingId: object.cleansing.jobId,
      sheetId: object.import.fileData.metaData.worksheets_map[object.import.fileData.sheets[object.preview.selectedSheet]]
    };
  }
);

export const selectUploadingId = createSelector(
  SelectUploading,
  (object: Uploading) => object.uploadingId
);

export const selectUploadingResults = createSelector(
  SelectUploading,
  (object: Uploading) => object.result
)
