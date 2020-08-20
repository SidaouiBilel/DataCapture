import { OnInit, OnDestroy } from '@angular/core';
import { TransformationHotKeysService } from '../../transformation/services/transformation-hot-keys.service';
import { TranformationService } from '../../transformation/services/tranformation.service';
import { shortcutString } from '@app/shared/utils/strings.utils';
import { TRANSFORMATIONS } from '../../transformation/transformations/transformers';


export class PreviewGridComponent implements OnInit, OnDestroy {
  gridApi: any;

  constructor(private transformService: TranformationService, private hotkeys: TransformationHotKeysService) {
    
  }
  ngOnInit(): void {
    this.registerHotKey()
  }

  ngOnDestroy(): void {
    this.unregisterHotKey()
  }

  registerHotKey() {
    this.hotkeys.register([
      ...this.getViewModes(),
      ...this.getTransformationsMenu(),
      ...this.getExtraMenuItems()
    ])
  }

  unregisterHotKey() {
    this.hotkeys.unregister()
  }
  
  addTransformer = (transformer, params)=>{
    const rule = transformer.getRuleFromGrid(params)
    this.transformService.addTransformaion(rule)
  }

  getTransformationsMenu=()=>{
    const that = this;
    return TRANSFORMATIONS.map(t=>({
      name: t.label,
      tooltip: t.description,
      action: () => {
        that.addTransformer(t, this.gridApi)
      },
      shortcut: shortcutString(t.shortcut),
      key:t.shortcut,
      icon: t.icon,
    }))
  }

  getExtraMenuItems=()=>{
    const that = this;
    const HKSave = 'control.s'
    const HKSaveNew = 'control.alt.s'
    const HLFlip = 'alt.e'
    return [
      {
        name: 'Save',
        tooltip: 'Save and Apply pipe modification',
        action: ()=> that.transformService.saveEdited(),
        shortcut: shortcutString(HKSave),
        key: HKSave,
        icon: 'save',
      },
      {
        name: 'Save As New',
        tooltip: 'Save and Apply a new pipe modification',
        action: ()=> that.transformService.saveEdited(true),
        shortcut: shortcutString(HKSaveNew),
        key: HKSaveNew,
        icon: 'copy',
      },
      {
        name: 'Fold/Unfold Menu',
        tooltip: 'Fold or Unfold Pipe Menu',
        action: ()=> that.transformService.flipCollapse(),
        shortcut: shortcutString(HLFlip),
        key: HLFlip,
        icon: 'menu-fold',
      }
    ]
  }

  getContextMenuItems = (params) => {  
  return this.getMainContextMenuItems(params);
}

getMainContextMenuItems = (params) => {  
  var result = [
    {
      name: 'Add Transformation',
      subMenu: this.getTransformationsMenu().map(e=>({...e, icon:null}))
    },
    {
      name: 'View Mode',
      subMenu: this.getViewModes().map(e=>({...e, icon:null}))
    },
    ...this.getExtraMenuItems().map(e=>({...e, icon:null})),
    'separator',
    'copy',
    'export'
  ];
    return result;
  }

  getViewModes(){
    const that = this 
    const HLTarget = 'alt.t'
    const HLSource = 'alt.s'
    return [
      {
        name: 'Source',
        tooltip: 'View Source',
        action: ()=> that.transformService.upadatePreviewMode('SOURCE'),
        shortcut: shortcutString(HLSource),
        key: HLSource,
        icon: 'file',
      },
      {
        name: 'Target',
        tooltip: 'View Target',
        action: ()=> that.transformService.upadatePreviewMode('TARGET'),
        shortcut: shortcutString(HLTarget),
        key: HLTarget,
        icon: 'thunderbolt',
      }
    ]
  }

}
