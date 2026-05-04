import { heroSaveAdminComment } from "@/entities/hero";
import { useToast } from "@/shared/context/Toast/models/useToast";
import { useTranslations } from "next-intl";

export const useHeroComment = () => {
    const { showToast } = useToast();
    const t = useTranslations();

    const saveComment = async (heroId: number, comment: string): Promise<boolean> => {
        const ok = await heroSaveAdminComment(heroId, comment);
        if (ok) {
            showToast(t("hero.messCommentSaved"), "success");
        } else {
            showToast(t("error"), "danger");
        }
        return ok;
    };

    return { saveComment };
};
