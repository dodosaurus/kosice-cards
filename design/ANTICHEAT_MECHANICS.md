# Anti-Cheat Mechaniky (Pre Progress System)

V kontexte "Season 0" a systému vylepšovania kariet (Silver/Gold/Diamond) je anti-cheat kritický, aby si hráči nemohli "nafarmiť" Diamond karty z domu alebo okamžitým spamovaním tlačidla.

## 1. Ochrana progresu (Anti-Grinding)

### A. Časový zámok na lokáciu (Cooldown)
Toto je kľúčové pre systém "20 návštev pre Diamond".
*   **Pravidlo:** Návšteva sa započíta do `visit_count` len vtedy, ak od poslednej započítanej návštevy na **tej istej lokácii** ubehlo minimálne **12 hodín** (alebo reset o polnoci).
*   **Implementácia:**
    *   User príde k Dómu sv. Alžbety. Check-in. (+1 count).
    *   User tam stojí ďalších 10 minút a skúsi Check-in znova.
    *   **Odpoveď appky:** "Túto pamiatku si dnes už navštívil. Vráť sa zajtra pre ďalší bod k Silver verzii!"

### B. Speed Check (Teleportácia)
Stále platí pravidlo kontroly fyzickej rýchlosti medzi dvoma rôznymi check-inmi.
*   Ak user checkne Dóm sv. Alžbety (Košice) a o 5 minút checkne Spišský Hrad.
*   **Akcia:** Soft-ban na 30 minút.

## 2. Validácia Polohy (Technická)

### A. Presnosť GPS (Accuracy Filter)
*   Pri check-ine posiela telefón aj parameter `accuracy` (presnosť v metroch).
*   Ak je presnosť príliš nízka (napr. > 100m), check-in zamietneme s hláškou "Slabý GPS signál, spresni svoju polohu". To sťažuje jednoduché spoofing nástroje, ktoré niekedy reportujú fixnú alebo zlú presnosť.

### B. Detekcia Mock Location (Android)
*   Aplikácia pri štarte a pri check-ine skontroluje `isMockLocationPresent()` (developer nastavenie v Androide, ktore sa da zneuzit na cheating)
*   Ak je `true`, tlačidlo "Získať kartu" bude zablokované.

## 3. Server-Side Authority
*   Všetka logika (započítanie návštevy, upgrade rarity, pridelenie bodov do rebríčka) beží na **Serveri**.
*   Mobilná appka len posiela "Som na súradniciach X,Y".
*   Appka **nikdy** neposiela príkaz "Daj mi Diamond kartu". Server sám rozhodne, či má user nárok na upgrade na základe histórie v databáze.

## 4. Reset Sezóny
*   Aby sa predišlo trvalej dominancii starých hráčov, rebríčky a zberateľský progres sa po roku resetujú (alebo archivujú do "Legacy" albumu).
*   Season 0 slúži na doladenie týchto anti-cheat parametrov v praxi.
