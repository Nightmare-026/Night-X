# SEO Action Plan - Night X

Website ko Google search mein laane ke liye ye 3 main steps follow karein:

## 1. Google Search Console (GSC) Setup
- GSC mein URL submit karein.
- `googlecc74ad26c67f86dd.html` ko `public/` folder mein move karein.
- GSC dashboard mein 'Verify' par click karein.
- GSC dashboard mein `https://your-domain.com/sitemap.xml` submit karein.

## 2. Activate Files
In files ko `seo-bundle/` se nikaal kar `public/` folder mein move kar dein:
- `robots.txt`
- `sitemap.xml`
- `manifest.json`
- `googlecc74ad26c67f86dd.html` (ownership verification file)

## 3. Metadata Review
Apne `src/app/layout.tsx` mein ensures karein ki `metadata` object mein description aur keywords solid hain.

---
**Note:** Google indexing mein 1-2 hafte lag sakte hain. Manually GSC mein "URL Inspection" karke indexing request karein for faster results.
