export class Category{
  id?
  code
  cat
  keywords = []
  dict_id

  constructor(dict_id){
    this.dict_id = dict_id
}
}
