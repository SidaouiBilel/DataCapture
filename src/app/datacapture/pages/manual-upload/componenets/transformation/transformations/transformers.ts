import { DeleteRow, Replace, Merge, Filter, FilterAndReplace, DefaultValue, Splitter, Calculator,
  FormatDate, GroupBy, Hasher, Joiner } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
import { FilterComponent } from "./trasnformation-intefrace/nodes/filter/filter.component";
import { MergerComponent } from "./trasnformation-intefrace/nodes/merger/merger.component";
import { NewCalculatorComponent } from "./trasnformation-intefrace/nodes/new-calculator/new-calculator.component";

export const TRANSFORMATIONS = [
  new Calculator().setComponent(NewCalculatorComponent),
  new Filter().setComponent(FilterComponent),
  new Merge().setComponent(MergerComponent),

/*   ,
  new FilterAndReplace().setComponent(FindAndReplaceComponent),
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


