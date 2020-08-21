import { shortcutString } from "../utils/strings.utils"

class HotKey{

    name: string
    tooltip: string
    action: any
    shortcut: string
    key: string
    icon: string
    alwaysShow:boolean = false    

    constructor(hotkey : Partial<HotKey> = {} ){
        this.shortcut = shortcutString(this.key)
    }

    setAction(func){
        this.action = func

        return this
    }

}

class HKPaste extends HotKey{
    name = 'paste'
    tooltip = 'paste'
    key = 'control.v'
    icon = 'paste'
    alwaysShow = true
}