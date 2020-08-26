export const getPreviousHeader = (headers, previousNodes) => {
    const all = new Set(headers);
    for (let t of previousNodes){
      switch (t.type) {
        case 'delete-column':
          if (t.columns){
            for (let c of t.columns){
              all.delete(c);
            }
          }
          break;
        case 'merge':
        case 'default-value':
          if (t.destination){
            all.add(t.destination);
          }
          break;
      }
    }
    return Array.from(all);
}