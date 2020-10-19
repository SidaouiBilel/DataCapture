import { PostConstruct } from 'ag-grid-community'
import { first } from 'rxjs/operators'

export class DataCheck{
    id: string
    label:string
    description: string
    updateUIModel(APIcheck, UIModel){}
    toAPIModel(UIcheck){}
    initModel(model:any){
        model[this.id]={}
    }
}

export class TypeCheck extends DataCheck{
    id='TYPE_CHECK'
    label='Type Check'
}

export class EmptyCheck extends DataCheck { 
    id='EMPTY_CHECK'
    label= 'Empty Check'

    initModel(model:any){
        model[this.id]=false
    }
    updateUIModel(APIcheck, model){
        model[this.id] = true
    }

    toAPIModel(UIModel){
        const model = UIModel[this.id]
        if (model)
            return [{type:this.id}]
        else
            return []
    }
}
export class NumericCheck extends DataCheck { 
    id='NUMERIC_BOUNDRY_CHECK'
    label= 'Numeric Limits'
    operators = [">", ">=", "<", "<="]

    initModel(model:any){
        model[this.id]={iterations:[{}]}
    }

    updateUIModel(params, model){
        const firstIter:any = model[this.id].iterations[0]
        let iter = {operator:params.operator ,operand: params.operand}
        console.log(firstIter)
        if (firstIter.operator || firstIter.operand){
            model[this.id].iterations.push(iter)
        }else{
            model[this.id].iterations[0] = iter
        }
    }

    toAPIModel(UIModel){
        const model = UIModel[this.id]

        return  model.iterations
        .filter(e=> e.operator && e.operand)
        .map(e=>({
            type:this.id,
            ...e
        }))
    }
}
export class DateCheck extends DataCheck { 
    id='DATE_BOUNDRY_CHECK'
    label= 'Date Limits'
    operators = [">", "<"]
    initModel(model:any){
        model[this.id]={iterations:[{}]}
    }

    updateUIModel(params, model){
        const firstIter:any = model[this.id].iterations[0]
        let iter = {operator:params.operator ,operand: params.operand}
        console.log(firstIter)
        if (firstIter.operator || firstIter.operand){
            model[this.id].iterations.push(iter)
        }else{
            model[this.id].iterations[0] = iter
        }
    }

    toAPIModel(UIModel){
        const model = UIModel[this.id]

        return  model.iterations
        .filter(e=> e.operator && e.operand)
        .map(e=>({
            type:this.id,
            ...e
        }))
    }
}
export class PropertyCheck extends DataCheck { 
    id='PROPERTY_BOUNDRY_CHECK'
    label= 'Field Comparison'
    operators = [">", ">=", "<", "<="]
    initModel(model:any){
        model[this.id]={iterations:[{}]}
    }
    updateUIModel(params, model){
        const firstIter:any = model[this.id].iterations[0]
        let iter = {operator:params.operator ,property: params.property}
        console.log(firstIter)
        if (firstIter.operator || firstIter.property){
            model[this.id].iterations.push(iter)
        }else{
            model[this.id].iterations[0] = iter
        }
    }

    toAPIModel(UIModel){
        const model = UIModel[this.id]

        return  model.iterations
        .filter(e=> e.operator && e.property)
        .map(e=>({
            type:this.id,
            ...e
        }))
    }
}
export class FormatCheck extends DataCheck { 
    id='FORMAT_CHECK'
    label= 'Format Check'
    expressions = [
        {label:'Year', value:"^(19|20)\d{2}$"},
        {label:'E-mail', value:"^[_]*([a-z0-9]+(\.|_*)?)+@([a-z][a-z0-9-]+(\.|-*\.))+[a-z]{2,6}$"},
        {label:'Proper Name', value:"^[\w.']{2,}(\s[\w.']{2,})+$"},
    ]

    initModel(model:any){
        model[this.id]={
            regex: null,
            custom: false,
        }
    }

    updateUIModel(params, model){
        model[this.id] = {
            regex: params.regex,
            custom: params.custom
        }
    }

    toAPIModel(UIModel){
        const model = UIModel[this.id]
        if(model.regex){
            return  [{type:this.id,...model}]
        } else {
            return []
        }
    }
}
export class ReferenceCheck extends DataCheck { 
    id='REFERENCE_CHECK'
    label= 'Reference Check'

    initModel(model:any){
        model[this.id]={
            ref_type: null
        }
    }

    updateUIModel(params, model){
        const conditions = params.conditions || {}
        model[this.id] = {
            ref_type: conditions.ref_type
        }
    }

    toAPIModel(UIModel){
        const model = UIModel[this.id]
        if(model.ref_type){
            return  [{type:this.id,field_name: 'code',conditions:{...model}}]
        } else return []
    }
}

export const TYPE_CHECK = new TypeCheck()
export const EMPTY_CHECK = new EmptyCheck()
export const NUMERIC_BOUNDRY_CHECK = new NumericCheck()
export const DATE_BOUNDRY_CHECK = new DateCheck()
export const PROPERTY_BOUNDRY_CHECK = new PropertyCheck()
export const FORMAT_CHECK = new FormatCheck()
export const REFERENCE_CHECK = new ReferenceCheck()


export const DEFAULT_CHECKS = [EMPTY_CHECK]

export const INT_DEAFULT_CHECKS = [NUMERIC_BOUNDRY_CHECK, PROPERTY_BOUNDRY_CHECK]
export const DOUBLE_DEAFULT_CHECKS = [NUMERIC_BOUNDRY_CHECK, PROPERTY_BOUNDRY_CHECK]
export const STRING_DEAFULT_CHECKS = [FORMAT_CHECK, REFERENCE_CHECK]
export const DATE_DEAFULT_CHECKS = [DATE_BOUNDRY_CHECK]

export const ALL_CHECKS = [TYPE_CHECK, EMPTY_CHECK, NUMERIC_BOUNDRY_CHECK, DATE_BOUNDRY_CHECK, PROPERTY_BOUNDRY_CHECK, FORMAT_CHECK, REFERENCE_CHECK]

export class DataCheckFactory{

    public static toAPIChecksModel(UIModel){
        let APIChecks = []
        for (let check_id of Object.keys(UIModel)){
            const check = DataCheckFactory.getCheckById(check_id)
            APIChecks = APIChecks.concat(check.toAPIModel(UIModel))
        }
        return APIChecks
    }

    public static initUIModel(type){
        const UIModel = {}
        const checks = DataCheckFactory.getChecksByType(type)

        for (let check of checks){
            check.initModel(UIModel)
        }

        return UIModel
    }

    public static toUIChecksModel(field){
        const UIModel = DataCheckFactory.initUIModel(field.type)

        for (let checkParams of field.rules || []){
            const check_id = checkParams.type 
            const check = DataCheckFactory.getCheckById(check_id)

            if(check){
                check.updateUIModel(checkParams, UIModel)
            }
        }
        return UIModel
    }

    public static getCheckById(id){
        return ALL_CHECKS.find(c=>c.id==id)
    }

    public static getChecksByType(type){
        let type_checks = []
        switch(type){
        case 'int':
            type_checks = INT_DEAFULT_CHECKS; break;
        case 'double':
            type_checks = DOUBLE_DEAFULT_CHECKS; break;
        case 'string':
            type_checks = STRING_DEAFULT_CHECKS; break;
        case 'date':
            type_checks = DATE_DEAFULT_CHECKS; break;
    }

        return DEFAULT_CHECKS.concat(type_checks)
    }
}


const API_CHECK = [
    {
        "id": "DATE_BOUNDRY_CHECK",
        "name": "Date Boundry Value Check",
        "description": null,
        "category": null,
        "parameters": [
            {
                "name": "operator",
                "type": "select",
                "options": [
                    {
                        "key": "<",
                        "value": "<"
                    },
                    {
                        "key": ">",
                        "value": ">"
                    }
                ],
                "property_types": null,
                "label": "Operator"
            },
            {
                "name": "operand",
                "type": "date",
                "options": null,
                "property_types": null,
                "label": "Date"
            }
        ],
        "property_types": [
            "date"
        ]
    },
    {
        "id": "NUMERIC_BOUNDRY_CHECK",
        "name": "Numeric Boundry Value Check",
        "description": null,
        "category": null,
        "parameters": [
            {
                "name": "operator",
                "type": "select",
                "options": [
                    {
                        "key": "<",
                        "value": "<"
                    },
                    {
                        "key": "<=",
                        "value": "<="
                    },
                    {
                        "key": ">",
                        "value": ">"
                    },
                    {
                        "key": ">=",
                        "value": ">="
                    }
                ],
                "property_types": null,
                "label": "Operator"
            },
            {
                "name": "operand",
                "type": "number",
                "options": null,
                "property_types": null,
                "label": "Value"
            }
        ],
        "property_types": [
            "double",
            "int"
        ]
    },
    {
        "id": "PROPERTY_BOUNDRY_CHECK",
        "name": "Property Boundry Value Check",
        "description": null,
        "category": null,
        "parameters": [
            {
                "name": "operator",
                "type": "select",
                "options": [
                    {
                        "key": "<",
                        "value": "<"
                    },
                    {
                        "key": "<=",
                        "value": "<="
                    },
                    {
                        "key": ">",
                        "value": ">"
                    },
                    {
                        "key": ">=",
                        "value": ">="
                    }
                ],
                "property_types": null,
                "label": "Operator"
            },
            {
                "name": "property",
                "type": "property",
                "options": null,
                "property_types": [
                    "double",
                    "int"
                ],
                "label": "Target Field"
            }
        ],
        "property_types": [
            "double",
            "int"
        ]
    },
    {
        "id": "EMPTY_CHECK",
        "name": "Empty Cell Check",
        "description": null,
        "category": null,
        "parameters": [],
        "property_types": null
    },
    {
        "id": "FORMAT_CHECK",
        "name": "Format Check",
        "description": "Check cell respects selected format",
        "category": null,
        "parameters": [
            {
                "name": "regex",
                "type": "select",
                "options": [
                    {
                        "key": "exp1",
                        "value": "n,nnn.nn"
                    },
                    {
                        "key": "exp2",
                        "value": "mm-dd-yyyy"
                    },
                    {
                        "key": "exp3",
                        "value": "(String)-(String)"
                    }
                ],
                "property_types": null,
                "label": "Format"
            },
            {
                "name": "custom",
                "type": "checkbox",
                "options": null,
                "property_types": null,
                "label": "Custom Regex"
            }
        ],
        "property_types": null
    },
    {
        "id": "REFERENCE_CHECK",
        "name": "Reference Value Check",
        "description": null,
        "category": null,
        "parameters": [],
        "property_types": null
    }
]
