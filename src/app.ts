// // interfaces

// // อินเทอร์เฟซสำหรับอีเวนต์ที่ใช้ในระบบ Pub-Sub ซึ่งกำหนดให้ทุกอีเวนต์ต้องมีประเภทและ ID ของเครื่องจักร
// interface IEvent {
//   type(): string;
//   machineId(): string;
// }

// // อินเทอร์เฟซสำหรับ Subscriber ที่ต้องมีเมทอด handle เพื่อจัดการอีเวนต์ที่ได้รับ
// interface ISubscriber {
//   handle(event: IEvent): void;
// }

// // อินเทอร์เฟซสำหรับ Pub-Sub Service ที่มีเมทอด publish, subscribe และ unsubscribe
// interface IPublishSubscribeService {
//   publish(event: IEvent): void;
//   subscribe(type: string, handler: ISubscriber): void;
//   unsubscribe(type: string, handler: ISubscriber): void;
// }

// // implementations

// // อีเวนต์สำหรับการขายสินค้าในเครื่อง
// class MachineSaleEvent implements IEvent {
//   constructor(private readonly _sold: number, private readonly _machineId: string) {}

//   machineId(): string {
//     return this._machineId;
//   }

//   getSoldQuantity(): number {
//     return this._sold;
//   }

//   type(): string {
//     return 'sale';
//   }
// }

// // อีเวนต์สำหรับการเติมสินค้าในเครื่อง
// class MachineRefillEvent implements IEvent {
//   constructor(private readonly _refill: number, private readonly _machineId: string) {}

//   machineId(): string {
//     return this._machineId;
//   }

//   getRefillQuantity(): number {
//     return this._refill;
//   }

//   type(): string {
//     return 'refill';
//   }
// }

// // คลาสแทนเครื่องขายสินค้า
// class Machine {
//   public stockLevel = 10;
//   public id: string;

//   constructor(id: string) {
//     this.id = id;
//   }
// }

// // Subscriber สำหรับการขายสินค้า จะลดสต็อกของเครื่องที่เกี่ยวข้อง
// class MachineSaleSubscriber implements ISubscriber {
//   constructor(private machines: Machine[]) {}

//   // เมทอดนี้จัดการเหตุการณ์ขายสินค้า โดยลดสต็อกของเครื่องที่เกี่ยวข้อง
//   handle(event: MachineSaleEvent): void {
//     const machine = this.machines.find(m => m.id === event.machineId());
//     if (machine) {
//       machine.stockLevel -= event.getSoldQuantity();
//       console.log(`Machine ${machine.id} sold ${event.getSoldQuantity()} units. New stock: ${machine.stockLevel}`);
//     }
//   }
// }

// // Subscriber สำหรับการเติมสินค้า จะเพิ่มสต็อกของเครื่องที่เกี่ยวข้อง
// class MachineRefillSubscriber implements ISubscriber {
//   constructor(private machines: Machine[]) {}

//   // เมทอดนี้จัดการเหตุการณ์เติมสินค้า โดยเพิ่มสต็อกของเครื่องที่เกี่ยวข้อง
//   handle(event: MachineRefillEvent): void {
//     const machine = this.machines.find(m => m.id === event.machineId());
//     if (machine) {
//       machine.stockLevel += event.getRefillQuantity();
//       console.log(`Machine ${machine.id} refilled ${event.getRefillQuantity()} units. New stock: ${machine.stockLevel}`);
//     }
//   }
// }

// // คลาสนี้คือหัวใจของระบบ Pub-Sub ซึ่งจัดการการเผยแพร่อีเวนต์และการสมัครสมาชิก
// class PublishSubscribeService implements IPublishSubscribeService {
//   private subscribers: Map<string, ISubscriber[]> = new Map();

//   publish(event: IEvent): void {
//     const handlers = this.subscribers.get(event.type()) || [];
//     handlers.forEach(handler => handler.handle(event));
//   }

//   subscribe(type: string, handler: ISubscriber): void {
//     if (!this.subscribers.has(type)) {
//       this.subscribers.set(type, []);
//     }
//     this.subscribers.get(type)!.push(handler);
//   }

//   unsubscribe(type: string, handler: ISubscriber): void {
//     if (this.subscribers.has(type)) {
//       this.subscribers.set(
//         type,
//         this.subscribers.get(type)!.filter(h => h !== handler)
//       );
//     }
//   }
// }

// // helpers

// // สุ่ม ID ของเครื่องจักร
// const randomMachine = (): string => {
//   return ['001', '002', '003'][Math.floor(Math.random() * 3)];
// };

// // สุ่มสร้างอีเวนต์การขายหรือเติมสินค้า
// const eventGenerator = (): IEvent => {
//   return Math.random() < 0.5
//     ? new MachineSaleEvent(Math.random() < 0.5 ? 1 : 2, randomMachine())
//     : new MachineRefillEvent(Math.random() < 0.5 ? 3 : 5, randomMachine());
// };

// // program
// (async () => {
//   // สร้างเครื่องจักร 3 เครื่อง
//   const machines: Machine[] = [new Machine('001'), new Machine('002'), new Machine('003')];
//   // สร้างระบบ Pub-Sub
//   const pubSubService = new PublishSubscribeService();

//   // สร้าง Subscriber สำหรับการขายและเติมสินค้า
//   const saleSubscriber = new MachineSaleSubscriber(machines);
//   const refillSubscriber = new MachineRefillSubscriber(machines);

//   // สมัคร Subscriber เข้ากับ Pub-Sub Service
//   pubSubService.subscribe('sale', saleSubscriber);
//   pubSubService.subscribe('refill', refillSubscriber);

//   // สร้างและเผยแพร่อีเวนต์ 5 รายการ
//   const events = Array.from({ length: 5 }, () => eventGenerator());
//   events.forEach(event => pubSubService.publish(event));
// })();
import { MachineController } from "./controllers/MachineController";
import { MachineRefillSubscriber } from "./domain-services/subscribers/MachineRefillSubscriber";
import { MachineSaleSubscriber } from "./domain-services/subscribers/MachineSaleSubscriber";
import { Machine } from "./repositories/MachineRepository";
import { PublishSubscribeService } from "./services/PublishSubscribeService";

const machines: Machine[] = [new Machine('001'), new Machine('002'), new Machine('003')];
const pubSubService = new PublishSubscribeService();

const saleSubscriber = new MachineSaleSubscriber(machines);
const refillSubscriber = new MachineRefillSubscriber(machines);

pubSubService.subscribe('sale', saleSubscriber);
pubSubService.subscribe('refill', refillSubscriber);

const machineController = new MachineController(pubSubService, machines);
machineController.generateAndPublishEvents();