import { DeleteRowsComponent } from "../transformation-interface/format/delete-rows/delete-rows.component"
import { DeleteColumnComponent } from '../transformation-interface/format/delete-column/delete-column.component'
import { getPreviousHeader } from '../../shared/utils/transformers.util'
import { FormatterComponent } from '../transformation-interface/format/formatter/formatter.component'
import { MergerComponent } from '../transformation-interface/format/merger/merger.component'
import { FilterComponent } from '../transformation-interface/format/filter/filter.component'

export class Transformer{
    type
    label
    icon
    component
    icon_rotation = 0
    description = 'Description Template'

    getErrors = (params, previousNodes, headers): any=>{
        return []
    }

    getRule(){
        return {
            type: this.type
        }
    }

    getRuleFromGrid(params){
        return this.getRule()
    }
}

export class NodeError{
    field; reason;
    constructor(field, reason){
        this.field = field
        this.reason = reason
    }
}

export class DeleteRow extends Transformer{
    type = 'delete-rows';
    label = 'Delete Rows';
    icon = 'scissor';
    component = DeleteRowsComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (params.from == null || params.from == '' ) errors.push(new NodeError('from', 'Starting line missing'))
        if (params.to == null || params.to == '' ) errors.push(new NodeError('to', 'End line missing'))

        return errors
    };

    getRuleFromGrid(params){
        const range = params.api.getCellRanges()[0]
        const from  = range.startRow.rowIndex + 1
        const to    = range.endRow.rowIndex + 1

        return {
            ...this.getRule(),
            from,
            to
        }
    }
}

export class DeleteColumns extends Transformer{

    type = 'delete-column'; label= 'Delete Columns'; icon= 'scissor'; icon_rotation= 90; component= DeleteColumnComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (!params.columns || (params.columns && params.columns.length == 0 ) )
            errors.push(new NodeError('columns', 'Missing Column'))
        else {
            const previousHeaders: any[] = getPreviousHeader(headers, previousNodes)

            for ( let column of params.columns ){
                if ( previousHeaders.indexOf(column) < 0 ){
                    // errors.push(new NodeError('columns', `${column} does not exist`))
                }

            }
        }

        return errors
    };

    getRuleFromGrid(params){
        return {
            ...this.getRule(),
            columns: [params.column.colId]
        }
    }
}

export class Replace extends Transformer{

    type =  'replace'; label= 'Replace'; icon= 'font-size'; component= FormatterComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []

        if (params.column == null || params.column == '' ) errors.push(new NodeError('column', 'Column missing'))
        return errors
    };

    getRuleFromGrid(params){
        const column = params.column.colId
        const from = params.value
        return {
            ...this.getRule(),
            column,
            from
        }
    }
}

export class Merge extends Transformer{

    type =  'merge'; label= 'Merge'; icon= 'link'; component= MergerComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (!params.columns || (params.columns && params.columns.length == 0 ) )
            errors.push(new NodeError('columns', 'Missing Column'))

        if (params.destination == null || params.destination == '' ) errors.push(new NodeError('destination', 'Destination Missing'))

        return errors
    };

    getRuleFromGrid(params){
        const range = params.api.getCellRanges()[0]
        const columns  = range.columns.map( (c) => c.colId )

        return {
            ...this.getRule(),
            columns
        }
    }
}

export class Filter extends Transformer{

    type =  'filter'; label= 'Filter Lines'; icon= 'filter'; component= FilterComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        let i = 0
        for (let c of (params.conditions || [])){
            if (c.column == null || c.column == '' ) errors.push(new NodeError('column', `Column ${i+1} missing`))
            if (c.condition == null || c.condition == '' ) errors.push(new NodeError('condition', `Condition ${i+1} Missing`))   
            if (c.op == null || c.op == '' ) errors.push(new NodeError('op', `Operator ${i+1} missing`))
            i++
        }

        return errors
    };
}
