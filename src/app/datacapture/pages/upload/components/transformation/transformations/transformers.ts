import { FormatterComponent } from './transformation-interface/format/formatter/formatter.component';
import { MergerComponent } from './transformation-interface/format/merger/merger.component';
import { DeleteRowsComponent } from './transformation-interface/format/delete-rows/delete-rows.component';
import { FilterComponent } from './transformation-interface/format/filter/filter.component';
import { DeleteRow, Replace, Merge, Filter, FilterAndReplace, DefaultValue, Splitter, Calculator, FormatDate, GroupBy, Hasher, Joiner } from './transformers/transformer.model';
import { FindAndReplaceComponent } from './transformation-interface/format/find-and-replace/find-and-replace.component';
import { DefaultValueComponent } from './transformation-interface/format/default-value/default-value.component';
import { SplitterComponent } from './transformation-interface/format/splitter/splitter.component';
import { CalculatorComponent } from './transformation-interface/format/calculator/calculator.component';
import { DateFormatterComponent } from './transformation-interface/format/date-formatter/date-formatter.component';
import { GroupByComponent } from './transformation-interface/format/group-by/group-by.component';
import { HashComponent } from './transformation-interface/format/hash/hash.component';
import { JoinerComponent } from './transformation-interface/format/joiner/joiner.component';

export const TRANSFORMATIONS = [
  new Filter().setComponent(FilterComponent),
  new FilterAndReplace().setComponent(FindAndReplaceComponent),
  new Replace().setComponent(FormatterComponent),
  new Splitter().setComponent(SplitterComponent),
  new Merge().setComponent(MergerComponent),
  new DeleteRow().setComponent(DeleteRowsComponent),
  new DefaultValue().setComponent(DefaultValueComponent),
  new Calculator().setComponent(CalculatorComponent),
  // new DeleteColumns().setComponent(DeleteColumnComponent),
  new FormatDate().setComponent(DateFormatterComponent),
  new GroupBy().setComponent(GroupByComponent),
  new Hasher().setComponent(HashComponent),
  new Joiner().setComponent(JoinerComponent)
];

export const TransformerFactory = (type) => {
  return TRANSFORMATIONS.find(t => t.type === type);
};


