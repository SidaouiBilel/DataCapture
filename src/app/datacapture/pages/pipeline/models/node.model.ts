export type NodeCategory = 'DATASOURCE' | 'DATASINK' | 'MAPPING' | 'TRANSFORMATION' | 'VALIDATOR' 

export class PipelineNode{
    label;
    type;
    category: NodeCategory;
    id;
    constructor(){
        this.id = String(new Date().getTime())
        this.label = 'Random Label'
    }
}