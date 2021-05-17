import {
  DeleteRow, Replace, Merge, Filter, FilterAndReplace, DefaultValue, Splitter, Calculator,
  FormatDate, GroupBy, Hasher, Joiner, Pycode, DeleteColumns
} from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
import { FilterComponent } from "./filter/filter.component";
import { MergerComponent } from "./merger/merger.component";
import { JoinerComponent } from "./joiner/joiner.component";
import { NewCalculatorComponent } from "./new-calculator/new-calculator.component";
import { PycodeComponent } from "./pycode/pycode.component";
import { FindAndReplaceComponent } from "./find-and-replace/find-and-replace.component";
import { FormatterComponent } from "./formatter/formatter.component";
import { SplitterComponent } from "./splitter/splitter.component";
import { DeleteRowsComponent } from "./delete-rows/delete-rows.component";
import { DefaultValueComponent } from "./default-value/default-value.component";
import { DateFormatterComponent } from "./date-formatter/date-formatter.component";
import { GroupByComponent } from "./group-by/group-by.component";
import { DeleteColumnComponent } from "./delete-column/delete-column.component";
import { HashComponent } from "./hash/hash.component";

export const TRANSFORMATIONS = [
  new Calculator().setComponent(NewCalculatorComponent),
  new Filter().setComponent(FilterComponent),
  new Merge().setComponent(MergerComponent),
  new Joiner().setComponent(JoinerComponent),
  new Pycode().setComponent(PycodeComponent),
  new FilterAndReplace().setComponent(FindAndReplaceComponent),
  new Replace().setComponent(FormatterComponent),
  new Splitter().setComponent(SplitterComponent),
  new DeleteRow().setComponent(DeleteRowsComponent),
  new FormatDate().setComponent(DateFormatterComponent),
  new DefaultValue().setComponent(DefaultValueComponent),
  new GroupBy().setComponent(GroupByComponent),
  new Hasher().setComponent(HashComponent),
  new DeleteColumns().setComponent(DeleteColumnComponent),
];

export const TransformerFactory = (type) => {
  return TRANSFORMATIONS.find(t => t.type === type);
};


