export class RefernceType{
    id
    label
    domain_ids = []
    created_on
    modified_on

    properties :RefernceTypeProperty[] = []

    constructor(domain_id){
        this.domain_ids = [domain_id]
    }
}

export class RefernceTypeProperty{
    label
    code
    type
}