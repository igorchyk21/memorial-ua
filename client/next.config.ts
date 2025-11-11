import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port:'3333',
            pathname: '/data/**',
        },
        {
            protocol: 'https',
            hostname: 'server.geroi.com.ua',
            pathname: '/data/**',
        },

    ],
  },
  sassOptions: {
    // приглушити попередження з node_modules
    quietDeps: true,
    // вибірково вимкнути депрекейшени (Dart Sass ≥1.63)
    silenceDeprecations: [
      'import',            // @import
      'color-functions',   // red/green/blue
      'global-builtin'     // adjust-color
      // 'legacy-js-api'    // за потреби
    ]
  }
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);