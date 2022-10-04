import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../../bases/controller.base';
import HttpStatus from '../../../types/response.type';

export default class PostController extends ControllerBase {
  public async getPosts(req: Request, res: Response, next: NextFunction) {
    return this.formatResponse(HttpStatus.OK, 'Fucking');
  }
}
