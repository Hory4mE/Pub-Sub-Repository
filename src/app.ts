import { MachineController } from "./controllers/MachineController";
import { MachineRefillSubscriber } from "./domain-services/subscribers/MachineRefillSubscriber";
import { MachineSaleSubscriber } from "./domain-services/subscribers/MachineSaleSubscriber";
import { Machine } from "./repositories/MachineRepository";
import { PublishSubscribeService } from "./services/PublishSubscribeService";

const machines: Machine[] = [new Machine('001'), new Machine('002'), new Machine('003')];
const pubSubService = new PublishSubscribeService();

const saleSubscriber = new MachineSaleSubscriber(machines);
const refillSubscriber = new MachineRefillSubscriber(machines);

// สมัคร Subscriber เข้ากับ Pub-Sub Service
pubSubService.subscribe('sale', saleSubscriber);
pubSubService.subscribe('refill', refillSubscriber);

const machineController = new MachineController(pubSubService, machines);
machineController.generateAndPublishEvents();