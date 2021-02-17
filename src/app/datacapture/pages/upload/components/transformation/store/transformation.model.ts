export interface Transform{
    sourceTransformations: SourceTransformation[]
    activeSourceIndex: any,
    previwMode: 'SOURCE' | 'TARGET',
    expanded: boolean;
}

export interface SourceTransformation{
    // PRE MAPPING TRANSFORMERS
    nodes: any[];
    editedPipeInfo: any;
    validation_states: any[];
    activePipe: any;
    transformedFilePath: string;
    loadingTransformation: boolean;
    tarnsformationHeaders: string[]
    // ADD SIMILAR FIELDS FOR POST MAPPING TRANSFORMERS
}
