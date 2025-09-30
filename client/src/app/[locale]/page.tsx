import { HomePage } from "@/pages";
import { getTranslations, setRequestLocale } from "next-intl/server";

const Page = async ({params}:{params:any}) => {
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations()
    
    return (<>
        <h1>Home Page {locale} {t('title')}</h1>
        <hr/>
        <HomePage/>
        </>
    )   
}

export default Page;