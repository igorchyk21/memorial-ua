export interface WayForPayRequestData {
    merchantAccount: string;
    merchantDomainName: string;
    serviceUrl: string;
    authorizationType: string;
    merchantSignature: string;
    orderReference: string;
    orderDate: number;
    amount: string;
    currency: string;
    productName: string;
    productPrice: string;
    productCount: string;
    language: string;
    [key: string]: any;
}
