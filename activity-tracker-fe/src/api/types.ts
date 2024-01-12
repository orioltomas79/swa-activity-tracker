export type { Activity, ActivityType } from "./apiClient.g.nswag";

export type ApiResponse<T> = SuccessResponse<T> | FailedResponse;

export interface SuccessResponse<T> {
  success: true;
  result: T;
}
export interface FailedResponse {
  success: false;
  statusCode: number;
  message: string;
  exceptionId?: ProblemDetails["ExceptionId"];
  validationErrors?: ValidationProblemDetails["errors"];
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  ExceptionId?: string | null;

  [key: string]: any;
}

export interface ValidationProblemDetails {
  errors?: { [key: string]: string[] };
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  ExceptionId?: string | null;

  [key: string]: any;
}

export type CallEndpointOptions = {
  showSnackbarOnFail?: boolean;
  skipSnackbarOnStatusCode?: number;
  errorMessage?: string;
};

export const defaultCallEndpointOptions: CallEndpointOptions = {
  showSnackbarOnFail: true,
};

export function isFailedResponse(obj: unknown): obj is FailedResponse {
  return (
    typeof obj === "object" &&
    obj != null &&
    "success" in obj &&
    obj.success === false &&
    "statusCode" in obj &&
    typeof obj.statusCode === "number" &&
    "message" in obj &&
    typeof obj.message === "string"
  );
}

export function isProblemDetails(obj: unknown): obj is ProblemDetails {
  return (
    typeof obj === "object" && obj !== null && "title" in obj && "status" in obj
  );
}

export function isValidationProblemDetails(
  obj: unknown
): obj is ValidationProblemDetails {
  return isProblemDetails(obj) && "errors" in obj;
}

export const HttpStatusCodes = {
  Status100Continue: 100,
  Status101SwitchingProtocols: 101,
  Status102Processing: 102,
  Status103EarlyHints: 103,
  Status200Ok: 200,
  Status201Created: 201,
  Status202Accepted: 202,
  Status203NonAuthoritativeInformation: 203,
  Status204NoContent: 204,
  Status205ResetContent: 205,
  Status206PartialContent: 206,
  Status207MultiStatus: 207,
  Status208AlreadyReported: 208,
  Status226ImUsed: 226,
  Status300MultipleChoices: 300,
  Status301MovedPermanently: 301,
  Status302Found: 302,
  Status303SeeOther: 303,
  Status304NotModified: 304,
  Status305UseProxy: 305,
  Status306Unused: 306,
  Status307TemporaryRedirect: 307,
  Status308PermanentRedirect: 308,
  Status400BadRequest: 400,
  Status401Unauthorized: 401,
  Status402PaymentRequired: 402,
  Status403Forbidden: 403,
  Status404NotFound: 404,
  Status405MethodNotAllowed: 405,
  Status406NotAcceptable: 406,
  Status407ProxyAuthenticationRequired: 407,
  Status408RequestTimeout: 408,
  Status409Conflict: 409,
  Status410Gone: 410,
  Status411LengthRequired: 411,
  Status412PreconditionFailed: 412,
  Status413PayloadTooLarge: 413,
  Status414UriTooLong: 414,
  Status415UnsupportedMediaType: 415,
  Status416RangeNotSatisfiable: 416,
  Status417ExpectationFailed: 417,
  Status418ImATeapot: 418,
  Status421MisdirectedRequest: 421,
  Status422UnprocessableEntity: 422,
  Status423Locked: 423,
  Status424FailedDependency: 424,
  Status425TooEarly: 425,
  Status426UpgradeRequired: 426,
  Status428PreconditionRequired: 428,
  Status429TooManyRequests: 429,
  Status431RequestHeaderFieldsTooLarge: 431,
  Status451UnavailableForLegalReasons: 451,
  Status500InternalServerError: 500,
  Status501NotImplemented: 501,
  Status502BadGateway: 502,
  Status503ServiceUnavailable: 503,
  Status504GatewayTimeout: 504,
  Status505HttpVersionNotSupported: 505,
  Status506VariantAlsoNegotiates: 506,
  Status507InsufficientStorage: 507,
  Status508LoopDetected: 508,
  Status510NotExtended: 510,
  Status511NetworkAuthenticationRequired: 511,
} as const;
