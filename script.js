// ==========================================================
// PROPERTY DATA
// property #1 is REAL data + real photos you supplied.
// properties #2-6 are SAMPLE / placeholder data so the site
// has a realistic grid while you gather the rest.
// Replace the "sample" ones by editing this array — each
// property needs: id, title, titleEn, location, price, beds,
// baths, type, sqm, images[], tour (rooms[] with panoramic
// images once you shoot them with a 360 camera), amenities[].
// ==========================================================

const PROPERTIES = [
  {
    id: 1,
    real: true,
    title: "บ้านเดี่ยว 2 ชั้น หมู่บ้านมิตรเกษียน",
    titleEn: "2-Storey Detached House, Mit Kasian Village",
    location: "บางละมุง, ชลบุรี",
    locationEn: "Bang Lamung, Chonburi",
    address: "127/105",
    price: 25000,
    type: "house",
    beds: 3,
    baths: 2,
    sqm: 145,
    images: [
      IMG.EXT, IMG.LIV, IMG.KIT1, IMG.KIT2, IMG.BED, IMG.YARD
    ],
    cover: IMG.EXT,
    tour: {
      available: false, // set true once you upload real 360° equirectangular photos
      rooms: [
        { name: "ห้องนั่งเล่น", nameEn: "Living Room", pano: null },
        { name: "ห้องครัว", nameEn: "Kitchen", pano: null },
        { name: "ห้องนอนใหญ่", nameEn: "Master Bedroom", pano: null },
        { name: "สวนหลังบ้าน", nameEn: "Backyard", pano: null }
      ]
    },
    amenities: ["air-con", "kitchen", "parking", "garden", "security", "furnished"],
    descriptionTh: "บ้านเดี่ยว 2 ชั้น สร้างใหม่ สไตล์โมเดิร์น ในหมู่บ้านมิตรเกษียน ใกล้แหล่งชุมชน เดินทางสะดวก ห้องครัวกระเบื้องซับเวย์สีขาว เคาน์เตอร์หินแกรนิตสีดำ พร้อมเตาแก๊สและเครื่องดูดควัน มีพื้นที่สวนด้านข้างและลานหลังบ้าน เหมาะกับครอบครัวหรือผู้เช่าระยะยาว",
    descriptionEn: "A newly built, modern 2-storey detached house in Mit Kasian Village, close to local amenities and well connected. The kitchen features white subway tile with black granite countertops, gas hob and range hood. Includes a side garden and a covered rear patio. Ideal for families or long-term tenants."
  },

  // ---- Sample placeholder properties (replace with real data later) ----
  { id:2, real:false, title:"คอนโดวิวทะเล พัทยา", titleEn:"Sea View Condo, Pattaya", location:"พัทยา, ชลบุรี", locationEn:"Pattaya, Chonburi", price:18000, type:"condo", beds:1, baths:1, sqm:38, images:["https://placehold.co/800x600/2B3540/FAF7F1?text=Pattaya+Condo"], cover:"https://placehold.co/800x600/2B3540/FAF7F1?text=Pattaya+Condo", tour:{available:false,rooms:[]}, amenities:["air-con","pool","gym","security"], descriptionTh:"ข้อมูลตัวอย่าง รอข้อมูลจริง", descriptionEn:"Sample placeholder — awaiting real data" },
  { id:3, real:false, title:"ทาวน์โฮม 2 ชั้น ศรีราชา", titleEn:"2-Storey Townhome, Sriracha", location:"ศรีราชา, ชลบุรี", locationEn:"Sriracha, Chonburi", price:15000, type:"townhouse", beds:2, baths:2, sqm:90, images:["https://placehold.co/800x600/6E8463/FAF7F1?text=Sriracha+Townhome"], cover:"https://placehold.co/800x600/6E8463/FAF7F1?text=Sriracha+Townhome", tour:{available:false,rooms:[]}, amenities:["air-con","parking","security"], descriptionTh:"ข้อมูลตัวอย่าง รอข้อมูลจริง", descriptionEn:"Sample placeholder — awaiting real data" },
  { id:4, real:false, title:"คอนโดใกล้นิคมอมตะ", titleEn:"Condo near Amata Industrial Estate", location:"บ้านบึง, ชลบุรี", locationEn:"Ban Bueng, Chonburi", price:9500, type:"condo", beds:1, baths:1, sqm:32, images:["https://placehold.co/800x600/B0833D/FAF7F1?text=Amata+Condo"], cover:"https://placehold.co/800x600/B0833D/FAF7F1?text=Amata+Condo", tour:{available:false,rooms:[]}, amenities:["air-con","parking"], descriptionTh:"ข้อมูลตัวอย่าง รอข้อมูลจริง", descriptionEn:"Sample placeholder — awaiting real data" },
  { id:5, real:false, title:"บ้านเดี่ยวสวนใหญ่ บางแสน", titleEn:"Detached House with Garden, Bang Saen", location:"บางแสน, ชลบุรี", locationEn:"Bang Saen, Chonburi", price:32000, type:"house", beds:4, baths:3, sqm:220, images:["https://placehold.co/800x600/4B5663/FAF7F1?text=Bang+Saen+House"], cover:"https://placehold.co/800x600/4B5663/FAF7F1?text=Bang+Saen+House", tour:{available:false,rooms:[]}, amenities:["air-con","kitchen","parking","garden","security","furnished"], descriptionTh:"ข้อมูลตัวอย่าง รอข้อมูลจริง", descriptionEn:"Sample placeholder — awaiting real data" },
  { id:6, real:false, title:"คอนโดสตูดิโอ จอมเทียน", titleEn:"Studio Condo, Jomtien", location:"จอมเทียน, ชลบุรี", locationEn:"Jomtien, Chonburi", price:12000, type:"condo", beds:1, baths:1, sqm:28, images:["https://placehold.co/800x600/CFA45F/26303A?text=Jomtien+Studio"], cover:"https://placehold.co/800x600/CFA45F/26303A?text=Jomtien+Studio", tour:{available:false,rooms:[]}, amenities:["air-con","pool","security"], descriptionTh:"ข้อมูลตัวอย่าง รอข้อมูลจริง", descriptionEn:"Sample placeholder — awaiting real data" }
];

const AMENITY_META = {
  "air-con": { th:"แอร์", en:"Air conditioning", icon:"❄️" },
  "kitchen": { th:"ห้องครัว", en:"Kitchen", icon:"🍳" },
  "parking": { th:"ที่จอดรถ", en:"Parking", icon:"🚗" },
  "garden":  { th:"สวน", en:"Garden", icon:"🌿" },
  "security":{ th:"รักษาความปลอดภัย", en:"Security", icon:"🔒" },
  "furnished":{ th:"เฟอร์นิเจอร์ครบ", en:"Furnished", icon:"🛋️" },
  "pool":    { th:"สระว่ายน้ำ", en:"Swimming pool", icon:"🏊" },
  "gym":     { th:"ฟิตเนส", en:"Gym", icon:"🏋️" }
};

const TYPE_LABELS = {
  house: { th:"บ้านเดี่ยว", en:"House" },
  condo: { th:"คอนโด", en:"Condo" },
  townhouse: { th:"ทาวน์โฮม", en:"Townhouse" }
};

// ==========================================================
// STATE
// ==========================================================
let currentLang = "th";
let currentFilter = { location:"", type:"", price:"", beds:"" };

// ==========================================================
// LANG SWITCH
// ==========================================================
function setLang(lang){
  currentLang = lang;
  document.querySelectorAll('.lang-toggle button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-lang]').forEach(el=>{
    const active = el.dataset.lang === lang;
    el.classList.toggle('lang-active', active);
    // inline fallback in case stylesheet fails to load
    el.style.display = active ? '' : 'none';
  });
  document.documentElement.lang = lang;
  renderGrid();
}

// ==========================================================
// RENDER: LISTING GRID
// ==========================================================
function formatPrice(p){
  return p.toLocaleString('en-US');
}

function matchesFilter(p){
  if (currentFilter.location && !( (p.locationEn+p.location).toLowerCase().includes(currentFilter.location.toLowerCase()) )) return false;
  if (currentFilter.type && p.type !== currentFilter.type) return false;
  if (currentFilter.beds && p.beds < parseInt(currentFilter.beds)) return false;
  if (currentFilter.price){
    const [min,max] = currentFilter.price.split('-').map(Number);
    if (p.price < min || (max && p.price > max)) return false;
  }
  return true;
}

function renderGrid(){
  const grid = document.getElementById('listingGrid');
  const filtered = PROPERTIES.filter(matchesFilter);
  document.getElementById('resultCount').textContent = currentLang === 'th'
    ? `พบ ${filtered.length} รายการ`
    : `${filtered.length} properties found`;

  grid.innerHTML = filtered.map(p => {
    const title = currentLang === 'th' ? p.title : p.titleEn;
    const loc = currentLang === 'th' ? p.location : p.locationEn;
    const hasTour = p.tour && p.tour.available;
    return `
    <div class="card" onclick="openDetail(${p.id})">
      <div class="card-img">
        <img src="${p.cover}" alt="${title}" loading="lazy">
        <span class="card-tag ${hasTour ? 'tour' : ''}">
          ${hasTour ? (currentLang==='th'?'🧭 เดินดูได้':'🧭 Walkthrough') : (currentLang==='th'?'รูปภาพ':'Photos')}
        </span>
        <span class="card-price-tag">฿${formatPrice(p.price)}${currentLang==='th'?'/เดือน':'/mo'}</span>
        ${!p.real ? `<span class="placeholder-badge" style="position:absolute;top:12px;right:12px;">${currentLang==='th'?'ตัวอย่าง':'sample'}</span>` : ''}
      </div>
      <div class="card-body">
        <h3>${title}</h3>
        <div class="card-loc">📍 ${loc}</div>
        <div class="card-specs">
          <span>🛏️ ${p.beds} ${currentLang==='th'?'ห้องนอน':'bed'}</span>
          <span>🛁 ${p.baths} ${currentLang==='th'?'ห้องน้ำ':'bath'}</span>
          <span>📐 ${p.sqm} ตร.ม.</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ==========================================================
// SEARCH
// ==========================================================
function applySearch(){
  currentFilter.location = document.getElementById('fLocation').value;
  currentFilter.type = document.getElementById('fType').value;
  currentFilter.price = document.getElementById('fPrice').value;
  currentFilter.beds = document.getElementById('fBeds').value;
  renderGrid();
  document.getElementById('listings').scrollIntoView({behavior:'smooth'});
}

// ==========================================================
// DETAIL VIEW
// ==========================================================
let panoramaViewer = null;
let activeRoomIndex = 0;

function openDetail(id){
  const p = PROPERTIES.find(x => x.id === id);
  if (!p) return;
  window._currentProperty = p;

  document.getElementById('listView').style.display = 'none';
  const dv = document.getElementById('detailView');
  dv.classList.add('active');
  window.scrollTo({top:0,behavior:'instant'});

  const title = currentLang === 'th' ? p.title : p.titleEn;
  const loc = currentLang === 'th' ? p.location : p.locationEn;
  const desc = currentLang === 'th' ? p.descriptionTh : p.descriptionEn;
  const typeLabel = TYPE_LABELS[p.type] ? TYPE_LABELS[p.type][currentLang] : p.type;

  document.getElementById('detailTitle').textContent = title;
  document.getElementById('detailLoc').textContent = `📍 ${loc}${p.address ? ' · '+p.address : ''}`;
  document.getElementById('detailPriceAmt').textContent = `฿${formatPrice(p.price)}`;
  document.getElementById('detailPricePer').textContent = currentLang==='th' ? 'ต่อเดือน' : 'per month';
  document.getElementById('detailDesc').textContent = desc;

  document.getElementById('detailSpecs').innerHTML = `
    <div class="spec-chip">🏠 ${typeLabel}</div>
    <div class="spec-chip">🛏️ ${p.beds} ${currentLang==='th'?'ห้องนอน':'Bedrooms'}</div>
    <div class="spec-chip">🛁 ${p.baths} ${currentLang==='th'?'ห้องน้ำ':'Bathrooms'}</div>
    <div class="spec-chip">📐 ${p.sqm} ${currentLang==='th'?'ตร.ม.':'sqm'}</div>
  `;

  document.getElementById('amenityGrid').innerHTML = p.amenities.map(a => {
    const meta = AMENITY_META[a];
    return `<div class="amenity">${meta.icon} ${meta[currentLang]}</div>`;
  }).join('');

  // gallery
  document.getElementById('galleryGrid').innerHTML = p.images.map(img =>
    `<img src="${img}" onclick="openLightbox('${img}')" loading="lazy">`
  ).join('');

  // tour setup
  setupTourTab(p);

  // default to gallery tab if no tour, else tour tab
  switchMediaTab(p.tour && p.tour.available ? 'tour' : 'gallery');
}

function closeDetail(){
  document.getElementById('detailView').classList.remove('active');
  document.getElementById('listView').style.display = 'block';
  if (panoramaViewer) { panoramaViewer.destroy(); panoramaViewer = null; }
  window.scrollTo({top:0,behavior:'instant'});
}

function switchMediaTab(tab){
  document.querySelectorAll('.media-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('tourStage').style.display = tab === 'tour' ? 'block' : 'none';
  document.getElementById('galleryStage').style.display = tab === 'gallery' ? 'block' : 'none';
  if (tab === 'tour') initPanorama();
}

function setupTourTab(p){
  const hasTour = p.tour && p.tour.available && p.tour.rooms.some(r => r.pano);
  const pills = document.getElementById('roomPills');

  if (!hasTour){
    pills.innerHTML = '';
    document.getElementById('panorama').innerHTML = '';
    document.getElementById('tourEmptyState').style.display = 'flex';
    return;
  }
  document.getElementById('tourEmptyState').style.display = 'none';

  pills.innerHTML = p.tour.rooms.map((r,i) => `
    <button class="room-pill ${i===0?'active':''}" onclick="selectRoom(${i})">
      ${currentLang==='th' ? r.name : r.nameEn}
    </button>
  `).join('');
  activeRoomIndex = 0;
}

function selectRoom(i){
  activeRoomIndex = i;
  document.querySelectorAll('.room-pill').forEach((el,idx) => el.classList.toggle('active', idx===i));
  initPanorama();
}

function initPanorama(){
  const p = window._currentProperty;
  if (!p || !p.tour || !p.tour.available) return;
  const room = p.tour.rooms[activeRoomIndex];
  if (!room || !room.pano) return;

  if (panoramaViewer) { panoramaViewer.destroy(); panoramaViewer = null; }
  panoramaViewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: room.pano,
    autoLoad: true,
    compass: false
  });
}

// ==========================================================
// LIGHTBOX
// ==========================================================
function openLightbox(src){
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('active');
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('active');
}

// ==========================================================
// CONTACT
// ==========================================================
function contactLine(){
  window.open('https://line.me/ti/p/~Khate095', '_blank');
}
function contactTel(){
  window.location.href = 'tel:+66923959969';
}
function contactWhatsApp(){
  const p = window._currentProperty;
  const title = p ? (currentLang==='th'?p.title:p.titleEn) : '';
  const msg = encodeURIComponent(`Hi, I'm interested in: ${title}`);
  window.open(`https://wa.me/66923959969?text=${msg}`, '_blank');
}

// ==========================================================
// INIT
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  setLang('th');
});
