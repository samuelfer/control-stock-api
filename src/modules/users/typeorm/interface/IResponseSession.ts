import User from '../entities/User';

interface IResponse {
  user: User;
  token: string;
}

export default IResponse;
