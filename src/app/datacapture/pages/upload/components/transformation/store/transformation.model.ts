export interface Transformation{
    // PRE MAPPING TRANSFORMERS
    nodes: any[];
    editedPipeInfo: any;
    validation_states: boolean[];
    expanded: boolean;
    activePipe: any;
    previwMode: 'SOURCE' | 'TARGET';
    transformedFilePath: string;
    // ADD SIMILAR FIELDS FOR POST MAPPING TRANSFORMERS
}
