export interface Transformation{
    // PRE MAPPING TRANSFORMERS
    nodes: any[];
    editedPipeInfo: any;
    validation_states: any[];
    expanded: boolean;
    activePipe: any;
    previwMode: 'SOURCE' | 'TARGET';
    transformedFilePath: string;

    tarnsformationHeaders: string[],
    userfiles?:userfiles
    // ADD SIMILAR FIELDS FOR POST MAPPING TRANSFORMERS
}
interface userfiles{
    data:[],
    loaded:boolean
}
