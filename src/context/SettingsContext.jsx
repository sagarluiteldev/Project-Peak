/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

const translations = {
  // Hero
  'hero.tagline': { EN: 'Nepal\'s Premier Adventure Partner', FR: 'Le partenaire d\'aventure de premier plan au Népal', DE: 'Nepals führender Abenteuerpartner', ZH: '尼泊尔首屈一指的探险伙伴' },
  'hero.title': { EN: 'NEPAL', FR: 'NÉPAL', DE: 'NEPAL', ZH: '尼泊尔' },
  'hero.desc': { EN: 'Curated Himalayan expeditions with real-time booking, local expertise, and uncompromising safety standards.', FR: 'Expéditions himalayennes organisées avec réservation en temps réel, expertise locale et normes de sécurité sans compromis.', DE: 'Kuratierte Himalaya-Expeditionen mit Echtzeitbuchung, lokaler Expertise und kompromisslosen Sicherheitsstandards.', ZH: '精心策划的喜马拉雅探险，提供实时预订、本地专业知识和毫不妥协的安全标准。' },
  'hero.cta': { EN: 'Explore Treks', FR: 'Explorer les randonnées', DE: 'Treks erkunden', ZH: '探索徒步旅行' },
  'hero.secondary': { EN: 'How It Works', FR: 'Comment ça marche', DE: 'So funktioniert es', ZH: '如何运作' },
  'hero.scroll': { EN: 'Scroll', FR: 'Défiler', DE: 'Scrollen', ZH: '滚动' },

  // Navbar
  'nav.treks': { EN: 'Treks', FR: 'Treks', DE: 'Treks', ZH: '徒步路线' },
  'nav.planner': { EN: 'Planner', FR: 'Planificateur', DE: 'Planer', ZH: '行程规划' },
  'nav.permits': { EN: 'Permits', FR: 'Permis', DE: 'Genehmigungen', ZH: '许可证' },
  'nav.gear': { EN: 'Gear', FR: 'Équipement', DE: 'Ausrüstung', ZH: '装备清单' },
  'nav.weather': { EN: 'Weather', FR: 'Météo', DE: 'Wetter', ZH: '实时天气' },
  'nav.reviews': { EN: 'Reviews', FR: 'Avis', DE: 'Bewertungen', ZH: '真实评价' },
  'nav.compass': { EN: 'Interactive Compass', FR: 'Boussole interactive', DE: 'Interaktiver Kompass', ZH: '交互式指南针' },
  'nav.searchPlaceholder': { EN: 'Search treks...', FR: 'Rechercher des treks...', DE: 'Treks suchen...', ZH: '搜索徒步路线...' },
  'nav.explore': { EN: 'EXPLORE TREKS', FR: 'EXPLORER LES TREKS', DE: 'TREKS ERKUNDEN', ZH: '探索徒步路线' },

  // BentoGrid (Regions)
  'bento.badge': { EN: 'HIMALAYAN REGIONS', FR: 'RÉGIONS HIMALAYENNES', DE: 'HIMALAYA-REGIONEN', ZH: '喜马拉雅地区' },
  'bento.title': { EN: "NEPAL'S MOUNTAIN SANCTUARIES", FR: "SANCTUAIRES MONTAGNEUX DU NÉPAL", DE: "NEPALS BERGHEILIGTÜMER", ZH: "尼泊尔山岳圣地" },
  'bento.annapurna.sub': { EN: 'Classic Circuits & Basecamp', FR: 'Circuits classiques & Camp de base', DE: 'Klassische Runden & Basislager', ZH: '经典环线和大本营' },
  'bento.everest.sub': { EN: 'Base Camp & Gokyo Lakes', FR: 'Camp de base & Lacs de Gokyo', DE: 'Basislager & Gokyo-Seen', ZH: '大本营与高克尤湖' },
  'bento.langtang.sub': { EN: 'Valley of Glaciers & Holy Lakes', FR: 'Vallée des glaciers & Lacs sacrés', DE: 'Tal der Gletscher & Heilige Seen', ZH: '冰川谷与圣湖' },
  'bento.manaslu.sub': { EN: 'Off-the-beaten-path Wilderness', FR: 'Sauvage & hors des sentiers battus', DE: 'Unberührte Wildnis', ZH: '偏远荒野' },
  'bento.expeditions.sub': { EN: 'Three Passes, Thorong La & Larkya La', FR: 'Trois cols, Thorong La & Larkya La', DE: 'Drei Pässe, Thorong La & Larkya La', ZH: '三大垭口与高海拔探险' },
  'bento.all.title': { EN: 'ALL TREKS', FR: 'TOUS LES TREKS', DE: 'ALLE TREKS', ZH: '所有路线' },
  'bento.all.sub': { EN: 'Explore 20+ Routes', FR: 'Explorer plus de 20 itinéraires', DE: 'Über 20 Routen erkunden', ZH: '探索 20+ 条路线' },

  // Destinations
  'dest.badge': { EN: 'EXPEDITIONS & TREKS', FR: 'EXPÉDITIONS ET TREKS', DE: 'EXPEDITIONEN & TREKS', ZH: '探险与徒步' },
  'dest.title': { EN: 'EXPAND YOUR HORIZON.', FR: 'ÉLARGISSEZ VOS HORIZONS.', DE: 'ERWEITERN SIE IHREN HORIZONT.', ZH: '拓展您的视野。' },
  'dest.desc': { EN: 'Curated Himalayan expeditions with real-time booking, local expertise, and uncompromising safety standards.', FR: 'Expéditions himalayennes organisées avec réservation en temps réel, expertise locale et normes de sécurité.', DE: 'Kuratierte Himalaya-Expeditionen mit Echtzeitbuchung, lokaler Expertise und Sicherheitsstandards.', ZH: '精心策划的喜马拉雅探险，提供实时预订、本地专业知识和毫不妥协的安全标准。' },
  'dest.viewAll': { EN: 'View All Treks', FR: 'Voir tous les treks', DE: 'Alle Treks ansehen', ZH: '查看所有路线' },
  'dest.showLess': { EN: 'Show Top Treks', FR: 'Voir les principaux treks', DE: 'Haupt-Treks anzeigen', ZH: '显示精选路线' },

  // LogisticsCards
  'logistics.badge': { EN: 'EXPEDITION LOGISTICS', FR: 'LOGISTIQUE D\'EXPÉDITION', DE: 'EXPEDITIONSLOGISTIK', ZH: '探险后勤' },
  'logistics.title': { EN: 'EVERYTHING HANDLED', FR: 'TOUT EST GÉRÉ', DE: 'ALLES GEREGELT', ZH: '全程精心安排' },
  'logistics.flights.title': { EN: 'DOMESTIC FLIGHTS', FR: 'VOLS INTÉRIEURS', DE: 'INLANDSFLÜGE', ZH: '国内航班' },
  'logistics.flights.desc': { EN: 'Lukla & Pokhara flight router with real-time seats.', FR: 'Routeur de vol Lukla et Pokhara en temps réel.', DE: 'Lukla & Pokhara Flugverbindung in Echtzeit.', ZH: '卢卡拉与博克拉航班实时路由。' },
  'logistics.permits.title': { EN: 'OFFICIAL PERMITS', FR: 'PERMIS OFFICIELS', DE: 'OFFIZIELLE GENEHMIGUNGEN', ZH: '官方许可证' },
  'logistics.permits.desc': { EN: 'Pre-arranged TIMS cards & National Park entries.', FR: 'Cartes TIMS et permis de parc national pré-arrangés.', DE: 'Vorab organisierte TIMS-Karten & Parkgenehmigungen.', ZH: '提前安排的 TIMS 卡与国家公园门票。' },
  'logistics.guides.title': { EN: 'EXPERT SHERPA GUIDES', FR: 'GUIDES SHERPAS EXPÉRIMENTÉS', DE: 'EXPERTEN-SHERPA-GUIDES', ZH: '资深夏尔巴向导' },
  'logistics.guides.desc': { EN: 'Licensed, wilderness first responder certified.', FR: 'Certifiés secourisme en milieu sauvage.', DE: 'Lizenziert & zertifiziert für Erste Hilfe in der Wildnis.', ZH: '具备执照与野外急救认证。' },

  // ItineraryPlanner
  'planner.badge': { EN: 'CUSTOM ROUTE PLANNER', FR: 'PLANIFICATEUR DE PARCOURS', DE: 'ROUTENPLANER', ZH: '定制行程规划' },
  'planner.title': { EN: 'BUILD YOUR EXPEDITION', FR: 'CRÉEZ VOTRE EXPÉDITION', DE: 'EXPEDITION PLANEN', ZH: '制定您的探险行程' },
  'planner.subtitle': { EN: 'Select your preferences to get a personalized trek itinerary & cost breakdown.', FR: 'Sélectionnez vos préférences pour un itinéraire personnalisé.', DE: 'Wählen Sie Ihre Präferenzen für eine persönliche Route.', ZH: '选择您的偏好，获取个性化行程与费用明细。' },

  // Features
  'feat.badge': { EN: 'WHY PROJECT PEAK', FR: 'POURQUOI PROJECT PEAK', DE: 'WARUM PROJECT PEAK', ZH: '为什么选择 PROJECT PEAK' },
  'feat.title': { EN: 'THE PREMIER EXPERIENCE', FR: 'L\'EXPÉRIENCE PREMIUM', DE: 'DAS PREMIUM-ERLEBNIS', ZH: '顶级探险体验' },
  'feat.desc': { EN: 'We handle the logistics of the Himalayas so you can focus on the ascent. From domestic flights to local permits.', FR: 'Nous gérons la logistique de l\'Himalaya pour que vous puissiez vous concentrer sur l\'ascension.', DE: 'Wir kümmern uns um die Logistik des Himalaya, damit Sie sich auf den Aufstieg konzentrieren können.', ZH: '我们解决喜马拉雅的一切后勤，让您专注攀登。' },

  // Weather
  'weather.badge': { EN: 'LIVE HIMALAYAN WEATHER', FR: 'MÉTÉO HIMALAYENNE EN DIRECT', DE: 'LIVE-HIMALAYA-WETTER', ZH: '喜马拉雅实时天气' },
  'weather.title': { EN: 'TRAIL ADVISORY & FORECAST', FR: 'AVIS ET PRÉVISIONS DE SENTIER', DE: 'TRAIL-BERICHT & VORHERSAGE', ZH: '路线预警与天气预报' },

  // Permits
  'permit.badge': { EN: 'NEPAL PERMIT & VISA HUB', FR: 'HUB PERMIS & VISAS NÉPAL', DE: 'PERMIT & VISA ZENTRUM', ZH: '尼泊尔许可证与签证中心' },
  'permit.title': { EN: 'EXPEDITION DOCUMENTATION', FR: 'DOCUMENTATION D\'EXPÉDITION', DE: 'EXPEDITIONSDOKUMENTATION', ZH: '探险证件办理' },
  'permit.subtitle': { EN: 'Official permit requirements and entry visa information for Himalayan trekking.', FR: 'Exigences de permis officiels et visas d\'entrée.', DE: 'Offizielle Genehmigungen und Visa-Informationen.', ZH: '喜马拉雅徒步官方许可证与入境签证说明。' },

  // Gear
  'gear.badge': { EN: 'PACKING & WEIGHT BUDGET', FR: 'SAC & BUDGET POIDS', DE: 'PACKEN & GEWICHTSBUDGET', ZH: '装备清单与重量预算' },
  'gear.title': { EN: 'EXPEDITION GEAR CHECKER', FR: 'VÉRIFICATEUR D\'ÉQUIPEMENT', DE: 'EXPEDITIONSAUSRÜSTUNG', ZH: '探险装备核对器' },
  'gear.subtitle': { EN: 'Interactive checklist to ensure you have all essential mountain gear.', FR: 'Liste d\'équipement essentielle pour la montagne.', DE: 'Interaktive Checkliste für essentielle Bergausrüstung.', ZH: '互动式清单，确保携带必需的登山装备。' },

  // Fitness
  'fitness.badge': { EN: 'FITNESS & CALORIE PREP', FR: 'FITNESS & PRÉPARATION CALORIQUE', DE: 'FITNESS & KALORIEN-VORBEREITUNG', ZH: '体能与热量储备' },
  'fitness.title': { EN: 'TREK CALORIE CALCULATOR', FR: 'CALCULATEUR DE CALORIES DE TREK', DE: 'TREK-KALORIENRECHNER', ZH: '徒步热量计算器' },
  'fitness.desc': { EN: 'Enter your details below to estimate total energy expenditure, body fat burn, and training prep requirements.', FR: 'Entrez vos détails ci-dessous pour estimer la dépense énergétique.', DE: 'Geben Sie Ihre Daten ein, um Ihren Energieverbrauch zu schätzen.', ZH: '输入您的详细信息，估算总能量消耗与体能准备要求。' },
  'fitness.routeLabel': { EN: 'Select Your Trek Route', FR: 'Sélectionnez votre itinéraire', DE: 'Wählen Sie Ihre Trekkingroute', ZH: '选择徒步路线' },
  'fitness.weightLabel': { EN: 'Body Weight', FR: 'Poids corporel', DE: 'Körpergewicht', ZH: '体重' },
  'fitness.btn': { EN: 'Explore Matching Treks', FR: 'Explorer les treks correspondants', DE: 'Passende Treks erkunden', ZH: '探索匹配的徒步路线' },
  'fitness.expenditure': { EN: 'ESTIMATED ENERGY EXPENDITURE', FR: 'DÉPENSE ÉNERGÉTIQUE ESTIMÉE', DE: 'GESCHÄTZTER ENERGIEVERBRAUCH', ZH: '预估能量消耗' },
  'fitness.totalKcal': { EN: 'TOTAL KILOCALORIES BURNED', FR: 'CALORIES TOTALES BRÛLÉES', DE: 'INSGESAMT VERBRANNTE KALORIEN', ZH: '总卡路里消耗' },
  'fitness.marathons': { EN: 'Marathons', FR: 'Marathons', DE: 'Marathons', ZH: '马拉松当量' },
  'fitness.burgers': { EN: 'Burgers', FR: 'Burgers', DE: 'Burger', ZH: '汉堡当量' },
  'fitness.fatLoss': { EN: 'Fat Loss', FR: 'Perte de graisse', DE: 'Fettabbau', ZH: '脂肪消耗' },
  'fitness.prep': { EN: 'Recommended Prep: 3-4 months of cardiovascular stairs & weighted pack training prior to departure.', FR: 'Préparation recommandée : 3-4 mois d\'entraînement.', DE: 'Empfohlene Vorbereitung: 3-4 Monate Herz-Kreislauf- & Rucksack-Training.', ZH: '建议准备：出发前进行3-4个月的心肺爬梯与重装训练。' },

  // Testimonials
  'test.badge': { EN: 'TREKKER REVIEWS', FR: 'AVIS DES RANDONNEURS', DE: 'BEWERTUNGEN', ZH: '真实评价' },
  'test.title': { EN: 'WHAT TREKKERS SAY', FR: 'CE QUE DISENT LES RANDONNEURS', DE: 'WAS TREKKER SAGEN', ZH: '探险者的真实声音' },

  // Statement Banner
  'statement.himalayas': { EN: 'THE HIMALAYAS', FR: 'L\'HIMALAYA', DE: 'DER HIMALAYA', ZH: '喜马拉雅' },
  'statement.areOur': { EN: 'ARE OUR', FR: 'EST NOTRE', DE: 'IST UNSER', ZH: '是我们' },
  'statement.trueHome': { EN: 'TRUE HOME', FR: 'VRAI FOYER', DE: 'WAHRES ZUHAUSE', ZH: '真正的家园' },
  'statement.cta': { EN: 'BEGIN EXPEDITION', FR: 'COMMENCER L\'EXPÉDITION', DE: 'EXPEDITION STARTEN', ZH: '开启探险之旅' },

  // Footer
  'footer.aboutUs': { EN: 'About Us', FR: 'À propos de nous', DE: 'Über uns', ZH: '关于我们' },
  'footer.expeditions': { EN: 'Expeditions & Treks', FR: 'Expéditions & Treks', DE: 'Expeditionen & Treks', ZH: '探险与徒步' },
  'footer.permits': { EN: 'Permits & Logistics', FR: 'Permis & Logistique', DE: 'Genehmigungen & Logistik', ZH: '许可证与后勤' },
  'footer.weather': { EN: 'Weather & Trail Advisory', FR: 'Météo & Avis', DE: 'Wetter & Trail-Bericht', ZH: '天气与路线提示' },
  'footer.joinTeam': { EN: 'Join Our Team', FR: 'Rejoignez notre équipe', DE: 'Unserem Team beitreten', ZH: '加入我们的团队' },
  'footer.getUpdates': { EN: 'GET EXPEDITION UPDATES', FR: 'RECEVOIR DES MISES À JOUR', DE: 'EXPEDITIONS-UPDATES ERHALTEN', ZH: '获取探险最新动态' },
  'footer.getUpdatesSub': { EN: 'Subscribe to our newsletter to receive live Himalayan trail conditions, permit advisories, and exclusive trek announcements.', FR: 'Abonnez-vous pour recevoir les conditions des sentiers.', DE: 'Abonnieren Sie unseren Newsletter für aktuelle Trail-Bedingungen.', ZH: '订阅新闻通讯，获取喜马拉雅路线实时状况与特惠公告。' },
  'footer.emailPlaceholder': { EN: '*Email Address', FR: '*Adresse e-mail', DE: '*E-Mail-Adresse', ZH: '*电子邮箱' },
  'footer.firstNamePlaceholder': { EN: '*First Name', FR: '*Prénom', DE: '*Vorname', ZH: '*名字' },
  'footer.signUp': { EN: 'SIGN UP', FR: 'S\'INSCRIRE', DE: 'ANMELDEN', ZH: '订阅' },
  'footer.sendMessage': { EN: 'Send Us A Message', FR: 'Envoyez-nous un message', DE: 'Senden Sie uns eine Nachricht', ZH: '发送信息联系我们' },
  'footer.accredited': { EN: 'NTB & TAAN ACCREDITED', FR: 'ACCRÉDITÉ NTB & TAAN', DE: 'NTB & TAAN AKKREDITIERT', ZH: 'NTB 与 TAAN 官方认证' },
  'footer.license': { EN: 'Expedition License #4820', FR: 'Licence d\'expédition #4820', DE: 'Expeditionslizenz #4820', ZH: '探险牌照 #4820' },
  'footer.rights': { EN: 'All Rights Reserved.', FR: 'Tous droits réservés.', DE: 'Alle Rechte vorbehalten.', ZH: '保留所有权利。' },
  'footer.privacy': { EN: 'Privacy Policy', FR: 'Politique de confidentialité', DE: 'Datenschutzrichtlinie', ZH: '隐私政策' },
  'footer.terms': { EN: 'Terms of Service', FR: 'Conditions d\'utilisation', DE: 'Nutzungsbedingungen', ZH: '服务条款' },
  'footer.by': { EN: 'Website By Project Peak', FR: 'Site web par Project Peak', DE: 'Website von Project Peak', ZH: 'Project Peak 官方网站' },
};

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');

  const rates = {
    USD: 1,
    NPR: 133,
    EUR: 0.92,
  };

  const convertPrice = (usdPrice) => {
    const rate = rates[currency];
    const converted = usdPrice * rate;
    const symbols = { USD: '$', NPR: 'Rs.', EUR: '€' };
    const formatted = Math.round(converted).toLocaleString();
    return `${symbols[currency]} ${formatted}`;
  };

  const t = (key) => {
    return translations[key]?.[language] || translations[key]?.['EN'] || key;
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, language, setLanguage, convertPrice, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
