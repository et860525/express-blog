import { Request, Response, NextFunction } from 'express';

export default class PostViewController {
  public getPosts(req: Request, res: Response, next: NextFunction) {
    res.render('index');
  }
  public getPost(req: Request, res: Response, next: NextFunction) {
    const title = req.params.title;
    res.render('post', { title: title });
  }
}
