import RouteBase from './bases/route.base';
import { ApiRoute } from './main/api/api.routing';
import PostRoute from './main/post/postView.routing';

export class AppRoute extends RouteBase {
  private apiRoute!: ApiRoute;
  private postRoute!: PostRoute;

  constructor() {
    super();
  }

  protected initial(): void {
    this.apiRoute = new ApiRoute();
    this.postRoute = new PostRoute();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.use('/', this.postRoute.router);
    this.router.use('/api', this.apiRoute.router);
  }
}
