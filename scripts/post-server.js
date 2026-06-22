const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const bindHost = process.env.HOST || "127.0.0.1";
const canonicalHost = process.env.CANONICAL_HOST || "localhost";
const port = Number(process.env.PORT || 8081);
const basePath = normalizeBasePath(process.env.BASE_PATH || "/webauthn-viewer/");
const loginPostPath = `${basePath}login`;
const docsDir = path.resolve(
  __dirname,
  "..",
  process.env.BUILD_OUTPUT_DIR || "docs"
);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function send(res, statusCode, headers, body = "") {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1024 * 1024) {
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

function normalizeBasePath(value) {
  if (!value || typeof value !== "string") {
    return "/";
  }

  const pathname = value.split(/[?#]/)[0];
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function appendParams(target, source) {
  for (const [key, value] of source.entries()) {
    target.set(key, value);
  }
}

function buildLoginRedirect(body, queryParams) {
  const formParams = new URLSearchParams(queryParams);
  appendParams(formParams, new URLSearchParams(body));
  const redirectBasePath = normalizeBasePath(formParams.get("basePath") || basePath);

  formParams.delete("password");
  formParams.delete("basePath");
  formParams.set("loginCompleted", "true");

  if (isLoopbackIpAddress(formParams.get("rpId"))) {
    formParams.set("rpId", canonicalHost);
  }

  return `${redirectBasePath}?${formParams.toString()}`;
}

function isLoopbackIpAddress(value) {
  return value === "127.0.0.1" || value === "::1" || value === "[::1]";
}

function hostHeaderName(hostHeader) {
  if (!hostHeader) {
    return "";
  }

  if (hostHeader.startsWith("[")) {
    const closingBracket = hostHeader.indexOf("]");
    return closingBracket === -1 ? hostHeader : hostHeader.slice(1, closingBracket);
  }

  return hostHeader.split(":")[0];
}

function redirectLoopbackIpToLocalhost(req, res) {
  const hostname = hostHeaderName(req.headers.host);
  if (!isLoopbackIpAddress(hostname)) {
    return false;
  }

  const location = `http://${canonicalHost}:${port}${req.url}`;
  send(res, 308, {
    Location: location,
    "Cache-Control": "no-store",
    "Content-Type": "text/plain; charset=utf-8",
  });
  return true;
}

async function handleLoginPost(req, res, requestUrl) {
  try {
    const body = await readRequestBody(req);
    const location = buildLoginRedirect(body, requestUrl.searchParams);
    send(res, 303, {
      Location: location,
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    });
  } catch (error) {
    send(
      res,
      400,
      {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
      error.message
    );
  }
}

function resolveStaticPath(pathname) {
  if (pathname === "/") {
    return path.join(docsDir, "index.html");
  }

  if (!pathname.startsWith(basePath)) {
    return null;
  }

  const relativePath = decodeURIComponent(pathname.slice(basePath.length));
  const normalizedPath = path.normalize(relativePath || "index.html");

  if (normalizedPath.startsWith("..") || path.isAbsolute(normalizedPath)) {
    return null;
  }

  const filePath = path.join(docsDir, normalizedPath);
  return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
    ? path.join(filePath, "index.html")
    : filePath;
}

function serveStatic(req, res, pathname) {
  const filePath = resolveStaticPath(pathname);
  if (!filePath || !filePath.startsWith(docsDir)) {
    send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Not found");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      const spaFallback = path.join(docsDir, "index.html");
      fs.readFile(spaFallback, (fallbackError, fallbackContent) => {
        if (fallbackError) {
          send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Not found");
          return;
        }

        send(res, 200, {
          "Cache-Control": "no-store",
          "Content-Type": mimeTypes[".html"],
        }, fallbackContent);
      });
      return;
    }

    send(res, 200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
    }, content);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(
    req.url,
    `http://${req.headers.host || `${canonicalHost}:${port}`}`
  );

  if (redirectLoopbackIpToLocalhost(req, res)) {
    return;
  }

  if (req.method === "POST" && requestUrl.pathname === loginPostPath) {
    handleLoginPost(req, res, requestUrl);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, {
      Allow: "GET, HEAD, POST",
      "Content-Type": "text/plain; charset=utf-8",
    }, "Method not allowed");
    return;
  }

  serveStatic(req, res, requestUrl.pathname);
});

server.listen(port, bindHost, () => {
  console.log(`POST test server running at http://${canonicalHost}:${port}${basePath}`);
  console.log(`Login POST endpoint: http://${canonicalHost}:${port}${loginPostPath}`);
});
