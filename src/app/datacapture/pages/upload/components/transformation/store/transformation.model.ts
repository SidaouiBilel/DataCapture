export interface Transformation{
    // PRE MAPPING TRANSFORMERS
    nodes:any[]
    validation_states:boolean[]
    expanded:boolean
    loaded_transformation: any
    previwMode: 'SOURCE' | 'TARGET'

    // ADD SIMILAR FIELDS FOR POST MAPPING TRANSFORMERS
}