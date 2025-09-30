export enum USER_STATUS {
    FORDOC = -1,
    ENABLE = 0
}
 
export enum API_USERS {
    USER_EXISTS = 1,
    USER_BLOCK = 2,
    USER_WRONG_EMAIL = 10
}

export enum DOCStatus {
    NEW = -2,       // З даним статусом консультанта ніде не видно
    BLOCK =-1,      // Заблокований консультант
    OPEN = 0,       // Відкритий на редагуванні
    APPROVED =1,    // Відправлений на підтвердження
    ACTIVE = 10,    // Активний
}

