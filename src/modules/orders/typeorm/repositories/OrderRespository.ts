import { EntityRepository, Repository } from 'typeorm';

import Order from '../entities/Order';
import { IRequestOrder } from '../interfaces/IRequestOrder';

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({
    customer,
    products,
  }: IRequestOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

export default OrderRepository;
