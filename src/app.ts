import "reflect-metadata";
import { Machine } from "repositories/MachineRepository";
import { Container } from "typedi";
import { MachineController } from "./controllers/MachineController";
import { MachineRefillSubscriber } from "./domain-services/subscribers/MachineRefillSubscriber";
import { MachineSaleSubscriber } from "./domain-services/subscribers/MachineSaleSubscriber";
import "./services";
import { PublishSubscribeService } from "./services/PublishSubscribeService";

const PUB_SUB_SERVICE_TOKEN = "pubSubService";
const MACHINE_TOKEN = "machines";
const SALE_SUBSCRIBER_TOKEN = "saleSubscriber";
const REFILL_SUBSCRIBER_TOKEN = "refillSubscriber";

const pubSubService = Container.get<PublishSubscribeService>(PUB_SUB_SERVICE_TOKEN);
const machines = Container.get<Machine[]>(MACHINE_TOKEN);
const saleSubscriber = Container.get<MachineSaleSubscriber>(SALE_SUBSCRIBER_TOKEN);
const refillSubscriber = Container.get<MachineRefillSubscriber>(REFILL_SUBSCRIBER_TOKEN);

console.log("🔧 Machines in system: ", machines);

console.log("📢 Before Unsubscribe");
pubSubService.subscribe("sale", saleSubscriber);
pubSubService.subscribe("refill", refillSubscriber);

const machineController = new MachineController(pubSubService, machines);
machineController.generateAndPublishEvents();

console.log("📢 After Unsubscribe");
pubSubService.unsubscribe("sale", saleSubscriber);
pubSubService.unsubscribe("refill", refillSubscriber);

machineController.generateAndPublishEvents();
