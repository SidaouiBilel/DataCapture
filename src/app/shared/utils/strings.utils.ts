export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

export const shortcutString = (shortcut) => {
  return (shortcut)?shortcut.split('.').map((e:string)=>e.replace('control', 'ctrl')).map((e:string)=>capitalize(e)).join('+'): null
}

export const isStrEmpty = (s) => {
  return (s == null ||s == '' ) 
}




