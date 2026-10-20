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
    course: 'MBBS India',
    eyebrow: "India's medical colleges",
    title: 'MBBS Colleges',
    titleAccent: 'in India',
    description: 'Compare government and private medical colleges by fees, seats, ranking and admission route.',
    searchPlaceholder: 'Search colleges by name, city or recognition…',
    groupField: 'state', // used for the filter chips / nav dropdown
    groupLabel: 'States',
    groupAll: 'All states',
    colleges: indiaColleges,
    cardCta: 'Details',
    stats: ['groups', 'colleges', 'seats', 'government'],
  },
  'mbbs-abroad': {
    key: 'mbbs-abroad',
    path: '/colleges/mbbs-abroad',
    navLabel: 'MBBS Abroad',
    course: 'MBBS Abroad',
    eyebrow: 'Medical universities worldwide',
    title: 'Study MBBS',
    titleAccent: 'Abroad',
    description: 'Explore recognised medical universities overseas with fee, duration and medium of instruction details.',
    searchPlaceholder: 'Search university, city or country…',
    groupField: 'country',
    groupLabel: 'Countries',
    groupAll: 'All countries',
    colleges: abroadColleges,
    cardCta: 'View',
    stats: ['groups', 'colleges', 'government'],
  },
  'md-ms': {
    key: 'md-ms',
    path: '/colleges/md-ms',
    navLabel: 'MD / MS',
    course: 'MD / MS',
    eyebrow: "India's PG programmes",
    title: 'MD / MS PG Programmes',
    titleAccent: 'in India',
    description: 'Explore postgraduate medical colleges with fees, seats and NEET PG admission details.',
    searchPlaceholder: 'Search PG colleges…',
    groupField: 'state',
    groupLabel: 'States',
    groupAll: 'All states',
    colleges: mdmsColleges,
    cardCta: 'Details',
    stats: ['groups', 'colleges', 'seats'],
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
export const getCategory = (key) => CATEGORIES[key];
