import ReactMarkdown from "react-markdown";
import { _cnMain } from "@/shared/const";
import { buildBasePageMetadata } from "@/shared/helper/seo/seoHelpers";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import fs from 'node:fs/promises';
import path from 'node:path';
import { Container } from "react-bootstrap";

const allowedPages = ["offer", "cookies", "privacy"] as const;
type InfoPageSlug = (typeof allowedPages)[number];

export const generateMetadata = async ({ params }: { params: any }): Promise<Metadata> => {
    const { locale, page } = await params;
    if (!allowedPages.includes(page as InfoPageSlug)) return {};

    setRequestLocale(locale);
    const t = await getTranslations();

    return buildBasePageMetadata({
        locale,
        path: `/${locale}/info/${page}`,
        pageKey: `info.${page}`,
        t,
    });
};

const Page = async ({params}:{params:any}) => {
    const {locale, page} = await params;
    setRequestLocale(locale);

    if (!allowedPages.includes(page as InfoPageSlug)) return notFound();

    let md = '';
    try {
        const filePath = path.join(process.cwd(), 'client', 'public', 'memorial', 'md', `${page}.md`);
        md = await fs.readFile(filePath, 'utf8');
    } catch(e){
        return notFound();
    }

    return (
        <main className={_cnMain}> 
            <Container className="py-4 info-pages">
            <ReactMarkdown>{md}</ReactMarkdown>
            </Container>
        </main>)   
}

export default Page;