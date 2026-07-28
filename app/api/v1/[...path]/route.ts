import { NextRequest, NextResponse } from 'next/server';

// Proxies /api/v1/* to the real backend. This replaces the old plain
// next.config.ts rewrite because the backend's CORS layer rejects (500s)
// any Origin it doesn't recognize - in production the browser's real
// Origin (istc.co.ke / www.istc.co.ke) is already allow-listed there, but
// in local dev the Origin is http://localhost:3000, which isn't. We only
// override the Origin header in development so production behavior is
// unchanged from the previous rewrite.

const BACKEND_ORIGIN = 'https://admin.istc.co.ke';
const DEV_ALLOWED_ORIGIN = 'https://istc.co.ke';

async function proxy(req: NextRequest, path: string[]): Promise<NextResponse> {
  const targetUrl = `${BACKEND_ORIGIN}/api/v1/${path.join('/')}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');
  if (process.env.NODE_ENV === 'development') {
    headers.set('origin', DEV_ALLOWED_ORIGIN);
  }

  const hasBody = !['GET', 'HEAD'].includes(req.method);

  const backendResponse = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: hasBody ? await req.arrayBuffer() : undefined,
    redirect: 'manual',
  });

  const responseHeaders = new Headers(backendResponse.headers);
  responseHeaders.delete('content-encoding');
  responseHeaders.delete('content-length');

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    headers: responseHeaders,
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}
export async function POST(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}
export async function PUT(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  return proxy(req, (await params).path);
}
