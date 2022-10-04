import HttpStatus from '../types/response.type';
import ResponseObject from '../common/response/response.object';

export default abstract class ControllerBase {
  public formatResponse(status: HttpStatus = HttpStatus.INTERNAL_ERROR, data: any): ResponseObject<any> {
    const options: any = { status };

    status >= 400 ? (options.message = data) : (options.data = data);

    const responseObject = new ResponseObject(options);

    return responseObject;
  }
}
