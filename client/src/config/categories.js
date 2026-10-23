/*
 * One entry per listing type. Pages and components are driven by this config,
 * so adding a new category (e.g. BDS, Nursing) means: add a data file + one entry here.
 */
import { indiaColleges, abroadColleges, mdmsColleges } from '../data';

export const CATEGORIES = {
  'mbbs-india': {
    key: 'mbbs-india',
    path: '/colleges/mbbs-india',
    navLabel: 'MBBS India',
    course: 'MBBS in India',
    crumb: 'Colleges',
    heroEyebrow: 'MBBS in India',
    heroTitle: 'Find colleges that fit your plan.',
    heroText: 'Explore the collected profile set, compare the details that matter, and open a college page before you ask for guidance.',
    dirEyebrow: 'MBBS in India · College directory',
    dirTitle: ['Explore medical', 'colleges in India.'],
    dirText: (n) => `${n} collected college profiles are ready to explore. Search by college or city, filter by state, and use Ask to open a detailed profile.`,
    searchPlaceholder: 'Search college or city…',
    groupField: 'state',
    groupAll: 'All states',
    unit: 'colleges',
    colleges: indiaColleges,
  },
  'mbbs-abroad': {
    key: 'mbbs-abroad',
    path: '/colleges/mbbs-abroad',
    navLabel: 'MBBS Abroad',
    course: 'MBBS Abroad',
    crumb: 'Universities',
    heroEyebrow: 'MBBS abroad',
    heroTitle: 'Find universities that fit your plan.',
    heroText: 'Compare international destinations and university options, then open a profile before you ask for guidance.',
    dirEyebrow: 'MBBS abroad · University directory',
    dirTitle: ['Explore medical', 'universities abroad.'],
    dirText: (n) => `${n} collected university profiles are ready to explore. Search by university, city or country, filter by country, and use Ask to open a detailed profile.`,
    searchPlaceholder: 'Search university, city or country…',
    groupField: 'country',
    groupAll: 'All countries',
    unit: 'universities',
    colleges: abroadColleges,
  },
  'md-ms': {
    key: 'md-ms',
    path: '/colleges/md-ms',
    navLabel: 'MD / MS',
    course: 'MD / MS',
    crumb: 'Colleges',
    heroEyebrow: 'MD / MS in India',
    heroTitle: 'Find postgraduate colleges that fit your plan.',
    heroText: 'Explore postgraduate medical colleges, compare fees and seats, and open a college page before you ask for guidance.',
    dirEyebrow: 'MD / MS · College directory',
    dirTitle: ['Explore PG medical', 'colleges in India.'],
    dirText: (n) => `${n} collected postgraduate college profiles are ready to explore. Search by college or city, filter by state, and use Ask to open a detailed profile.`,
    searchPlaceholder: 'Search college or city…',
    groupField: 'state',
    groupAll: 'All states',
    unit: 'colleges',
    colleges: mdmsColleges,
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
export const getCategory = (key) => CATEGORIES[key];

// Two-letter codes for the destination cards on the home page.
export const COUNTRY_CODES = {
  Russia: 'RU', Kazakhstan: 'KZ', Georgia: 'GE', Bangladesh: 'BD', Uzbekistan: 'UZ', Nepal: 'NP', Tajikistan: 'TJ',
  Kyrgyzstan: 'KG', Ukraine: 'UA', Armenia: 'AM', China: 'CN', Philippines: 'PH', Egypt: 'EG',
};
