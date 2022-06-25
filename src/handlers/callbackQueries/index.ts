import { Bot } from "grammy"
import { MyContext } from "../../types"
import { lruCache } from "../../utils/lru-cache";

async function setup(bot: Bot<MyContext>) {
  bot.callbackQuery(/.+/, async (ctx) => {
    let text: string;

    if ((ctx.from as any).is_premium) {
      text = 'It\'s not for you';
    } else {
      text = lruCache.get(ctx.callbackQuery.data)
        ?? 'Message is out of date'
    }

    await ctx.answerCallbackQuery({
      text,
      show_alert: true,
    })
  })
}

export default { setup }
