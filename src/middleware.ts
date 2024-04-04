import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { i18n } from "./i18n.config"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(
                `/vn/${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        )
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|images|svg|favicon.ico|sitemap).*)",
    ],
}
