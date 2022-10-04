import { Router, Request, Response, NextFunction } from 'express';
import ResponseObject from '../common/response/response.object';
import ControllerBase from '../bases/controller.base';
import HttpStatus from '../types/response.type';

export default abstract class RouteBase {
  public router = Router();
  protected controller!: ControllerBase;

  constructor() {
    this.initial();
  }

  protected initial(): void {
    this.registerRoute();
  }

  protected abstract registerRoute(): void;

  protected responseHandler(
    method: (req: Request, res: Response, next: NextFunction) => Promise<ResponseObject<any>>,
    controller = this.controller
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      method
        .call(this.controller, req, res, next)
        .then((obj) => res.status(obj.status).json(obj))
        .catch((err) => next(controller.formatResponse((err as any).status || HttpStatus.INTERNAL_ERROR, err.message)));
    };
  }
}
