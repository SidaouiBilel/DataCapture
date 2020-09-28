export class RefernceType{
    id
    label
    collection_ids = []
    created_on
    modified_on

    properties :RefernceTypeProperty[] = []

    constructor(domain_id){
        this.collection_ids = []
    }
}

export class RefernceTypeProperty{
    label
    code
    type
}