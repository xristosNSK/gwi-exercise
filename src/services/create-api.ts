function serializeParams(params: Record<string, any>) {
  const searchParams = params && Object.keys(params).length ? new URLSearchParams(params) : null;
  return searchParams ? `?${searchParams.toString()}` : '';
}

function responseCallback(response: Response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(response);
}

export function createApi(baseUrl: string, headers: Record<string, string> = {}) {
  const finalHeaders = {
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return {
    get(url: string, params?: Record<string, any>) {
      return fetch(`${baseUrl}${url}${serializeParams(params)}`, { headers: finalHeaders }).then(
        responseCallback
      );
    },

    post(url: string, body: any, params?: Record<string, any>) {
      return fetch(`${baseUrl}${url}${serializeParams(params)}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: finalHeaders,
      }).then(responseCallback);
    },

    delete(url: string, params?: Record<string, any>) {
      return fetch(`${baseUrl}${url}${serializeParams(params)}`, {
        method: 'DELETE',
        headers: finalHeaders,
      }).then(responseCallback);
    },
  };
}
