export const deepCopy = (obj) => {
  // TODO BETTER IMPLEMENTATION
  return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (obj) => {
  for(const prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const arrayToDict = (array, keys) => {
  const data = [];
  for (const row of array) {
    const rowObject = {};
    let i = 0;
    for (const h of keys) {
      rowObject[h] = row[i];
      i++;
    }
    data.push(rowObject);
  }

  return data
}