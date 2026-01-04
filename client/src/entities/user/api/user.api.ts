import iAxios from "@/shared/api/iAxios";

// Видаляємо підписку на Героя
export const apiUserUnSubscription = async (email:string): Promise<boolean> => {
    try {
        const r = await iAxios.delete(`/user/unsubscription/${email}`);
        return r.data.stat || false;
    } catch(e){
        console.error(e);
        return false;
    }
}