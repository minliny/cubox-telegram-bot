import { Context } from 'telegraf';
import createDebug from 'debug';
import { Actions } from '../constants'
import { name, version, homepage } from '../../package.json';

const debug = createDebug('bot:start_command');

const start = () => async (ctx: Context) => {
  const userId = ctx.from?.id;
  const userName = ctx.from?.username;
  debug(`Triggered "start" command by user: ${userName} - ${userId}`);

  // replay inline keyboard
  await ctx.sendMessage(`\
Welcome to use the \`Cubox Telegram Bot\` to save message into Cubox\\.

You need _provide your Cubox token, it will be saved in database, but you cound delete it anytime_ if you want\\.

*Besides the hostname and token, any other information will not be saved\\!*

\\-\\-\\-

欢迎使用 \`Cubox Telegram Bot\` 来保存消息到 Cubox\\.

你需要_提供你的 Cubox token, 它将会被保存在数据库中, 但是你可以随时删除_\\.

*除了 Cubox 服务域名和 token, 你传输的任何其它信息都不会被保存！*\
`, {
    parse_mode: 'MarkdownV2',
    reply_markup:  {
      inline_keyboard: [
        [
          {
            text: 'Set Token',
            callback_data: Actions.SET_TOKEN,
          },
          {
            text: 'Set Hostname',
            callback_data: Actions.SET_HOSTNAME,
          },
        ]
      ]
    }
  })
};

export { start };
