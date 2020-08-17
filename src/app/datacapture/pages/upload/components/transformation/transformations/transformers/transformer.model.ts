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

    getErrors = (params, previousNodes, headers): any=>{
        return []
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
}

export class Replace extends Transformer{

    type =  'replace'; label= 'Replace'; icon= 'font-size'; component= FormatterComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
      
        if (params.column == null || params.column == '' ) errors.push(new NodeError('column', 'Column missing'))
        return errors
    };
}

export class Merge extends Transformer{

    type =  'merge'; label= 'Merge'; icon= 'link'; component= MergerComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (!params.columns || (params.columns && params.columns.length == 0 ) ) 
            errors.push(new NodeError('columns', 'Missing Column'))

        if (params.from == null || params.from == '' ) errors.push(new NodeError('destination', 'Destination Missing'))

        return errors
    };
}

export class Filter extends Transformer{

    type =  'filter'; label= 'Filter'; icon= 'filter'; component= FilterComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (params.column == null || params.column == '' ) errors.push(new NodeError('column', 'Column missing'))
        if (params.condition == null || params.condition == '' ) errors.push(new NodeError('condition', 'Condition Missing'))

        if (params.op == null || params.op == '' ) errors.push(new NodeError('op', 'Operator missing'))

        return errors
    };
}