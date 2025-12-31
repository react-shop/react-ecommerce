import * as jwt from 'jsonwebtoken';

export class BaseController {
  protected getUserIdFromToken(authorization) {
    if (!authorization) return null;

    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.SECRET);
    return decoded.id;
  }
}
