import { IEvent } from "@interface";

export class MachineSaleEvent implements IEvent {
    constructor(private readonly _sold: number, private readonly _machineId: string) {}
  
    machineId(): string {
      return this._machineId;
    }
  
    getSoldQuantity(): number {
      return this._sold;
    }
  
    type(): string {
      return 'sale';
    }
  }