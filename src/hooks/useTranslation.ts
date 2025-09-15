import en from '../locales/en.json';

export const useTranslation = () => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = en;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t };
};
