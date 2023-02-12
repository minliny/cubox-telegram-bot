import type { Context } from 'telegraf';
import type { Middleware } from 'telegraf';
import createDebug from 'debug';
import { Actions } from '../constants'
const debug = createDebug('bot:token_action');

const setToken: Middleware<Context> = async (ctx, next) => {
  debug(`Triggered "${Actions.SET_TOKEN}" action`);
  const message = `Please input your cubox *API token*, you can find it at:\nhttps://help.cubox.pro/save/89d3/`
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
  await ctx.answerCbQuery();
  await next();
};

export { setToken };
