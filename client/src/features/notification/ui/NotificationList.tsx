import useNotificationList from "../model/useNotificationList";
import BaseSpinner from "@/shared/ui/spinners/BaseSpinner";
import Image from "next/image";
import Link from "next/link";
import conf from "@/shared/config/conf";
import { DateTime as DT } from "luxon";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { NotificationItemType } from "@global/types";
import NotificationItem from "./NotificationItem";
import NotificationHero from "./NotificationHero";

const NotificationList = () => {
    const { fetching, list, groups, markAsRead, isReading } = useNotificationList();
    const t = useTranslations();
 
    if (fetching) {
        return <BaseSpinner show={fetching} />;
    }

    if (!groups.length) {
        return (
            <div className="text-center text-muted py-4">
                {t("hero.notification.empty")}
            </div>
        );
    }

    return (
        <div className="d-flex flex-column gap-3">
            {groups.map((group) => {
                return <NotificationHero key={group.heroId} group={group} markAsRead={markAsRead} isReading={isReading} />
            })}
        </div>
    );
};

export default NotificationList;