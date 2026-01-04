import { apiUserUnSubscription } from "../api/user.api";

export const userUnSubscription = async (email:string): Promise<boolean> => {
    return await apiUserUnSubscription(email);
}