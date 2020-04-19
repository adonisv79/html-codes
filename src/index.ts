/** List of globaly accepted client side error codes */
export enum clientErrorCodes {
  /** The server cannot or will not process the request due to an apparent client error */
  badRequest = 400,
  /** Similar to 403 Forbidden, but specifically for use when authentication
   * is required and has failed or has not yet been provided */
  unauthorized = 401,
  /** No standard but a form of error blocking access for requests where payments or credits are first required for access */
  paymentRequired = 402,
  /** The request contained valid data and was understood by the server, but the server is refusing action. */
  forbidden = 403,
  /** The requested resource could not be found "but" may be available in the future. */
  notFound = 404,
  /** A request method is not supported for the requested resource */
  methodNotAllowes = 405,
  /** The requested resource is capable of generating only content not acceptable
   * according to the Accept headers sent in the request. */
  notAcceptable = 406,
  /** The client must first authenticate itself with the proxy */
  proxyAuthenticationRequired = 407,
  /** The server timed out waiting for the request */
  requestTimeout = 408,
  /** Indicates that the request could not be processed because of conflict in the current state of 
   * the resource, such as an edit conflict between multiple simultaneous updates. */
  conflict = 409,
  /** Indicates that the resource requested is no longer available and will not be available again */
  gone = 410,
  /** The request did not specify the length of its content which is
   * the header Content-Length for HTTP requests */
  contentLengthRequired = 411,
  /** The server does not meet one of the preconditions that the requester put on the request header fields.
   * This includes header conditions like 'If-Match' and 'If-None-Match'. if neither exists throw 428 instead */
  preconditionFailed = 412,
  /** The request is larger than the server is willing or able to process */
  payloadTooLarge = 413,
  /** The URI provided was too long for the server to process. */
  uriTooLong = 414,
  /** The request entity has a media type which the server or resource does not support. */
  unsupportedMediaProvided = 415,
  /** The client has asked for a portion of the file (byte serving), but the server cannot supply that portion
   * this can be used when requesting for index ranges or paginations */
  rangeNotSatisfiable = 416,
  /** The resource that is being accessed is locked */
  resourceLocked = 423,
  /** Indicates that the server is unwilling to risk processing a request that might be replayed. */
  tooEarly = 425,
  /** client needs to upgrade first */
  upgradeRequired = 426,
  /** indicates that the request requires a precondition header such as 'If-Match' and 'If-None-Match'
   * intended for preventing 'lost updates' where 2 users have loaded and are updating the same resource versions */
  preconditionRequired = 428,
  /** The user has sent too many requests in a given amount of time (rate-limitting) */
  tooManyRequests = 429,
  /** The server is unwilling to process the request because either an individual header
   * field, or all the header fields collectively, are too large */
  headersTooLarge = 431,
  /** A server operator has received a legal demand to deny access to a resource
   * or to a set of resources that includes the requested resource. */
  illegal = 451,
}

/** List of globaly accepted server side error codes */
export enum serverErrorCodes {
  /** A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. */
  internalServer = 500,
  /** The server either does not recognize the request method, or it lacks the ability to fulfil the request. */
  notImplemented = 501,
  /** The server was acting as a gateway or proxy and received an invalid response from the upstream server. */
  badGateway = 502,
  /** The server cannot handle the request (because it is overloaded or down for maintenance) */
  serviceUnavailable = 503,
  /** The server was acting as a gateway or proxy and did not receive a timely response from the upstream server. */
  gatewayTimeout = 504,
  /** The server does not support the HTTP protocol version used in the request. */
  httpVersionNotSupported = 505,
  /** Transparent content negotiation for the request results in a circular reference. */
  variantAlsoNegotiates = 506,
  /** The server is unable to store the representation needed to complete the request. */
  insufficientStorage = 507,
  /** The server detected an infinite loop while processing the request */
  loopDetected = 508,
  /** Further extensions to the request are required for the server to fulfil it. */
  notExtended = 510,
  /** The client needs to authenticate to gain network access.
   * Intended for use by intercepting proxies used to control access to the network  */
  networkAuthenticationRequired = 511,
}

/** Extended javascript error class containing added statusCode and statusName properties */
export default class HttpError extends Error {
  private code: clientErrorCodes | serverErrorCodes;

  /**
   * Creates a new instance of an Error object with extended properties to define HTTP status codes
   * @param code The client or server error code to use
   * @param message The error message to send
   */
  constructor(code: clientErrorCodes | serverErrorCodes, message: string) {
    super(message);
    this.code = code;
  }
  
  /** Use this to validate if the error is an Http error or a normal error. 
   * if its normal error then condition "if (err.isHttpError)" yields falsy
   */
  get isHttpError(): boolean {
	  return true;
  }

  /** The numeric error code value */
  get statusCode(): number {
    return this.code.valueOf();
  }

  /** The human readable error code value */
  get statusName(): string {
    return this.code.toString();
  }
}
