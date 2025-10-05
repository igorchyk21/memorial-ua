import { contentBigSlider } from "@/entities/content/model/contentMode";
import { heroList } from "@/entities/hero/intex";
import { HeroesPage, HeroPage, HomePage } from "@/epages";
import { _cnMain, _cnMainContainer } from "@/shared/const";
import { HeroListRequestParams } from "@global/types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Container } from "react-bootstrap";

const Page = async ({params}:{params:any}) => {
    const {locale, heroUrl} = await params;
    setRequestLocale(locale);
    const t = await getTranslations()
    
    return (
        <main className="container mx-auto p-5 m-5 text-center">
        <h1>404</h1>
        <h2 className="font-bold mb-2">Сторінка Героя відсутня</h2>
        <p className="text-muted-foreground mb-6">
            Вибачте, даний функціонал знаходиться у стадії розробки
        </p>
        <Link href="/" className="inline-block underline">
            На головну
        </Link>
    </main>)   
}

export default Page;