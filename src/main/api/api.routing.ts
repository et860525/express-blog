import { RouteBase } from '../../bases/route.base';
import PostRoute from './post/post.routing';

export class ApiRoute extends RouteBase {
  private postRoute!: PostRoute;

  constructor() {
    super();
  }

  protected initial(): void {
    this.postRoute = new PostRoute();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.use('/posts', this.postRoute.router);
  }
}
