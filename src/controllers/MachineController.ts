import { IEvent } from "@interface";
import { MachineRefillEvent, MachineSaleEvent } from "domain-services";
import { Machine } from "../repositories/MachineRepository";
import { PublishSubscribeService } from "../services/PublishSubscribeService";

const randomMachine = (): string => {
  return ['001', '002', '003'][Math.floor(Math.random() * 3)];
};

const eventGenerator = (): IEvent => {
  return Math.random() < 0.5
    ? new MachineSaleEvent(Math.random() < 0.5 ? 1 : 2, randomMachine())
    : new MachineRefillEvent(Math.random() < 0.5 ? 3 : 5, randomMachine());
};

export class MachineController {
  constructor(private pubSubService: PublishSubscribeService, private machines: Machine[]) {}

  generateAndPublishEvents(): void {
    const events = Array.from({ length: 5 }, () => eventGenerator());
    events.forEach(event => this.pubSubService.publish(event));
  }
}