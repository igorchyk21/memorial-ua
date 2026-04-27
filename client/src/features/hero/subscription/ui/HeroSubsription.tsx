"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "@/shared/context/Auth";
import { useHeroSubscription } from "../model/useHeroSubscription";
import BlockSpinner from "@/shared/ui/spinners/BlockSpinner";
import { useTranslations } from "next-intl";

interface Props {
    heroId: number;
}

const HeroSubsription = ({ heroId }: Props) => {
    const { auth, setShowOffAuth } = useAuth();
    const { handleClickSubscription } = useHeroSubscription();
    const [isPending, setIsPending] = useState(false);
    const t = useTranslations();

    const isSubscribed = Boolean(auth?.user?.subscriptions?.includes(heroId));
    const isAuthorized = Boolean(auth?.isLogin);
    const isDisabled = isPending || !isAuthorized;

    return (
        <div className="border rounded-4 p-3 p-sm-4 mb-4 bg-body-tertiary position-relative">
            <BlockSpinner show={isPending} borderRadius="1rem" />
            <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-start">
                <div className="flex-grow-1">
                    <h5 className="mb-2 d-flex align-items-center gap-2">
                        <i className="ci-heart-filled text-danger" aria-hidden="true" />
                        {isSubscribed ? t("hero.subscription.titleSubscribed") : t("hero.subscription.title")}
                    </h5>
                    <p className="mb-0 fs-14 text-secondary" style={{ lineHeight: 1.45 }}>
                        {isSubscribed ? t("hero.subscription.descriptionSubscribed") : t("hero.subscription.description")}
                    </p>
                </div>

                {isAuthorized ? (
                    <Button
                        type="button"
                        disabled={isDisabled}
                        variant={isSubscribed ? "outline-primary" : "primary"}
                        className="px-4 align-self-start"
                        onClick={async () => {
                            setIsPending(true);
                            await handleClickSubscription(heroId);
                            setIsPending(false);
                        }}
                    >
                        {isSubscribed ? t("hero.subscription.unsubscribe") : t("hero.subscription.subscribe")}
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="primary"
                        className="px-4 align-self-start"
                        onClick={() => setShowOffAuth("login")}
                    >
                        {t("hero.subscription.login")}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default HeroSubsription;