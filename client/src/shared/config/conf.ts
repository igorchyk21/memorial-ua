
const conf = { 
    domain          : process.env.NEXT_PUBLIC_DOMAIN,
    apiUrl          : process.env.NEXT_PUBLIC_API_URL,
    dataUrl         : process.env.NEXT_PUBLIC_DATA_URL, 
    recapthaId      : process.env.NEXT_PUBLIC_RECAPTCHA_ID||'',
    authGoogleId    : process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID||'',

    social:{
        facebook1   : process.env.NEXT_PUBLIC_FACEBOOK1, 
        facebook2   : process.env.NEXT_PUBLIC_FACEBOOK2,
        instagram1  : process.env.NEXT_PUBLIC_INSTAGRAM1,
        instagram2  : process.env.NEXT_PUBLIC_INSTAGRAM2,
        tiktok      : process.env.NEXT_PUBLIC_TIKTOK
    }
}  



export default conf; 
