export const swapArrayElements = (array, oldIndex, newIndex) => {

  if(newIndex>=0 && newIndex<array.length) {
    var tmp = array[newIndex];
    array[newIndex] = array[oldIndex];
    array[oldIndex] = tmp;
  }

  return array
  }

  export const isArrayEmpty = (a) => {
    return !a || (a && a.length == 0 )
  }
  
  export const Arraylength = (a) => {
    return isArrayEmpty(a)? 0: a.length
  }
  
  
