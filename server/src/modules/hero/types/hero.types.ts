import { HeroShortType } from "@global/types";

export type rowHeroShortType = Omit<HeroShortType, 'hero_slides'> & {
    hero_slides?:string;
}