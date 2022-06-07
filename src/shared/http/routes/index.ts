import customerRouter from '@modules/customers/routes/customer.routes';
import productRouter from '@modules/products/routes/product.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import userRouter from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/customers', customerRouter);

export default routes;
