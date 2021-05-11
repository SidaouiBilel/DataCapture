export class Operation {
    type;
    label;
    icon;
    component;
    icon_rotation = 0;
    description = 'Description Template';
    shortcut = null;
    collapse = false;
    category;
    color;
  
    setComponent(comp) {
        this.component = comp;
        return this;
    }
  }