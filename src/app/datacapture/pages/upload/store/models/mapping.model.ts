export interface Mapping {
  mappingFields: any;
  mappedSources: any;
  mandatories: any;
  selectedMappingSheet: string;
  sheetsTypes: any;
}

export interface MappingField {
  name: string;
  mandatory: boolean;
  value: string;
}
