import { NextFunction } from "grammy";
import { MyContext } from "../types";
import { logger } from "../utils";

async function logging(ctx: MyContext, next: NextFunction) {
  logger.debug(`Received update [ID:${ctx.update.update_id}]`);

  const _start = Date.now();
  ctx["_start"] = _start;

  if (!!ctx?.callbackQuery) {
    await onCallbackQuery(ctx);
  } else if (!!ctx?.inlineQuery) {
    await onInlineQuery(ctx);
  }

  await next();

  const timeout = Date.now() - _start;
  logger.debug(
    `Process update [ID:${ctx.update.update_id}]: [success] (in ${timeout} ms)`
  );
}

async function onCallbackQuery(ctx: MyContext) {
  logger.debug(
    `Received callback query [ID:${ctx.callbackQuery.id}]`
  );
}

async function onInlineQuery(ctx: MyContext) {
  logger.debug(
    `Received inline query [ID:${ctx.inlineQuery.id}]`
  );
}

export default logging;
