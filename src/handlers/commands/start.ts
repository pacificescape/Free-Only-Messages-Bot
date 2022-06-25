import { Bot, Keyboard } from "grammy";
import { Chat } from "@grammyjs/types";
import { MyContext } from "../../types";
import { isGroup, isPrivate } from "../../filters/";
import { logger } from "../../utils";

async function startPrivate(ctx: MyContext & { chat: Chat.PrivateChat }, next) {
  await ctx.reply('This bot works only in inline mode');
}

async function startGroup(
  ctx: MyContext & { chat: Chat.SupergroupChat | Chat.GroupChat }
) {
  await ctx.reply(`Cool chat title: <b>${ctx.chat.title}</>`);
}

async function setup(bot: Bot<MyContext>) {
  bot.filter(isPrivate).command("start", startPrivate);
  bot.filter(isGroup).command("start", startGroup);
}

export default { setup };
