# 📰 দ্য কাগজপ্লেন (The Kagojplane)

একটি সম্পূর্ণ বিনামূল্যে হোস্টিংযোগ্য, আধুনিক, অত্যন্ত দ্রুতগতি সম্পন্ন বাংলা নিউজ ও বিজনেস পোর্টাল ওয়েবসাইট।

Built with **Astro 5 + Tailwind CSS + Decap CMS** and optimized for **Netlify (100% Free Tier)**.

---

## 🌟 বৈশিষ্ট্যসমূহ (Features)

1. **শূন্য খরচের পরিকাঠামো (100% Free Stack)**:
   - হোস্টিং: Netlify Free Tier (SSL, Global CDN, 100GB Bandwidth, Git Auto-deploy).
   - কনটেন্ট ম্যানেজমেন্ট: Decap CMS (ফ্রি ওপেন সোর্স ওয়েব এডমিন প্যানেল)।
   - ডাটাবেস খরচ: ₹০ (সকল সংবাদ ও ছবি GitHub রিপোজিটরিতে Markdown/WebP হিসেবে সংরক্ষিত)।

2. **দৈনন্দিন সংবাদ প্রকাশনা (/admin)**:
   - যেকোনো কম্পিউটার বা মোবাইল থেকে `your-site.netlify.app/admin` এ লগইন করে সরাসরি শিরোনাম, বিভাগ, ছবি ও বাংলা লেখা দিয়ে **"Publish"** বোতাম টিপলেই ৩০ সেকেন্ডে স্বয়ংক্রিয়ভাবে লাইভ হবে। কোনো কোডিং জানার প্রয়োজন নেই।

3. **বাংলা টাইপোগ্রাফি ও আধুনিক ডিজাইন**:
   - গুগল ফন্ট `Hind Siliguri` এবং `Noto Sans Bengali` সমন্বিত।
   - ব্রেকিং নিউজ টিকার (Breaking News Ticker)।
   - বিশেষ গুরুত্বপূর্ণ প্রধান খবর (Featured Hero Grid)।
   - ক্যাটাগরি ভিত্তিক সংবাদ ব্লক (শেয়ার বাজার, ব্যবসা, সরকারি খবর, চাকরি, বাজারদর, ইত্যাদি)।
   - এক নজরে স্টক মার্কেট ও সোনার দর (Sensex, Nifty, Gold Rate)।

4. **এসইও এবং গুগল নিউজ বান্ধব (SEO & Google News Ready)**:
   - স্বয়ংক্রিয় `NewsArticle` মেটাডাটা ও ওপেনগ্রাফ ট্যাগ।
   - স্বয়ংক্রিয় আরএসএস ফিড: `/rss.xml`।
   - সম্পূর্ণ রেস্পনসিভ (মোবাইল, ট্যাবলেট এবং ডেস্কটপ)।
   - হোয়াটসঅ্যাপ, ফেসবুক, এক্স ও টেলিগ্রাম শেয়ার বাটন।

---

## 🚀 লোকাল মেশিনে চালানোর নিয়ম (Local Development)

```bash
# ডিপেন্ডেন্সি ইনস্টল (প্রথমবার)
npm install

# লোকাল ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev
```

ব্রাউজারে দেখুন: `http://localhost:4321`

---

## 🌐 Netlify-তে সম্পূর্ণ বিনামূল্যে লাইভ করার নিয়ম (Free Deployment Guide)

### ধাপ ১: GitHub-এ কোড পুশ করুন
1. [GitHub.com](https://github.com)-এ একটি নতুন রিপোজিটরি তৈরি করুন (যেমন: `kagojplane-news`)।
2. আপনার ফোল্ডার থেকে গিট পুশ করুন:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Kagojplane News portal"
   git branch -M main
   git remote add origin https://github.com/আপনার-ইউজারনেম/kagojplane-news.git
   git push -u origin main
   ```

### ধাপ ২: Netlify-তে সাইট যুক্ত করুন
1. [Netlify.com](https://app.netlify.com)-এ আপনার GitHub দিয়ে লগইন করুন (Free)।
2. **"Add new site"** &rarr; **"Import an existing project"** &rarr; **GitHub** সিলেক্ট করুন।
3. আপনার রিপোজিটরি সিলেক্ট করুন।
4. বিল্ড সেটিংস স্বয়ংক্রিয়ভাবে শনাক্ত হবে (`netlify.toml` ফাইলে দেওয়া আছে):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **"Deploy site"** বাটনে ক্লিক করুন। ২ মিনিটের মধ্যে আপনার সাইট লাইভ হয়ে যাবে!

### ধাপ ৩: এডমিন প্যানেল (/admin) সক্রিয় করুন (Decap CMS)
আপনার প্রকাশিত সাইটে সরাসরি নিউজ লেখার জন্য Netlify ড্যাশবোর্ডে ২ মিনিটের একটি কাজ করতে হবে:
1. Netlify-তে আপনার সাইটে গিয়ে **Site configuration** &rarr; **Identity** ট্যাবে যান।
2. **"Enable Identity"** বাটনে ক্লিক করুন।
3. নিচে স্ক্রোল করে **Registration preferences** &rarr; **Invite only** সিলেক্ট করুন (যাতে বাইরের কেউ একাউন্ট খুলতে না পারে)।
4. নিচে **Services** বিভাগে গিয়ে **"Enable Git Gateway"** অন করে দিন।
5. **Identity** ট্যাব থেকে **"Invite users"** বাটনে আপনার ইমেল দিন। আপনার ইমেলে কনফার্মেশন লিংক যাবে। পাসওয়ার্ড সেট করে নিন।
6. এবার আপনার সাইটের `https://your-site.netlify.app/admin/` এ যান এবং লগইন করে প্রতিদিন খবর লিখুন!
