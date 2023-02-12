import type { Context } from 'telegraf';
import type { Middleware } from 'telegraf';
import createDebug from 'debug';
import { Actions } from '../constants'

import { name, version, homepage } from '../../package.json';

const debug = createDebug('bot:hostname_action');

const setHostname: Middleware<Context> = async (ctx, next) => {
  const message = `*${name} ${version}*\n${homepage}`;
  debug(`Triggered "${Actions.SET_HOSTNAME}" action with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
  await next();
};

export { setHostname };
