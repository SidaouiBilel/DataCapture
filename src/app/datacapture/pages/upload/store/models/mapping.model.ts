export interface Mapping {
  mappingFields: MappingField[];
  mappedSources: any;
  mandatories: any;
  selectedMappingSheet: string;
  sheetsTypes: any;
}

export interface MappingField {
  created_on: Date;
  description: string;
  editable: boolean;
  id: string;
  label: string;
  mandatory: boolean;
  name: string;
  rules: any;
  type: string;
  value: string;
}
