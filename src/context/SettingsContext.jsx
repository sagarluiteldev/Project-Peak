/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

const translations = {
  // Hero
  'hero.tagline': { 
    EN: 'Nepal\'s Premier Adventure Partner', 
    FR: 'Le partenaire d\'aventure de premier plan au Népal', 
    DE: 'Nepals führender Abenteuerpartner', 
    ZH: '尼泊尔首屈一指的探险伙伴',
    ES: 'El socio de aventuras líder en Nepal',
    NO: 'Nepals ledende eventyrpartner'
  },
  'hero.natureDesc': {
    EN: 'We believe that nature is our true home. We strive to make your Himalayan outdoor experience closer to nature, more comfortable, and unforgettable.',
    FR: 'Nous croyons que la nature est notre véritable foyer. Nous nous efforçons de rendre votre expérience himalayenne plus proche de la nature, plus confortable et inoubliable.',
    DE: 'Wir glauben, dass die Natur unser wahres Zuhause ist. Wir streben danach, Ihr Outdoor-Erlebnis im Himalaya naturnah, komfortabel und unvergesslich zu gestalten.',
    ZH: '我们相信大自然是我们真正的家园。我们致力于让您的喜马拉雅户外体验更贴近自然、更舒适、更令人难忘。',
    ES: 'Creemos que la naturaleza es nuestro verdadero hogar. Nos esforzamos por hacer que su experiencia al aire libre en el Himalaya sea más cercana a la naturaleza, cómoda e inolvidable.',
    NO: 'Vi tror at naturen er vårt sanne hjem. Vi tilstreber å gjøre din friluftsopplevelse i Himalaya tettere på naturen, mer komfortabel og uforglemmelig.'
  },
  'hero.cta': { EN: 'Explore Treks', FR: 'Explorer les treks', DE: 'Treks erkunden', ZH: '探索徒步路线', ES: 'Explorar rutas', NO: 'Utforsk turer' },
  'hero.scroll': { EN: 'Scroll', FR: 'Défiler', DE: 'Scrollen', ZH: '滚动', ES: 'Desplazar', NO: 'Rull ned' },

  // Navbar
  'nav.treks': { EN: 'Treks', FR: 'Treks', DE: 'Treks', ZH: '徒步路线', ES: 'Rutas', NO: 'Turer' },
  'nav.planner': { EN: 'Planner', FR: 'Planificateur', DE: 'Planer', ZH: '行程规划', ES: 'Planificador', NO: 'Planlegger' },
  'nav.permits': { EN: 'Permits', FR: 'Permis', DE: 'Genehmigungen', ZH: '许可证', ES: 'Permisos', NO: 'Tillatelser' },
  'nav.gear': { EN: 'Gear', FR: 'Équipement', DE: 'Ausrüstung', ZH: '装备清单', ES: 'Equipo', NO: 'Utstyr' },
  'nav.weather': { EN: 'Weather', FR: 'Météo', DE: 'Wetter', ZH: '实时天气', ES: 'Clima', NO: 'Vær' },
  'nav.reviews': { EN: 'Reviews', FR: 'Avis', DE: 'Bewertungen', ZH: '真实评价', ES: 'Reseñas', NO: 'Omtaler' },
  'nav.compass': { EN: 'Interactive Compass', FR: 'Boussole interactive', DE: 'Interaktiver Kompass', ZH: '交互式指南针', ES: 'Brújula interactiva', NO: 'Interaktivt kompass' },
  'nav.searchPlaceholder': { EN: 'Search treks...', FR: 'Rechercher des treks...', DE: 'Treks suchen...', ZH: '搜索徒步路线...', ES: 'Buscar rutas...', NO: 'Søk etter turer...' },
  'nav.explore': { EN: 'EXPLORE TREKS', FR: 'EXPLORER LES TREKS', DE: 'TREKS ERKUNDEN', ZH: '探索徒步路线', ES: 'EXPLORAR RUTAS', NO: 'UTFORSK TURER' },

  // BentoGrid (Regions)
  'bento.badge': { EN: 'HIMALAYAN REGIONS', FR: 'RÉGIONS HIMALAYENNES', DE: 'HIMALAYA-REGIONEN', ZH: '喜马拉雅地区', ES: 'REGIONES DEL HIMALAYA', NO: 'HIMALAYA-REGIONER' },
  'bento.title': { EN: "NEPAL'S MOUNTAIN SANCTUARIES", FR: "SANCTUAIRES MONTAGNEUX DU NÉPAL", DE: "NEPALS BERGHEILIGTÜMER", ZH: "尼泊尔山岳圣地", ES: "SANTUARIOS DE MONTAÑA DE NEPAL", NO: "NEPALS FJELLFRISTEDER" },
  'bento.annapurna.sub': { EN: 'Classic Circuits & Basecamp', FR: 'Circuits classiques & Camp de base', DE: 'Klassische Runden & Basislager', ZH: '经典环线和大本营', ES: 'Circuitos clásicos y campo base', NO: 'Klassiske runder og baseleir' },
  'bento.everest.sub': { EN: 'Base Camp & Gokyo Lakes', FR: 'Camp de base & Lacs de Gokyo', DE: 'Basislager & Gokyo-Seen', ZH: '大本营与高克尤湖', ES: 'Campo base y lagos Gokyo', NO: 'Baseleir og Gokyo-innsjøene' },
  'bento.langtang.sub': { EN: 'Valley of Glaciers & Holy Lakes', FR: 'Vallée des glaciers & Lacs sacrés', DE: 'Tal der Gletscher & Heilige Seen', ZH: '冰川谷与圣湖', ES: 'Valle de glaciares y lagos sagrados', NO: 'Breenes dal og hellige innsjøer' },
  'bento.manaslu.sub': { EN: 'Off-the-beaten-path Wilderness', FR: 'Sauvage & hors des sentiers battus', DE: 'Unberührte Wildnis', ZH: '偏远荒野', ES: 'Naturaleza fuera de lo común', NO: 'Urørt villmark utenfor alfarvei' },
  'bento.expeditions.sub': { EN: 'Three Passes, Thorong La & Larkya La', FR: 'Trois cols, Thorong La & Larkya La', DE: 'Drei Pässe, Thorong La & Larkya La', ZH: '三大垭口与高海拔探险', ES: 'Tres pasos, Thorong La y Larkya La', NO: 'Tre pass, Thorong La og Larkya La' },
  'bento.all.title': { EN: 'ALL TREKS', FR: 'TOUS LES TREKS', DE: 'ALLE TREKS', ZH: '所有路线', ES: 'TODAS LAS RUTAS', NO: 'ALLE TURER' },
  'bento.all.sub': { EN: 'Explore 20+ Routes', FR: 'Explorer plus de 20 itinéraires', DE: 'Über 20 Routen erkunden', ZH: '探索 20+ 条路线', ES: 'Explorar más de 20 rutas', NO: 'Utforsk 20+ ruter' },

  // Destinations
  'dest.badge': { EN: 'EXPEDITIONS & TREKS', FR: 'EXPÉDITIONS ET TREKS', DE: 'EXPEDITIONEN & TREKS', ZH: '探险与徒步', ES: 'EXPEDICIONES Y RUTAS', NO: 'EKSPEDISJONER OG TURER' },
  'dest.title': { EN: 'EXPAND YOUR HORIZON.', FR: 'ÉLARGISSEZ VOS HORIZONS.', DE: 'ERWEITERN SIE IHREN HORIZONT.', ZH: '拓展您的视野。', ES: 'AMPLÍE SUS HORIZONTES.', NO: 'UTVID HORISONTEN DIN.' },
  'dest.desc': { EN: 'Curated Himalayan expeditions with real-time booking, local expertise, and uncompromising safety standards.', FR: 'Expéditions himalayennes organisées avec réservation en temps réel, expertise locale et normes de sécurité.', DE: 'Kuratierte Himalaya-Expeditionen mit Echtzeitbuchung, lokaler Expertise und Sicherheitsstandards.', ZH: '精心策划的喜马拉雅探险，提供实时预订、本地专业知识和毫不妥协的安全标准。', ES: 'Expediciones seleccionadas al Himalaya con reservas en tiempo real, experiencia local y máxima seguridad.', NO: 'Skreddersydde Himalaya-ekspedisjoner med sanntidsbooking, lokal ekspertise og kompromissløs sikkerhet.' },
  'dest.viewAll': { EN: 'View All Treks', FR: 'Voir tous les treks', DE: 'Alle Treks ansehen', ZH: '查看所有路线', ES: 'Ver todas las rutas', NO: 'Se alle turer' },
  'dest.showLess': { EN: 'Show Top Treks', FR: 'Voir les principaux treks', DE: 'Haupt-Treks anzeigen', ZH: '显示精选路线', ES: 'Mostrar destacadas', NO: 'Vis utvalgte turer' },
  'dest.days': { EN: 'Days', FR: 'Jours', DE: 'Tage', ZH: '天', ES: 'Días', NO: 'Dager' },
  'dest.alt': { EN: 'Altitude', FR: 'Altitude', DE: 'Höhe', ZH: '海拔', ES: 'Altitud', NO: 'Høyde' },
  'dest.summitProfile': { EN: 'Summit Profile', FR: 'Profil du sommet', DE: 'Gipfelprofil', ZH: '山峰高程', ES: 'Perfil de cumbre', NO: 'Topprosess-profil' },
  'dest.bookTrek': { EN: 'Book Trek', FR: 'Réserver', DE: 'Buchen', ZH: '预订路线', ES: 'Reservar ruta', NO: 'Bestill tur' },

  // LogisticsCards
  'logistics.badge': { EN: 'EXPEDITION LOGISTICS', FR: 'LOGISTIQUE D\'EXPÉDITION', DE: 'EXPEDITIONSLOGISTIK', ZH: '探险后勤', ES: 'LOGÍSTICA DE EXPEDICIÓN', NO: 'EKSPEDISJONSLOGISTIKK' },
  'logistics.title': { EN: 'EVERYTHING HANDLED', FR: 'TOUT EST GÉRÉ', DE: 'ALLES GEREGELT', ZH: '全程精心安排', ES: 'TODO ORGANIZADO', NO: 'ALT ER HÅNDTERT' },
  'logistics.permitsTitle': { EN: 'PERMITS & LOGISTICS', FR: 'PERMIS ET LOGISTIQUE', DE: 'GENEHMIGUNGEN & LOGISTIK', ZH: '许可证与后勤', ES: 'PERMISOS Y LOGÍSTICA', NO: 'TILLATELSER OG LOGISTIKK' },
  'logistics.permitsBadge': { EN: 'FULL HIMALAYAN SUPPORT & GUARANTEE', FR: 'SUPPORT ET GARANTIE COMPLETS', DE: 'VOLLER HIMALAYA-SUPPORT & GARANTIE', ZH: '全方位喜马拉雅保障与支持', ES: 'GARANTÍA Y SOPORTE COMPLETO EN EL HIMALAYA', NO: 'FULL HIMALAYA-STØTTE OG GARANTI' },
  'logistics.guidesTitle': { EN: 'EXPERT SHERPA GUIDES', FR: 'GUIDES SHERPAS EXPÉRIMENTÉS', DE: 'EXPERTEN-SHERPA-GUIDES', ZH: '资深夏尔巴向导', ES: 'GUÍAS SHERPA EXPERTOS', NO: 'EKSPERT-SHERPA-GUIDER' },

  // ItineraryPlanner
  'planner.badge': { EN: 'CUSTOM ROUTE PLANNER', FR: 'PLANIFICATEUR DE PARCOURS', DE: 'ROUTENPLANER', ZH: '定制行程规划', ES: 'PLANIFICADOR DE RUTA', NO: 'SKREDDERSYDD RUTEPLANLEGGER' },
  'planner.title': { EN: 'BUILD YOUR EXPEDITION', FR: 'CRÉEZ VOTRE EXPÉDITION', DE: 'EXPEDITION PLANEN', ZH: '制定您的探险行程', ES: 'DISEÑA TU EXPEDICIÓN', NO: 'BYGG DIN EKSPEDISJON' },
  'planner.subtitle': { EN: 'Select your preferences to get a personalized trek itinerary & cost breakdown.', FR: 'Sélectionnez vos préférences pour un itinéraire personnalisé.', DE: 'Wählen Sie Ihre Präferenzen für eine persönliche Route.', ZH: '选择您的偏好，获取个性化行程与费用明细。', ES: 'Seleccione sus preferencias para obtener un itinerario y desglose de costes personalizado.', NO: 'Velg dine preferanser for å få en personlig reiserute og kostnadsoversikt.' },

  // Features
  'feat.badge': { EN: 'WHY PROJECT PEAK', FR: 'POURQUOI PROJECT PEAK', DE: 'WARUM PROJECT PEAK', ZH: '为什么选择 PROJECT PEAK', ES: 'POR QUÉ PROJECT PEAK', NO: 'HVORFOR PROJECT PEAK' },
  'feat.title': { EN: 'THE PREMIER EXPERIENCE', FR: 'L\'EXPÉRIENCE PREMIUM', DE: 'DAS PREMIUM-ERLEBNIS', ZH: '顶级探险体验', ES: 'LA EXPERIENCIA PREMIER', NO: 'DEN BESTE OPPLEVELSEN' },
  'feat.desc': { EN: 'We handle the logistics of the Himalayas so you can focus on the ascent. From domestic flights to local permits.', FR: 'Nous gérons la logistique de l\'Himalaya pour que vous puissiez vous concentrer sur l\'ascension.', DE: 'Wir kümmern uns um die Logistik des Himalaya, damit Sie sich auf den Aufstieg konzentrieren können.', ZH: '我们解决喜马拉雅的一切后勤，让您专注攀登。', ES: 'Nos encargamos de la logística en el Himalaya para que pueda concentrarse en la cima.', NO: 'Vi håndterer logistikken i Himalaya slik at du kan fokusere på toppstøtet. Fra innenlandsfly til lokale tillatelser.' },
  'feat.flights': { EN: 'Real-Time Flight Booking', FR: 'Réservation de vols en temps réel', DE: 'Echtzeitflugbuchung', ZH: '实时航班预订', ES: 'Reserva de vuelos en tiempo real', NO: 'Sanntids flybooking' },
  'feat.flights.desc': { EN: 'Direct integration with Yeti Airlines and Buddha Air. Lock your seat to Lukla instantly.', FR: 'Intégration directe avec Yeti Airlines et Buddha Air. Réservez votre siège pour Lukla instantanément.', DE: 'Direkte Anbindung an Yeti Airlines und Buddha Air. Sichern Sie sich sofort Ihren Platz nach Lukla.', ZH: '与雪人航空和佛陀航空直接集成。立即锁定飞往卢卡拉的座位。', ES: 'Integración directa con Yeti Airlines y Buddha Air. Reserve su vuelo a Lukla al instante.', NO: 'Direkte integrasjon med Yeti Airlines og Buddha Air. Sikre setet ditt til Lukla umiddelbart.' },
  'feat.payments': { EN: 'Local & Global Payments', FR: 'Paiements locaux et internationaux', DE: 'Lokale & globale Zahlungen', ZH: '本地和全球支付', ES: 'Pagos locales y globales', NO: 'Lokale og globale betalinger' },
  'feat.payments.desc': { EN: 'Stripe and PayPal for international travelers, plus eSewa, Fonepay and Khalti for locals.', FR: 'Stripe et PayPal pour les voyageurs internationaux, plus eSewa, Fonepay et Khalti pour les locaux.', DE: 'Stripe und PayPal für internationale Reisende, plus eSewa, Fonepay und Khalti für Einheimische.', ZH: '国际旅客可使用Stripe和PayPal，本地用户可使用eSewa、Fonepay和Khalti。', ES: 'Stripe y PayPal para viajeros internacionales, más eSewa, Fonepay y Khalti para locales.', NO: 'Stripe og PayPal for internasjonale reisende, pluss eSewa, Fonepay og Khalti for lokale.' },
  'feat.permits': { EN: 'Permits Guaranteed', FR: 'Permis garantis', DE: 'Genehmigungen garantiert', ZH: '许可证保证', ES: 'Permisos garantizados', NO: 'Garanterte tillatelser' },
  'feat.permits.desc': { EN: 'TIMS cards and National Park permits pre-arranged before your arrival.', FR: 'Cartes TIMS et permis de parc national pré-arrangés avant votre arrivée.', DE: 'TIMS-Karten und Nationalpark-Genehmigungen vor Ihrer Ankunft vorab organisiert.', ZH: 'TIMS卡和国家公园许可证在您抵达前预先安排。', ES: 'Tarjetas TIMS y permisos de parque nacional organizados antes de su llegada.', NO: 'TIMS-kort og nasjonalparktillatelser ordnet før ankomst.' },
  'feat.weather': { EN: 'Live Weather Data', FR: 'Données météo en direct', DE: 'Live-Wetterdaten', ZH: '实时天气数据', ES: 'Datos de clima en vivo', NO: 'Live værdata' },
  'feat.weather.desc': { EN: 'Dynamic altitude and weather data for Everest Base Camp and Annapurna.', FR: 'Données d\'altitude et météo dynamiques pour le camp de base de l\'Everest et l\'Annapurna.', DE: 'Dynamische Höhen- und Wetterdaten für das Everest Base Camp und Annapurna.', ZH: '珠穆朗玛峰大本营和安纳普尔纳的动态海拔和天气数据。', ES: 'Datos dinámicos de altitud y clima para el Campo Base del Everest y Annapurna.', NO: 'Dynamisk høyde- og værdata for Everest Base Camp og Annapurna.' },

  // Weather
  'weather.badge': { EN: 'LIVE HIMALAYAN WEATHER', FR: 'MÉTÉO HIMALAYENNE EN DIRECT', DE: 'LIVE-HIMALAYA-WETTER', ZH: '喜马拉雅实时天气', ES: 'CLIMA EN VIVO DEL HIMALAYA', NO: 'LIVE HIMALAYA-VÆR' },
  'weather.title': { EN: 'TRAIL ADVISORY & FORECAST', FR: 'AVIS ET PRÉVISIONS DE SENTIER', DE: 'TRAIL-BERICHT & VORHERSAGE', ZH: '路线预警与天气预报', ES: 'AVISO DE RUTA Y PRONÓSTICO', NO: 'RUTERÅD OG VÆRMELDING' },
  'weather.freeze': { EN: 'Freezing Level', FR: 'Niveau de congélation', DE: 'Frostgrenze', ZH: '冰冻线高度', ES: 'Nivel de congelación', NO: 'Frysepunkt-høyde' },
  'weather.uv': { EN: 'UV Index', FR: 'Indice UV', DE: 'UV-Index', ZH: '紫外线指数', ES: 'Índice UV', NO: 'UV-indeks' },

  // Permits
  'permit.badge': { EN: 'NEPAL PERMIT & VISA HUB', FR: 'HUB PERMIS & VISAS NÉPAL', DE: 'PERMIT & VISA ZENTRUM', ZH: '尼泊尔许可证与签证中心', ES: 'CENTRO DE PERMISOS Y VISADOS', NO: 'NEPAL TILLATELSE- OG VISUMSENTER' },
  'permit.title': { EN: 'EXPEDITION DOCUMENTATION', FR: 'DOCUMENTATION D\'EXPÉDITION', DE: 'EXPEDITIONSDOKUMENTATION', ZH: '探险证件办理', ES: 'DOCUMENTACIÓN DE EXPEDICIÓN', NO: 'EKSPEDISJONSDOKUMENTASJON' },
  'permit.subtitle': { EN: 'Official permit requirements and entry visa information for Himalayan trekking.', FR: 'Exigences de permis officiels et visas d\'entrée.', DE: 'Offizielle Genehmigungen und Visa-Informationen.', ZH: '喜马拉雅徒步官方许可证与入境签证说明。', ES: 'Requisitos oficiales de permisos e información de visados para trekking.', NO: 'Offisielle tillatelseskrav og visuminformasjon for turer i Himalaya.' },

  // Gear
  'gear.badge': { EN: 'PACKING & WEIGHT BUDGET', FR: 'SAC & BUDGET POIDS', DE: 'PACKEN & GEWICHTSBUDGET', ZH: '装备清单与重量预算', ES: 'EQUIPAJE Y PRESUPUESTO DE PESO', NO: 'PAKKE- OG VEKTBUDSJETT' },
  'gear.title': { EN: 'EXPEDITION GEAR CHECKER', FR: 'VÉRIFICATEUR D\'ÉQUIPEMENT', DE: 'EXPEDITIONSAUSRÜSTUNG', ZH: '探险装备核对器', ES: 'VERIFICADOR DE EQUIPO', NO: 'UTSTYRSKONTROLL FOR EKSPEDISJON' },
  'gear.subtitle': { EN: 'Interactive checklist to ensure you have all essential mountain gear.', FR: 'Liste d\'équipement essentielle pour la montagne.', DE: 'Interaktive Checkliste für essentielle Bergausrüstung.', ZH: '互动式清单，确保携带必需的登山装备。', ES: 'Lista de verificación interactiva para garantizar todo el equipo esencial.', NO: 'Interaktiv sjekkliste for å sikre at du har alt essensielt fjellutstyr.' },

  // Fitness
  'fitness.badge': { EN: 'FITNESS & CALORIE PREP', FR: 'FITNESS & PRÉPARATION CALORIQUE', DE: 'FITNESS & KALORIEN-VORBEREITUNG', ZH: '体能与热量储备', ES: 'PREPARACIÓN FÍSICA Y CALÓRICA', NO: 'TRENING- OG KALORIEFORBEREDELSE' },
  'fitness.title': { EN: 'TREK CALORIE CALCULATOR', FR: 'CALCULATEUR DE CALORIES DE TREK', DE: 'TREK-KALORIENRECHNER', ZH: '徒步热量计算器', ES: 'CALCULADORA DE CALORÍAS', NO: 'KALORIKALKULATOR FOR TURER' },
  'fitness.desc': { EN: 'Enter your details below to estimate total energy expenditure, body fat burn, and training prep requirements.', FR: 'Entrez vos détails ci-dessous pour estimer la dépense énergétique.', DE: 'Geben Sie Ihre Daten ein, um Ihren Energieverbrauch zu schätzen.', ZH: '输入您的详细信息，估算总能量消耗与体能准备要求。', ES: 'Ingrese sus datos para calcular el gasto energético, quema de grasa y preparación.', NO: 'Skriv inn detaljene dine for å beregne totalt energiforbruk, fettforbrenning og treningsbehov.' },
  'fitness.routeLabel': { EN: 'Select Your Trek Route', FR: 'Sélectionnez votre itinéraire', DE: 'Wählen Sie Ihre Trekkingroute', ZH: '选择徒步路线', ES: 'Seleccione su ruta', NO: 'Velg turrute' },
  'fitness.weightLabel': { EN: 'Body Weight', FR: 'Poids corporel', DE: 'Körpergewicht', ZH: '体重', ES: 'Peso corporal', NO: 'Kroppsvekt' },
  'fitness.btn': { EN: 'Explore Matching Treks', FR: 'Explorer les treks correspondants', DE: 'Passende Treks erkunden', ZH: '探索匹配的徒步路线', ES: 'Explorar rutas recomendadas', NO: 'Utforsk passende turer' },
  'fitness.expenditure': { EN: 'ESTIMATED ENERGY EXPENDITURE', FR: 'DÉPENSE ÉNERGÉTIQUE ESTIMÉE', DE: 'GESCHÄTZTER ENERGIEVERBRAUCH', ZH: '预估能量消耗', ES: 'GASTO ENERGÉTICO ESTIMADO', NO: 'BEREGNET ENERGIFORBRUK' },
  'fitness.totalKcal': { EN: 'TOTAL KILOCALORIES BURNED', FR: 'CALORIES TOTALES BRÛLÉES', DE: 'INSGESAMT VERBRANNTE KALORIEN', ZH: '总卡路里消耗', ES: 'KILOCALORÍAS TOTALES QUEMADAS', NO: 'TOTALT ANTALL KALORIER FORBRENT' },
  'fitness.marathons': { EN: 'Marathons', FR: 'Marathons', DE: 'Marathons', ZH: '马拉松当量', ES: 'Maratones', NO: 'Maraton' },
  'fitness.burgers': { EN: 'Burgers', FR: 'Burgers', DE: 'Burger', ZH: '汉堡当量', ES: 'Hamburguesas', NO: 'Burgere' },
  'fitness.fatLoss': { EN: 'Fat Loss', FR: 'Perte de graisse', DE: 'Fettabbau', ZH: '脂肪消耗', ES: 'Pérdida de grasa', NO: 'Fettforbrenning' },
  'fitness.prep': { EN: 'Recommended Prep: 3-4 months of cardiovascular stairs & weighted pack training prior to departure.', FR: 'Préparation recommandée : 3-4 mois d\'entraînement.', DE: 'Empfohlene Vorbereitung: 3-4 Monate Herz-Kreislauf- & Rucksack-Training.', ZH: '建议准备：出发前进行3-4个月的心肺爬梯与重装训练。', ES: 'Preparación recomendada: 3-4 meses de entrenamiento cardiovascular y peso.', NO: 'Anbefalt forberedelse: 3-4 måneder med kondisjonstrening i trapper og tung sekk før avreise.' },

  // Testimonials
  'test.badge': { EN: 'TREKKER REVIEWS', FR: 'AVIS DES RANDONNEURS', DE: 'BEWERTUNGEN', ZH: '真实评价', ES: 'RESEÑAS DE SENDERISTAS', NO: 'TUR-OMTALER' },
  'test.title': { EN: 'WHAT TREKKERS SAY', FR: 'CE QUE DISENT LES RANDONNEURS', DE: 'WAS TREKKER SAGEN', ZH: '探险者的真实声音', ES: 'LO QUE DICEN LOS SENDERISTAS', NO: 'HVA VÅRE TURDELTAKERE SIER' },

  // Statement Banner
  'statement.himalayas': { EN: 'THE HIMALAYAS', FR: 'L\'HIMALAYA', DE: 'DER HIMALAYA', ZH: '喜马拉雅', ES: 'EL HIMALAYA', NO: 'HIMALAYA' },
  'statement.areOur': { EN: 'ARE OUR', FR: 'EST NOTRE', DE: 'IST UNSER', ZH: '是我们', ES: 'ES NUESTRO', NO: 'ER VÅRT' },
  'statement.trueHome': { EN: 'TRUE HOME', FR: 'VRAI FOYER', DE: 'WAHRES ZUHAUSE', ZH: '真正的家园', ES: 'VERDADERO HOGAR', NO: 'SANNE HJEM' },
  'statement.cta': { EN: 'BEGIN EXPEDITION', FR: 'COMMENCER L\'EXPÉDITION', DE: 'EXPEDITION STARTEN', ZH: '开启探险之旅', ES: 'INICIAR EXPEDICIÓN', NO: 'START EKSPEDISJON' },

  // Footer
  'footer.aboutUs': { EN: 'About Us', FR: 'À propos de nous', DE: 'Über uns', ZH: '关于我们', ES: 'Sobre nosotros', NO: 'Om oss' },
  'footer.expeditions': { EN: 'Expeditions & Treks', FR: 'Expéditions & Treks', DE: 'Expeditionen & Treks', ZH: '探险与徒步', ES: 'Expediciones y Rutas', NO: 'Ekspedisjoner og turer' },
  'footer.permits': { EN: 'Permits & Logistics', FR: 'Permis & Logistique', DE: 'Genehmigungen & Logistik', ZH: '许可证与后勤', ES: 'Permisos y Logística', NO: 'Tillatelser og logistikk' },
  'footer.weather': { EN: 'Weather & Trail Advisory', FR: 'Météo & Avis', DE: 'Wetter & Trail-Bericht', ZH: '天气与路线提示', ES: 'Clima y Estado de Rutas', NO: 'Vær og ruteråd' },
  'footer.joinTeam': { EN: 'Join Our Team', FR: 'Rejoignez notre équipe', DE: 'Unserem Team beitreten', ZH: '加入我们的团队', ES: 'Únete a nuestro equipo', NO: 'Bli med i vårt team' },
  'footer.getUpdates': { EN: 'GET EXPEDITION UPDATES', FR: 'RECEVOIR DES MISES À JOUR', DE: 'EXPEDITIONS-UPDATES ERHALTEN', ZH: '获取探险最新动态', ES: 'RECIBIR NOTICIAS DE EXPEDICIÓN', NO: 'FÅ OPPDATERINGER OM EKSPEDISJONER' },
  'footer.getUpdatesSub': { EN: 'Subscribe to our newsletter to receive live Himalayan trail conditions, permit advisories, and exclusive trek announcements.', FR: 'Abonnez-vous pour recevoir les conditions des sentiers.', DE: 'Abonnieren Sie unseren Newsletter für aktuelle Trail-Bedingungen.', ZH: '订阅新闻通讯，获取喜马拉雅路线实时状况与特惠公告。', ES: 'Suscríbase a nuestro boletín para recibir estados de rutas e información exclusiva.', NO: 'Abonner på vårt nyhetsbrev for oppdateringer om ruter, tillatelser og eksklusive nyheter.' },
  'footer.emailPlaceholder': { EN: '*Email Address', FR: '*Adresse e-mail', DE: '*E-Mail-Adresse', ZH: '*电子邮箱', ES: '*Correo electrónico', NO: '*E-postadresse' },
  'footer.firstNamePlaceholder': { EN: '*First Name', FR: '*Prénom', DE: '*Vorname', ZH: '*名字', ES: '*Nombre', NO: '*Fornavn' },
  'footer.signUp': { EN: 'SIGN UP', FR: 'S\'INSCRIRE', DE: 'ANMELDEN', ZH: '订阅', ES: 'SUSCRIBIRSE', NO: 'MELDE DEG PÅ' },
  'footer.sendMessage': { EN: 'Send Us A Message', FR: 'Envoyez-nous un message', DE: 'Senden Sie uns eine Nachricht', ZH: '发送信息联系我们', ES: 'Enviar un mensaje', NO: 'Send oss en melding' },
  'footer.accredited': { EN: 'NTB & TAAN ACCREDITED', FR: 'ACCRÉDITÉ NTB & TAAN', DE: 'NTB & TAAN AKKREDITIERT', ZH: 'NTB 与 TAAN 官方认证', ES: 'ACREDITADO POR NTB Y TAAN', NO: 'NTB- OG TAAN-GODKJENT' },
  'footer.license': { EN: 'Expedition License #4820', FR: 'Licence d\'expédition #4820', DE: 'Expeditionslizenz #4820', ZH: '探险牌照 #4820', ES: 'Licencia de Expedición #4820', NO: 'Ekspedisjonslisens #4820' },
  'footer.rights': { EN: 'All Rights Reserved.', FR: 'Tous droits réservés.', DE: 'Alle Rechte vorbehalten.', ZH: '保留所有权利。', ES: 'Todos los derechos reservados.', NO: 'Alle rettigheter forbeholdt.' },
  'footer.privacy': { EN: 'Privacy Policy', FR: 'Politique de confidentialité', DE: 'Datenschutzrichtlinie', ZH: '隐私政策', ES: 'Política de privacidad', NO: 'Personvernerklæring' },
  'footer.terms': { EN: 'Terms of Service', FR: 'Conditions d\'utilisation', DE: 'Nutzungsbedingungen', ZH: '服务条款', ES: 'Términos de servicio', NO: 'Vilkår for bruk' },
  'footer.by': { EN: 'Website By Project Peak', FR: 'Site web par Project Peak', DE: 'Website von Project Peak', ZH: 'Project Peak 官方网站', ES: 'Sitio web por Project Peak', NO: 'Nettside av Project Peak' },
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
