import { Locale, i18n } from "@/i18n.config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import './../globals.css'
import Providers from "@/components/provider";
interface IRootLayout {
    children: React.ReactNode
    params: {
        lang: Locale
    }
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Login Page",
    description: "",
};
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}
export default function AuthLayout({
    children,
    params: { lang },
}: IRootLayout) {

    if (!i18n.locales.includes(lang)) notFound()

    return (
        <Providers>
            <html>
                <body className={inter.className}>{children}</body>
            </html>
        </Providers>
    );
}
