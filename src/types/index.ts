import { Context as BaseContext, Api, SessionFlavor } from "grammy";
import { HydrateFlavor, HydrateApiFlavor } from "@grammyjs/hydrate";
import { FluentContextFlavor } from "@grammyjs/fluent";

interface SessionData {
  phoneNumber: string;
}

type MyContext = BaseContext &
  HydrateFlavor<BaseContext> &
  SessionFlavor<SessionData> &
  FluentContextFlavor
type MyApi = HydrateApiFlavor<Api>;

export { MyContext, MyApi, SessionData };
