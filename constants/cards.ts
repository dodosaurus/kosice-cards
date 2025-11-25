export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type QualityTier = 'classic' | 'silver' | 'gold' | 'diamond';

export interface Card {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  baseRarity: Rarity;
  qualityTier: QualityTier;
  latitude?: number;
  longitude?: number;
}

export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#FFFFFF',
  uncommon: '#4CAF50',
  rare: '#2196F3',
  epic: '#9C27B0',
  legendary: '#FF9800',
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export const QUALITY_TIER_LABELS: Record<QualityTier, string> = {
  classic: 'Classic',
  silver: 'Silver',
  gold: 'Gold',
  diamond: 'Diamond',
};

export const cards: Card[] = [
  {
    id: '1',
    name: 'dom-sv-alzbety',
    title: 'Dóm sv. Alžbety',
    description: 'Gotická katedrála z 14. storočia, jedna z najvýznamnejších pamiatok Košíc. Najväčší kostol na Slovensku s unikátnou architektúrou.',
    imageUrl: require('@/assets/images/dom.jpg'),
    baseRarity: 'epic',
    qualityTier: 'classic',
    latitude: 48.7206,
    longitude: 21.2581,
  },
  {
    id: '2',
    name: 'singing-fountain',
    title: 'Singing Fountain',
    description: 'Fontána na Hlavnej ulici, ktorá hrá hudbu a vytvára spektakulárne vodné predstavenia. Obľúbené miesto stretávania.',
    imageUrl: require('@/assets/images/fontana.jpg'),
    baseRarity: 'uncommon',
    qualityTier: 'classic',
    latitude: 48.7208,
    longitude: 21.2583,
  },
  {
    id: '3',
    name: 'immaculata',
    title: 'Immaculata',
    description: 'Barokový morový stĺp z 18. storočia, ktorý je súčasťou historického centra Košíc. Symbol ochrany mesta.',
    imageUrl: require('@/assets/images/immaculata.jpg'),
    baseRarity: 'rare',
    qualityTier: 'classic',
    latitude: 48.7205,
    longitude: 21.2582,
  },
  {
    id: '4',
    name: 'jakabov-palac',
    title: 'Jakabov palác',
    description: 'Historický palác z konca 19. storočia, ktorý predstavuje významnú architektonickú pamiatku Košíc.',
    imageUrl: require('@/assets/images/jakabov.jpg'),
    baseRarity: 'rare',
    qualityTier: 'classic',
    latitude: 48.7210,
    longitude: 21.2585,
  },
  {
    id: '5',
    name: 'urbanova-veza',
    title: 'Urbanova veža',
    description: 'Gotická veža z 14. storočia, súčasť Dómu sv. Alžbety. Najvyššia veža v Košiciach s nádherným výhľadom na mesto.',
    imageUrl: require('@/assets/images/urbanova.jpg'),
    baseRarity: 'legendary',
    qualityTier: 'classic',
    latitude: 48.7206,
    longitude: 21.2581,
  },
];

