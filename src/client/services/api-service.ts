export async function apiService<T = any>(
  uri: string,
  method: string = "GET",
  data?: any,
  type: string = "application/json"
) {
  const TOKEN = localStorage.getItem("token");

  const headers: HeadersInit = {};

  const fetchOptions: IFetchOptions = {
    method,
    headers,
    body: type === "application/json" ? JSON.stringify(data) : data,
  };

  if (type !== "multipart/form-data") {
    headers["Content-Type"] = type;
  }

  if (TOKEN) {
    headers["Authorization"] = `Bearer ${TOKEN}`;
  }

  if (method == "GET") {
    delete headers["Content-Type"];
    delete fetchOptions.body;
  }

  try {
    const res = await fetch(uri, fetchOptions);

    if (res.status === 400) {
      throw new Error("Bad Request");
    }

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (res.status === 404) {
      throw new Error("Not Found");
    }

    if (res.status === 500) {
      throw new Error("Internal Server Error");
    }

    if (res.ok) {
      return <T>await res.json();
    }
  } catch (error) {
    console.error("[error]", error.message);
    throw error;
  }
}

interface IFetchOptions {
  method: string;
  headers?: HeadersInit;
  body?: string;
}
