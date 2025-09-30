 
const conf = { 
    domain          : process.env.NEXT_PUBLIC_DOMAIN,
    apiUrl          : process.env.NEXT_PUBLIC_API_URL,
    dataUrl         : process.env.NEXT_PUBLIC_DATA_URL, 
    recapthaId      : process.env.NEXT_PUBLIC_RECAPTCHA_ID||'',
    authGoogleId    : process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID||'',
}  



export default conf; 
