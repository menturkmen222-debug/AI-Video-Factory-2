import { getHTML, getCSS, getAPIJS, getAppJS } from '../frontend/assets';

const contentTypes: Record<string, string> = {
  'html': 'text/html; charset=utf-8',
  'css': 'text/css; charset=utf-8',
  'js': 'application/javascript; charset=utf-8',
  'json': 'application/json; charset=utf-8',
};

const spaRoutes = [
  '/',
  '/index.html',
  '/dashboard',
  '/upload',
  '/queue',
  '/logs',
  '/settings',
];

export function handleFrontend(path: string): Response {
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (spaRoutes.includes(path)) {
    return new Response(getHTML(), {
      status: 200,
      headers: { ...headers, 'Content-Type': contentTypes.html }
    });
  }

  if (path === '/css/styles.css') {
    return new Response(getCSS(), {
      status: 200,
      headers: { ...headers, 'Content-Type': contentTypes.css }
    });
  }

  if (path === '/js/api.js') {
    return new Response(getAPIJS(), {
      status: 200,
      headers: { ...headers, 'Content-Type': contentTypes.js }
    });
  }

  if (path === '/js/app.js') {
    return new Response(getAppJS(), {
      status: 200,
      headers: { ...headers, 'Content-Type': contentTypes.js }
    });
  }

  return new Response(null, { status: 404 });
}

export function isFrontendPath(path: string): boolean {
  const frontendPaths = [
    ...spaRoutes,
    '/css/styles.css',
    '/js/api.js',
    '/js/app.js',
  ];
  return frontendPaths.includes(path);
}