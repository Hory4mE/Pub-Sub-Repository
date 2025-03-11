import { IEvent } from "./IEvent";
import { ISubscriber } from "./ISubscriber";

export interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: string, handler: ISubscriber): void;
  unsubscribe(type: string, handler: ISubscriber): void;
}
