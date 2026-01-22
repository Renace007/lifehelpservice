export const emergencyPhones = [
  { number: '110', name: '公安报警', color: 'red', keywords: '报警 警察 盗窃' },
  { number: '12110', name: '短信报警', color: 'red', keywords: '短信报警 聋哑人 不方便说话' },
  { number: '119', name: '火警消防', color: 'orange', keywords: '火警 消防 火灾' },
  { number: '120', name: '急救中心', color: 'green', keywords: '救护车 医生 急救' },
  { number: '122', name: '交通事故', color: 'blue', keywords: '交警 车祸 事故' },
  { number: '96110', name: '国家反诈中心', color: 'blue', keywords: '诈骗 反诈 骗子' },
]

export const governmentPhones = [
  { number: '12315', name: '消费者投诉', color: 'purple', keywords: '消费者 维权 假货' },
  { number: '12333', name: '社保服务', color: 'indigo', keywords: '社保 养老金 医保' },
  { number: '12366', name: '税务服务', color: 'teal', keywords: '税务 发票' },
  { number: '12329', name: '住房公积金', color: 'orange', keywords: '公积金 贷款 房贷' },
  { number: '12348', name: '法律援助', color: 'red', keywords: '法律 律师' },
  { number: '114', name: '查号台/挪车', color: 'cyan', keywords: '查号 挪车 电话' },
  { number: '95598', name: '国家电网', color: 'green', keywords: '电费 停电' },
]

export const featuredServices = [
  { number: '12345', name: '政务服务便民热线', color: 'secondary', keywords: '政务 投诉 咨询 求助' },
]

export const serviceCategories = [
  {
    id: 'express',
    title: '快递物流',
    phones: [
      { number: '95338', name: '顺丰速运', color: 'slate', keywords: '顺丰 SF' },
      { number: '11183', name: '中国邮政EMS', color: 'green', keywords: '邮政 EMS' },
      { number: '950616', name: '京东物流', color: 'red', keywords: '京东 JD' },
      { number: '95311', name: '中通快递', color: 'blue', keywords: '中通 ZTO' },
      { number: '95554', name: '圆通速递', color: 'purple', keywords: '圆通 YTO' },
      { number: '95543', name: '申通快递', color: 'orange', keywords: '申通 STO' },
      { number: '95546', name: '韵达快递', color: 'yellow', keywords: '韵达' },
      { number: '95353', name: '德邦快递', color: 'blue', keywords: '德邦' },
    ],
  },
  {
    id: 'travel',
    title: '交通出行',
    phones: [
      { number: '12306', name: '铁路客户服务', color: 'blue', keywords: '火车 高铁 票' },
      { number: '12326', name: '民航服务质量监督', color: 'blue', keywords: '飞机 航空 投诉' },
      { number: '12328', name: '交通运输监督', color: 'yellow', keywords: '高速 公路 出租车' },
    ],
  },
  {
    id: 'communication',
    title: '通讯服务',
    phones: [
      { number: '10086', name: '中国移动', color: 'blue', keywords: '移动 宽带' },
      { number: '10000', name: '中国电信', color: 'blue', keywords: '电信 宽带' },
      { number: '10010', name: '中国联通', color: 'blue', keywords: '联通 宽带' },
      { number: '10099', name: '中国广电', color: 'blue', keywords: '广电 宽带' },
    ],
  },
  {
    id: 'bank',
    title: '各大银行客服',
    phones: [
      { number: '95588', name: '工商银行', color: 'gray', keywords: '工商银行 工行' },
      { number: '95599', name: '农业银行', color: 'gray', keywords: '农业银行 农行' },
      { number: '95566', name: '中国银行', color: 'gray', keywords: '中国银行 中行' },
      { number: '95533', name: '建设银行', color: 'gray', keywords: '建设银行 建行' },
      { number: '95559', name: '交通银行', color: 'gray', keywords: '交通银行 交行' },
      { number: '95555', name: '招商银行', color: 'gray', keywords: '招商银行 招行' },
      { number: '95508', name: '广发银行', color: 'gray', keywords: '广发银行' },
      { number: '95501', name: '平安银行', color: 'gray', keywords: '平安银行' },
      { number: '95528', name: '浦发银行', color: 'gray', keywords: '浦发银行' },
      { number: '95568', name: '民生银行', color: 'gray', keywords: '民生银行' },
      { number: '95577', name: '华夏银行', color: 'gray', keywords: '华夏银行' },
      { number: '95561', name: '兴业银行', color: 'gray', keywords: '兴业银行' },
    ],
  },
]

const serviceDetailOverrides = {
  '12345': {
    title: '政务服务便民热线',
    intro:
      '“12345”政务服务便民热线是集中的公共非紧急类咨询与投诉平台，作为政府与市民之间的桥梁，处理范围涵盖城市管理、公共卫生、市场监管和社会保障等多个领域。',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ-e3fSHzJPrglI2hXtuJyYOdSuRN0_eCAW_WQ3PvISKHaLAS9tlMniIsOSmh4YEDU9HVnOZANiluW9mLUVHMvGYTRqYN3-pvzo4vBxcUTENhK6FSzCgQ2Zy-3vNzhL3xw7FBzVg1Ab4_XUh5wcXpQVF7S13CC78AHZijpqPFm_EiIEP_N5Pfl2ZbXkbbPneourJ2_rVTOwEuT9qyEqidL7p3gnJHJ66CTRxPhBbr1LTUMKi5OHzF47RtSXXec3nD5gn6uEIUkxZX4',
    acceptanceTime: [
      { label: '工作日', value: '24 小时' },
      { label: '周末', value: '24 小时' },
      { label: '节假日', value: '24 小时' },
    ],
    channels: [
      { label: '官方网站', icon: 'language', href: 'https://www.gov.cn' },
      { label: '下载 App', icon: 'download', href: '#' },
    ],
  },
}

export const getAllServices = () => {
  const categoryPhones = serviceCategories.flatMap((c) => c.phones)
  return [...featuredServices, ...emergencyPhones, ...governmentPhones, ...categoryPhones]
}

export const getServiceByNumber = (number) => {
  const service = getAllServices().find((s) => s.number === String(number))
  if (!service) return null

  const override = serviceDetailOverrides[service.number]
  return {
    number: service.number,
    name: override?.title || service.name,
    color: service.color,
    keywords: service.keywords,
    intro: override?.intro || '',
    acceptanceTime: override?.acceptanceTime || null,
    channels: override?.channels || null,
    coverImage: override?.coverImage || null,
  }
}
