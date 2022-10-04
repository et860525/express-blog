import RouteBase from './bases/route.base';
import { ApiRoute } from './main/api/api.routing';
import postRouter from './main/post/post.routing';

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
    this.router.use('/', postRouter);
    this.router.use('/api', this.apiRoute.router);
  }
}
