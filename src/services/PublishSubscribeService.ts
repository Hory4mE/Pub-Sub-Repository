import { IEvent, IPublishSubscribeService, ISubscriber } from "../interfaces";

export class PublishSubscribeService implements IPublishSubscribeService {
  private subscribers: Map<string, ISubscriber[]> = new Map();

  publish(event: IEvent): void {
    const handlers = this.subscribers.get(event.type()) || [];
    handlers.forEach(handler => handler.handle(event));
  }

  subscribe(type: string, handler: ISubscriber): void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }
    this.subscribers.get(type)!.push(handler);
  }

  unsubscribe(type: string, handler: ISubscriber): void {
    if (this.subscribers.has(type)) {
      this.subscribers.set(
        type,
        this.subscribers.get(type)!.filter(h => h !== handler)
      );
    }
  }
}