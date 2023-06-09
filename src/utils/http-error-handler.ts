const GENERIC_MESSAGE = 'Something went wrong';

const STATUS_MESSAGES: Record<number, string> = {
  404: 'The server cannot find the requested resource. (404)',
  429: 'Too many requests, please try again later! (429)',
};

export function httpErrorHandler(response: Response) {
  if (!response?.status) return GENERIC_MESSAGE;

  if (STATUS_MESSAGES[response.status]) return STATUS_MESSAGES[response.status];

  return response.statusText || GENERIC_MESSAGE;
}
