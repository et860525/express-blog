import { Request, Response } from 'express';
import { RouteBase } from './bases/route.base';
import { ApiRoute } from './main/api/api.routing';

export class AppRoute extends RouteBase {
  private apiRoute!: ApiRoute;

  constructor() {
    super();
  }

  protected initial(): void {
    this.apiRoute = new ApiRoute();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.get('/', (req: Request, res: Response) => {
      res.render('index');
    });
    this.router.use('/api', this.apiRoute.router);
  }
}
