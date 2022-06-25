import { Context as BaseContext, Api, SessionFlavor } from "grammy";
import { HydrateFlavor, HydrateApiFlavor } from "@grammyjs/hydrate";
import { FluentContextFlavor } from "@grammyjs/fluent";
import mongoose from "mongoose";

interface SessionData {
  phoneNumber: string;
}

interface Database {
  database: { [key: string]: mongoose.Model<any, any> };
}

type MyContext = BaseContext &
  HydrateFlavor<BaseContext> &
  SessionFlavor<SessionData> &
  FluentContextFlavor &
  Database;
type MyApi = HydrateApiFlavor<Api>;

export { MyContext, MyApi, SessionData };
