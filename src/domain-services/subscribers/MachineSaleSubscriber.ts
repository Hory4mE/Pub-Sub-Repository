import { ISubscriber } from "@interface";
import { Machine } from "../../repositories/MachineRepository";
import { MachineSaleEvent } from "../events/MachineSaleEvent";

export class MachineSaleSubscriber implements ISubscriber {
  constructor(private machines: Machine[]) {}

  handle(event: MachineSaleEvent): void {
    const machine = this.machines.find(m => m.id === event.machineId());
    if (machine) {
      machine.stockLevel -= event.getSoldQuantity();
      console.log(`Machine ${machine.id} sold ${event.getSoldQuantity()} units. New stock: ${machine.stockLevel}`);
    }
  }
}