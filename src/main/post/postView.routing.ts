import { Router, Request, Response, NextFunction } from 'express';
import { PostViewController } from './postView.controller';

export default class PostRoute {
  public router = Router();
  protected controller!: PostViewController;

  constructor() {
    this.initial();
  }

  protected initial() {
    this.controller = new PostViewController();
    this.registerRoute();
  }

  protected registerRoute() {
    this.router.get('/', this.renderView(this.controller.getPosts));
    this.router.get('/:title', this.renderView(this.controller.getPost));
  }

  protected renderView(method: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      method
        .call(this.controller, req, res, next)
        .then((obj) => res.render(obj.view, obj.data))
        .catch((err) => next(err));
    };
  }
}
