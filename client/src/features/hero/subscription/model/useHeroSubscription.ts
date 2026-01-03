import { heroAddSubscription, heroDeleteSubscription } from "@/entities/hero";
import { useAuth } from "@/shared/context/Auth";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useTranslations } from "next-intl";

export const useHeroSubscription = () => {

    const { auth, reFetchUser } = useAuth();     
    const { showToast } = useToast();
    const t = useTranslations();
    const handleClickSubscription = async (heroId:number) => {
        if (!auth?.user) return;

        if (auth.user.subscriptions?.includes(heroId)) {
            const resSub = await heroDeleteSubscription(heroId);
            await reFetchUser();
            if (!resSub) showToast(t('error'), 'danger');
        } else {
            const resSub = await heroAddSubscription(heroId);
            await reFetchUser();
            if (!resSub) showToast(t('error'), 'danger');
        }
    }

    return {
        handleClickSubscription
    }
}