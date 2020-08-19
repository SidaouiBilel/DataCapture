export const swapArrayElements = (array, oldIndex, newIndex) => {

  if(newIndex>=0 && newIndex<array.length) {
    var tmp = array[newIndex];
    array[newIndex] = array[oldIndex];
    array[oldIndex] = tmp;
  }

  return array
  }