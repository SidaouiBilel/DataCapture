import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shortcuts-list',
  templateUrl: './shortcuts-list.component.html',
})
export class ShortcutsListComponent implements OnInit {
  @Input() shortcuts =[ 
    {shortcut: "Alt.E",icon: "file",name: "Example"},
    {shortcut: "Alt.E",icon: "plus",name: "Example"},
    {shortcut: "Alt.E",icon: "minus",name: "Example"},
    {shortcut: "Alt.E",icon: "control",name: "Example"},
    {shortcut: "Alt.E",icon: "stop",name: "Example"},
  ];
  constructor() { }

  ngOnInit() {
  }
}
