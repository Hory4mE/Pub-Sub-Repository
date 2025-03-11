import "reflect-metadata";
import { Container } from "typedi";
import { MachineRefillSubscriber } from "./domain-services/subscribers/MachineRefillSubscriber";
import { MachineSaleSubscriber } from "./domain-services/subscribers/MachineSaleSubscriber";
import { Machine } from "./repositories/MachineRepository";
import { PublishSubscribeService } from "./services/PublishSubscribeService";

// Token สำหรับ DI
const MACHINE_TOKEN = "machines";
const PUB_SUB_SERVICE_TOKEN = "pubSubService";
const SALE_SUBSCRIBER_TOKEN = "saleSubscriber";
const REFILL_SUBSCRIBER_TOKEN = "refillSubscriber";

console.log("🔧 Registering dependencies in services.ts...");

const machines: Machine[] = [new Machine('001'), new Machine('002'), new Machine('003')];
Container.set(MACHINE_TOKEN, machines);

// Register Publish-Subscribe Service
const pubSubService = new PublishSubscribeService();
Container.set(PUB_SUB_SERVICE_TOKEN, pubSubService);

// Register Subscribers (Inject machines จาก Container)
Container.set(SALE_SUBSCRIBER_TOKEN, new MachineSaleSubscriber(Container.get(MACHINE_TOKEN)));
Container.set(REFILL_SUBSCRIBER_TOKEN, new MachineRefillSubscriber(Container.get(MACHINE_TOKEN)));

