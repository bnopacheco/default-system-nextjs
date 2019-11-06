import cookie from 'js-cookie';

export const setCookie = (key: string, value: string, keep: boolean) => {
   if (process.browser) {
       if (keep) {
           cookie.set(key, value, {
               expires: 1,
               path: '/'
           });
        } else {
            cookie.set(key, value);
       }
   }
};

export const removeCookie = (key: string) => {
   if (process.browser) {
       cookie.remove(key);
   }
};

export const getCookie = (key, req?) => {
   return process.browser
       ? getCookieFromBrowser(key)
       : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
   return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
   if (!req.headers.cookie) {
       return undefined;
   }
   const rawCookie = req.headers.cookie
       .split(';')
       .find((c) => c.trim().startsWith(`${key}=`));
   if (!rawCookie) {
       return undefined;
   }
   return rawCookie.split('=')[1];
};
