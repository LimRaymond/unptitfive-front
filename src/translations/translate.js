import translations from './translations.json';

const translate = (msgCode, lang, ...args) => {
  const langSub = [];

  lang.forEach((l) => {
    langSub.push(l.substring(0, 2));
  });

  if (!translations[msgCode]) return '';

  // Select the appropriate language code
  const knownLang = Object.keys(translations[msgCode]);
  let translation = translations[msgCode][knownLang[0]];

  const inter = langSub.filter((e) => knownLang.includes(e));
  if (inter.length) {
    translation = translations[msgCode][inter[0]];
  }

  // Replace args in translation string
  args.forEach((arg) => {
    translation = translation.replace('{$}', arg);
  });
  return (translation);
};

export default translate;
