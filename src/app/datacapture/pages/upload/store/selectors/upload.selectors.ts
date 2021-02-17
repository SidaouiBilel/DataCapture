import { createSelector } from '@ngrx/store';
import { selectupload, UploadState } from '../upload.state';
import { SelectUploading } from '../upload.selectors';
import { Uploading } from '../models/uploading.model';

export const selectUploadOverview = createSelector(
  selectupload,
  (object: UploadState) => {
    const activeIndex = object.transformation.activeSourceIndex
    const activeTransformation = object.transformation.sourceTransformations[activeIndex]
    const activeSource = object.multiImport.sources[activeIndex]

    return {
      fileName: activeSource.label,
      fileExtension: "",
      sheet: '',
      domain: object.multiImport.domain.name,
      pipe: activeTransformation.activePipe ? activeTransformation.activePipe.name : null,
      mappingName: object.mapping.mappingName,
      mappingId: object.mapping.mappingVersion || object.mapping.mappingId,
      domainId: object.multiImport.domain._id,
      fileId: activeSource.file_id,
      transformationId: activeTransformation.transformedFilePath,
      cleansingId: object.cleansing.jobId,
      // tslint:disable-next-line: max-line-length
      sheetId: object.preview.generatedSheetId
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
);

export const selectUploadingStatus = createSelector(
  SelectUploading,
  (object: Uploading) => object.status
);
