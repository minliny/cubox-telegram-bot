import { Context } from 'telegraf';
import createDebug from 'debug';

import { name, version, homepage } from '../../package.json';

const debug = createDebug('bot:about_command');

const update = () => async (ctx: Context) => {
  const message = `*${name} ${version}*\n${homepage}`;
  debug(`Triggered "update" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { update };
