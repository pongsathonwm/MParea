// ==========================================================
// MP AREA — SHARED LOGIC (used across all 4 pages)
// Depends on data.js being loaded first.
// ==========================================================

const AMENITY_META = {
  "แอร์": { th:"แอร์", en:"Air conditioning", cn:"空调", icon:"❄️" },
  "ที่จอดรถ": { th:"ที่จอดรถ", en:"Parking", cn:"停车位", icon:"🚗" },
  "สวน": { th:"สวน", en:"Garden", cn:"花园", icon:"🌿" },
  "รปภ": { th:"รักษาความปลอดภัย", en:"Security", cn:"安保", icon:"🔒" },
  "เฟอร์นิเจอร์ครบ": { th:"เฟอร์นิเจอร์ครบ", en:"Furnished", cn:"家具齐全", icon:"🛋️" },
  "สระว่ายน้ำ": { th:"สระว่ายน้ำ", en:"Swimming pool", cn:"游泳池", icon:"🏊" },
  "ฟิตเนส": { th:"ฟิตเนส", en:"Gym", cn:"健身房", icon:"🏋️" },
  "ห้องครัว": { th:"ห้องครัว", en:"Kitchen", cn:"厨房", icon:"🍳" }
};

const TYPE_LABELS = {
  house: { th:"บ้านเดี่ยว", en:"House", cn:"独立屋" },
  condo: { th:"คอนโด", en:"Condo", cn:"公寓" },
  townhouse: { th:"ทาวน์โฮม", en:"Townhouse", cn:"联排别墅" },
  land: { th:"ที่ดิน", en:"Land", cn:"土地" },
  villa: { th:"พูลวิลล่า", en:"Pool Villa", cn:"泳池别墅" }
};

const LANG_KEY = "mp_area_lang";
let currentLang = localStorage.getItem(LANG_KEY) || "th";
let ALL_PROPERTIES = [];

// ==========================================================
// LANGUAGE
// ==========================================================
function setLang(lang){
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll('.lang-toggle button[data-lang]').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-lang]').forEach(el=>{
    const active = el.dataset.lang === lang;
    el.classList.toggle('lang-active', active);
    el.style.display = active ? '' : 'none';
  });
  document.documentElement.lang = lang;
  if (typeof onLangChange === 'function') onLangChange(lang);
}

function getField(obj, baseKey){
  // baseKey e.g. "title" -> tries title / titleEn / titleCn depending on lang
  if (currentLang === 'th') return obj[baseKey] ?? '';
  if (currentLang === 'en') return obj[baseKey + 'En'] ?? obj[baseKey] ?? '';
  if (currentLang === 'cn') return obj[baseKey + 'Cn'] ?? obj[baseKey] ?? '';
  return obj[baseKey] ?? '';
}

function t(th, en, cn){
  if (currentLang === 'en') return en;
  if (currentLang === 'cn') return cn;
  return th;
}

// ==========================================================
// FORMATTING
// ==========================================================
function formatPrice(p){
  return Math.round(p).toLocaleString('en-US');
}

function priceLabel(p){
  const amount = `฿${formatPrice(p.price)}`;
  if (p.listingType === 'rent') return amount + (currentLang==='th' ? '/เดือน' : currentLang==='cn' ? '/月' : '/mo');
  return amount;
}

function listingBadge(p){
  const isRent = p.listingType === 'rent';
  const label = isRent ? t('เช่า','For Rent','出租') : t('ขาย','For Sale','出售');
  return `<span class="badge-listing ${isRent ? 'rent':'sale'}">${label}</span>`;
}

// ==========================================================
// DATA LOADING (wraps data.js)
// ==========================================================
async function loadAllProperties(forceRefresh){
  ALL_PROPERTIES = await loadProperties(forceRefresh);
  return ALL_PROPERTIES;
}

// ==========================================================
// CARD RENDERING (used on index + properties pages)
// ==========================================================
function renderPropertyCard(p){
  const title = getField(p, 'title');
  const loc = getField(p, 'location');
  const hasTour = p.tour && p.tour.available;
  const typeLabel = TYPE_LABELS[p.type] ? TYPE_LABELS[p.type][currentLang] : p.type;

  return `
  <div class="card" onclick="window.location.href='property.html?id=${p.id}'">
    <div class="card-img">
      <img src="${p.cover}" alt="${title}" loading="lazy" onerror="this.src='https://placehold.co/800x600/2B3540/FAF7F1?text=No+Image'">
      <span class="card-tag ${hasTour ? 'tour' : ''}">
        ${hasTour ? '🧭 ' + t('เดินดูได้','Walkthrough','可漫游') : t('รูปภาพ','Photos','照片')}
      </span>
      <span class="card-price-tag">${priceLabel(p)}</span>
      <div style="position:absolute;top:12px;right:12px;display:flex;gap:6px;">
        ${p.isHotDeal ? `<span class="badge-hotdeal">${t('ดีลเด่น','Hot Deal','优选')}</span>` : ''}
        ${listingBadge(p)}
      </div>
    </div>
    <div class="card-body">
      <h3>${title}</h3>
      <div class="card-loc">📍 ${loc}</div>
      <div class="card-specs">
        <span>🏠 ${typeLabel}</span>
        ${p.beds ? `<span>🛏️ ${p.beds}</span>` : ''}
        ${p.baths ? `<span>🛁 ${p.baths}</span>` : ''}
        <span>📐 ${p.sqm || p.landSqm || '-'} ${t('ตร.ม.','sqm','平方米')}</span>
      </div>
    </div>
  </div>`;
}

function renderCardGrid(containerEl, properties){
  if (!properties.length){
    containerEl.innerHTML = `<p style="color:var(--ink-soft);padding:32px 0;">${t('ไม่พบทรัพย์ที่ตรงกับเงื่อนไข','No properties match your filters.','没有符合条件的房源。')}</p>`;
    return;
  }
  containerEl.innerHTML = properties.map(renderPropertyCard).join('');
}

// ==========================================================
// CONTACT ACTIONS
// ==========================================================
function contactLine(){
  window.open('https://line.me/ti/p/~Khate095', '_blank');
}
function contactTel(){
  window.location.href = 'tel:+66923959969';
}
function contactTel2(){
  window.location.href = 'tel:+66932342457';
}
function contactWhatsApp(propertyTitle){
  const msg = encodeURIComponent(propertyTitle ? `Hi, I'm interested in: ${propertyTitle}` : 'Hi, I have a question about a property on MP Area.');
  window.open(`https://wa.me/66923959969?text=${msg}`, '_blank');
}

// ==========================================================
// MOBILE NAV TOGGLE
// ==========================================================
function toggleMobileNav(){
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('open');
}

// ==========================================================
// URL PARAM HELPERS (for cross-page filter state)
// ==========================================================
function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
function buildQueryString(paramsObj){
  const params = new URLSearchParams();
  Object.entries(paramsObj).forEach(([k,v]) => {
    if (v !== '' && v !== null && v !== undefined) params.set(k, v);
  });
  return params.toString();
}

// ==========================================================
// INIT HOOK — call this from each page's own script after DOM ready
// ==========================================================
function initSharedUI(){
  setLang(currentLang);
}
