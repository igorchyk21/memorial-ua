import { safeIntParse } from "../safeParsers";

export const stringUrlIdCortage = (urlWidthId:string): [number, string]=>{
    const [url, id] = urlWidthId.split(/-(?=[^-]*$)/);
    return [safeIntParse(id,0), url];
}
