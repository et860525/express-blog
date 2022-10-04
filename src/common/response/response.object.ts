import HttpStatus from '../../types/response.type';

/* -------------------------------------------------------------------------- */
/*                       For controller response format                       */
/* -------------------------------------------------------------------------- */
export default class ResponseObject<T> {
  public readonly status: HttpStatus = HttpStatus.OK;
  public readonly message: string = '';
  public readonly data: any = null;

  constructor(options: { status?: HttpStatus; message?: string; data?: any }) {
    this.status = options.status || this.status;
    this.message = options.message || this.message;
    this.data = options.data || this.data;
  }
}
