import { Request, Response, NextFunction } from 'express';
import { RouteBase } from '../../../bases/route.base';

export default class PostRoute extends RouteBase {
  constructor() {
    super();
  }

  protected initial(): void {
    super.initial();
  }

  protected registerRoute(): void {
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send({ msg: 'Posts API OK' });
    });
  }
}
