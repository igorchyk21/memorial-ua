 
 
import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";
 
const locales = ["ua", "ru", "en"];

export default async function mainMiddleware(req:NextRequest) {
    const { nextUrl } = req;
    if (req.nextUrl.pathname === "/favicon.ico") {
        return NextResponse.next(); // Пропускаємо запит
    }


    // Маршутизатор i18n
    const intlMiddleware = createMiddleware(routing);
    return intlMiddleware(req); // Виконуємо middleware для локалізації
    
}

export const config = {
    // Вказуємо, що middleware буде застосовуватися тільки до динамічних маршрутів
    matcher: ["/((?!_next/static|_next/image|_next/img|sitemap-market.xml|favicon.ico|css|api|.*\\.(?:png|svg|jpg|jpeg|md|mp4)$).*)",],
};

