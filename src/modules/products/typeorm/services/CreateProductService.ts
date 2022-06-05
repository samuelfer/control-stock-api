import AppError from '@shared/errors/AppError';
import { ProductRepository } from './../repositories/ProductRepository';
import { IRequestProduct } from '../interface/IRequestProduct';
import { getCustomRepository } from 'typeorm';
import Product from '../entities/Product';

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequestProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name.');
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
