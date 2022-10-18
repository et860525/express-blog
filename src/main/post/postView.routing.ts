import { PostViewController } from './postView.controller';
import { ViewRouteBase } from '../../bases/route.base';

export default class PostRoute extends ViewRouteBase {
  protected controller!: any;

  constructor() {
    super();
  }

  protected initial() {
    this.controller = new PostViewController();
    this.registerRoute();
  }

  protected registerRoute() {
    this.router.get('/', this.renderView(this.controller.getPosts));
    this.router.get('/create/', this.renderView(this.controller.addPost_get));
    this.router.post('/create/', this.renderView(this.controller.addPost_post));
    this.router.get('/:title', this.renderView(this.controller.getPost));
  }
}
