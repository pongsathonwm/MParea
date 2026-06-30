// ==========================================================
// MP AREA — DATA LAYER
// Fetches property data from a published Google Sheet (CSV).
// Caches the result in localStorage for 6 hours; refreshes
// automatically after that, or instantly via refreshData().
// ==========================================================

// ---- CONFIGURE THIS ----
// Replace with your published Google Sheet CSV URL.
// (File → Share → Publish to web → choose the sheet tab → CSV → Publish, then copy the link here)
const SHEET_CSV_URL = "REPLACE_WITH_YOUR_PUBLISHED_SHEET_CSV_URL";

const CACHE_KEY = "mp_area_properties_cache_v1";
const CACHE_TIMESTAMP_KEY = "mp_area_properties_cache_time_v1";
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours

// ==========================================================
// GOOGLE DRIVE LINK CONVERTER
// Converts a normal Drive "share" link into one that can be
// embedded directly as an <img src="">.
// ==========================================================
function convertDriveLink(url){
  if (!url) return "";
  url = url.trim();
  if (!url) return "";
  // already a direct/usercontent link — leave it alone
  if (url.includes("uc?export=view") || url.includes("googleusercontent.com")) return url;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url; // not a recognizable Drive link — return as-is (could be any external image URL)
}

// ==========================================================
// CSV PARSING (handles quoted fields with commas/newlines)
// ==========================================================
function parseCSV(text){
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++){
    const c = text[i];
    if (inQuotes){
      if (c === '"'){
        if (text[i+1] === '"'){ field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else {
      if (c === '"'){ inQuotes = true; }
      else if (c === ','){ row.push(field); field = ""; }
      else if (c === '\n'){ row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === '\r'){ /* skip */ }
      else { field += c; }
    }
  }
  if (field.length || row.length){ row.push(field); rows.push(row); }

  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1)
    .filter(r => r.length > 1 || (r.length === 1 && r[0].trim() !== ""))
    .map(r => {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = (r[idx] !== undefined ? r[idx].trim() : ""); });
      return obj;
    });
}

// ==========================================================
// TRANSFORM RAW SHEET ROWS INTO THE PROPERTY OBJECT SHAPE
// THE SITE'S RENDER FUNCTIONS EXPECT
// ==========================================================
function transformRow(row){
  const images = [];
  for (let i = 1; i <= 6; i++){
    const raw = row[`image_${i}`];
    if (raw) images.push(convertDriveLink(raw));
  }
  const cover = row.cover_image ? convertDriveLink(row.cover_image) : (images[0] || "");

  const amenities = (row.amenities || "")
    .split(",")
    .map(a => a.trim())
    .filter(Boolean);

  const tourRooms = [];
  for (let i = 1; i <= 3; i++){
    const img = row[`tour_room${i}_image`];
    if (img){
      tourRooms.push({
        name: row[`tour_room${i}_name_th`] || `ห้อง ${i}`,
        nameEn: row[`tour_room${i}_name_en`] || `Room ${i}`,
        nameCn: row[`tour_room${i}_name_cn`] || `房间 ${i}`,
        pano: convertDriveLink(img)
      });
    }
  }

  return {
    id: parseInt(row.id, 10) || 0,
    listingType: (row.listing_type || "rent").toLowerCase(), // 'rent' | 'sale'
    real: true,
    title: row.title_th || "",
    titleEn: row.title_en || "",
    titleCn: row.title_cn || "",
    location: row.location_th || "",
    locationEn: row.location_en || "",
    locationCn: row.location_cn || "",
    address: row.address || "",
    price: parseFloat(row.price) || 0,
    type: row.property_type || "house",
    beds: parseInt(row.beds, 10) || 0,
    baths: parseInt(row.baths, 10) || 0,
    sqm: parseFloat(row.sqm) || 0,
    landSqm: parseFloat(row.land_sqm) || 0,
    lat: parseFloat(row.lat) || null,
    lng: parseFloat(row.lng) || null,
    amenities,
    descriptionTh: row.description_th || "",
    descriptionEn: row.description_en || "",
    descriptionCn: row.description_cn || "",
    cover: cover || "https://placehold.co/800x600/2B3540/FAF7F1?text=No+Image",
    images: images.length ? images : [cover || "https://placehold.co/800x600/2B3540/FAF7F1?text=No+Image"],
    tour: { available: tourRooms.length > 0, rooms: tourRooms },
    isHotDeal: (row.is_hot_deal || "").toLowerCase() === "yes",
    status: row.status || "available",
    dateListed: row.date_listed || ""
  };
}

// ==========================================================
// PUBLIC API
// ==========================================================

// returns a Promise<Array<Property>>
async function loadProperties(forceRefresh){
  if (!forceRefresh){
    const cached = readCache();
    if (cached) return cached;
  }
  return fetchAndCache();
}

function readCache(){
  try {
    const ts = parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY), 10);
    if (!ts) return null;
    const age = Date.now() - ts;
    if (age > CACHE_DURATION_MS) return null; // stale — caller should refetch
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e){
    console.warn("MP Area: cache read failed", e);
    return null;
  }
}

async function fetchAndCache(){
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Sheet fetch failed: " + res.status);
    const text = await res.text();
    const rows = parseCSV(text);
    const properties = rows.map(transformRow).filter(p => p.id);

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(properties));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
    } catch (e){
      console.warn("MP Area: cache write failed (localStorage full or disabled)", e);
    }
    return properties;
  } catch (e){
    console.error("MP Area: failed to load property sheet", e);
    // fall back to whatever is cached, even if stale, rather than showing nothing
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e2) { /* ignore */ }
    return [];
  }
}

// Forces an immediate re-fetch, bypassing the 6-hour cache.
// Wire this up to a "refresh now" button in the admin/manual flow.
async function refreshData(){
  return fetchAndCache();
}

// exposes a human-readable "data as of" timestamp for display in the UI if desired
function getCacheAge(){
  const ts = parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY), 10);
  if (!ts) return null;
  return new Date(ts);
}
