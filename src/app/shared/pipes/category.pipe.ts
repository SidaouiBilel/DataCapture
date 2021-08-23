import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe'
})

export class CategoryPipe implements PipeTransform {

  transform(filter: Object): any {

    let category = ''
    switch(filter){
      case 'MED':category='Medical';break;
      case 'PER':category='Personal';break;
      case 'COM':category='Commercial';break;
      case 'GEO':category='Geographic';break;
      case 'OTH':category='Uncategorized';break;
      default:category='Uncategorized';break;
    }
  return category
  }
}


