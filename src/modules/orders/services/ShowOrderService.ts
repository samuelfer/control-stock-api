import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrderRepository from '../typeorm/repositories/OrderRespository';
import Order from '../typeorm/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
