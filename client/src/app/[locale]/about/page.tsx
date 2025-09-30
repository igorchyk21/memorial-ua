import { getLocale, getTranslations } from "next-intl/server";

const Page = async () => {

    const locale = getLocale();
    const t = await getTranslations()
    
    return (
        <h1>About {locale} {t('title')}</h1>
    )
}

export default Page;