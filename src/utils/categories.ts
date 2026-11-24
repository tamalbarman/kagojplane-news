export interface CategoryMeta {
  slug: string;
  name: string;
  englishName: string;
  description: string;
  color: string;
  bgColor: string;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  'tech-it': {
    slug: 'tech-it',
    name: 'প্রযুক্তি ও এআই',
    englishName: 'Tech, AI & IT',
    description: 'এনভিডিয়া (Nvidia), আর্টিফিশিয়াল ইন্টেলিজেন্স (AI), সেমিকন্ডাক্টর চিপ, গ্যাজেট ও আইটি দুনিয়ার সর্বশেষ খবর',
    color: 'text-violet-700 border-violet-700',
    bgColor: 'bg-violet-600',
  },
  'stock-market': {
    slug: 'stock-market',
    name: 'শেয়ার বাজার',
    englishName: 'Stock Market',
    description: 'শেয়ার বাজার ও স্টক এক্সচেঞ্জের দৈনন্দিন খবর ও বিশ্লেষণ',
    color: 'text-emerald-700 border-emerald-700',
    bgColor: 'bg-emerald-700',
  },
  'business': {
    slug: 'business',
    name: 'ব্যবসা',
    englishName: 'Business',
    description: 'বাণিজ্য, শিল্প প্রতিষ্ঠান, ব্যাঙ্কিং ও স্টার্টআপ সংক্রান্ত সংবাদ',
    color: 'text-blue-700 border-blue-700',
    bgColor: 'bg-blue-600',
  },
  'travel': {
    slug: 'travel',
    name: 'ভ্রমণ ও আবহাওয়া',
    englishName: 'Travel & Advisory',
    description: 'দৈনন্দিন ভ্রমণ আপডেট, পাহাড়ি পথের ধস সতর্কতা, আবহাওয়া ও পর্যটন গাইড',
    color: 'text-sky-700 border-sky-700',
    bgColor: 'bg-sky-600',
  },
  'food-recipe': {
    slug: 'food-recipe',
    name: 'খাবার ও রেসিপি',
    englishName: 'Food & Cooking',
    description: 'রবিবারের স্পেশাল পদ, নিরামিষ রান্না, সুস্বাদু রেসিপি ও ঘরোয়া রান্নার উপায়',
    color: 'text-amber-700 border-amber-700',
    bgColor: 'bg-amber-600',
  },
  'government-updates': {
    slug: 'government-updates',
    name: 'সরকারি খবর',
    englishName: 'Government Updates',
    description: 'সরকারি প্রকল্প, বাজেট, নীতি এবং প্রশাসনিক খবরাখবর',
    color: 'text-teal-700 border-teal-700',
    bgColor: 'bg-teal-600',
  },
  'foreign-country': {
    slug: 'foreign-country',
    name: 'বিদেশ',
    englishName: 'International',
    description: 'আন্তর্জাতিক বাণিজ্য, ভূ-রাজনীতি ও বৈশ্বিক অর্থনীতি',
    color: 'text-purple-700 border-purple-700',
    bgColor: 'bg-purple-600',
  },
  'employment': {
    slug: 'employment',
    name: 'চাকরি',
    englishName: 'Employment',
    description: 'নিয়োগ বিজ্ঞপ্তি, আইটি চাকরির সুযোগ ও কর্মসংস্থান আপডেট',
    color: 'text-green-700 border-green-700',
    bgColor: 'bg-green-600',
  },
  'bank': {
    slug: 'bank',
    name: 'ব্যাঙ্ক',
    englishName: 'Banking',
    description: 'রিজার্ভ ব্যাঙ্ক (RBI), সুদের হার, ফিক্সড ডিপোজিট ও ব্যাঙ্কিং খবর',
    color: 'text-cyan-700 border-cyan-700',
    bgColor: 'bg-cyan-600',
  },
  'market-price': {
    slug: 'market-price',
    name: 'বাজারদর',
    englishName: 'Market Price',
    description: 'সোনা, রুপো, অপরিশোধিত তেল ও নিত্যপ্রয়োজনীয় পণ্যের দৈনন্দিন দর',
    color: 'text-amber-700 border-amber-700',
    bgColor: 'bg-amber-600',
  },
  'country': {
    slug: 'country',
    name: 'দেশ',
    englishName: 'National',
    description: 'দেশের জাতীয় অর্থনীতি, নীতি ও গুরুত্বপূর্ণ ঘটনাপ্রবাহ',
    color: 'text-amber-700 border-amber-700',
    bgColor: 'bg-amber-600',
  },
  'stock-market-info': {
    slug: 'stock-market-info',
    name: 'স্টকমার্কেট খুঁটিনাটি',
    englishName: 'Stock Market Tips',
    description: 'স্টকমার্কেটের বিনিয়োগ কৌশল, গাইড ও খুটিনাটি তথ্য',
    color: 'text-indigo-700 border-indigo-700',
    bgColor: 'bg-indigo-600',
  },
  'mutual-funds': {
    slug: 'mutual-funds',
    name: 'মিউচুয়াল ফান্ড',
    englishName: 'Mutual Funds',
    description: 'মিউচুয়াল ফান্ড এবং এসআইপি (SIP) সংক্রান্ত সর্বশেষ আপডেট',
    color: 'text-emerald-700 border-emerald-700',
    bgColor: 'bg-emerald-600',
  },
};

// All categories for static routes
export const CATEGORY_LIST = Object.values(CATEGORIES);

// Curated active high-traffic categories for top navigation
export const MAIN_NAV_SLUGS = [
  'tech-it',
  'stock-market',
  'business',
  'travel',
  'food-recipe',
  'government-updates',
  'foreign-country',
  'employment',
];

export const MAIN_NAV_CATEGORIES = MAIN_NAV_SLUGS.map(slug => CATEGORIES[slug]);

export function getCategoryMeta(slug: string): CategoryMeta {
  return CATEGORIES[slug] || {
    slug,
    name: slug,
    englishName: slug,
    description: 'সংবাদ ও আপডেট',
    color: 'text-slate-700 border-slate-700',
    bgColor: 'bg-slate-700',
  };
}
