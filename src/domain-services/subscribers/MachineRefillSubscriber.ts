import { ISubscriber } from "@interface";
import { Inject, Service } from "typedi";
import { Machine } from "../../repositories/MachineRepository";
import { MachineRefillEvent } from "../events/MachineRefillEvent";

@Service()
export class MachineRefillSubscriber implements ISubscriber {
  // Inject machines แทนการรับจาก Constructor ธรรมดา
  constructor(@Inject("machines") private machines: Machine[]) {}

  handle(event: MachineRefillEvent): void {
    const machine = this.machines.find(m => m.id === event.machineId());
    if (machine) {
      machine.stockLevel += event.getRefillQuantity();
      console.log(`Machine ${machine.id} refilled ${event.getRefillQuantity()} units. New stock: ${machine.stockLevel}`);
    }
  }
}
