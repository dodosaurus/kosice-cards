Tak ako asi je aj uvedene v design dokumente - rozhodnutie ci pridelime kartu a parent DB kto vlastni aku kartu bude vedene na serveri. Klient bude mat nejaku zacachovanu verziu - ale aby ziskal kartu, bude treba aby sa pripojil na monilne data. Location access je samozrejmostou.

Co bude na serveri? Server by bolo najlepsie bezat cez Express JS lebo ten poznam. Ako DB pouzit Supabase (tu tiez poznam) - ako ale pisem, bolo by fajn zabezpecit aj to aby appka na mobile bola schopna fungovat aj offline. User by mal offline vediet: pozriet si karty ktore vlastni, kolko navstev ma na akej karte, leaderboard na akom mieste sa nachadza globalne. Ked je offline nebude vediet acquirnut kartu, ani mapa by sa mu nemala vediet dat zapnut - musi mat proste internet + locatiion.

Rozmyslam aj nad konceptom nejakych skupin kariet - sub-kolekcii/skupin kariet - napr. skupiny mozu byt "Hlavna", "Furca", "KVP", "Pubs", "Doprava", "Priroda" a pod., mozno nieco stavnatejsie, nemusi to byt take suche. Za nazbieranie vsetkych kariet zo sekcie by user mohol dostat nejaky benefit, mozno nejaku speci kartu navyse (to by mohli byt legendarky napr. len).

Treba rozmysalt aj nad tym ako to budeme testovat - aby sme nemuseli furt vybehovat vonku - ale zas aby sme nenarusovali anticheat system. Hlavne testy ale samozrejme prevedieme v terene.

Appka pouziva dost take osuchane napady - mozno by bolo fajn nejak zakomponovat nieco nove, co este nie je - ale to mozno pride casom. Napada ma AI, ale nechcem aby to bol "slop", nanutene, chcem aby to pekne a prirodzene zapadlo do konceptu hry.

V buducnosti by sme mohli zakomponovat nejaky MP aspekt - ak si dvaja kamosi acquirnu kartu v rozsahu hodiny napr. ziskaju nejaky specialny element v hre.

Bolo by fajn mozno skusit ziskat nejaky grant, podporu mesta napr. - ale najprv, treba ma pouzitelny koncept, ktory dostatocne otestuje viacero testerov.

Mozno by som mohol vziat kostoly, ktore ocko zbiera a spravit mozno kolekciu kostolov.

