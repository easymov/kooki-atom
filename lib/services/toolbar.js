'use babel';

import { Disposable } from 'atom';

let currentService = null;

export function ToolbarConsumer(toolBar) {
  if (currentService) {
    return;
  }
  currentService = toolBar('kooki');

  currentService.addSpacer();

  currentService.addButton({
    icon: 'kooki',
    iconset: 'kookicon',
    callback: 'kooki:bake',
    tooltip: 'Bake'
  });

  return new Disposable(() => {
    currentService.removeItems();
    currentService = null;
  });
}