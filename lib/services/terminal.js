'use babel';

import { Disposable } from 'atom';

let currentService = null;

export function TerminalConsumer(service) {
  // Only first registered provider will be consumed
  if (currentService) {
    console.warn('Multiple terminal providers found.');
    return new Disposable(() => {
    });
  }
  currentService = service;
  updateTerminalProcessEnv();
  return new Disposable(() => {
    // Executed when provider package is deactivated
    currentService = null;
  });
}

export function getTerminalViews() {
  return currentService ? currentService.getTerminalViews() : null;
}

export function updateTerminalProcessEnv() {
  if (!currentService) {
    return false;
  }
  const variables = {
    PATH: process.env.PATH
  };
  if (process.env.Path) {
    variables.Path = process.env.Path;
  }
  return currentService.updateProcessEnv(variables);

}

export function runCmdsInTerminal(commands) {
  if (currentService) {
    updateTerminalProcessEnv();
    return currentService.run(commands);
  }
  atom.notifications.addError('Kooki: Terminal service is not registered.', {
    detail: 'Make sure that "platformio-ide-terminal" package is installed and activated.',
    dismissable: true
  });
  return false;
}