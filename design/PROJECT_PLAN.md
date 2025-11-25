# Plán projektu: Košice Cards (MVP - Season 0)

## 1. Úvod a Vízia
Cieľom je vytvoriť mobilnú hru (React Native), ktorá gamifikuje objavovanie pamiatok v Košiciach.
**Hlavná mechanika:** "Check-in" na lokácii -> Odhalenie a získanie zberateľskej karty.
**Sezóny:** Hra bude fungovať v ročných cykloch. MVP začína ako **Season 0** (Pilot). Po skončení sezóny sa kolekcia uzavrie a začína nová tématická sezóna (napr. "Hrady a Zámky", "Príroda").

---

## 2. Technologický Stack
*   **Mobile App:** React Native (Expo framework).
*   **Web:** Žiadna webová aplikácia pre MVP. Iba jednoduchá statická **Promo Landing Page** (HTML/CSS alebo One-page builder) s odkazmi na stiahnutie (App Store/Google Play).
*   **Backend:** Supabase (PostgreSQL + PostGIS pre geolokáciu + Auth + Storage).
*   **Mapy:** React Native Maps (Google/Apple provider).

---

## 3. Herné Mechaniky a Rarity

### A. Base Rarity (Prestíž miesta)
Každá lokácia má vopred definovanú raritu podľa významnosti. Táto farba je nemenná.
1.  **Common (Biela):** Bežné sochy, pamätné tabule.
2.  **Uncommon (Zelená):** Menšie kostoly, historické budovy.
3.  **Rare (Modrá):** Významné múzeá, parky.
4.  **Epic (Fialová):** Dóm sv. Alžbety, Urbanova veža.
5.  **Legendary (Oranžová):** Najikonickejšie dominanty (špeciálne eventy).

### B. Quality Tier (Progres - Vernosť)
Hráč vylepšuje vizuál karty (rám, lesk, textúra) opakovanými návštevami.
*   **Classic:** 1. návšteva (Získanie karty).
*   **Silver:** 5. návšteva.
*   **Gold:** 10. návšteva.
*   **Diamond:** 20. návšteva.
*   *Poznámka:* Aby sa predišlo farmeniu, započíta sa maximálne 1 návšteva danej lokácie za 24 hodín.

### C. Odhaľovanie (Fog of War = OFF)
*   Používateľ vidí na mape **všetky** dostupné karty v meste.
*   Karty sú "uzamknuté" (vidno len polohu a ze je tam karta - teda nie raritu, obrázok a text).
*   **Reveal:** Až po príchode na miesto (< 100m) a úspešnom check-ine sa karta "prideli", ukáže sa fotka a lore.

---

## 4. Fázy Vývoja

### Fáza 1: Dáta a Dizajn (Season 0)
*   [ ] **Výber lokácií:** Vybrať cca 30-50 miest v Košiciach a priradiť im *Base Rarity* (Farbu).
*   [ ] **Grafika kariet:**
    *   Navrhnúť layout karty.
    *   Vytvoriť vizuálne varianty pre *Quality Tiers* (napr. strieborný/zlatý rám).
*   [ ] **Databáza:** Naplniť Supabase súradnicami.

### Fáza 2: Jadro Aplikácie (MVP)
*   [ ] **Mapa:** Zobrazenie pinov všetkých lokácií (rozlíšené farbou rarity).
*   [ ] **Geolokácia:** Logika pre výpočet vzdialenosti a povolenie "Check-in".
*   [ ] **Card Reveal:** Animácia získania karty (Flip animation).
*   [ ] **Collection (Inventár):** Zobrazenie získaných kariet s filtráciou podľa rarity.

### Fáza 3: Progres a Rebríčky
*   [ ] **Upgrade Logika:** Backend musí sledovať `visit_count`. Ak user dosiahne 5/10/20, karta sa vizuálne zmení.
*   [ ] **Global Leaderboard:** Rebríček hráčov zoradený podľa skóre (napr. Common=1b, Legendary=10b, Diamond verzia = násobič).

### Fáza 4: Launch a Marketing
*   [ ] **Promo Page:** Jednoduchá stránka "Coming Soon" -> "Download Now".
*   [ ] **Beta Test:** Testovanie GPS v uličkách Košíc.

---

## 5. Dátový Model (Návrh pre Supabase)

**Table: Locations (Definícia kariet)**
*   `id` (UUID)
*   `name` (String)
*   `description` (Text - skryté do odomknutia)
*   `image_url` (String - skryté do odomknutia)
*   `latitude` (Float)
*   `longitude` (Float)
*   `base_rarity` (Enum: common, uncommon, rare, epic, legendary)
*   `season_id` (Int: 0)

**Table: User_Collections (Vlastnené karty)**
*   `id` (UUID)
*   `user_id` (FK)
*   `location_id` (FK)
*   `quality_tier` (Enum: classic, silver, gold, diamond)
*   `visit_count` (Int: počítadlo návštev)
*   `last_visit_at` (Timestamp: pre cooldown)
*   `obtained_at` (Timestamp)

**Table: Seasons**
*   `id` (Int)
*   `name` (String)
*   `start_date`
*   `end_date`
