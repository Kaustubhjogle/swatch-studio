import { defineConfig, loadEnv } from 'vite';
import { structuredData } from './scripts/search-data.js';

function publicOrigin(value) {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || /^(localhost|127\.|0\.|\[?::1|.*\.local$)/i.test(url.hostname) || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('VITE_SITE_URL must be the approved public HTTPS origin, without a path, query, or credentials.');
  }
  return url.origin;
}
export default defineConfig(({mode}) => {
  const origin=publicOrigin(loadEnv(mode,process.cwd(),'VITE_').VITE_SITE_URL);
  return {
    plugins:[{
      name:'swatch-search-metadata',
      transformIndexHtml(){
        return [
          {tag:'script',attrs:{type:'application/ld+json'},children:JSON.stringify(structuredData(origin)).replace(/</g,'\\u003c'),injectTo:'head'},
          ...(origin?[
            {tag:'link',attrs:{rel:'canonical',href:origin+'/'},injectTo:'head'},
            {tag:'meta',attrs:{property:'og:url',content:origin+'/'},injectTo:'head'},
          ]:[]),
        ];
      },
      generateBundle(){
        if(!origin)return;
        this.emitFile({type:'asset',fileName:'sitemap.xml',source:`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`});
        this.emitFile({type:'asset',fileName:'robots.txt',source:`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`});
      },
    }],
    build:{rollupOptions:{output:{manualChunks:{three:['three','three/addons/loaders/STLLoader.js','three/addons/environments/RoomEnvironment.js']}}}},
  };
});
