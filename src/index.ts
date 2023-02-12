import { Telegraf } from 'telegraf'

import { start, update, intl, deleting, about } from './commands'
import { setToken, setHostname } from './actions'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { development, production } from './core'
import { save } from './text'
import { Actions } from './constants'

const BOT_TOKEN = process.env.BOT_TOKEN || ''
const ENVIRONMENT = process.env.NODE_ENV || ''

const bot = new Telegraf(BOT_TOKEN)

bot.command('start', start())
bot.command('update', update())
bot.command('delete', deleting())
bot.command('intl', intl())
bot.command('about', about())
bot.action(Actions.SET_TOKEN, setToken)
bot.action(Actions.SET_HOSTNAME, setHostname)
bot.on('text', save())
bot.help(async (ctx, next) => {
  await ctx.reply('Send me a message')
  await next()
})

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot)
}
//dev mode
ENVIRONMENT !== 'production' && development(bot)
