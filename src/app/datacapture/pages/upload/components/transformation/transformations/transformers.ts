import { FormatterComponent } from './transformation-interface/format/formatter/formatter.component';
import { MergerComponent } from './transformation-interface/format/merger/merger.component';
import { DeleteRowsComponent } from './transformation-interface/format/delete-rows/delete-rows.component';
import { DeleteColumnComponent } from './transformation-interface/format/delete-column/delete-column.component';
import { FilterComponent } from './transformation-interface/format/filter/filter.component';
import { DeleteRow, DeleteColumns, Replace, Merge, Filter, FilterAndReplace, DefaultValue, Splitter, Calculator } from './transformers/transformer.model';
import { FindAndReplaceComponent } from './transformation-interface/format/find-and-replace/find-and-replace.component';
import { DefaultValueComponent } from './transformation-interface/format/default-value/default-value.component';
import { SplitterComponent } from './transformation-interface/format/splitter/splitter.component';
import { CalculatorComponent } from './transformation-interface/format/calculator/calculator.component';

export const TRANSFORMATIONS = [
  new Filter().setComponent(FilterComponent),
  new FilterAndReplace().setComponent(FindAndReplaceComponent),
  new Merge().setComponent(MergerComponent),
  new Replace().setComponent(FormatterComponent),
  new DeleteColumns().setComponent(DeleteColumnComponent),
  new DeleteRow().setComponent(DeleteRowsComponent),
  new DefaultValue().setComponent(DefaultValueComponent),
  new Splitter().setComponent(SplitterComponent),
  new Calculator().setComponent(CalculatorComponent)
];

export const TransformerFactory = (type) => {
  return TRANSFORMATIONS.find(t => t.type === type);
}

