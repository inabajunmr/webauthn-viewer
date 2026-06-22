const MAX_BODY_SIZE = 1024 * 1024;

function normalizeBasePath(value) {
  if (!value || typeof value !== "string") {
    return "/";
  }

  const path = value.split(/[?#]/)[0];
  if (!path.startsWith("/") || path.startsWith("//")) {
    return "/";
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function inferBasePath(pathname) {
  const loginSuffix = "/login";
  if (!pathname.endsWith(loginSuffix)) {
    return "/";
  }

  const basePath = pathname.slice(0, -loginSuffix.length);
  return normalizeBasePath(basePath || "/");
}

function appendParams(target, source) {
  for (const [key, value] of source.entries()) {
    target.set(key, value);
  }
}

function appendObjectParams(target, source) {
  Object.entries(source).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => target.append(key, item));
      return;
    }

    if (value !== undefined && value !== null) {
      target.set(key, value);
    }
  });
}

function readRequestBody(req) {
  if (typeof req.body === "string") {
    return Promise.resolve(req.body);
  }

  if (Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body.toString("utf8"));
  }

  if (req.body && typeof req.body === "object") {
    const params = new URLSearchParams();
    appendObjectParams(params, req.body);
    return Promise.resolve(params.toString());
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_SIZE) {
        reject(new Error("Request body is too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

module.exports = async function login(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.statusCode = 405;
    res.end("Method not allowed");
    return;
  }

  try {
    const headers = req.headers || {};
    const requestUrl = new URL(
      req.url || "/login",
      `https://${headers.host || "localhost"}`
    );
    const params = new URLSearchParams(requestUrl.search);
    const body = await readRequestBody(req);
    appendParams(params, new URLSearchParams(body));

    const basePath = normalizeBasePath(
      params.get("basePath") || inferBasePath(requestUrl.pathname)
    );

    params.delete("password");
    params.delete("basePath");
    params.set("loginCompleted", "true");

    const queryString = params.toString();
    const location = queryString ? `${basePath}?${queryString}` : basePath;

    res.statusCode = 303;
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Location", location);
    res.end("See Other");
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Cache-Control", "no-store");
    res.end(error.message);
  }
};
