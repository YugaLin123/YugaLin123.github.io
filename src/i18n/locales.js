import { createI18n } from 'vue-i18n'
// import en from '@/i18n/en-US.json'
// import tw from '@/i18n/zh-TW.json'

// 加上要使用的時間語系
export const dayjsLocales = {
  //   'zh-TW': () => import('dayjs/locale/zh-tw'),
  //   'en-US': () => import('dayjs/locale/en'),
}

export const LANGUAGE_LIST = [
  //   { id: 'zh-TW', label: '繁體中文', local: '繁體中文', countryCallingCode: '886' },
  //   { id: 'en-US', label: '英文', local: 'English', countryCallingCode: '1' },
]

export const COMMING_SOON_FORMAT = {
  //   'en-US': { locale: 'en', format: 'dddd, MMMM D, YYYY' },
  //   'zh-TW': { locale: 'zh-tw', format: 'dddd, M月D日, YYYY' },
}

const messages = {
  //   'en-US': en,
  //   'zh-TW': tw,
}

export const i18n = createI18n({
  //   locale: 'en-US',
  legacy: false,
  //   allowComposition: true,
  //   fallbackLocale: 'zh-TW',
  //   messages,
})
