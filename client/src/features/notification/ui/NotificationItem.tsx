import { NotificationItemType } from "@global/types";
import { useTranslations } from "next-intl";
import { DateTime as DT } from "luxon";
import SpinnerTitle from "@/shared/ui/spinners/SpinnerTitle";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";

interface Props {
    item: NotificationItemType;
    heroId: number;
    onMarkAsRead?: (item: NotificationItemType) => void;
    isReading?: number|null;
}

const getNotificationTitleKey = (typeValue: number): string => {
    switch (typeValue) {
        case 1:
            return "hero.notification.heroCreated";
        case 2:
            return "hero.notification.postCreated";
        case 3:
            return "hero.notification.photoUploaded";
        case 4:
            return "hero.notification.videoAdd";
        case 5:
            return "hero.notification.audioAdd";
        case 6:
            return "hero.notification.candleFree";
        case 7:
            return "hero.notification.candlePaid";
        case 8:
            return "hero.notification.flowerFree";
        case 9:
            return "hero.notification.flowerPaid";
        default:
            return "hero.notification.heroCreated";
    }
};

const NotificationItem = ({ item, heroId, onMarkAsRead, isReading }: Props) => {
    const { notificationShow } = useGlobal();
    const t = useTranslations();
    const anyItem = item as any;
    const typeValue: number = Number(anyItem.type ?? anyItem.eventType ?? 0);
    const title = t(getNotificationTitleKey(typeValue));
    const dtValue: number = Number(anyItem.dt ?? 0);
    const dtLabel =
        dtValue > 0
            ? DT.fromMillis(dtValue)
                  .setLocale("uk")
                  .toLocaleString(DT.DATETIME_SHORT)
            : "";

    return (
        <li
            key={anyItem.ID ?? `${heroId}-${typeValue}-${dtValue}`}
            className="d-flex align-items-start py-2 border-top"
        >
            <div className="flex-grow-1 pe-2">
                <div className="fw-semibold">{title}</div>
                {dtLabel && (
                    <div className="small text-muted">
                        {dtLabel}
                    </div>
                )}
            </div>
            <div>
            <button
                type="button"
                className="btn btn-sm btn-icon btn-outline-secondary rounded-circle ms-1"
                onClick={() =>
                    onMarkAsRead && onMarkAsRead(item)
                }
            >
                <SpinnerTitle
                    showSpinner={item.ID === isReading}
                    className=""
                    titleButton={<i className="ci-close" />}/>
                
            </button>
            </div>
        </li>
    );
}

export default NotificationItem;