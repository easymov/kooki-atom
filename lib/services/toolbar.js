'use babel';

import { Disposable } from 'atom';

let currentService = null;

export function ToolbarConsumer(toolBar)
{
  if (currentService) {
    return;
  }
  currentService = toolBar('tool-bar-kooki');
  addButtons()
  return new Disposable(() => {
    currentService.removeItems();
    currentService = null;
  });
}

export function addButtons()
{
  if (!currentService) {
    return false;
  }

  currentService.addSpacer();

  currentService.addButton({
    icon: 'kooki',
    iconset: 'kookicon',
    callback: 'kooki:bake',
    tooltip: 'Kooki Bake',
  });

  currentService.addSpacer();
}