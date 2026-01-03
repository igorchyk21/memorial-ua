"use client"

import UserAvatarFull from "@/shared/ui/avatar/UserAvatarFull";
import useCandleList from "../model/useCandleList";
import BaseSpinner from "@/shared/ui/spinners/BaseSpinner";
import { DateTime as DT } from "luxon";
import { CandleShow } from "@/entities/hero";

interface Props {
    heroId:number;
}

const HeroCandleList = ({heroId}:Props) => {

    const { candles } = useCandleList(heroId); 
    return (
        <div>
            {candles
                ? (<div>
                    {candles.map((candle) => (
                        <div key={candle.ID} className="py-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <UserAvatarFull
                                    picture={candle.userPicture}
                                    name={candle.userName||''}
                                    description={DT.fromMillis(candle.dt||0).setLocale("uk").toLocaleString(DT.DATETIME_MED)}/>
                                
                                <CandleShow 
                                    expiries={candle.expiries<Date.now()}
                                    maxWidth={20}/> 
                            </div>
                            <div className="mt-2 mb-2 pb-4 border-1 border-bottom">
                                {candle.comment}
                            </div>
                        </div>
                    ))}
                </div>)

                : (<BaseSpinner show={true}/>)}
        </div>
    )
}
 
export default HeroCandleList;