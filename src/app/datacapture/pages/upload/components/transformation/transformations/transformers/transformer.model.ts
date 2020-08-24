import { DeleteRowsComponent } from "../transformation-interface/format/delete-rows/delete-rows.component"
import { DeleteColumnComponent } from '../transformation-interface/format/delete-column/delete-column.component'
import { getPreviousHeader } from '../../shared/utils/transformers.util'
import { FormatterComponent } from '../transformation-interface/format/formatter/formatter.component'
import { MergerComponent } from '../transformation-interface/format/merger/merger.component'
import { FilterComponent } from '../transformation-interface/format/filter/filter.component'
import { Column } from '@app/datacapture/pages/admin/models/column'
import { isStrEmpty } from '@app/shared/utils/strings.utils'
import { GAPIColumnsInRange, GAPICellValue } from '@app/shared/utils/grid-api.utils'
import { isArrayEmpty } from '@app/shared/utils/arrays.utils'

export class Transformer{
    type
    label
    icon
    component
    icon_rotation = 0
    description = 'Description Template'
    shortcut = null

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
    shortcut = 'control.d'

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (params.from == null || params.from == '' ) errors.push(new NodeError('from', 'Starting line missing'))
        if (params.to == null || params.to == '' ) errors.push(new NodeError('to', 'End line missing'))

        return errors
    };

    getRuleFromGrid(params){
        const range = params.api.getCellRanges()[0]
        let from = 1
        let to = 1
        if(range){
            const start = range.startRow.rowIndex + 1
            const end =  range.endRow.rowIndex + 1
            from  = Math.min(start, end)
            to    = Math.max(start, end)
        }

        return {
            ...this.getRule(),
            from,
            to
        }
    }
}

export class DeleteColumns extends Transformer{

    type = 'delete-column'; label= 'Delete Columns'; icon= 'scissor'; icon_rotation= 90; component= DeleteColumnComponent;shortcut = 'control.alt.d'

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (!params.columns || (params.columns && params.columns.length == 0 ) )
            errors.push(new NodeError('columns', 'Missing Column'))
        else {
            const previousHeaders: any[] = getPreviousHeader(headers, previousNodes)

            for ( let column of params.columns ){
                if ( previousHeaders.indexOf(column) < 0 ){
                    errors.push(new NodeError('columns', `${column} does not exist`))
                }

            }
        }

        return errors
    };

    getRuleFromGrid(params){
        const columns = GAPIColumnsInRange(params.api)
        return {
            ...this.getRule(),
            columns: columns
        }
    }
}

export class Replace extends Transformer{

    shortcut = 'control.r'

    type =  'replace'; label= 'Replace'; icon= 'font-size'; component= FormatterComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []

        if (isStrEmpty(params.column)) errors.push(new NodeError('column', 'Column missing'))
        else{
            const previousHeaders: any[] = getPreviousHeader(headers, previousNodes)
            if ( previousHeaders.indexOf(params.column) < 0 ){
                errors.push(new NodeError('column', `${params.column} does not exist`))
            }
        }
        if(params.to == params.from){
            errors.push(new NodeError('from', 'From and To should be different'))
            errors.push(new NodeError('to', ''))
        }

        return errors
    };

    
    getRuleFromGrid(params){
        let column = null
        let from = null

        const range = params.api.getCellRanges()[0]
        
        if (range) {
            column = range.startColumn.colDef.field
            let cellValues = new Set()
            const start = Math.min(range.startRow.rowIndex, range.endRow.rowIndex)
            const end = Math.max(range.startRow.rowIndex, range.endRow.rowIndex)
            for (let index = start; index <= end; index++) 
                cellValues.add(GAPICellValue(params.api, column, index))
            
            from = Array.from(cellValues).join('|') 
        }

        return {
            ...this.getRule(),
            column,
            from
        }
    }
}

export class Merge extends Transformer{

    shortcut = 'control.m'
    type =  'merge'; label= 'Merge'; icon= 'link'; component= MergerComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        if (isArrayEmpty(params.columns))
            errors.push(new NodeError('columns', 'Missing Column'))
        else{
            const previousHeaders: any[] = getPreviousHeader(headers, previousNodes)

            for ( let column of params.columns ){
                if ( previousHeaders.indexOf(column) < 0 ){
                    errors.push(new NodeError('column ', `${column} does not exist`))
                }

            }
        }

        if (isStrEmpty(params.destination)) errors.push(new NodeError('destination', 'Destination Missing'))

        return errors
    };

    getRuleFromGrid(params){
        const columns = GAPIColumnsInRange(params.api)
        const separator = '-'
        const destination = columns.join(separator)
        return {
            ...this.getRule(),
            columns,
            destination,
            separator
        }
    }
}

export class Filter extends Transformer{

    shortcut = 'control.f'
    type =  'filter'; 
    label= 'Filter Lines'; 
    icon= 'filter'; 
    component= FilterComponent;

    getErrors = (params, previousNodes, headers)=>{
        const errors = []
        let i = 0
        for (let c of (params.conditions || [])){
            if  (isStrEmpty(c.column)) errors.push(new NodeError('column', `Column ${i+1} missing`))
            if  (isStrEmpty(c.condition)) errors.push(new NodeError('condition', `Condition ${i+1} Missing`))   
            if  (isStrEmpty(c.op)) errors.push(new NodeError('op', `Operator ${i+1} missing`))
            i++
        }

        return errors
    };

    getRuleFromGrid(params){
        const columns = GAPIColumnsInRange(params.api)
        return {
            ...this.getRule(),
            conditions: columns.map((c=> ({column: c})))
        }
    }
}
