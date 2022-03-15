// Error Handlers
// ========================================================
/**
 * Bad Request
 */
export class BadRequest extends Error {
  public __proto__: Error;
  public httpStatusCode: number;

  constructor(message?: string) {
    const trueProto = new.target.prototype;
    super(message);
    this.httpStatusCode = 400;
    this.__proto__ = trueProto;
  }
}

/**
 * Forbidden Request
 */
export class Forbidden extends Error {
  public __proto__: Error;
  public httpStatusCode: number;

  constructor(message?: string) {
    const trueProto = new.target.prototype;
    super(message);
    this.httpStatusCode = 403;
    this.__proto__ = trueProto;
  }
}

/**
 * NotFound Request
 */
export class NotFound extends Error {
  public __proto__: Error;
  public httpStatusCode: number;

  constructor(message?: string) {
    const trueProto = new.target.prototype;
    super(message);
    this.httpStatusCode = 404;
    this.__proto__ = trueProto;
  }
}
