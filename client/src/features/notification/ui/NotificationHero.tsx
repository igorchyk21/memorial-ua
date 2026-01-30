import Image from "next/image";
import { NotificationGroup } from "../type/notification.type";
import conf from "@/shared/config/conf";
import Link from "next/link";
import NotificationItem from "./NotificationItem";
import { NotificationItemType } from "@global/types";
import { useGlobal } from "@/shared/context/Global/model/useGlobal";

 

interface Props {
    group: NotificationGroup;
    markAsRead: (item: NotificationItemType) => void;
    isReading: number | null;
}   

const NotificationHero = ({ group, markAsRead, isReading }: Props) => {
    const { setNotificationShow } = useGlobal();
    const heroLink = group.heroUrl;
    return (
        <article
            key={group.heroId}
            className="border rounded-3 p-3 bg-body-tertiary"
        >
            <div className="d-flex align-items-center mb-2">
                {group.heroPhoto && (
                    <div
                        className="flex-shrink-0 rounded overflow-hidden border me-2"
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    >
                        <Image
                            src={`${conf.dataUrl}/${group.heroPhoto}`}
                            alt={group.heroName || "Hero avatar"}
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                )}
                <div className="flex-grow-1 min-w-0">
                    <Link
                        onClick={()=>setNotificationShow(false)}
                        href={heroLink || ""}
                        className="text-decoration-none text-body"
                    >
                        <div className="fw-semibold text-truncate">
                            {group.heroName || ""}
                        </div>
                    </Link>
                </div>
            </div>

            <ul className="list-unstyled mb-0">
                {group.items.map((item) => {
                    return <NotificationItem key={item.ID} item={item} heroId={group.heroId} onMarkAsRead={markAsRead} isReading={isReading} />
                })}
            </ul>
        </article>
    );
}

export default NotificationHero;