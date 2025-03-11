import { ISubscriber } from "@interface";
import { Machine } from "../../repositories/MachineRepository";
import { MachineSaleEvent } from "../events/MachineSaleEvent";

// Subscriber สำหรับการขายสินค้า จะลดสต็อกของเครื่องที่เกี่ยวข้อง
export class MachineSaleSubscriber implements ISubscriber {
  constructor(private machines: Machine[]) {}

  // จัดการ Event Refill สินค้า โดยเพิ่มสต็อกของเครื่องที่เกี่ยวข้อง
  handle(event: MachineSaleEvent): void {
    const machine = this.machines.find(m => m.id === event.machineId());
    if (machine) {
      machine.stockLevel -= event.getSoldQuantity();
      console.log(`Machine ${machine.id} sold ${event.getSoldQuantity()} units. New stock: ${machine.stockLevel}`);
    }
  }
}