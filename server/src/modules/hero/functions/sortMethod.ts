import { HeroListSortType } from "@global/types";

export const sortMethod:Record<HeroListSortType,string> = { 		
    name            : 'ORDER BY hero_lname' ,
    nameDesc        : 'ORDER BY hero_lname DESC',
    birth           : 'ORDER BY hero_birth',
    birthDesc       : 'ORDER BY hero_birth DESC',
    death           : 'ORDER BY hero_death',
    deathDesc       : 'ORDER BY hero_death DESC',
    ''              : 'ORDER BY ID DESC'
}