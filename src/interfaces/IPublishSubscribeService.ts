import { IEvent } from "./IEvent";
import { ISubscriber } from "./ISubscriber";

// อินเทอร์เฟซสำหรับ Pub-Sub Service
export interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: string, handler: ISubscriber): void;
  unsubscribe(type: string, handler: ISubscriber): void;
}
