import { MachineRefillEvent, MachineSaleEvent } from "@domain-services";
import { IEvent } from "@interface";
import { Machine } from "repositories/MachineRepository";
import { PublishSubscribeService } from "services/PublishSubscribeService";
import { IPublishSubscribeServiceToken } from "token";
import { Inject, Service } from "typedi";

// สุ่ม ID ของเครื่องจักร (Mock Machine Data)
const randomMachine = (): string => {
  return ['001', '002', '003'][Math.floor(Math.random() * 3)];
};

// สุ่มสร้างอีเวนต์การขายหรือเติมสินค้า (Mock Case)
const eventGenerator = (): IEvent => {
  return Math.random() < 0.5
    ? new MachineSaleEvent(Math.random() < 0.5 ? 1 : 2, randomMachine())
    : new MachineRefillEvent(Math.random() < 0.5 ? 3 : 5, randomMachine());
};

@Service()
export class MachineController {
  constructor(
    @Inject(IPublishSubscribeServiceToken) private pubSubService: PublishSubscribeService,
    @Inject("machines") private machines: Machine[]
  ) {}

  // gen & Publish 5 event (Mock Frequency of Events)
  generateAndPublishEvents(): void {
    const events = Array.from({ length: 5 }, () => eventGenerator());
    events.forEach(event => this.pubSubService.publish(event));
  }
}
