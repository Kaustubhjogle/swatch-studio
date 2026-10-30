export const creator = {
  '@type': 'Person',
  '@id': 'https://github.com/Kaustubhjogle#person',
  name: 'Kaustubh Jogle',
  url: 'https://github.com/Kaustubhjogle',
  sameAs: ['https://github.com/Kaustubhjogle'],
};
export const title = 'Swatch Studio — Interactive 3D Colour Wheel by Kaustubh Jogle';
export const description = 'Explore 50 colour swatches across seven palettes on an interactive 3D wheel. Rotate, lift, and copy HEX or RGB values. Created by Kaustubh Jogle.';
export function structuredData(origin) {
  const id = (fragment) => `${origin || ''}/#${fragment}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      creator,
      {'@type':'WebSite','@id':id('website'),name:'Swatch Studio',description,inLanguage:'en',creator:{'@id':creator['@id']},...(origin?{url:origin+'/'}:{})},
      {'@type':'WebPage','@id':id('webpage'),name:title,description,inLanguage:'en',isPartOf:{'@id':id('website')},mainEntity:{'@id':id('app')},author:{'@id':creator['@id']},...(origin?{url:origin+'/'}:{})},
      {'@type':'WebApplication','@id':id('app'),name:'Swatch Studio',description,applicationCategory:'DesignApplication',operatingSystem:'Any',browserRequirements:'JavaScript and WebGL are required for the interactive 3D wheel. The information guide is readable without JavaScript.',inLanguage:'en',creator:{'@id':creator['@id']},featureList:['Interactive 3D colour swatch wheel','50 digital colour swatches across seven palettes','Copy HEX and RGB values','Drag, click, and keyboard colour selection','Two-second colour slideshow with play and pause','Light and dark themes','Independent black or white stand colour'],...(origin?{url:origin+'/'}:{})},
    ],
  };
}
