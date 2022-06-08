import Customer from '@modules/customers/typeorm/entities/Customer';
import { IRequestProductOrder } from './IRequestProductOrder';
export interface IRequestOrder {
  customer: Customer;
  products: IRequestProductOrder[];
}
