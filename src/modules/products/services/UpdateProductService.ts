import { IRequestProduct } from '../typeorm/interface/IRequestProduct';
import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequestProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
