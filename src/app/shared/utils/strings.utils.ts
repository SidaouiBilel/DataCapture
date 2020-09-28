export const capitalize = (s) => {
    if (typeof s !== 'string') { return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

export const shortcutString = (shortcut) => {
  // tslint:disable-next-line: max-line-length
  return (shortcut) ? shortcut.split('.').map((e: string) => e.replace('control', 'ctrl')).map((e: string) => capitalize(e)).join('+') : null;
};

export const isStrEmpty = (s) => {
  return (s == null || s === '' );
};

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}




