import { EPaymentMethod } from "./EPaymentMethod";

export interface IOrderRequest {
    payment: EPaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
  }