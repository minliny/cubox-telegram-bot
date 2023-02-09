import { Context } from 'telegraf';
import createDebug from 'debug';
import { request } from '../utils/request';
import { isURL } from '../utils/fn';

const debug = createDebug('bot:save_content');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_to_message_id: messageId,
  });

const save = () => async (ctx: Context) => {
  debug('Triggered "save_content" text command');

  const messageId = ctx.message?.message_id;

  let responseText = ''
  if (messageId && ctx.message && 'text' in ctx.message) {
    const isUrl = isURL(ctx.message.text)
    await request({
      method: 'POST',
      url: `https://cubox.pro/c/api/save/${process.env.CUBOX_TOKEN}`,
      data: {
        "type": isUrl ? "url" : "memo",
        "content": ctx.message.text,
      }
    }).catch((error) => {
      console.error(error)
      responseText = `Failed to save content.`
    });
    responseText = `Content saved.`
  } else {
    responseText = `Please send text or URL to save.`
  }

  if (messageId) {
    await replyToMessage(ctx, messageId, responseText);
  }
};

export { save };
