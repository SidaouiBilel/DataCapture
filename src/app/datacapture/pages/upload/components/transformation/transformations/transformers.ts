import { FormatterComponent } from './transformation-interface/format/formatter/formatter.component';
import { MergerComponent } from './transformation-interface/format/merger/merger.component';
import { DeleteRowsComponent } from './transformation-interface/format/delete-rows/delete-rows.component';
import { DeleteColumnComponent } from './transformation-interface/format/delete-column/delete-column.component';
import { FilterComponent } from './transformation-interface/format/filter/filter.component';
import { DeleteRow, DeleteColumns, Replace, Merge, Filter, FilterAndReplace } from './transformers/transformer.model';

export const TRANSFORMATIONS = [
    new DeleteRow(),
    new DeleteColumns(),
    new Replace(),
    new Merge(),
    new Filter(),
    new FilterAndReplace()
  ]; 

export const TransformerFactory = (type) => {
  return TRANSFORMATIONS.find(t=> t.type == type)
} 