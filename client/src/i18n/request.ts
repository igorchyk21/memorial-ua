import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const modules = ['common', 'auth', 'hero', 'map', 'seo']; // перелік модулів

  const messagesEntries = await Promise.all(
    modules.map(async (mod) => {
      const msg = await import(`../../messages/${locale}/${mod}.json`);
      return [mod, msg.default] as const;
    })
  ); 

  const messages = messagesEntries.reduce((acc, [mod, content]) => {
    if (mod === 'common') {
      Object.assign(acc, content); // без namespace
    } else {
      acc[mod] = content; // як namespace
    }
    return acc;
  }, {} as Record<string, any>);
  
    return {
      locale,
      messages
    };
  });

 