import RouteBase from '../../../bases/route.base';
import PostController from './post.controller';

export default class PostRoute extends RouteBase {
  protected controller!: PostController;

  constructor() {
    super();
  }

  protected initial(): void {
    this.controller = new PostController();
    super.initial();
  }

  protected registerRoute(): void {
    this.router.get('/', this.responseHandler(this.controller.getPosts));
  }
}
