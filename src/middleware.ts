import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname
  return NextResponse.redirect(
    `https://vapedeliverybangalore.com${url}`,
    { status: 301 }
  )
}

export const config = {
  matcher: '/(.*)',
}
