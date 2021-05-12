import {
  DeleteRow, Replace, Merge, Filter, FilterAndReplace, DefaultValue, Splitter, Calculator,
  FormatDate, GroupBy, Hasher, Joiner, Pycode
} from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
import { FilterComponent } from "./filter/filter.component";
import { MergerComponent } from "./merger/merger.component";
import { JoinerComponent } from "./joiner/joiner.component";
import { NewCalculatorComponent } from "./new-calculator/new-calculator.component";
import { PycodeComponent } from "./pycode/pycode.component";
import { FindAndReplaceComponent } from "./find-and-replace/find-and-replace.component";
import { FormatterComponent } from "./formatter/formatter.component";

export const TRANSFORMATIONS = [
  new Calculator().setComponent(NewCalculatorComponent),
  new Filter().setComponent(FilterComponent),
  new Merge().setComponent(MergerComponent),
  new Joiner().setComponent(JoinerComponent),
  new Pycode().setComponent(PycodeComponent),
  new FilterAndReplace().setComponent(FindAndReplaceComponent),
  new Replace().setComponent(FormatterComponent),


  /*   ,
    new Replace().setComponent(FormatterComponent),
    new Splitter().setComponent(SplitterComponent),
    new Merge().setComponent(MergerComponent),
    new DeleteRow().setComponent(DeleteRowsComponent),
    new DefaultValue().setComponent(DefaultValueComponent),
    new FormatDate().setComponent(DateFormatterComponent),
    new GroupBy().setComponent(GroupByComponent),
    new Hasher().setComponent(HashComponent),
    new Joiner().setComponent(JoinerComponent) */
];

export const TransformerFactory = (type) => {
  return TRANSFORMATIONS.find(t => t.type === type);
};


