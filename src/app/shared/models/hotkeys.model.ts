import { shortcutString } from "../utils/strings.utils"

class HotKey{
  name: string
  tooltip: string
  action: any
  shortcut: string
  key: string
  icon: string
  alwaysShow:boolean

  constructor(){
      this.shortcut = shortcutString(this.key)
  }
}
