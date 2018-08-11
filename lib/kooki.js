'use babel';

import { TerminalConsumer, runCmdsInTerminal } from './services/terminal';
import { ToolbarConsumer } from './services/toolbar';
import { CompositeDisposable } from 'atom';

class KookiPackage
{
  constructor()
  {
    this.subscriptions = new CompositeDisposable();

    this.consumePlatformioIDETerminal = TerminalConsumer;
    this.consumeToolbar = ToolbarConsumer;
  }

  activate(state)
  {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'kooki:bake': () => runCmdsInTerminal(['kooki bake']),
    }));
  }

  deactivate()
  {
    this.subscriptions.dispose();
  }
};

const kooki = new KookiPackage();
export default kooki;