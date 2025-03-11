import { Token } from "typedi";
import { IEvent, IPublishSubscribeService, ISubscriber } from "./interfaces";

export const IPublishSubscribeServiceToken = new Token<IPublishSubscribeService>("IPublishSubscribeService");
export const ISubscriberToken = new Token<ISubscriber>("ISubscriber");
export const IEventToken = new Token<IEvent>("IEvent");
