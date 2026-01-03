 import { Pool } from "mysql2/promise";
import conf from "../../config/conf.js";
 import crypto from "crypto";
import { WayForPayRequestData } from "@global/types";
import { DecodedReference, decodeReference } from "../helpers/functions/decodeReference.js";
import _heroCandle from "../hero/candle.js";
 

export const payStatus: Record<string, number> = {
    Approved: 1,
    Pending: 2,
    Refunded: 3,
    Voided: 4,
    Error: 5,
};

let conn:Pool;
const setConn = (_conn:Pool) => { conn = _conn };

// Стартова функція обробки повідомлення від wfp
const processing = async (wfpData:any) => {
    // Розбираємо референс
    const dRef = decodeReference(wfpData?.orderReference||'');
    if (!dRef) return false;
    const { days, candleId } = dRef;
    if (!candleId || !days) return false;
    const paymentStatus = ['Approved', 'Pending'].includes(wfpData?.transactionStatus||'') ? 1 : 0;
    const resPayment = await _heroCandle.payment2Candle(candleId, paymentStatus, days, wfpData); 
    if (!resPayment) return false;
    return true;
}

// Свторюємо підпис на основі запиту
const createSignature =(wpData:WayForPayRequestData, dRef:DecodedReference, docSecretKey?:string) => {
    const wfpSignature =
        `${wpData.merchantAccount};`+
        `${wpData.merchantDomainName};`+
        `${wpData.orderReference};`+
        `${wpData.orderDate};`+
        `${wpData.productPrice};`+
        `${wpData.currency};`+
        `${wpData.productName};`+
        `1;`+
        `${wpData.productPrice}`;

    return wfpMd5(wfpSignature)
}

// Стоврення форми для бікунг оплати
const createWfpForm4Candle = async (candleId:number, price:number, days:number, returnUrl:string) => {

    // Отримуємо базові дані та генеруємо референс платежу на основі міту
    const dt = Date.now();
    const reference = `candle-${candleId}-${days}-${Date.now()}`;
    const dRef = decodeReference(reference);
    if (!dRef) return null;

    // Генеруємо платіжнку структуру 
    const wpData:WayForPayRequestData = {
        merchantAccount     : conf.wfpMerchant,			
        merchantDomainName  : conf.domain,
        serviceUrl          : `${conf.wfpHook}/hook`,
        authorizationType   : "SimpleSignature", 				
        merchantSignature   : '',
        orderReference      : reference,			
        orderDate           : dt, 	 			
        amount              : price.toFixed(2), 				
        currency            : 'UAH', 				
        productName         : conf.wfpTitle,				
        productPrice        : price.toFixed(2),				
        productCount        : "1", 
        language            : 'ua',				
        returnUrl           : `${conf.wfpHook}/return/?url=${returnUrl}`,
    }
 
    // Генеруємо підпис
    const merchantSignature = await createSignature(wpData, dRef, conf.wfpSecretKey);
    wpData.merchantSignature = merchantSignature || '';

    // Генеруємо інпути зі значеннями для форми wfp
    let inputsHTML = '';
    for(const input in wpData) {
        inputsHTML = `${inputsHTML}<input name="${input}" value="${wpData?.[input]||""}"></input>`
    }
 
    // Повертаємо форму wfp для сабміту і перехожу на платіжну сторінку
    return `
        <form style="display:none"
            id="autoSubmitForm" method="post" action="https://secure.wayforpay.com/pay" accept-charset="utf-8">
            ${inputsHTML}
            <button type="submit">Submit</button>
        </form>
        
        <script>
            // Автосабміт після вставки форми у документ
            setTimeout(() => {
            const form = document.getElementById('autoSubmitForm');
            if (form) form.submit();
            }, 100);
        </script>`;

}

 
// Шифруюємо стрічку з ключем wfp 
const wfpMd5 = async (wfpSignature:string) =>{
    // Визначаємо секреткей - свій або фахівця
    const secretKey = conf.wfpSecretKey; 
    const hash = crypto.createHmac("md5", secretKey || '').update(wfpSignature).digest("hex");
    return hash;
}

// Формує відповідь для wfp
const answer = async (wfpData:any) => {
    const answer = {
        orderReference  : wfpData?.orderReference||``,
        status          : `accept`,
        time            : Math.floor(Date.now() / 1000),   
        signature       : ''
    }
    
    const dRef = decodeReference(wfpData?.orderReference||'');
    if (!dRef) return false;
 
    answer.signature = await wfpMd5(`${answer.orderReference};${answer.status};${answer.time}`) || '';
    return answer;
}

// Додаємо подію платежа до архіву
export const payment2Base = async (wfpData:any): Promise<boolean> => {
    if (!conn) return false;

    const reference = wfpData?.orderReference ?? null;
    if (!reference) return false;

    const dt = Date.now();

    const sql = `
        INSERT INTO payments_history 
            (dt, payment_system, reference, json) 
        VALUES (?,?,?,?)
    `;

    const params = [
        dt,
        "wfp",
        reference,
        JSON.stringify(wfpData),
    ];

    try {
        await conn.execute(sql, params);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default {
    setConn,
    payment2Base,
    createWfpForm4Candle,
    answer,
    processing
}
