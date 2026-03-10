import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import Company translations
import companyEn from './locales/en/company.json';
import companyUr from './locales/ur/company.json';
import companyLn from './locales/ln/company.json';
import companyNl from './locales/nl/company.json';

const resources = {
  ur: {
    translation: {
      ...companyUr,
      "nav": {
        "home": "ہوم",
        "company": "کمپنی",
        "team": "ٹیم",
        "vendors": "وینڈرز",
        "customers": "گاہک",
        "events": "ایونٹس",
        "catalogs": "کیٹلاگ",
        "brands": "برانڈز",
        "new_arrivals": "نئی آمد",
        "contact": "رابطہ کریں",
        "branches": "شاخیں",
        "pages": "صفحات"
      },
      "header": {
        "logo_subtitle": "پریمیم گروسری",
        "search_placeholder": "ہم آپ کی کیا مدد کر سکتے ہیں؟",
        "search_button": "تلاش کریں",
        "language": "زبان",
        "accounts": "اکاؤنٹس",
        "login_register": "لاگ ان / رجسٹر"
      },
      "topbar": {
        "address": "262 Rue des Bouleaux, 59860 Bruay-sur-l’Escaut",
        "email": "contact@snfood.fr"
      },
      "categorybar": {
        "all_categories": "تمام کیٹیگریز",
        "weekly_discount": "ہفتہ وار رعایت!"
      },
      "discover": {
        "title": "بہترین کارکردگی میں آپ کا ساتھی",
        "subtitle": "ایس این فوڈ ڈسٹری بیوشن پیشہ ور افراد کو براہ راست اعلیٰ معیار کی افریقی اور ایشیائی مصنوعات فراہم کرتی ہے۔ مستند ذائقوں اور قابل اعتماد ہول سیل سروس کے ساتھ اپنے کاروبار کو بہتر بنائیں۔",
        "cta": "کیٹلاگ دریافت کریں"
      },
      "feature_highlights": {
        "free_shipping": "مفت شپنگ",
        "free_shipping_desc": "€150 سے زائد کے آرڈرز پر",
        "save_money": "پیسے بچائیں",
        "save_money_desc": "ہول سیل قیمتیں",
        "quality_assured": "معیار کی ضمانت",
        "quality_assured_desc": "100% پریمیم مصنوعات",
        "best_deal": "بہترین ڈیل آفر",
        "best_deal_desc": "خصوصی B2B رعایتیں",
        "support": "سپورٹ 24/7",
        "support_desc": "ماہرانہ مدد"
      },
      "categories_section": {
        "title": "دنیا بھر سے رنگ اور ذائقے",
        "subtitle": "آپ کے دسترخوان پر دنیا بھر سے ہزاروں مصنوعات۔ ہر مصنوعات کی کیٹیگری کے ساتھ ایک ہی کمپنی: تازہ، خشک، منجمد اور کاسمیٹکس",
        "items": {
          "dairy": "ڈیری اور انڈے",
          "meat": "گوشت اور سمندری غذا",
          "bakery": "بیکری",
          "organic": "نامیاتی مصنوعات",
          "fresh_eggs": "تازہ انڈے",
          "ready_meals": "سلاد اور تیار کھانے"
        }
      },
      "feature_strip": {
        "kicker": "ہمارا ورثہ",
        "title": "مستند ذائقوں کے ذریعے براعظموں کو جوڑنا",
        "text1": "ایس این فوڈ ڈسٹری بیوشن افریقہ اور ایشیا بھر سے بہترین نسلی مصنوعات حاصل کرنے کے لیے وقف ہے۔ ہمارا مشن پیشہ ور افراد کو مستند اجزاء کے ساتھ بااختیار بنانا ہے جو روایت، معیار اور جذبے کی کہانی سناتے ہیں۔",
        "text2": "ہمارا ماننا ہے کہ کھانا محض رزق سے بڑھ کر ہے؛ یہ ایک عالمگیر زبان ہے جو ہم سب کو جوڑتی ہے۔ قابل اعتماد لاجسٹکس اور سخت کوالٹی کنٹرول کے ذریعے۔",
        "vision1_title": "بے مثال معیار",
        "vision1_desc": "اپنے شراکت داروں کے لیے صرف پریمیم گریڈ کی مصنوعات حاصل کرنا۔",
        "vision2_title": "عالمی رابطہ",
        "vision2_desc": "دو براعظموں میں مستند پروڈیوسر کے ساتھ براہ راست روابط۔",
        "vision3_title": "پائیدار ذرائع",
        "vision3_desc": "اخلاقی طریقے جو عالمی سطح پر مقامی کمیونٹیز کی مدد کرتے ہیں۔"
      },
      "promo": {
        "badge": "ہول سیل ایکسیلنس",
        "title": "پریمیم فوڈ سلوشنز",
        "text": "ایس این فوڈ ڈسٹری بیوشن کے ساتھ خصوصی نسلی مصنوعات، توسیع پذیر لاجسٹکس، اور مسابقتی ہول سیل قیمتوں کے لیے شراکت داری کریں۔",
        "smart_logistics": "سمارٹ لاجسٹکس",
        "competitive_rates": "مسابقتی قیمتیں",
        "become_partner": "شراکت دار بنیں",
        "catalog": "کیٹلاگ",
        "years": "سال",
        "offers_title": "آفرز چاہتے ہیں؟",
        "offers_sub": "ہماری نیوز لیٹر کے لیے مفت سائن اپ کریں!",
        "email_placeholder": "آپ کا ای میل",
        "signup_btn": "سائن اپ کریں",
        "terms_accept": "میں نے شرائط و ضوابط اور رازداری کی پالیسی پڑھ لی ہے اور قبول کرتا ہوں"
      },
      "extra_sections": {
        "pow_title": "ہفتے کی مصنوعات",
        "events_title": "ایونٹس",
        "events_subtitle": "ایس این فوڈ کی دنیا میں کیا ہو رہا ہے",
        "events_go_to": "ایونٹس پیج پر جائیں"
      },
      "export": {
        "title": "ہم ہر جگہ ترسیل کرتے ہیں",
        "text": "ایس این فوڈ ڈسٹری بیوشن پورے خطے اور اس سے باہر ترسیل کرتی ہے۔ ہماری مصنوعات کو کنٹرول شدہ لاجسٹکس کے ساتھ پیشہ ور افراد کی ضروریات کو پورا کرنے کے لیے منتخب کیا گیا ہے۔"
      },
      "footer": {
        "brand_alt": "ایس این فوڈ",
        "brand_text": "ایس این فوڈ ڈسٹری بیوشن افریقی اور ایشیائی غذائی مصنوعات کا ایک صف اول کا ہول سیلر ہے، جو پورے خطے میں پیشہ ور افراد کو مستند ذائقے اور قابل اعتماد سروس فراہم کرتا ہے۔",
        "quick_links": "فوری لنکس",
        "categories": "کیٹیگریز",
        "contact_us": "ہم سے رابطہ کریں",
        "catalogues": "کیٹلاگ",
        "account": "اکاؤنٹ",
        "contact_wholesale": "ہول سیل انکوائری کے لیے ہم سے رابطہ کریں",
        "rights": "جملہ حقوق محفوظ ہیں۔",
        "terms": "شرائط و ضوابط",
        "privacy": "رازداری کی پالیسی",
        "cookie": "کوکی پالیسی"
      },
      "team": {
        "hero": {
          "title": "ہماری ٹیم",
          "desc": "ہم وقف پیشہ ور افراد کا ایک گروپ ہیں جو اپنے شراکت داروں کے لیے بہترین افریقی اور ایشیائی مصنوعات لانے کے لیے پرعزم ہیں۔ ہماری متنوع ٹیم سورسنگ، لاجسٹکس، اور کسٹمر کی اطمینان میں عمدگی کو یقینی بنانے کے لیے مل کر کام کرتی ہے، جو ہر روز آپ کے کاروبار کی ترقی میں معاون ہوتی ہے۔"
        },
        "values": {
          "title": "کمپنی کی اقدار",
          "sub": "معیار، قابل اعتمادی اور احترام",
          "p1": "ایس این فوڈ ڈسٹری بیوشن میں، ہم معیار، قابل اعتمادی اور احترام کو اپنے کاروبار کے مرکز میں رکھتے ہیں۔ ہم ایک متحرک اور باہمی تعاون پر مبنی کام کا ماحول تیار کرتے ہیں جہاں ٹیم کا ہر رکن ہمارے صارفین کے اطمینان میں فعال طور پر حصہ ڈالتا ہے۔",
          "p2": "ہماری ٹیم امپورٹ ایکسپورٹ اور فوڈ ڈسٹری بیوشن سیکٹر میں 15 سال سے زیادہ کے مشترکہ تجربے سے فائدہ اٹھاتی ہے، جو ہمارے ہر آرڈر میں عمدگی کو یقینی بناتی ہے۔",
          "image_alt": "ہماری اقدار عمل میں"
        },
        "grid": {
          "title": "ٹیم سے ملیں۔",
          "empty": "اس شعبے کے لیے کوئی ممبر نہیں ملا۔"
        },
        "departments": {
          "direction": "ڈائریکشن",
          "sales": "سیلز ڈیپارٹمنٹ",
          "purchasing": "خریداری اور سپلائی",
          "logistics": "لاجسٹکس اور گودام",
          "accounting": "اکاؤنٹنگ اور ایڈمنسٹریشن"
        },
        "roles": {
          "director": "ڈائریکٹر",
          "sales_rep": "سیلز نمائندہ",
          "purchasing_manager": "پرچیزنگ مینیجر",
          "logistics_coordinator": "لاجسٹکس کوآرڈینیٹر",
          "accountant": "اکاؤنٹنٹ"
        }
      },
      "customers": {
        "hero": {
          "title": "ہمارا مشن",
          "text": "پیشہ ور افراد کو اعلیٰ معیار کی افریقی اور ایشیائی مصنوعات کی وسیع رینج فراہم کرنا، جس کی مدد تیز، قابل اعتماد اور مسابقتی سروس سے کی جاتی ہے۔",
          "cta": "کیٹلاگ"
        },
        "stats": {
          "title": "اہم اعداد و شمار",
          "sub": "Hauts-de-France میں تقسیم کی عمدگی",
          "p1": "Bruay-sur-l’Escaut میں واقع، ایس این فوڈ ڈسٹری بیوشن 200 m² کے خصوصی گودام سے کام کرتی ہے۔ ہم 24 سے 48 گھنٹوں کے اندر ڈیلیوری کی ضمانت دیتے ہیں، اس بات کو یقینی بناتے ہوئے کہ آپ کے کاروبار کو کبھی بھی ضروری نسلی مصنوعات کی کمی کا سامنا نہ کرنا پڑے۔",
          "p2": "ہمارا جامع کیٹلاگ خشک، تازہ اور منجمد اشیاء سمیت متعدد زمروں پر محیط ہے۔ ہمیں ریٹیلرز اور ریستوراں کے لیے ایک قابل اعتماد مقامی پارٹنر ہونے پر فخر ہے جو مستند افریقی اور ایشیائی ذائقوں کی تلاش میں ہیں۔"
        },
        "categories": {
          "title": "مصنوعات کے زمرے",
          "sub": "آپ کی تمام نسلی خوراک کی ضروریات کے لیے ایک متنوع کیٹلاگ",
          "desc": "ایس این فوڈ ڈسٹری بیوشن ایک بڑا ملٹی کیٹیگری کیٹلاگ فراہم کرتی ہے، پینٹری کے اسٹیپلز سے لے کر مخصوص اجزاء تک۔ ہم Hauts-de-France کے علاقے میں مستند افریقی اور ایشیائی سپلائیز کے لیے آپ کا ون اسٹاپ شاپ ہیں۔",
          "cta": "کیٹلاگ کی درخواست کریں",
          "items": {
            "dry": {
              "title": "خشک مصنوعات",
              "desc": "چاول، آٹا، مستند مصالحے، اور مخصوص چٹنی۔"
            },
            "fresh": {
              "title": "تازہ مصنوعات",
              "desc": "قابل اعتماد شراکت داروں سے حاصل کردہ معیاری تازہ اجزاء۔"
            },
            "frozen": {
              "title": "منجمد اشیاء",
              "desc": "گہرے منجمد اشیاء کی ایک وسیع رینج جو بہترین درجہ حرارت پر برقرار رکھی جاتی ہے۔"
            },
            "drinks": {
              "title": "غیر ملکی مشروبات",
              "desc": "افریقہ اور ایشیا کے مقبول مشروبات اور جوس۔"
            },
            "halal": {
              "title": "حلال مصدقہ",
              "desc": "آپ کے صارفین کے لیے حلال مصنوعات کا ایک مخصوص انتخاب۔"
            },
            "african": {
              "title": "افریقی خصوصیات",
              "desc": "مخصوص تیل، مصالحے، اور روایتی افریقی غذائی اجزاء۔"
            }
          }
        }
      },
      "brands_page": {
        "hero_title": "ہمارے تمام برانڈز",
        "hero_text": "ایس این فوڈ ڈسٹری بیوشن درجنوں بین الاقوامی برانڈز کے ساتھ کام کرتی ہے، معروف ناموں سے لے کر مقامی خصوصیات تک۔ ہمارے ساتھ، آپ کو وہی ملے گا جو آپ کے صارفین چاہتے ہیں۔",
        "popular_title": "مشہور برانڈز"
      },
      "new_arrivals_page": {
        "hero_title": "نئی آمد",
        "hero_text": "ہمارے کیٹلاگ میں تازہ ترین اضافہ دریافت کریں: نئی مصنوعات اور مستند نسلی ذائقے کے تجربات۔",
        "add_to_wishlist": "خواہش کی فہرست میں شامل کریں",
        "add_to_cart": "کارٹ میں شامل کریں",
        "code_prefix": "کوڈ.",
        "filter_by_categories": "زمرہ جات کے لحاظ سے فلٹر کریں",
        "all_categories": "تمام زمرے",
        "breadcrumb_home": "ہوم",
        "breadcrumb_shop": "شاپ",
        "showing_results": "{{total}} نتائج میں سے {{from}}–{{to}} دکھائے جا رہے ہیں",
        "sorting_aria": "مصنوعات کی ترتیب",
        "sort_default": "ڈیفالٹ ترتیب",
        "sort_name_asc": "نام (A–Z)",
        "sort_name_desc": "نام (Z–A)",
        "categories": {
          "fresh": "تازہ مصنوعات",
          "flours": "مختلف آٹے",
          "dairy": "ڈیری",
          "condiments": "مصالحہ جات",
          "noodles": "فوری نوڈلز",
          "beverages": "مشروبات",
          "snacks": "سنیکس اور مٹھائیاں",
          "frozen": "منجمد کھانا",
          "spices": "جڑی بوٹیاں اور مصالحے",
          "canned": "ڈبہ بند اشیاء",
          "rice": "چاول اور اناج",
          "sauces": "چٹنی اور سیزننگ",
          "meat": "گوشت اور چکن",
          "seafood": "سمندری غذا",
          "desserts": "میٹھے"
        }
      },
      "contact_page": {
        "hero": {
          "title": "رابطہ کریں",
          "subtitle": "Bruay-sur-l’Escaut میں واقع افریقی اور ایشیائی اشیاء کے ہول سیلر۔ آج ہی ہماری ٹیم سے رابطہ کریں۔"
        },
        "map_title": "گوگل میپس",
        "info": {
          "location_title": "ہمارا مقام",
          "phone_title": "فون نمبر",
          "phone_line1": "مزید معلومات کے لیے ہم سے رابطہ کریں",
          "phone_line2": "ہماری ہول سیل سروسز کے بارے میں",
          "email_title": "ای میل ایڈریس",
          "hours_title": "کام کے اوقات",
          "hours_line1": "پیر - ہفتہ: 09:00 - 20:00",
          "hours_line2": "اتوار: بند"
        },
        "form": {
          "title": "ہمیں پیغام بھیجیں",
          "subtitle": "نیچے دیا گیا فارم پُر کریں اور ہم جلد از جلد آپ سے رابطہ کریں گے۔",
          "full_name": "پورا نام",
          "full_name_ph": "اپنا نام درج کریں",
          "email": "ای میل ایڈریس",
          "email_ph": "اپنا ای میل درج کریں",
          "subject": "موضوع",
          "subject_ph": "یہ کس بارے میں ہے؟",
          "message": "آپ کا پیغام",
          "message_ph": "ہم آپ کی کیا مدد کر سکتے ہیں؟",
          "submit": "پیغام بھیجیں"
        }
      },
      "vendors": {
        "hero": {
          "title": "لاجسٹکس اور جدت",
          "text": "ایس این فوڈ ڈسٹری بیوشن نسلی خصوصیات کے تحفظ اور تقسیم کے لیے ایک انتہائی اہل شراکت دار ہے، جس کی مدد پیشہ ورانہ لاجسٹکس اور سخت معیارات سے کی جاتی ہے۔",
          "cta": "کیٹلاگ"
        },
        "infrastructure": {
          "title": "انفراسٹرکچر کی تفصیلات",
          "sub": "نسلی خوراک کی مصنوعات کی پیشہ ورانہ تقسیم",
          "p1": "ایس این فوڈ ڈسٹری بیوشن ایک محفوظ گودام سے کام کرتی ہے جس میں خشک، تازہ اور منجمد اشیاء کے لیے الگ الگ زون شامل ہیں۔ ہمارے گودام کو موثر اسٹاک مینجمنٹ کو یقینی بنانے کے لیے صنعتی شیلفنگ کے ساتھ بہتر بنایا گیا ہے۔",
          "p2": "ہم منجمد مصنوعات کے لیے مخصوص کولڈ رومز کا استعمال کرتے ہیں، جو اعلیٰ ترین معیار کو برقرار رکھتے ہیں۔ ہماری لاجسٹکس ریفریجریٹڈ گاڑیوں کے بیڑے سے چلتی ہے، اس بات کو یقینی بناتی ہے کہ کولڈ چین کبھی نہ ٹوٹے۔",
          "p3": "Bruay-sur-l’Escaut میں واقع، ہمارا انفراسٹرکچر پورے Hauts-de-France ریجن میں پیشہ ور افراد کے لیے ایک قابل اعتماد مرکز کے طور پر کام کرنے کے لیے ڈیزائن کیا گیا ہے۔"
        },
        "guarantees": {
          "title": "سروس کی ضمانتیں",
          "sub": "افریقی اور ایشیائی فوڈ ہول سیل سیکٹر میں ایک قابل اعتماد پارٹنر",
          "desc": "ایس این فوڈ ڈسٹری بیوشن آپ کے زون کے لحاظ سے 24 سے 48 گھنٹوں کے اندر ڈیلیوری کی ضمانت دیتی ہے۔ ہم اپنی اہم مصنوعات کی مستقل دستیابی کو یقینی بناتے ہیں اور فوری آرڈرز کا تیز رفتار انتظام فراہم کرتے ہیں۔",
          "cta": "کیٹلاگ کی درخواست کریں",
          "items": {
            "excellence": {
              "title": "آپریشنل ایکسیلنس",
              "desc": "یورپی حفظان صحت کے اصولوں اور HACCP طریقہ کار کی سخت پابندی۔"
            },
            "supply": {
              "title": "قابل اعتماد سپلائی",
              "desc": "افریقی اور ایشیائی مصنوعات کا مستقل اسٹاک اور فوری دستیابی۔"
            },
            "partnerships": {
              "title": "پائیدار شراکت داری",
              "desc": "اپنے سپلائرز کے ساتھ طویل مدتی، باہمی طور پر فائدہ مند تعلقات کی تعمیر۔"
            },
            "cold_chain": {
              "title": "کولڈ چین کی سالمیت",
              "desc": "ریفریجریٹڈ ٹرک اور کولڈ رومز جو سینیٹری اصولوں کی سخت تعمیل کو یقینی بناتے ہیں۔"
            },
            "innovation": {
              "title": "لاجسٹکس میں جدت",
              "desc": "بہترین تقسیم کے لیے بہتر صنعتی شیلفنگ اور جدید بیڑا۔"
            },
            "certified": {
              "title": "مصدقہ مصنوعات",
              "desc": "حلال سرٹیفیکیشنز اور بین الاقوامی سطح پر تسلیم شدہ شراکت داروں سے حاصل کردہ مصنوعات۔"
            }
          }
        }
      },
    }
  },
  ln: {
    translation: {
      ...companyLn,
      "nav": {
        "home": "Ndako",
        "company": "Kompanyi",
        "team": "Ekipi",
        "vendors": "Bateki",
        "customers": "Basombi",
        "events": "Milulu",
        "catalogs": "Bakatalogo",
        "brands": "Bamarca",
        "new_arrivals": "Bileyi ya sika",
        "contact": "Kotala biso",
        "branches": "Bitape",
        "pages": "Bapage"
      },
      "header": {
        "logo_subtitle": "Bileyi ya malamu mpenza",
        "search_placeholder": "Ndenge nini tokoki kosalisa yo?",
        "search_button": "Koluka",
        "language": "Lokota",
        "accounts": "Ba compte",
        "login_register": "Kokota / Komikundisa"
      },
      "footer": {
        "brand_alt": "SN Food",
        "brand_text": "SN Food Distribution ezali mosalisi ya gros ya liboso ya bileyi ya Africa mpe Asia, epesaka ba saveurs ya solo mpe mosala ya kotyelama motema na ba professionnels na région mobimba.",
        "quick_links": "Ba liens ya noki",
        "categories": "Ba catégories",
        "contact_us": "Kotala biso",
        "catalogues": "Bakatalogo",
        "account": "Compte",
        "contact_wholesale": "Kotala biso mpo na mituna ya gros",
        "rights": "Makoki nionso babombi.",
        "terms": "Ba Conditions",
        "privacy": "Politique ya Privauté",
        "cookie": "Politique ya Cookie"
      },
      "discover": {
        "title": "Partner na yo na excellence",
        "subtitle": "SN Food Distribution epesaka bileyi ya malamu mpenza ya Africa mpe Asia mbala moko na ba professionnels. Tombola mombongo na yo na ba saveurs ya solo mpe mosala ya gros ya kotyelama motema.",
        "cta": "LUKA KATALOGO"
      },
      "feature_highlights": {
        "free_shipping": "Livraison ya ofele",
        "free_shipping_desc": "Soki osombi koleka €150",
        "save_money": "Bomba mbongo",
        "save_money_desc": "Talo ya gros",
        "quality_assured": "Qualité endimami",
        "quality_assured_desc": "100% Bileyi ya malamu mpenza",
        "best_deal": "Offre ya malamu mpenza",
        "best_deal_desc": "Ba réduction B2B ya se moko",
        "support": "Soutien 24/7",
        "support_desc": "Lisalisi ya ba experts"
      },
      "categories_section": {
        "title": "Ba langi mpe ba saveurs ya mokili mobimba",
        "subtitle": "Bankó ya bileyi ya mokili mobimba na mesa na yo. Kompanyi moko na lolenge nionso ya bileyi: Ya sika, Ya kokauka, Ya congélateur mpe ba Cosmétiques",
        "items": {
          "dairy": "Lait mpe Makei",
          "meat": "Mbisi mpe Nyama",
          "bakery": "Boulangerie",
          "organic": "Bileyi ya Nature",
          "fresh_eggs": "Makei ya sika",
          "ready_meals": "Salades mpe Bileyi ya kolamba"
        }
      },
      "feature_strip": {
        "kicker": "Libula na biso",
        "title": "Kokutanya ba continents na nzela ya ba saveurs ya solo",
        "text1": "Wuta ebandeli na biso, SN Food Distribution emipesi na kozwa bileyi ya ethnic ya malamu mpenza wuta Africa mpe Asia. Mission na biso ezali kopesa makasi na ba professionnels na ba ingrédients ya solo oyo eyebisaka lisolo ya tradition, qualité, mpe passion.",
        "text2": "Tondimi ete bileyi ezali kaka bileyi te; ezali lokota ya mokili mobimba oyo ekangisaka biso nionso. Na nzela ya logistique ya kotyelama motema mpe contrôle ya qualité ya makasi.",
        "vision1_title": "Qualité ya malamu mpenza",
        "vision1_desc": "Kozwa kaka bileyi ya malamu mpenza mpo na ba partenaires na biso.",
        "vision2_title": "Connexion ya mokili mobimba",
        "vision2_desc": "Ba liens direct na ba producteurs ya solo na ba continents mibale.",
        "vision3_title": "Sourcing ya durable",
        "vision3_desc": "Ba pratiques ya éthique oyo esungaka ba communautés locales na mokili mobimba."
      },
      "promo": {
        "badge": "Excellence ya gros",
        "title": "Ba solutions ya bileyi ya malamu mpenza",
        "text": "Sala partenariat na SN Food Distribution mpo na bileyi ya ethnic ya se moko, logistique oyo ekoki kokola, mpe talo ya gros ya momekano.",
        "smart_logistics": "Logistique ya mayele",
        "competitive_rates": "Talo ya momekano",
        "become_partner": "Koma partenaire",
        "catalog": "Katalogo",
        "years": "Mibu",
        "offers_title": "Olingi ba offres?",
        "offers_sub": "Mikundisa na newsletter na biso ya ofele!",
        "email_placeholder": "Email na yo",
        "signup_btn": "MIKUNDISA",
        "terms_accept": "Natangi mpe nandimi ba Conditions mpe Politique ya Privauté"
      },
      "export": {
        "title": "Tokabolaka bisika nionso",
        "text": "SN Food Distribution akabolaka na région mobimba mpe na libanda. Bileyi na biso ponami mpo na kokokisa bamposa ya ba professionnels na logistique ya kotalama malamu."
      },
      "extra_sections": {
        "pow_title": "Bileyi ya mposo",
        "events_title": "Milulu",
        "events_subtitle": "Luka koyeba nini ezali kosalema na mokili ya SN Food",
        "events_go_to": "Kende na page ya milulu"
      },
      "team": {
        "hero": {
          "title": "Ekipi na biso",
          "desc": "Tozali etuluku ya baprofesioneli oyo bamipesi mpo na kopesa bileyi ya malamu mpenza ya Afrika mpe Azia na baninga na biso. Ekipi na biso ya ndenge na ndenge esalaka elongo mpo na kosala ete nionso esalema malonga na kozwa bileyi, na logistique, mpe na kosepelisa basombi, kosungaka bokoli ya mombongo na bino mokolo na mokolo."
        },
        "values": {
          "title": "Mituya ya Kompanyi",
          "sub": "Qualité, Kotyelama motema, mpe Botosi",
          "p1": "Na SN Food Distribution, tozali kotia qualité, kotyelama motema, mpe botosi na motema ya mombongo na biso. Tozali kosala na esika ya mosala ya molende mpe ya boyokani esika wapi moto na moto na ekipi asungaka na mposa ya basombi na biso.",
          "p2": "Ekipi na biso azali na eksperiansi ya mibu koleka 15 na secteur ya import-export mpe bokaboli ya bileyi, mpo na kosala ete nionso esalema malamu na nionso oyo tozali kosala.",
          "image_alt": "Mituya na biso na mosala"
        },
        "grid": {
          "title": "Kutana na ekipi.",
          "empty": "Ata moto moko te azwami mpo na departema oyo."
        },
        "departments": {
          "direction": "DIRECTION",
          "sales": "SERVICE COMMERCIAL",
          "purchasing": "ACHATS & APPROVISIONNEMENT",
          "logistics": "LOGISTIQUE & ENTREPÔT",
          "accounting": "COMPTABILITÉ & ADMINISTRATION"
        },
        "roles": {
          "director": "Mokambi",
          "sales_rep": "Moteki",
          "purchasing_manager": "Mokambi ya ba achats",
          "logistics_coordinator": "Mokambi ya logistique",
          "accountant": "Mokambi mbongo"
        }
      },
      "customers": {
        "hero": {
          "title": "Mission na biso",
          "text": "Kopesa ba professionnels bileyi ya sika ya makasi ya Africa mpe Asia, na lisalisi ya mosala ya noki, ya kotyelama motema mpe ya talo malamu.",
          "cta": "KATALOGO"
        },
        "stats": {
          "title": "Mitanya ya ntina",
          "sub": "Excellence ya bokaboli na Hauts-de-France",
          "p1": "Wuta Bruay-sur-l’Escaut, SN Food Distribution asalaka na magasin ya sika ya 200 m². Tokabolaka na kati ya bangonga 24 tii 48, mpo na kosala ete mombongo na bino ezanga bileyi ya ntina te.",
          "p2": "Katalogo na biso ezali na bileyi ndenge na ndenge, na kati na yango bileyi ya kokauka, ya sika, mpe ya congélateur. Tozali na lolendo ya kozala partner ya mboka ya kotyelama motema mpo na bateki mpe ba restaurants oyo balukaka ba saveurs ya solo ya Africa mpe Asia."
        },
        "categories": {
          "title": "Ba catégories ya bileyi",
          "sub": "Katalogo ya ndenge na ndenge mpo na bamposa na bino nionso ya bileyi",
          "desc": "SN Food Distribution apesaka katalogo ya monene, wuta bileyi ya mesa tii na ba ingrédients ya sika. Tozali esika moko mpo na kozwa nionso ya Africa mpe Asia na etuka ya Hauts-de-France.",
          "cta": "Senga katalogo",
          "items": {
            "dry": {
              "title": "Bileyi ya kokauka",
              "desc": "Loso, fufu, ba épices ya solo, mpe ba sauces ya sika."
            },
            "fresh": {
              "title": "Bileyi ya sika",
              "desc": "Ba ingrédients ya sika ya malamu wuta na ba partenaires ya kotyelama motema."
            },
            "frozen": {
              "title": "Bileyi ya congélateur",
              "desc": "Bileyi ebele ya congélateur oyo babombi na malili ya malonga."
            },
            "drinks": {
              "title": "Masanga ya mboka",
              "desc": "Masanga mpe ba jus ya lokumu wuta Africa mpe Asia."
            },
            "halal": {
              "title": "Endimami Halal",
              "desc": "Boponi ya bileyi ya Halal mpo na basombi na bino."
            },
            "african": {
              "title": "Specialités ya Africa",
              "desc": "Mafuta ya sika, ba condiments, mpe bileyi ya tradition ya Africa."
            }
          }
        }
      },
      "brands_page": {
        "hero_title": "Bamarca na biso nionso",
        "hero_text": "SN Food Distribution asalaka na boyokani na bamarca ebele ya mokili mobimba, wuta oyo eyebana mingi tii na ba spécialités ya mboka. Na biso, okozwa nionso oyo basombi na yo balukaka.",
        "popular_title": "Bamarca ya lokumu"
      },
      "new_arrivals_page": {
        "hero_title": "Bileyi ya sika",
        "hero_text": "Luka koyeba bileyi ya sika oyo ebakisami na katalogo na biso: bileyi ya sika mpe eksperiansi ya solo ya bileyi ya mboka.",
        "add_to_wishlist": "Bakisa na liste ya bamposa",
        "add_to_cart": "Bakisa na panier",
        "code_prefix": "réf.",
        "filter_by_categories": "Kabolola na ba catégories",
        "all_categories": "Ba catégories nionso",
        "breadcrumb_home": "Ndako",
        "breadcrumb_shop": "Magasin",
        "showing_results": "Komona {{from}}–{{to}} na kati ya {{total}} bileyi",
        "sorting_aria": "Bongisa bileyi",
        "sort_default": "Ndendé ya liboso",
        "sort_name_asc": "Kombo (A–Z)",
        "sort_name_desc": "Kombo (Z–A)",
        "categories": {
          "fresh": "Bileyi ya sika",
          "flours": "Ba fufu ndenge na ndenge",
          "dairy": "Lait mpe Makei",
          "condiments": "Ba condiments",
          "noodles": "Ba noodles ya noki",
          "beverages": "Masanga",
          "snacks": "Ba snacks & bileyi ya sukali",
          "frozen": "Bileyi ya congélateur",
          "spices": "Ba épices & matiti ya nsolo",
          "canned": "Bileyi ya kopo",
          "rice": "Loso & mbuma",
          "sauces": "Ba sauces & ba assaisonnements",
          "meat": "Nyama",
          "seafood": "Mbisi mpe bileyi ya mai",
          "desserts": "Bileyi ya sukali nsima ya mesa"
        }
      },
      "contact_page": {
        "hero": {
          "title": "Kotala biso",
          "subtitle": "Mosalisi ya gros ya bileyi ya Africa & Asia na Bruay-sur-l’Escaut. Kuta ekipi na biso lelo."
        },
        "map_title": "Google Maps",
        "info": {
          "location_title": "Esika na biso",
          "phone_title": "Nimero ya telefone",
          "phone_line1": "Kuta biso mpo na sango mosusu",
          "phone_line2": "mpo na misala na biso ya gros",
          "email_title": "Adresse email",
          "hours_title": "Bangonga ya mosala",
          "hours_line1": "Lundi - Samedi: 09:00 - 20:00",
          "hours_line2": "Lomingo: Ekangami"
        },
        "form": {
          "title": "Tindela biso nsango",
          "subtitle": "Tondisa formulaire oyo na se mpe tokozongisela yo eyano noki.",
          "full_name": "Kombo mobimba",
          "full_name_ph": "Kotisa kombo na yo",
          "email": "Adresse email",
          "email_ph": "Kotisa email na yo",
          "subject": "Sujet",
          "subject_ph": "Likambo nini?",
          "message": "Nsango na yo",
          "message_ph": "Ndenge nini tokoki kosalisa yo?",
          "submit": "Tinda nsango"
        }
      },
      "vendors": {
        "hero": {
          "title": "Logistique mpe innovation",
          "text": "SN Food Distribution azali partner ya makasi mpo na kobatela mpe kokabola bileyi ya sika, na lisalisi ya logistique ya baprofesioneli mpe mibeko ya makasi ya qualité.",
          "cta": "KATALOGO"
        },
        "infrastructure": {
          "title": "Makambo ya infrastructure",
          "sub": "Bokaboli ya sika ya bileyi ya mboka",
          "p1": "SN Food Distribution asalaka na magasin ya sika oyo ezali na bisika ekeseni mpo na bileyi ya kokauka, ya sika, mpe ya congélateur. Esika na biso ebongisami malamu mpo na kotala bileyi na ndenge ya malonga.",
          "p2": "Tosalelaka ba chambres froides ya sika mpo na bileyi ya congélateur, kobatelaka qualité ya likolo mpenza. Logistique na biso esimbami na mituka ya malili, kosala ete malili ekatama ata moke te.",
          "p3": "Wuta Bruay-sur-l’Escaut, infrastructure na biso ebongisami mpo na kozala esika ya kotyelama motema mpo na baprofesioneli na Hauts-de-France mobimba.",
        },
        "guarantees": {
          "title": "Ba garanties ya mosala",
          "sub": "Partner ya kotyelama motema na secteur ya gros ya bileyi ya Africa & Asia",
          "desc": "SN Food Distribution apasaka garantie ya bokaboli na kati ya bangonga 24 tii 48 ndenge zone na bino ezali. Tozali kosala ete bileyi na biso ya ntina ezala tango nionso mpe tosalaka noki mpo na ba commandes ya urgent.",
          "cta": "Senga katalogo",
          "items": {
            "excellence": {
              "title": "Excellence na mosala",
              "desc": "Botosi ya makasi ya mibeko ya hygiène ya Poto mpe ba procédures HACCP."
            },
            "supply": {
              "title": "Stock ya kotyelama motema",
              "desc": "Stock ya tango nionso mpe kozwa noki bileyi ya ntina ya Africa mpe Asia."
            },
            "partnerships": {
              "title": "Boyokani ya seko",
              "desc": "Kotonga boyokani ya tango molai mpe ya litomba na ba fournisseurs na biso."
            },
            "cold_chain": {
              "title": "Kobatelama ya malili",
              "desc": "Mituka mpe ba chambres froides oyo ebatelaka malili ndenge mibeko esengi."
            },
            "innovation": {
              "title": "Innovation na logistique",
              "desc": "Biloko ya sika mpe mituka ya sika mpo na bokaboli ya likolo."
            },
            "certified": {
              "title": "Bileyi ya kondimama",
              "desc": "Ba certifications Halal mpe bileyi wuta na ba partenaires eyebana na mokili mobimba."
            }
          }
        }
      },
    }
  },
  nl: {
    translation: {
      ...companyNl,
      "nav": {
        "home": "Home",
        "company": "Bedrijf",
        "team": "Team",
        "vendors": "Leveranciers",
        "customers": "Klanten",
        "events": "Evenementen",
        "catalogs": "Catalogi",
        "brands": "Merken",
        "new_arrivals": "Nieuwe aankomsten",
        "contact": "Contact",
        "branches": "Filialen",
        "pages": "Pagina's"
      },
      "header": {
        "logo_subtitle": "Premium Boodschappen",
        "search_placeholder": "Hoe kunnen we u helpen?",
        "search_button": "Zoeken",
        "language": "Taal",
        "accounts": "Accounts",
        "login_register": "Inloggen/Registreren"
      },
      "footer": {
        "brand_alt": "SN Food",
        "brand_text": "SN Food Distribution is een toonaangevende groothandel in Afrikaanse en Aziatische voedingsmiddelen, die authentieke smaken en betrouwbare service biedt aan professionals in de hele regio.",
        "quick_links": "Snelle Links",
        "categories": "Categorieën",
        "contact_us": "Contacteer Ons",
        "catalogues": "Catalogi",
        "account": "Account",
        "contact_wholesale": "Neem contact op voor groothandelsvragen",
        "rights": "Alle rechten voorbehouden.",
        "terms": "Algemene Voorwaarden",
        "privacy": "Privacybeleid",
        "cookie": "Cookiebeleid"
      },
      "discover": {
        "title": "Uw partner in uitmuntendheid",
        "subtitle": "SN Food Distribution levert hoogwaardige Afrikaanse en Aziatische producten rechtstreeks aan professionals. Verbeter uw bedrijf met authentieke smaken en betrouwbare groothandelsservice.",
        "cta": "ONTDEK CATALOGUS"
      },
      "feature_highlights": {
        "free_shipping": "Gratis verzending",
        "free_shipping_desc": "Bij bestellingen boven €150",
        "save_money": "Bespaar geld",
        "save_money_desc": "Groothandelsprijzen",
        "quality_assured": "Kwaliteit gegarandeerd",
        "quality_assured_desc": "100% Premium producten",
        "best_deal": "Beste deal aanbieding",
        "best_deal_desc": "Exclusieve B2B-kortingen",
        "support": "Ondersteuning 24/7",
        "support_desc": "Deskundige hulp"
      },
      "categories_section": {
        "title": "Kleuren en smaken van over de hele wereld",
        "subtitle": "Duizenden producten van over de hele wereld op uw tafel. Eén bedrijf met elke productcategorie: Vers, Droog, Bevroren en Cosmetica",
        "items": {
          "dairy": "Zuivel & Eieren",
          "meat": "Vlees & Zeevruchten",
          "bakery": "Bakkerij",
          "organic": "Biologische producten",
          "fresh_eggs": "Verse eieren",
          "ready_meals": "Salades & Kant-en-klaarmaaltijden"
        }
      },
      "feature_strip": {
        "kicker": "Ons erfgoed",
        "title": "Continenten verbinden via authentieke smaken",
        "text1": "Sinds onze oprichting is SN Food Distribution toegewijd aan het inkopen van de beste etnische producten uit heel Afrika en Azië. Onze missie is om professionals te ondersteunen met authentieke ingrediënten die een verhaal vertellen van traditie, kwaliteit en passie.",
        "text2": "Wij geloven dat voedsel meer is dan alleen voeding; het is een universele taal die ons allemaal verbindt. Door betrouwbare logistiek en strenge kwaliteitscontrole.",
        "vision1_title": "Oncompromisloze kwaliteit",
        "vision1_desc": "Alleen producten van topkwaliteit inkopen voor onze partners.",
        "vision2_title": "Wereldwijde verbondenheid",
        "vision2_desc": "Directe banden met authentieke producenten in twee continenten.",
        "vision3_title": "Duurzame inkoop",
        "vision3_desc": "Ethische praktijken die lokale gemeenschappen wereldwijd ondersteunen."
      },
      "promo": {
        "badge": "Groothandel uitmuntendheid",
        "title": "Premium voedseloplossingen",
        "text": "Werk samen met SN Food Distribution voor exclusieve etnische producten, schaalbare logistiek en concurrerende groothandelsprijzen.",
        "smart_logistics": "Slimme logistiek",
        "competitive_rates": "Concurrerende tarieven",
        "become_partner": "Word partner",
        "catalog": "Catalogus",
        "years": "Jaar",
        "offers_title": "Wilt u aanbiedingen?",
        "offers_sub": "Meld u gratis aan voor onze nieuwsbrief!",
        "email_placeholder": "Uw e-mail",
        "signup_btn": "AANMELDEN",
        "terms_accept": "Ik heb de Algemene Voorwaarden en het Privacybeleid gelezen en ga hiermee akkoord"
      },
      "export": {
        "title": "Wij leveren overal",
        "text": "SN Food Distribution levert in de hele regio en daarbuiten. Onze producten zijn geselecteerd om te voldoen aan de eisen van professionals met gecontroleerde logistiek."
      },
      "extra_sections": {
        "pow_title": "Producten van de week",
        "events_title": "Evenementen",
        "events_subtitle": "Ontdek wat er gebeurt in de wereld van SN Food",
        "events_go_to": "Ga naar de evenementenpagina"
      },
      "team": {
        "hero": {
          "title": "Ons Team",
          "desc": "Wij zijn een groep toegewijde professionals die zich inzetten om de beste Afrikaanse en Aziatische producten naar onze partners te brengen. Ons diverse team werkt nauw samen om uitmuntendheid in inkoop, logistiek en klanttevredenheid te garanderen en de groei van uw bedrijf elke dag te ondersteunen."
        },
        "values": {
          "title": "Bedrijfswaarden",
          "sub": "Kwaliteit, Betrouwbaarheid en Respect",
          "p1": "Bij SN Food Distribution stellen we kwaliteit, betrouwbaarheid en respect centraal in ons bedrijf. We cultiveren een dynamische en collaboratieve werkomgeving waarin elk teamlid actief bijdraagt aan de tevredenheid van onze klanten.",
          "p2": "Ons team profiteert van meer dan 15 jaar gecombineerde ervaring in de import-export en distributiesector voor levensmiddelen, wat uitmuntendheid garandeert bij elke bestelling die we afhandelen.",
          "image_alt": "Onze waarden in actie"
        },
        "grid": {
          "title": "Ontmoet het team.",
          "empty": "Geen leden gevonden voor deze afdeling."
        },
        "departments": {
          "direction": "DIRECTIE",
          "sales": "VERKOOPAFDELING",
          "purchasing": "INKOOP & VOORRAAD",
          "logistics": "LOGISTIEK & MAGAZIJN",
          "accounting": "BOEKHOUDING & ADMINISTRATIE"
        },
        "roles": {
          "director": "Directeur",
          "sales_rep": "Verkoopvertegenwoordiger",
          "purchasing_manager": "Inkoopmanager",
          "logistics_coordinator": "Logistiek Coördinator",
          "accountant": "Boekhouder"
        }
      },
      "customers": {
        "hero": {
          "title": "Onze Missie",
          "text": "Professionals voorzien van een breed scala aan hoogwaardige Afrikaanse en Aziatische producten, ondersteund door een snelle, betrouwbare en concurrerende service.",
          "cta": "DE CATALOGUS"
        },
        "stats": {
          "title": "Belangrijke Statistieken",
          "sub": "Distributie uitmuntendheid in Hauts-de-France",
          "p1": "Gevestigd in Bruay-sur-l’Escaut, opereert SN Food Distribution vanuit een gespecialiseerd magazijn van 200 m². Wij garanderen levering binnen 24 tot 48 uur, zodat uw bedrijf nooit zonder essentiële etnische producten komt te zitten.",
          "p2": "Onze uitgebreide catalogus omvat meerdere categorieën, waaronder droge, verse en diepgevroren goederen. We zijn er trots op een betrouwbare lokale partner te zijn voor retailers en restaurants die op zoek zijn naar authentieke Afrikaanse en Aziatische smaken."
        },
        "categories": {
          "title": "Productcategorieën",
          "sub": "Een diverse catalogus voor al uw etnische voedingsbehoeften",
          "desc": "SN Food Distribution biedt een grote catalogus met meerdere categorieën, van basisproducten tot gespecialiseerde ingrediënten. Wij zijn uw totaalleverancier voor authentieke Afrikaanse en Aziatische benodigdheden in de regio Hauts-de-France.",
          "cta": "Catalogus aanvragen",
          "items": {
            "dry": {
              "title": "Droge Producten",
              "desc": "Rijst, meel, authentieke kruiden en gespecialiseerde sauzen."
            },
            "fresh": {
              "title": "Verse Producten",
              "desc": "Kwaliteitsverse ingrediënten van vertrouwde partners."
            },
            "frozen": {
              "title": "Diepvriesproducten",
              "desc": "Een breed assortiment diepvriesproducten die op optimale temperaturen worden bewaard."
            },
            "drinks": {
              "title": "Exotische Dranken",
              "desc": "Populaire dranken en sappen uit Afrika en Azië."
            },
            "halal": {
              "title": "Halal Gecertificeerd",
              "desc": "Een speciale selectie Halal-producten voor uw klanten."
            },
            "african": {
              "title": "Afrikaanse Specialiteiten",
              "desc": "Specifieke oliën, condimenten en traditionele Afrikaanse basisvoedingsmiddelen."
            }
          }
        }
      },
      "brands_page": {
        "hero_title": "Al onze merken",
        "hero_text": "SN Food Distribution werkt met tientallen internationale merken, van bekende namen tot lokale specialiteiten. Bij ons vindt u wat uw klanten zoeken.",
        "popular_title": "Populaire merken"
      },
      "new_arrivals_page": {
        "hero_title": "Nieuwe Aankomsten",
        "hero_text": "Ontdek de nieuwste toevoegingen aan onze catalogus: nieuwe producten en authentieke etnische gastronomische ervaringen.",
        "add_to_wishlist": "Toevoegen aan verlanglijst",
        "add_to_cart": "In winkelwagen",
        "code_prefix": "art.",
        "filter_by_categories": "Filter op Categorieën",
        "all_categories": "Alle Categorieën",
        "breadcrumb_home": "Home",
        "breadcrumb_shop": "Winkel",
        "showing_results": "Toon {{from}}–{{to}} van {{total}} resultaten",
        "sorting_aria": "Sorteer producten",
        "sort_default": "Standaard sortering",
        "sort_name_asc": "Naam (A–Z)",
        "sort_name_desc": "Naam (Z–A)",
        "categories": {
          "fresh": "Verse Producten",
          "flours": "Assortiment Melen",
          "dairy": "Zuivel",
          "condiments": "Condimenten",
          "noodles": "Instant Noedels",
          "beverages": "Dranken",
          "snacks": "Snacks & Snoep",
          "frozen": "Diepvries",
          "spices": "Specerijen & Kruiden",
          "canned": "In Blik",
          "rice": "Rijst & Granen",
          "sauces": "Sauzen & Smaakmakers",
          "meat": "Vlees & Gevogelte",
          "seafood": "Zeevruchten",
          "desserts": "Desserts"
        }
      },
      "contact_page": {
        "hero": {
          "title": "Contacteer Ons",
          "subtitle": "Groothandel in Afrikaanse & Aziatische voedingsmiddelen gevestigd in Bruay-sur-l’Escaut. Neem vandaag nog contact op met ons team."
        },
        "map_title": "Google Maps",
        "info": {
          "location_title": "Onze Locatie",
          "phone_title": "Telefoonnummer",
          "phone_line1": "Neem contact met ons op voor meer informatie",
          "phone_line2": "over onze groothandelsdiensten",
          "email_title": "E-mailadres",
          "hours_title": "Werktijden",
          "hours_line1": "Ma - Za: 09:00 - 20:00",
          "hours_line2": "Zondag: Gesloten"
        },
        "form": {
          "title": "Stuur Ons een Bericht",
          "subtitle": "Vul het onderstaande formulier in en we nemen zo snel mogelijk contact met u op.",
          "full_name": "Volledige Naam",
          "full_name_ph": "Voer uw naam in",
          "email": "E-mailadres",
          "email_ph": "Voer uw e-mailadres in",
          "subject": "Onderwerp",
          "subject_ph": "Waar gaat dit over?",
          "message": "Uw Bericht",
          "message_ph": "Hoe kunnen we u helpen?",
          "submit": "Bericht Verzenden"
        }
      },
      "vendors": {
        "hero": {
          "title": "Logistiek en innovatie",
          "text": "SN Food Distribution is een hooggekwalificeerde partner voor het behoud en de distributie van etnische specialiteiten, ondersteund door professionele logistiek en strikte kwaliteitsnormen.",
          "cta": "DE CATALOGUS"
        },
        "infrastructure": {
          "title": "Infrastructuur Details",
          "sub": "Professionele distributie van etnische voedingsproducten",
          "p1": "SN Food Distribution opereert vanuit een beveiligd magazijn met afzonderlijke zones voor droge, verse en diepgevroren goederen. Onze faciliteit is geoptimaliseerd met industriële stellingen om een efficiënt voorraadbeheer te garanderen.",
          "p2": "Wij maken gebruik van gespecialiseerde koelcellen die zijn aangepast voor diepvriesproducten, waarbij de hoogste kwaliteitsnormen worden gehandhaafd. Onze logistiek wordt aangedreven door een vloot van koelvoertuigen, waardoor de koudeketen nooit wordt verbroken.",
          "p3": "Gevestigd in Bruay-sur-l’Escaut, is onze infrastructuur ontworpen om te dienen als een betrouwbare hub voor professionals in de hele regio Hauts-de-France."
        },
        "guarantees": {
          "title": "Servicegaranties",
          "sub": "Een vertrouwde partner in de Afrikaanse & Aziatische voedingsgroothandel",
          "desc": "SN Food Distribution garandeert levering binnen 24 tot 48 uur, afhankelijk van uw zone. Wij zorgen voor een constante beschikbaarheid van onze belangrijkste producten en bieden een snel beheer van dringende bestellingen.",
          "cta": "Catalogus aanvragen",
          "items": {
            "excellence": {
              "title": "Operationele Uitmuntendheid",
              "desc": "Strikte naleving van Europese hygiënenormen en HACCP-procedures."
            },
            "supply": {
              "title": "Betrouwbare Levering",
              "desc": "Permanente voorraad en snelle beschikbaarheid van kernproducten uit Afrika en Azië."
            },
            "partnerships": {
              "title": "Duurzame Partnerschappen",
              "desc": "Bouwen aan langdurige, wederzijds voordelige relaties met onze leveranciers."
            },
            "cold_chain": {
              "title": "Integriteit van de Koudeketen",
              "desc": "Koelwagens en koelcellen die strikte naleving van sanitaire normen garanderen."
            },
            "innovation": {
              "title": "Logistieke Innovatie",
              "desc": "Geoptimaliseerde industriële stellingen en een moderne vloot voor superieure distributie."
            },
            "certified": {
              "title": "Gecertificeerde Producten",
              "desc": "Halal-certificeringen en producten afkomstig van internationaal erkende partners."
            }
          }
        }
      },
    }
  },
  en: {
    translation: {
      ...companyEn,
      "nav": {
        "home": "Home",
        "company": "Company",
        "team": "Team",
        "vendors": "Vendors",
        "customers": "Customers",
        "events": "Events",
        "catalogs": "Catalogs",
        "brands": "Brands",
        "new_arrivals": "New arrivals",
        "contact": "Contact",
        "branches": "Branches",
        "pages": "Pages"
      },
      "header": {
        "logo_subtitle": "Premium Groceries",
        "search_placeholder": "How can we help you ?",
        "search_button": "Search",
        "language": "Language",
        "accounts": "Accounts",
        "login_register": "Login/Register"
      },
      "topbar": {
        "address": "262 Rue des Bouleaux, 59860 Bruay-sur-l’Escaut",
        "email": "contact@snfood.fr"
      },
      "categorybar": {
        "all_categories": "All Categories",
        "weekly_discount": "Weekly Discount!"
      },
      "offcanvas": {
        "close_menu": "Close menu",
        "close": "Close",
        "type_products": "Type Your Products ...",
        "menu": "Menu",
        "search": "Search",
        "collapse": "Collapse",
        "expand": "Expand",
        "swap": "Swap",
        "wishlist": "Wishlist",
        "cart": "Cart",
        "wholesale": "Wholesale Food Distribution",
        "social": {
          "facebook": "Facebook",
          "instagram": "Instagram",
          "tiktok": "TikTok"
        }
      },
      "footer": {
        "brand_alt": "SN Food",
        "brand_text": "SN Food Distribution is a leading wholesaler of African and Asian food products, providing authentic flavors and reliable service to professionals across the region.",
        "quick_links": "Quick Links",
        "categories": "Categories",
        "contact_us": "Contact Us",
        "catalogues": "Catalogues",
        "account": "Account",
        "contact_wholesale": "Contact us for wholesale inquiries",
        "rights": "All rights reserved.",
        "terms": "Terms & Conditions",
        "privacy": "Privacy Policy",
        "cookie": "Cookie Policy"
      },
      "discover": {
        "title": "Your partner in excellence",
        "subtitle": "SN Food Distribution provides high-quality African and Asian products directly to professionals. Elevate your business with authentic flavors and reliable wholesale service.",
        "cta": "EXPLORE CATALOGUE"
      },
      "feature_highlights": {
        "free_shipping": "Free Shipping",
        "free_shipping_desc": "On orders over €150",
        "save_money": "Save Money",
        "save_money_desc": "Wholesale prices",
        "quality_assured": "Quality Assured",
        "quality_assured_desc": "100% Premium Products",
        "best_deal": "Best Deal Offer",
        "best_deal_desc": "Exclusive B2B discounts",
        "support": "Support 24/7",
        "support_desc": "Expert assistance"
      },
      "categories_section": {
        "title": "Colors and flavors from around the world",
        "subtitle": "Thousands of products from all over the world on your table. A single company with every product category: Fresh, Dry, Frozen and Cosmetics",
        "items": {
          "dairy": "Dairy & Eggs",
          "meat": "Meat & Seafood",
          "bakery": "Bakery",
          "organic": "Organic Products",
          "fresh_eggs": "Fresh Eggs",
          "ready_meals": "Salads & Ready Meals"
        }
      },
      "feature_strip": {
        "kicker": "Our Heritage",
        "title": "Bridging Continents Through Authentic Flavors",
        "text1": "Since our inception, SN Food Distribution has been dedicated to sourcing the finest ethnic products from across Africa and Asia. Our mission is to empower professionals with authentic ingredients that tell a story of tradition, quality, and passion.",
        "text2": "We believe that food is more than just sustenance; it is a universal language that connects us all. Through reliable logistics and rigorous quality control.",
        "vision1_title": "Uncompromising Quality",
        "vision1_desc": "Sourcing only the premium grade products for our partners.",
        "vision2_title": "Global Connectivity",
        "vision2_desc": "Direct links to authentic producers across two continents.",
        "vision3_title": "Sustainable Sourcing",
        "vision3_desc": "Ethical practices that support local communities globally."
      },
      "promo": {
        "badge": "Wholesale Excellence",
        "title": "Premium Food Solutions",
        "text": "Partner with SN Food Distribution for exclusive ethnic products, scalable logistics, and competitive wholesale prices.",
        "smart_logistics": "Smart Logistics",
        "competitive_rates": "Competitive Rates",
        "become_partner": "Become a Partner",
        "catalog": "Catalog",
        "years": "Years",
        "offers_title": "Want some offers?",
        "offers_sub": "Sign up for our newsletter for free!",
        "email_placeholder": "Your email",
        "signup_btn": "SIGN UP",
        "terms_accept": "I have read and accept the Terms and Conditions and the Privacy Policy"
      },
      "export": {
        "title": "We deliver everywhere",
        "text": "SN Food Distribution delivers throughout the region and beyond. Our products are selected to meet the requirements of professionals with controlled logistics."
      },
      "extra_sections": {
        "pow_title": "Products of the week",
        "events_title": "Events",
        "events_subtitle": "Discover what's happening in the world of SN Food",
        "events_go_to": "Go to the events page"
      },
      "auth": {
        "login": "Login",
        "register": "Register",
        "email": "Email",
        "password": "Password",
        "forgot_password": "Forgot password?",
        "new_to": "New to SN Food?",
        "already_have": "Already have an account?",
        "first_name": "First Name",
        "last_name": "Last Name",
        "company_name": "Company Name",
        "vat_number": "VAT Number",
        "billing_address": "Billing Address",
        "address": "Address",
        "city": "City",
        "country": "Country",
        "postal_code": "Postal Code",
        "sdi_pec": "SDI or PEC Code",
        "phone": "Phone Number",
        "account": "Account"
      },
      "team": {
        "hero": {
          "title": "Our Team",
          "desc": "We are a group of dedicated professionals committed to bringing the best African and Asian products to our partners. Our diverse team works collaboratively to ensure excellence in sourcing, logistics, and customer satisfaction, supporting the growth of your business every day."
        },
        "values": {
          "title": "Company Values",
          "sub": "Quality, Reliability, and Respect",
          "p1": "At SN Food Distribution, we place quality, reliability, and respect at the heart of our business. We cultivate a dynamic and collaborative work environment where every team member actively contributes to the satisfaction of our customers.",
          "p2": "Our team benefits from more than 15 years of combined experience in the import-export and food distribution sector, ensuring excellence in every order we handle.",
          "image_alt": "Our values in action"
        },
        "grid": {
          "title": "Meet the team.",
          "empty": "No members found for this department."
        },
        "departments": {
          "direction": "DIRECTION",
          "sales": "SALES DEPARTMENT",
          "purchasing": "PURCHASING & SUPPLY",
          "logistics": "LOGISTICS & WAREHOUSE",
          "accounting": "ACCOUNTING & ADMINISTRATION"
        },
        "roles": {
          "director": "Director",
          "sales_rep": "Sales Representative",
          "purchasing_manager": "Purchasing Manager",
          "logistics_coordinator": "Logistics Coordinator",
          "accountant": "Accountant"
        }
      },
      "customers": {
        "hero": {
          "title": "Our Mission",
          "text": "Providing professionals with a wide range of high-quality African and Asian products, supported by fast, reliable, and competitive service.",
          "cta": "THE CATALOG"
        },
        "stats": {
          "title": "Key Statistics",
          "sub": "Distribution excellence in Hauts-de-France",
          "p1": "Based in Bruay-sur-l’Escaut, SN Food Distribution operates from a 200 m² specialized warehouse. We guarantee delivery within 24 to 48 hours, ensuring your business never faces a stockout of essential ethnic products.",
          "p2": "Our comprehensive catalog covers multiple categories, including dry, fresh, and frozen goods. We pride ourselves on being a reliable local partner for retailers and restaurants seeking authentic African and Asian flavors."
        },
        "categories": {
          "title": "Product Categories",
          "sub": "A diverse catalog for all your ethnic food needs",
          "desc": "SN Food Distribution provides a large multi-category catalog, from pantry staples to specialized ingredients. We are your one-stop shop for authentic African and Asian supplies in the Hauts-de-France region.",
          "cta": "Request catalog",
          "items": {
            "dry": {
              "title": "Dry Products",
              "desc": "Rice, flours, authentic spices, and specialty sauces."
            },
            "fresh": {
              "title": "Fresh Products",
              "desc": "Quality fresh ingredients sourced from trusted partners."
            },
            "frozen": {
              "title": "Frozen Goods",
              "desc": "A wide range of deep-frozen items maintained at optimal temperatures."
            },
            "drinks": {
              "title": "Exotic Drinks",
              "desc": "Popular beverages and juices from Africa and Asia."
            },
            "halal": {
              "title": "Halal Certified",
              "desc": "A dedicated selection of Halal products for your customers."
            },
            "african": {
              "title": "African Specialties",
              "desc": "Specific oils, condiments, and traditional African food staples."
            }
          }
        }
      },
      "vendors": {
        "hero": {
          "title": "Logistics and innovation",
          "text": "SN Food Distribution is a highly qualified partner for the preservation and distribution of ethnic specialties, supported by professional logistics and strict quality standards.",
          "cta": "THE CATALOG"
        },
        "infrastructure": {
          "title": "Infrastructure Details",
          "sub": "Professional distribution of ethnic food products",
          "p1": "SN Food Distribution operates from a secure warehouse featuring distinct zones for dry, fresh, and frozen goods. Our facility is optimized with industrial shelving to ensure efficient stock management.",
          "p2": "We utilize specialized cold rooms adapted for frozen products, maintaining the highest quality standards. Our logistics are powered by a fleet of refrigerated vehicles, ensuring the cold chain is never broken.",
          "p3": "Based in Bruay-sur-l’Escaut, our infrastructure is designed to serve as a reliable hub for professionals across the Hauts-de-France region, combining security with operational efficiency."
        },
        "guarantees": {
          "title": "Service Guarantees",
          "sub": "A trusted partner in the African & Asian food wholesale sector",
          "desc": "SN Food Distribution guarantees delivery within 24 to 48 hours depending on your zone. We ensure constant availability of our flagship products and provide rapid management of urgent orders to keep your business running smoothly.",
          "cta": "Request catalog",
          "items": {
            "excellence": {
              "title": "Operational Excellence",
              "desc": "Strict adherence to European hygiene standards and HACCP procedures."
            },
            "supply": {
              "title": "Reliable Supply",
              "desc": "Permanent stock and rapid availability of core African and Asian products."
            },
            "partnerships": {
              "title": "Sustainable Partnerships",
              "desc": "Building long-term, mutually beneficial relationships with our suppliers."
            },
            "cold_chain": {
              "title": "Cold Chain Integrity",
              "desc": "Refrigerated trucks and cold rooms ensuring strict compliance with sanitary norms."
            },
            "innovation": {
              "title": "Logistics Innovation",
              "desc": "Optimized industrial shelving and modern fleet for superior distribution."
            },
            "certified": {
              "title": "Certified Products",
              "desc": "Halal certifications and products sourced from internationally recognized partners."
            }
          }
        }
      },
      "events_page": {
        "title": "Events",
        "subtitle": "Find out what happens in the SN Food world",
        "go_to": "Go to the events page"
      },
      "catalogs_page": {
        "hero_title": "The many colors of ethnic food",
        "hero_text": "SN Food Distribution offers a wide catalog of African and Asian food products for professionals.",
        "grid_title": "Product catalogues",
        "items": {
          "complete": "Complete catalog",
          "fresh": "Fresh",
          "meat": "Meat",
          "drinks": "Drinks",
          "tea": "Tea",
          "dairy": "Dairy",
          "ghee": "Ghee",
          "noodles": "Noodles"
        }
      },
      "brands_page": {
        "hero_title": "All our brands",
        "hero_text": "SN Food Distribution works with dozens of international brands, from well-known names to local specialties. With us, you will find what your customers want.",
        "popular_title": "Popular brands"
      },
        "new_arrivals_page": {
        "hero_title": "New Arrivals",
        "hero_text": "Discover the latest additions to our catalog: new products and authentic ethnic gastronomic experiences.",
        "add_to_wishlist": "Add to wishlist",
        "add_to_cart": "Add to cart",
        "code_prefix": "cod.",
        "filter_by_categories": "Filter by Categories",
        "all_categories": "All Categories",
        "breadcrumb_home": "Home",
        "breadcrumb_shop": "Shop",
        "showing_results": "Showing {{from}}–{{to}} of {{total}} results",
        "sorting_aria": "Sort products",
        "sort_default": "Default Sorting",
        "sort_name_asc": "Name (A–Z)",
        "sort_name_desc": "Name (Z–A)",
        "categories": {
          "fresh": "Fresh Products",
          "flours": "Assorted Flours",
          "dairy": "Dairy",
          "condiments": "Condiments",
          "noodles": "Instant Noodles",
          "beverages": "Beverages",
          "snacks": "Snacks & Sweets",
          "frozen": "Frozen Food",
          "spices": "Spices & Herbs",
          "canned": "Canned Goods",
          "rice": "Rice & Grains",
          "sauces": "Sauces & Seasonings",
          "meat": "Meat & Poultry",
          "seafood": "Seafood",
          "desserts": "Desserts"
        }
      },
      "contact_page": {
        "hero": {
          "title": "Contact Us",
          "subtitle": "African & Asian food wholesaler based in Bruay-sur-l’Escaut. Get in touch with our team today."
        },
        "map_title": "Google Maps",
        "info": {
          "location_title": "Our Location",
          "phone_title": "Phone Number",
          "phone_line1": "Contact us for more information",
          "phone_line2": "about our wholesale services",
          "email_title": "Email Address",
          "hours_title": "Working Hours",
          "hours_line1": "Mon - Sat: 09:00 - 20:00",
          "hours_line2": "Sunday: Closed"
        },
        "form": {
          "title": "Send Us a Message",
          "subtitle": "Fill out the form below and we'll get back to you as soon as possible.",
          "full_name": "Full Name",
          "full_name_ph": "Enter your name",
          "email": "Email Address",
          "email_ph": "Enter your email",
          "subject": "Subject",
          "subject_ph": "What is this about?",
          "message": "Your Message",
          "message_ph": "How can we help you?",
          "submit": "Send Message"
        }
      },
      "account_page": {
        "hero_title": "My Account",
        "breadcrumb_home": "Home",
        "sidebar": {
          "dashboard": "Dashboard",
          "orders": "Orders",
          "addresses": "Addresses",
          "details": "Account Details",
          "logout": "Logout"
        },
        "dashboard": {
          "title": "Dashboard",
          "hello": "Hello,",
          "member": "SN Member",
          "desc": "From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details."
        },
        "orders": {
          "title": "Recent Orders",
          "empty": "No orders has been made yet.",
          "browse": "BROWSE PRODUCTS"
        },
        "addresses": {
          "title": "Addresses",
          "desc": "The following addresses will be used on the checkout page by default.",
          "billing": "Billing Address",
          "shipping": "Shipping Address",
          "edit": "Edit",
          "placeholder": "You have not set up this type of address yet."
        },
        "details": {
          "title": "Account Details",
          "first_name": "First Name",
          "last_name": "Last Name",
          "display_name": "Display Name",
          "display_hint": "This will be how your name will be displayed in the account section and in reviews",
          "email": "Email Address",
          "password_change": "Password Change",
          "current_password": "Current password (leave blank to leave unchanged)",
          "new_password": "New password (leave blank to leave unchanged)",
          "confirm_new_password": "Confirm new password",
          "save_changes": "SAVE CHANGES"
        }
      },
      "slider": {
        "prev": "Previous slide",
        "next": "Next slide",
        "select": "Select slide",
        "go_to": "Go to slide {{index}}",
        "slide_alt": "Hero slide {{index}}"
      },
      "wishlist_page": {
        "title": "My Wishlist",
        "item_count": "{{count}} item",
        "item_count_plural": "{{count}} items",
        "remove": "Remove from wishlist",
        "code_prefix": "cod.",
        "add_to_cart": "Add to cart",
        "empty": {
          "title": "Your wishlist is empty",
          "text": "Save your favorite items here to buy them later.",
          "cta": "Shop Now"
        }
      },
      "values": {
        "title": "Our Values",
        "sub": "Quality, Reliability, and Respect",
        "text": "At SN Food Distribution, we place quality, reliability, and respect at the heart of our business. We cultivate a dynamic and collaborative work environment where every team member actively contributes to the satisfaction of our customers. Our team benefits from more than 15 years of combined experience in the import-export and food distribution sector.",
        "cta": "Discover our team"
      },
      "catalog": {
        "title": "A large catalog dedicated to food professionals",
        "subtitle": "Discover our most viewed categories and top products, with premium logistics and reliable delivery.",
        "col_viewed": "Most Viewed Categories",
        "col_top": "Top Products",
        "col_delivery": "Delivery in 24 to 48h",
        "pill_fresh_frozen": "Fresh and Frozen",
        "promo_title": "More than 5 vehicles for responsive logistics",
        "promo_text": "Daily deliveries adapted to the requirements of the cold chain and availability.",
        "promo_link": "Learn more",
        "suggest_kicker": "Today we suggest...",
        "suggest_title": "Fresh Products",
        "suggest_link": "Go to Category"
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "home": "Accueil",
        "company": "Entreprise",
        "team": "Équipe",
        "vendors": "Fournisseurs",
        "customers": "Clients",
        "events": "Événements",
        "catalogs": "Catalogues",
        "brands": "Marques",
        "new_arrivals": "Nouveautés",
        "contact": "Contact",
        "branches": "Agences",
        "pages": "Pages"
      },
      "header": {
        "logo_subtitle": "Épicerie premium",
        "search_placeholder": "Comment pouvons-nous vous aider ?",
        "search_button": "Rechercher",
        "language": "Langue",
        "accounts": "Compte",
        "login_register": "Connexion/Inscription"
      },
      "topbar": {
        "address": "262 Rue des Bouleaux, 59860 Bruay-sur-l’Escaut",
        "email": "contact@snfood.fr"
      },
      "categorybar": {
        "all_categories": "Toutes les catégories",
        "weekly_discount": "Promo de la semaine !"
      },
      "offcanvas": {
        "close_menu": "Fermer le menu",
        "close": "Fermer",
        "type_products": "Recherchez vos produits ...",
        "menu": "Menu",
        "search": "Rechercher",
        "collapse": "Réduire",
        "expand": "Développer",
        "swap": "Échanger",
        "wishlist": "Liste de souhaits",
        "cart": "Panier",
        "wholesale": "Distribution alimentaire en gros",
        "social": {
          "facebook": "Facebook",
          "instagram": "Instagram",
          "tiktok": "TikTok"
        }
      },
      "footer": {
        "brand_alt": "SN Food",
        "brand_text": "SN Food Distribution est un grossiste de premier plan de produits alimentaires africains et asiatiques, offrant des saveurs authentiques et un service fiable aux professionnels de la région.",
        "quick_links": "Liens rapides",
        "categories": "Catégories",
        "contact_us": "Nous contacter",
        "catalogues": "Catalogues",
        "account": "Compte",
        "contact_wholesale": "Contactez-nous pour vos demandes en gros",
        "rights": "Tous droits réservés.",
        "terms": "Conditions générales",
        "privacy": "Politique de confidentialité",
        "cookie": "Politique de cookies"
      },
      "auth": {
        "login": "Connexion",
        "register": "Inscription",
        "email": "E-mail",
        "password": "Mot de passe",
        "forgot_password": "Mot de passe oublié ?",
        "new_to": "Nouveau chez SN Food ?",
        "already_have": "Vous avez déjà un compte ?",
        "first_name": "Prénom",
        "last_name": "Nom",
        "company_name": "Nom de l'entreprise",
        "vat_number": "Numéro de TVA",
        "billing_address": "Adresse de facturation",
        "address": "Adresse",
        "city": "Ville",
        "country": "Pays",
        "postal_code": "Code postal",
        "sdi_pec": "Code SDI ou PEC",
        "phone": "Numéro de téléphone",
        "account": "Compte"
      },
      "team": {
        "hero": {
          "title": "Notre Équipe",
          "desc": "Nous sommes un groupe de professionnels dévoués s'engageant à apporter les meilleurs produits africains et asiatiques à nos partenaires. Notre équipe diversifiée travaille en collaboration pour assurer l'excellence dans l'approvisionnement, la logistique et la satisfaction client, soutenant la croissance de votre entreprise au quotidien."
        },
        "values": {
          "title": "Valeurs de l'entreprise",
          "sub": "Qualité, Fiabilité et Respect",
          "p1": "Chez SN Food Distribution, nous plaçons la qualité, la fiabilité et le respect au cœur de notre activité. Nous cultivons un environnement de travail dynamique et collaboratif où chaque membre contribue activement à la satisfaction de nos clients.",
          "p2": "Notre équipe bénéficie de plus de 15 ans d'expérience cumulée dans le secteur de l'import-export et de la distribution alimentaire, garantissant l'excellence à chaque commande.",
          "image_alt": "Nos valeurs en action"
        },
        "grid": {
          "title": "Découvrez l'équipe.",
          "empty": "Aucun membre trouvé pour ce service."
        },
        "departments": {
          "direction": "DIRECTION",
          "sales": "SERVICE COMMERCIAL",
          "purchasing": "ACHATS & APPROVISIONNEMENT",
          "logistics": "LOGISTIQUE & ENTREPÔT",
          "accounting": "COMPTABILITÉ & ADMINISTRATION"
        },
        "roles": {
          "director": "Directeur",
          "sales_rep": "Représentant commercial",
          "purchasing_manager": "Responsable des achats",
          "logistics_coordinator": "Coordinateur logistique",
          "accountant": "Comptable"
        }
      },
      "customers": {
        "hero": {
          "title": "Notre mission",
          "text": "Fournir aux professionnels une large gamme de produits africains et asiatiques de haute qualité, avec un service rapide, fiable et compétitif.",
          "cta": "LE CATALOGUE"
        },
        "stats": {
          "title": "Chiffres clés",
          "sub": "L'excellence de la distribution dans les Hauts-de-France",
          "p1": "Basée à Bruay-sur-l’Escaut, SN Food Distribution opère depuis un entrepôt spécialisé de 200 m². Nous garantissons une livraison sous 24 à 48 heures afin d'éviter toute rupture de stock sur les produits essentiels.",
          "p2": "Notre catalogue couvre plusieurs catégories, notamment les produits secs, frais et surgelés. Nous sommes un partenaire local fiable pour les commerçants et restaurants recherchant des saveurs authentiques d'Afrique et d'Asie."
        },
        "categories": {
          "title": "Catégories de produits",
          "sub": "Un catalogue varié pour tous vos besoins en produits ethniques",
          "desc": "SN Food Distribution propose un catalogue multi-catégories, des produits du quotidien aux ingrédients spécialisés. Votre partenaire unique pour des produits africains et asiatiques authentiques dans les Hauts-de-France.",
          "cta": "Demander le catalogue",
          "items": {
            "dry": {
              "title": "Produits secs",
              "desc": "Riz, farines, épices authentiques et sauces spécialisées."
            },
            "fresh": {
              "title": "Produits frais",
              "desc": "Ingrédients frais de qualité issus de partenaires de confiance."
            },
            "frozen": {
              "title": "Surgelés",
              "desc": "Large choix de produits surgelés conservés à température optimale."
            },
            "drinks": {
              "title": "Boissons exotiques",
              "desc": "Boissons et jus populaires d'Afrique et d'Asie."
            },
            "halal": {
              "title": "Certifié Halal",
              "desc": "Une sélection dédiée de produits Halal pour vos clients."
            },
            "african": {
              "title": "Spécialités africaines",
              "desc": "Huiles, condiments et produits traditionnels africains."
            }
          }
        }
      },
      "vendors": {
        "hero": {
          "title": "Logistique et innovation",
          "text": "SN Food Distribution est un partenaire hautement qualifié pour la conservation et la distribution de spécialités ethniques, avec une logistique professionnelle et des standards de qualité stricts.",
          "cta": "LE CATALOGUE"
        },
        "infrastructure": {
          "title": "Détails des infrastructures",
          "sub": "Distribution professionnelle de produits alimentaires ethniques",
          "p1": "SN Food Distribution opère depuis un entrepôt sécurisé avec des zones distinctes pour les produits secs, frais et surgelés. Notre site est optimisé avec des rayonnages industriels pour une gestion efficace.",
          "p2": "Nous utilisons des chambres froides adaptées aux surgelés et maintenons des standards de qualité élevés. Notre logistique s'appuie sur une flotte de véhicules frigorifiques garantissant la chaîne du froid.",
          "p3": "Basée à Bruay-sur-l’Escaut, notre infrastructure est conçue comme un hub fiable pour les professionnels des Hauts-de-France, alliant sécurité et efficacité opérationnelle."
        },
        "guarantees": {
          "title": "Garanties de service",
          "sub": "Un partenaire de confiance dans le commerce de gros africain et asiatique",
          "desc": "SN Food Distribution garantit une livraison sous 24 à 48 heures selon votre zone. Nous assurons la disponibilité constante de nos produits phares et la gestion rapide des commandes urgentes.",
          "cta": "Demander le catalogue",
          "items": {
            "excellence": {
              "title": "Excellence opérationnelle",
              "desc": "Respect strict des normes d'hygiène européennes et des procédures HACCP."
            },
            "supply": {
              "title": "Approvisionnement fiable",
              "desc": "Stock permanent et disponibilité rapide des produits africains et asiatiques essentiels."
            },
            "partnerships": {
              "title": "Partenariats durables",
              "desc": "Des relations à long terme, mutuellement bénéfiques avec nos fournisseurs."
            },
            "cold_chain": {
              "title": "Chaîne du froid",
              "desc": "Camions frigorifiques et chambres froides pour une conformité sanitaire stricte."
            },
            "innovation": {
              "title": "Innovation logistique",
              "desc": "Rayonnages industriels optimisés et flotte moderne pour une distribution performante."
            },
            "certified": {
              "title": "Produits certifiés",
              "desc": "Certifications Halal et produits issus de partenaires reconnus internationalement."
            }
          }
        }
      },
      "events_page": {
        "title": "Événements",
        "subtitle": "Découvrez ce qui se passe dans l'univers SN Food",
        "go_to": "Aller à la page des événements"
      },
      "catalogs_page": {
        "hero_title": "Les mille couleurs de la cuisine ethnique",
        "hero_text": "SN Food Distribution propose un large catalogue de produits alimentaires africains et asiatiques pour les professionnels.",
        "grid_title": "Catalogues produits",
        "items": {
          "complete": "Catalogue complet",
          "fresh": "Frais",
          "meat": "Viande",
          "drinks": "Boissons",
          "tea": "Thé",
          "dairy": "Produits laitiers",
          "ghee": "Ghee",
          "noodles": "Nouilles"
        }
      },
      "brands_page": {
        "hero_title": "Toutes nos marques",
        "hero_text": "SN Food Distribution travaille avec des dizaines de marques internationales, des plus connues aux spécialités locales. Avec nous, vous trouverez ce que vos clients recherchent.",
        "popular_title": "Marques populaires"
      },
      "new_arrivals_page": {
        "hero_title": "Nouveautés",
        "hero_text": "Découvrez les dernières nouveautés de notre catalogue : nouveaux produits et expériences gastronomiques ethniques authentiques.",
        "add_to_wishlist": "Ajouter à la liste de souhaits",
        "add_to_cart": "Ajouter au panier",
        "code_prefix": "réf.",
        "filter_by_categories": "Filtrer par catégories",
        "all_categories": "Toutes les catégories",
        "breadcrumb_home": "Accueil",
        "breadcrumb_shop": "Boutique",
        "showing_results": "Affichage {{from}}–{{to}} sur {{total}} résultats",
        "sorting_aria": "Trier les produits",
        "sort_default": "Tri par défaut",
        "sort_name_asc": "Nom (A–Z)",
        "sort_name_desc": "Nom (Z–A)",
        "categories": {
          "fresh": "Produits frais",
          "flours": "Farines assorties",
          "dairy": "Produits laitiers",
          "condiments": "Condiments",
          "noodles": "Nouilles instantanées",
          "beverages": "Boissons",
          "snacks": "Snacks & confiseries",
          "frozen": "Surgelés",
          "spices": "Épices & herbes",
          "canned": "Conserves",
          "rice": "Riz & céréales",
          "sauces": "Sauces & assaisonnements",
          "meat": "Viande & volaille",
          "seafood": "Fruits de mer",
          "desserts": "Desserts"
        }
      },
      "contact_page": {
        "hero": {
          "title": "Nous contacter",
          "subtitle": "Grossiste en produits africains et asiatiques basé à Bruay-sur-l’Escaut. Contactez notre équipe dès aujourd'hui."
        },
        "map_title": "Google Maps",
        "info": {
          "location_title": "Notre adresse",
          "phone_title": "Téléphone",
          "phone_line1": "Contactez-nous pour plus d'informations",
          "phone_line2": "sur nos services de grossiste",
          "email_title": "Adresse e-mail",
          "hours_title": "Horaires d'ouverture",
          "hours_line1": "Lun - Sam : 09:00 - 20:00",
          "hours_line2": "Dimanche : Fermé"
        },
        "form": {
          "title": "Envoyez-nous un message",
          "subtitle": "Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.",
          "full_name": "Nom complet",
          "full_name_ph": "Entrez votre nom",
          "email": "Adresse e-mail",
          "email_ph": "Entrez votre e-mail",
          "subject": "Sujet",
          "subject_ph": "De quoi s'agit-il ?",
          "message": "Votre message",
          "message_ph": "Comment pouvons-nous vous aider ?",
          "submit": "Envoyer"
        }
      },
      "account_page": {
        "hero_title": "Mon compte",
        "breadcrumb_home": "Accueil",
        "sidebar": {
          "dashboard": "Tableau de bord",
          "orders": "Commandes",
          "addresses": "Adresses",
          "details": "Détails du compte",
          "logout": "Déconnexion"
        },
        "dashboard": {
          "title": "Tableau de bord",
          "hello": "Bonjour,",
          "member": "Membre SN",
          "desc": "Depuis votre tableau de bord, vous pouvez consulter vos commandes récentes, gérer vos adresses de livraison et de facturation, et modifier votre mot de passe et les détails de votre compte."
        },
        "orders": {
          "title": "Commandes récentes",
          "empty": "Aucune commande n'a encore été passée.",
          "browse": "PARCOURIR LES PRODUITS"
        },
        "addresses": {
          "title": "Adresses",
          "desc": "Les adresses suivantes seront utilisées par défaut lors du paiement.",
          "billing": "Adresse de facturation",
          "shipping": "Adresse de livraison",
          "edit": "Modifier",
          "placeholder": "Vous n'avez pas encore configuré ce type d'adresse."
        },
        "details": {
          "title": "Détails du compte",
          "first_name": "Prénom",
          "last_name": "Nom",
          "display_name": "Nom d'affichage",
          "display_hint": "C'est ainsi que votre nom apparaîtra dans la section compte et dans les avis",
          "email": "Adresse e-mail",
          "password_change": "Changement de mot de passe",
          "current_password": "Mot de passe actuel (laisser vide pour ne pas modifier)",
          "new_password": "Nouveau mot de passe (laisser vide pour ne pas modifier)",
          "confirm_new_password": "Confirmer le nouveau mot de passe",
          "save_changes": "ENREGISTRER"
        }
      },
      "slider": {
        "prev": "Diapositive précédente",
        "next": "Diapositive suivante",
        "select": "Sélectionner une diapositive",
        "go_to": "Aller à la diapositive {{index}}",
        "slide_alt": "Diapositive d'accueil {{index}}"
      },
      "wishlist_page": {
        "title": "Ma liste de souhaits",
        "item_count": "{{count}} article",
        "item_count_plural": "{{count}} articles",
        "remove": "Retirer de la liste de souhaits",
        "code_prefix": "réf.",
        "add_to_cart": "Ajouter au panier",
        "empty": {
          "title": "Votre liste de souhaits est vide",
          "text": "Enregistrez vos articles favoris ici pour les acheter plus tard.",
          "cta": "Acheter maintenant"
        }
      },
      "discover": {
        "title": "Votre partenaire d'excellence",
        "subtitle": "SN Food Distribution fournit des produits africains et asiatiques de qualité premium directement aux professionnels. Dynamisez votre activité avec des saveurs authentiques et un service de gros fiable.",
        "cta": "EXPLORER LE CATALOGUE"
      },
      "feature_strip": {
        "title": "Nous vous apportons le goût de chez vous",
        "text": "SN Food Distribution est une entreprise de référence pour l'importation de produits alimentaires ethniques, répondant à la demande croissante de produits africains et asiatiques. Chaque jour, nous distribuons les meilleurs produits du monde entier aux magasins et grossistes, avec un service de livraison fiable.",
        "company": "Entreprise",
        "history": "Notre Histoire",
        "brand_highlight": "Distributeur de confiance pour les professionnels de la restauration et les épiceries spécialisées.",
        "leader_title": "Leader dans la distribution de produits ethniques",
        "leader_text": "Gestion d'entrepôt optimisée et flotte de véhicules moderne. Produits toujours disponibles et livraison fiable dans toute la région.",
        "stats": {
          "storage": "200 m2 de Stockage",
          "storage_text": "Entrepôt principal situé à Bruay-sur-l’Escaut, optimisé pour les produits secs, frais et surgelés.",
          "fleet": "Flotte Moderne",
          "fleet_text": "Une flotte de véhicules utilitaires et de camions frigorifiques pour respecter la chaîne du froid.",
          "delivery": "24 à 48 Heures",
          "delivery_text": "Toutes les commandes sont traitées rapidement pour une livraison sous 24h à 48h.",
          "import": "Importation Internationale",
          "import_text": "Nous importons des produits authentiques d'Afrique de l'Ouest, d'Afrique Centrale, d'Asie et du Moyen-Orient."
        }
      },
      "values": {
        "title": "Nos Valeurs",
        "sub": "Qualité, Fiabilité et Respect",
        "text": "Chez SN Food Distribution, nous plaçons la qualité, la fiabilité et le respect au cœur de notre activité. Nous cultivons un environnement de travail dynamique et collaboratif, où chaque membre de l'équipe contribue activement à la satisfaction de nos clients. Notre équipe bénéficie de plus de 15 ans d'expérience combinée dans le secteur de l'import-export et de la distribution alimentaire.",
        "cta": "Découvrir notre équipe"
      },
      "export": {
        "title": "Nous livrons partout",
        "text": "SN Food Distribution livre dans toute la région et au-delà. Nos produits sont sélectionnés pour répondre aux exigences des professionnels avec une logistique contrôlée."
      },
      "catalog": {
        "title": "Un large catalogue dédié aux professionnels de l'alimentation",
        "subtitle": "Découvrez nos catégories les plus consultées et nos produits phares, avec une logistique de qualité et une livraison fiable.",
        "col_viewed": "Catégories les plus consultées",
        "col_top": "Produits Phares",
        "col_delivery": "Livraison en 24 à 48h",
        "pill_fresh_frozen": "Frais et Surgelés",
        "promo_title": "Plus de 5 véhicules pour une logistique réactive",
        "promo_text": "Livraisons quotidiennes adaptées aux exigences de la chaîne du froid et à la disponibilité.",
        "promo_link": "En savoir plus",
        "suggest_kicker": "Aujourd'hui, nous suggérons...",
        "suggest_title": "Produits Frais",
        "suggest_link": "Aller à la catégorie"
      }
    }
  },
  it: {
    translation: {
      "nav": {
        "home": "Home",
        "company": "Azienda",
        "team": "Team",
        "vendors": "Fornitori",
        "customers": "Clienti",
        "events": "Eventi",
        "catalogs": "Cataloghi",
        "brands": "Marchi",
        "new_arrivals": "Nuovi arrivi",
        "contact": "Contatto",
        "branches": "Filiali",
        "pages": "Pagine"
      },
      "header": {
        "logo_subtitle": "Spesa premium",
        "search_placeholder": "Come possiamo aiutarti ?",
        "search_button": "Cerca",
        "language": "Lingua",
        "accounts": "Account",
        "login_register": "Accedi/Registrati"
      },
      "topbar": {
        "address": "262 Rue des Bouleaux, 59860 Bruay-sur-l’Escaut",
        "email": "contact@snfood.fr"
      },
      "categorybar": {
        "all_categories": "Tutte le categorie",
        "weekly_discount": "Sconto settimanale!"
      },
      "offcanvas": {
        "close_menu": "Chiudi menu",
        "close": "Chiudi",
        "type_products": "Digita i tuoi prodotti ...",
        "menu": "Menu",
        "search": "Cerca",
        "collapse": "Comprimi",
        "expand": "Espandi",
        "swap": "Scambia",
        "wishlist": "Preferiti",
        "cart": "Carrello",
        "wholesale": "Distribuzione alimentare all'ingrosso",
        "social": {
          "facebook": "Facebook",
          "instagram": "Instagram",
          "tiktok": "TikTok"
        }
      },
      "footer": {
        "brand_alt": "SN Food",
        "brand_text": "SN Food Distribution è un grossista leader di prodotti alimentari africani e asiatici, che offre sapori autentici e un servizio affidabile ai professionisti della regione.",
        "quick_links": "Link rapidi",
        "categories": "Categorie",
        "contact_us": "Contattaci",
        "catalogues": "Cataloghi",
        "account": "Account",
        "contact_wholesale": "Contattaci per richieste all'ingrosso",
        "rights": "Tutti i diritti riservati.",
        "terms": "Termini e condizioni",
        "privacy": "Informativa sulla privacy",
        "cookie": "Cookie policy"
      },
      "auth": {
        "login": "Accedi",
        "register": "Registrati",
        "email": "Email",
        "password": "Password",
        "forgot_password": "Password dimenticata?",
        "new_to": "Nuovo su SN Food?",
        "already_have": "Hai già un account?",
        "first_name": "Nome",
        "last_name": "Cognome",
        "company_name": "Nome azienda",
        "vat_number": "Partita IVA",
        "billing_address": "Indirizzo di fatturazione",
        "address": "Indirizzo",
        "city": "Città",
        "country": "Paese",
        "postal_code": "CAP",
        "sdi_pec": "Codice SDI o PEC",
        "phone": "Numero di telefono",
        "account": "Account"
      },
      "team": {
        "hero": {
          "title": "Il Nostro Team",
          "desc": "Siamo un gruppo di professionisti dedicati che si impegnano a portare i migliori prodotti africani e asiatici ai nostri partner. Il nostro team diversificato lavora in collaborazione per garantire l'eccellenza nell'approvvigionamento, nella logistica e nella soddisfazione del cliente, supportando la crescita della vostra attività ogni giorno."
        },
        "values": {
          "title": "Valori aziendali",
          "sub": "Qualità, Affidabilità e Rispetto",
          "p1": "In SN Food Distribution mettiamo qualità, affidabilità e rispetto al centro del nostro lavoro. Coltiviamo un ambiente dinamico e collaborativo in cui ogni membro del team contribuisce attivamente alla soddisfazione dei nostri clienti.",
          "p2": "Il nostro team vanta oltre 15 anni di esperienza combinata nel settore import-export e distribuzione alimentare, garantendo eccellenza in ogni ordine.",
          "image_alt": "I nostri valori in azione"
        },
        "grid": {
          "title": "Conosci il team.",
          "empty": "Nessun membro trovato per questo reparto."
        },
        "departments": {
          "direction": "DIREZIONE",
          "sales": "REPARTO VENDITE",
          "purchasing": "ACQUISTI & FORNITURE",
          "logistics": "LOGISTICA & MAGAZZINO",
          "accounting": "CONTABILITÀ & AMMINISTRAZIONE"
        },
        "roles": {
          "director": "Direttore",
          "sales_rep": "Rappresentante commerciale",
          "purchasing_manager": "Responsabile acquisti",
          "logistics_coordinator": "Coordinatore logistica",
          "accountant": "Contabile"
        }
      },
      "customers": {
        "hero": {
          "title": "La nostra missione",
          "text": "Fornire ai professionisti un'ampia gamma di prodotti africani e asiatici di alta qualità, supportata da un servizio rapido, affidabile e competitivo.",
          "cta": "IL CATALOGO"
        },
        "stats": {
          "title": "Statistiche chiave",
          "sub": "Eccellenza nella distribuzione negli Hauts-de-France",
          "p1": "Con sede a Bruay-sur-l’Escaut, SN Food Distribution opera da un magazzino specializzato di 200 m². Garantiamo consegne entro 24-48 ore, evitando rotture di stock sui prodotti essenziali.",
          "p2": "Il nostro catalogo copre più categorie, inclusi prodotti secchi, freschi e surgelati. Siamo un partner locale affidabile per negozi e ristoranti che cercano sapori autentici africani e asiatici."
        },
        "categories": {
          "title": "Categorie di prodotti",
          "sub": "Un catalogo vario per tutte le esigenze di prodotti etnici",
          "desc": "SN Food Distribution offre un grande catalogo multi-categoria, dai prodotti di base agli ingredienti speciali. Il tuo punto unico per forniture autentiche africane e asiatiche negli Hauts-de-France.",
          "cta": "Richiedi catalogo",
          "items": {
            "dry": {
              "title": "Prodotti secchi",
              "desc": "Riso, farine, spezie autentiche e salse speciali."
            },
            "fresh": {
              "title": "Prodotti freschi",
              "desc": "Ingredienti freschi di qualità da partner affidabili."
            },
            "frozen": {
              "title": "Surgelati",
              "desc": "Ampia gamma di prodotti surgelati mantenuti a temperatura ottimale."
            },
            "drinks": {
              "title": "Bevande esotiche",
              "desc": "Bevande e succhi popolari dall'Africa e dall'Asia."
            },
            "halal": {
              "title": "Certificato Halal",
              "desc": "Una selezione dedicata di prodotti Halal per i tuoi clienti."
            },
            "african": {
              "title": "Specialità africane",
              "desc": "Oli, condimenti e prodotti tradizionali africani."
            }
          }
        }
      },
      "vendors": {
        "hero": {
          "title": "Logistica e innovazione",
          "text": "SN Food Distribution è un partner altamente qualificato per la conservazione e la distribuzione di specialità etniche, con logistica professionale e rigorosi standard qualitativi.",
          "cta": "IL CATALOGO"
        },
        "infrastructure": {
          "title": "Dettagli infrastruttura",
          "sub": "Distribuzione professionale di prodotti alimentari etnici",
          "p1": "SN Food Distribution opera da un magazzino sicuro con zone distinte per prodotti secchi, freschi e surgelati. La struttura è ottimizzata con scaffalature industriali per una gestione efficiente.",
          "p2": "Utilizziamo celle frigorifere per i surgelati e manteniamo elevati standard di qualità. La logistica è supportata da una flotta di veicoli refrigerati per rispettare la catena del freddo.",
          "p3": "Con sede a Bruay-sur-l’Escaut, la nostra infrastruttura è pensata come hub affidabile per i professionisti degli Hauts-de-France, unendo sicurezza ed efficienza operativa."
        },
        "guarantees": {
          "title": "Garanzie di servizio",
          "sub": "Un partner affidabile nel settore all'ingrosso di prodotti africani e asiatici",
          "desc": "SN Food Distribution garantisce consegne entro 24-48 ore in base alla zona. Assicuriamo disponibilità costante dei prodotti principali e gestione rapida degli ordini urgenti.",
          "cta": "Richiedi catalogo",
          "items": {
            "excellence": {
              "title": "Eccellenza operativa",
              "desc": "Rigoroso rispetto degli standard igienici europei e delle procedure HACCP."
            },
            "supply": {
              "title": "Fornitura affidabile",
              "desc": "Stock permanente e disponibilità rapida dei prodotti africani e asiatici principali."
            },
            "partnerships": {
              "title": "Partnership sostenibili",
              "desc": "Relazioni di lungo periodo e vantaggio reciproco con i fornitori."
            },
            "cold_chain": {
              "title": "Integrità della catena del freddo",
              "desc": "Camion refrigerati e celle frigorifere per il rispetto rigoroso delle norme sanitarie."
            },
            "innovation": {
              "title": "Innovazione logistica",
              "desc": "Scaffalature industriali ottimizzate e flotta moderna per una distribuzione superiore."
            },
            "certified": {
              "title": "Prodotti certificati",
              "desc": "Certificazioni Halal e prodotti da partner riconosciuti a livello internazionale."
            }
          }
        }
      },
      "events_page": {
        "title": "Eventi",
        "subtitle": "Scopri cosa succede nel mondo SN Food",
        "go_to": "Vai alla pagina eventi"
      },
      "catalogs_page": {
        "hero_title": "I mille colori del cibo etnico",
        "hero_text": "SN Food Distribution offre un ampio catalogo di prodotti alimentari africani e asiatici per professionisti.",
        "grid_title": "Cataloghi prodotti",
        "items": {
          "complete": "Catalogo completo",
          "fresh": "Fresco",
          "meat": "Carne",
          "drinks": "Bevande",
          "tea": "Tè",
          "dairy": "Latticini",
          "ghee": "Ghee",
          "noodles": "Noodles"
        }
      },
      "brands_page": {
        "hero_title": "Tutti i nostri marchi",
        "hero_text": "SN Food Distribution lavora con decine di marchi internazionali, dai più conosciuti alle specialità locali. Con noi trovi ciò che i tuoi clienti cercano.",
        "popular_title": "Marchi popolari"
      },
      "new_arrivals_page": {
        "hero_title": "Nuovi arrivi",
        "hero_text": "Scopri le ultime aggiunte al nostro catalogo: nuovi prodotti ed esperienze gastronomiche etniche autentiche.",
        "add_to_wishlist": "Aggiungi ai preferiti",
        "add_to_cart": "Aggiungi al carrello",
        "code_prefix": "cod.",
        "filter_by_categories": "Filtra per categorie",
        "all_categories": "Tutte le categorie",
        "breadcrumb_home": "Home",
        "breadcrumb_shop": "Negozio",
        "showing_results": "Mostrando {{from}}–{{to}} di {{total}} risultati",
        "sorting_aria": "Ordina prodotti",
        "sort_default": "Ordinamento predefinito",
        "sort_name_asc": "Nome (A–Z)",
        "sort_name_desc": "Nome (Z–A)",
        "categories": {
          "fresh": "Prodotti freschi",
          "flours": "Farine assortite",
          "dairy": "Latticini",
          "condiments": "Condimenti",
          "noodles": "Noodles istantanei",
          "beverages": "Bevande",
          "snacks": "Snack & dolci",
          "frozen": "Surgelati",
          "spices": "Spezie & erbe",
          "canned": "Conserve",
          "rice": "Riso & cereali",
          "sauces": "Salse & condimenti",
          "meat": "Carne & pollame",
          "seafood": "Frutti di mare",
          "desserts": "Dessert"
        }
      },
      "contact_page": {
        "hero": {
          "title": "Contattaci",
          "subtitle": "Grossista di prodotti africani e asiatici con sede a Bruay-sur-l’Escaut. Contatta il nostro team oggi stesso."
        },
        "map_title": "Google Maps",
        "info": {
          "location_title": "La nostra sede",
          "phone_title": "Numero di telefono",
          "phone_line1": "Contattaci per maggiori informazioni",
          "phone_line2": "sui nostri servizi all'ingrosso",
          "email_title": "Indirizzo e-mail",
          "hours_title": "Orari di lavoro",
          "hours_line1": "Lun - Sab: 09:00 - 20:00",
          "hours_line2": "Domenica: Chiuso"
        },
        "form": {
          "title": "Inviaci un messaggio",
          "subtitle": "Compila il modulo qui sotto e ti risponderemo il prima possibile.",
          "full_name": "Nome e cognome",
          "full_name_ph": "Inserisci il tuo nome",
          "email": "Indirizzo e-mail",
          "email_ph": "Inserisci la tua e-mail",
          "subject": "Oggetto",
          "subject_ph": "Di cosa si tratta?",
          "message": "Il tuo messaggio",
          "message_ph": "Come possiamo aiutarti?",
          "submit": "Invia"
        }
      },
      "account_page": {
        "hero_title": "Il mio account",
        "breadcrumb_home": "Home",
        "sidebar": {
          "dashboard": "Dashboard",
          "orders": "Ordini",
          "addresses": "Indirizzi",
          "details": "Dettagli account",
          "logout": "Logout"
        },
        "dashboard": {
          "title": "Dashboard",
          "hello": "Ciao,",
          "member": "Membro SN",
          "desc": "Dal tuo dashboard puoi visualizzare gli ordini recenti, gestire gli indirizzi di spedizione e fatturazione e modificare la password e i dettagli del tuo account."
        },
        "orders": {
          "title": "Ordini recenti",
          "empty": "Non è stato ancora effettuato alcun ordine.",
          "browse": "SFOGLIA I PRODOTTI"
        },
        "addresses": {
          "title": "Indirizzi",
          "desc": "I seguenti indirizzi verranno utilizzati di default al checkout.",
          "billing": "Indirizzo di fatturazione",
          "shipping": "Indirizzo di spedizione",
          "edit": "Modifica",
          "placeholder": "Non hai ancora impostato questo tipo di indirizzo."
        },
        "details": {
          "title": "Dettagli account",
          "first_name": "Nome",
          "last_name": "Cognome",
          "display_name": "Nome visualizzato",
          "display_hint": "Questo sarà il nome visualizzato nella sezione account e nelle recensioni",
          "email": "Indirizzo e-mail",
          "password_change": "Cambio password",
          "current_password": "Password attuale (lascia vuoto per non modificare)",
          "new_password": "Nuova password (lascia vuoto per non modificare)",
          "confirm_new_password": "Conferma nuova password",
          "save_changes": "SALVA MODIFICHE"
        }
      },
      "slider": {
        "prev": "Slide precedente",
        "next": "Slide successiva",
        "select": "Seleziona slide",
        "go_to": "Vai alla slide {{index}}",
        "slide_alt": "Slide hero {{index}}"
      },
      "wishlist_page": {
        "title": "La mia lista dei desideri",
        "item_count": "{{count}} articolo",
        "item_count_plural": "{{count}} articoli",
        "remove": "Rimuovi dalla lista dei desideri",
        "code_prefix": "cod.",
        "add_to_cart": "Aggiungi al carrello",
        "empty": {
          "title": "La tua lista dei desideri è vuota",
          "text": "Salva qui i tuoi prodotti preferiti per acquistarli più tardi.",
          "cta": "Acquista ora"
        }
      },
      "discover": {
        "title": "Il tuo partner nell'eccellenza",
        "subtitle": "SN Food Distribution fornisce prodotti africani e asiatici di qualità superiore direttamente ai professionisti. Eleva il tuo business con sapori autentici e un servizio all'ingrosso affidabile.",
        "cta": "ESPLORA IL CATALOGO"
      },
      "feature_strip": {
        "title": "Vi Portiamo il Gusto di Casa",
        "text": "SN Food Distribution è un'azienda di riferimento per l'importazione di prodotti alimentari etnici, soddisfacendo la crescente domanda di prodotti africani e asiatici. Ogni giorno, distribuiamo i migliori prodotti da tutto il mondo a negozi e grossisti, con un servizio di consegna affidabile.",
        "company": "Azienda",
        "history": "La Nostra Storia",
        "brand_highlight": "Distributore di fiducia per professionisti della ristorazione e negozi di alimentari specializzati.",
        "leader_title": "Leader nella distribuzione di prodotti etnici",
        "leader_text": "Gestione del magazzino ottimizzata e una moderna flotta di veicoli. Prodotti sempre disponibili e consegna affidabile in tutta la regione.",
        "stats": {
          "storage": "200 m2 di Magazzino",
          "storage_text": "Magazzino principale situato a Bruay-sur-l'Escaut, ottimizzato per prodotti secchi, freschi e surgelati.",
          "fleet": "Flotta Moderna",
          "fleet_text": "Una flotta di veicoli commerciali e camion refrigerati per rispettare la catena del freddo.",
          "delivery": "Da 24 a 48 Ore",
          "delivery_text": "Tutti gli ordini vengono elaborati rapidamente per la consegna entro 24-48 ore.",
          "import": "Importazione Internazionale",
          "import_text": "Importiamo prodotti autentici dall'Africa occidentale, dall'Africa centrale, dall'Asia e dal Medio Oriente."
        }
      },
      "values": {
        "title": "I Nostri Valori",
        "sub": "Qualità, Affidabilità e Rispetto",
        "text": "In SN Food Distribution, mettiamo la qualità, l'affidabilità e il rispetto al centro della nostra attività. Coltiviamo un ambiente di lavoro dinamico e collaborativo, dove ogni membro del team contribuisce attivamente alla soddisfazione dei nostri clienti. Il nostro team beneficia di oltre 15 anni di esperienza combinata nel settore dell'import-export e della distribuzione alimentare.",
        "cta": "Scopri il nostro team"
      },
      "export": {
        "title": "Consegniamo ovunque",
        "text": "SN Food Distribution consegna in tutta la regione e oltre. I nostri prodotti sono selezionati per soddisfare le esigenze dei professionisti con una logistica controllata."
      },
      "catalog": {
        "title": "Un ampio catalogo dedicato ai professionisti del settore alimentare",
        "subtitle": "Scopri le nostre categorie più visualizzate e i prodotti di punta, con logistica premium e consegne affidabili.",
        "col_viewed": "Categorie più visualizzate",
        "col_top": "Prodotti di punta",
        "col_delivery": "Consegna in 24-48 ore",
        "pill_fresh_frozen": "Fresco e Surgelato",
        "promo_title": "Più di 5 veicoli per una logistica reattiva",
        "promo_text": "Consegne giornaliere adattate ai requisiti della catena del freddo e alla disponibilità.",
        "promo_link": "Scopri di più",
        "suggest_kicker": "Oggi suggeriamo...",
        "suggest_title": "Prodotti Freschi",
        "suggest_link": "Vai alla categoria"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en', 'ur', 'ln', 'nl'],
    nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
