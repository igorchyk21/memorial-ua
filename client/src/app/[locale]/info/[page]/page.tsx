import ReactMarkdown from "react-markdown";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import fs from 'node:fs/promises';
import path from 'node:path';
import { Container } from "react-bootstrap";

const Page = async ({params}:{params:any}) => {
    const {locale, page} = await params;
    setRequestLocale(locale);
    const t = await getTranslations()

    if (!['offer', 'cookies', 'privacy'].includes(page)) return notFound();

    let md = '';
    try {
        const filePath = path.join(process.cwd(), 'public', 'memorial', 'md', `${page}.md`); // /public/public_offer.md
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