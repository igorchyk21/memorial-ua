export const sanitizeForSQL = (str:string):string => {
    if (!str) return '';
    try {
        //return str.replace(/['"\\;`*#=<>]/g, '');
        return str
            .replace(/['"\\;`*#=<>]/g, '')
            //.replace(/--/g, '')
            .replace(/\/\*.*?\*\//g, '') // коментарі SQL /* ... */
            .replace(/\s+/g, ' ')        // звести пробіли до одного
            .trim();
    } catch(e) {
        return ''
    }
};

 