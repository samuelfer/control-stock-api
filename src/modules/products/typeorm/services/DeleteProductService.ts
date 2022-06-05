import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../entities/Product';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
