import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzConfigService, NzIconService } from 'ng-zorro-antd';

const SaveAsOutline = {
  name: 'saveAs-o',
  icon: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640"><defs><path d="M424.37 108.8C419.35 103.78 413.2 100.1 406.5 98.09C406.5 97.97 406.5 97.37 406.5 96.29C181.62 96.29 56.69 96.29 31.7 96.29C19.86 96.29 10.29 105.86 10.29 117.7C10.29 166.96 10.29 561.04 10.29 610.3C10.29 622.14 19.86 631.71 31.7 631.71C80.96 631.71 475.04 631.71 524.3 631.71C536.14 631.71 545.71 622.14 545.71 610.3C545.71 574.06 545.71 284.12 545.71 247.88C545.71 236.5 541.23 225.66 533.2 217.63C511.43 195.86 435.26 119.68 424.37 108.8ZM363.67 144.47L363.67 214.08L192.33 214.08L192.33 144.47L363.67 144.47ZM58.47 583.53L58.47 144.47L149.5 144.47C149.5 199.09 149.5 229.43 149.5 235.5C149.5 247.34 159.07 256.91 170.91 256.91C192.33 256.91 363.67 256.91 385.09 256.91C396.93 256.91 406.5 247.34 406.5 235.5C406.5 230.4 406.5 204.92 406.5 159.06L497.53 250.09L497.53 583.53L58.47 583.53ZM181.62 413.53C181.62 466.74 224.79 509.9 278 509.9C331.21 509.9 374.38 466.74 374.38 413.53C374.38 360.32 331.21 317.15 278 317.15C224.79 317.15 181.62 360.32 181.62 413.53ZM224.46 413.53C224.46 383.94 248.42 359.98 278 359.98C307.58 359.98 331.54 383.94 331.54 413.53C331.54 443.11 307.58 467.07 278 467.07C248.42 467.07 224.46 443.11 224.46 413.53Z" id="bc2FttOhc"></path><path d="" id="c1Oo2AVdn8"></path><path d="M558.56 547.61C577.65 547.61 589.59 547.61 594.36 547.61C600.63 547.61 605.71 542.52 605.71 536.25C605.71 463.52 605.71 254.52 605.71 181.25C605.71 175.72 603.5 170.42 599.56 166.54C573.36 140.69 503.9 72.15 478.44 47.04C472.11 40.79 463.57 37.29 454.67 37.29C382.45 37.29 169.38 37.29 94.59 37.29C94.02 37.29 93.56 37.75 93.56 38.32C93.56 44.62 93.56 60.39 93.56 85.61" id="c1Pq3zXs5Q"></path></defs><g><g><g><use xlink:href="#bc2FttOhc" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#bc2FttOhc" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><g><use xlink:href="#c1Oo2AVdn8" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="53" stroke-opacity="1"></use></g></g><g><g><use xlink:href="#c1Pq3zXs5Q" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="48" stroke-opacity="1"></use></g></g></g></g></svg>`
};

@Injectable()
export class CustomIconsService extends NzIconService{

  constructor(rendererFactory: RendererFactory2, sanitizer: DomSanitizer, nzConfigService: NzConfigService, handler: HttpBackend, @Inject(DOCUMENT) _document: Document) { 
    const icons = [SaveAsOutline]
    super(rendererFactory,sanitizer,nzConfigService,handler,_document , icons, null)
  }
}
