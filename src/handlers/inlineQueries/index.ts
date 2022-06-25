import { Bot } from "grammy"
import { lruCache } from "../../utils/lru-cache"
import { MyContext } from "../../types"
import { escapeHtml } from "../../utils/escape-html"


async function setup(bot: Bot<MyContext>) {
  bot.inlineQuery(/.+/, async ctx => {
    if ((ctx.from as any).is_premium) {
      return
    }

    const text = escapeHtml(ctx.inlineQuery.query).slice(0, 199);

    lruCache.set(ctx.inlineQuery.id, text);

    await ctx.answerInlineQuery([
      {
        type: "article",
        id: ctx.inlineQuery.id,
        title: "Send message only for non-premium users\n(max length 200)",
        input_message_content: {
          message_text: "Message only for non-premium users",
          parse_mode: "HTML",
          disable_web_page_preview: true,
        },
        reply_markup: {
          inline_keyboard: [[
            {
              text: 'Read',
              callback_data: ctx.inlineQuery.id
            }
          ]]
        },
      },
    ]);
  })
}

export default { setup }
