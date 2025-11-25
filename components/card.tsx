import { StyleSheet, View, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolation 
} from 'react-native-reanimated';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Card as CardType, RARITY_COLORS, RARITY_LABELS, QUALITY_TIER_LABELS } from '@/constants/cards';

interface CardProps {
  card: CardType;
}

export function Card({ card }: CardProps) {
  const rarityColor = RARITY_COLORS[card.baseRarity];
  const rarityLabel = RARITY_LABELS[card.baseRarity];
  const qualityLabel = QUALITY_TIER_LABELS[card.qualityTier];

  // Shared values for 3D tilt
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  
  // Shared value for flip
  const flipRotation = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      rotateX.value = withSpring(interpolate(event.y, [0, 300], [10, -10], Extrapolation.CLAMP));
      rotateY.value = withSpring(interpolate(event.x, [0, 300], [-10, 10], Extrapolation.CLAMP));
    })
    .onUpdate((event) => {
      rotateX.value = interpolate(event.y, [0, 400], [10, -10], Extrapolation.CLAMP);
      rotateY.value = interpolate(event.x, [0, 350], [-10, 10], Extrapolation.CLAMP);
    })
    .onFinalize(() => {
      rotateX.value = withSpring(0);
      rotateY.value = withSpring(0);
    });

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      // Toggle between 0 and 180
      flipRotation.value = withTiming(flipRotation.value === 0 ? 180 : 0, { duration: 500 });
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  // Tilt transform applied to the container
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  // Front face rotation
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${flipRotation.value}deg` }
      ],
      opacity: interpolate(flipRotation.value, [89, 91], [1, 0]),
      zIndex: flipRotation.value < 90 ? 1 : 0,
    };
  });

  // Back face rotation (starts at 180)
  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${flipRotation.value + 180}deg` }
      ],
      opacity: interpolate(flipRotation.value, [89, 91], [0, 1]),
      zIndex: flipRotation.value > 90 ? 1 : 0,
    };
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.wrapper, containerStyle]}>
        {/* Front Face */}
        <Animated.View style={[styles.cardFace, styles.frontFace, frontAnimatedStyle, { shadowColor: rarityColor }]}>
          <ThemedView style={[styles.cardContent, { borderColor: rarityColor }]}>
            
            {/* Full Size Image */}
            <Image source={card.imageUrl} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
            
            {/* Gradient Overlay for Text Readability */}
            <LinearGradient
              colors={['transparent', 'transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
              locations={[0, 0.4, 0.7, 1]}
              style={StyleSheet.absoluteFill}
            />

            {/* Top Badges */}
            <View style={styles.topBar}>
              <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
                <ThemedText style={styles.rarityText}>{rarityLabel}</ThemedText>
              </View>
            </View>

            {/* Bottom Content */}
            <View style={styles.content}>
              <View style={styles.headerRow}>
                <ThemedText type="subtitle" style={[styles.title, { color: '#FFFFFF' }]}>
                  {card.title}
                </ThemedText>
                <View style={[styles.qualityBadge, { borderColor: rarityColor, backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                  <ThemedText style={[styles.qualityText, { color: rarityColor }]}>{qualityLabel}</ThemedText>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: rarityColor }]} />

              <ThemedText style={[styles.description, { color: '#E0E0E0' }]} numberOfLines={3}>
                {card.description}
              </ThemedText>
            </View>
          </ThemedView>
        </Animated.View>

        {/* Back Face */}
        <Animated.View style={[styles.cardFace, styles.backFace, backAnimatedStyle, { shadowColor: rarityColor }]}>
          <ThemedView style={[styles.cardContent, styles.backContent, { borderColor: rarityColor }]}>
            <View style={[styles.backInnerBorder, { borderColor: rarityColor }]}>
              <ThemedText type="title" style={[styles.backTitle, { color: rarityColor }]}>KOŠICE</ThemedText>
              <ThemedText style={styles.backSubtitle}>COLLECTIBLE CARDS</ThemedText>
              <Image 
                source={require('@/assets/react-logo.png')} 
                style={[styles.backLogo, { tintColor: rarityColor }]} 
                contentFit="contain"
              />
            </View>
          </ThemedView>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
    marginHorizontal: 4,
    height: 450, 
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  frontFace: {},
  backFace: {},
  cardContent: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    backgroundColor: '#000', // Dark bg behind image
    justifyContent: 'flex-end', // Push content to bottom
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    zIndex: 10,
  },
  rarityBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  rarityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    marginRight: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  qualityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  qualityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  divider: {
    height: 2,
    width: 40,
    marginBottom: 12,
    borderRadius: 1,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Back styles
  backContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  backInnerBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
  },
  backSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    opacity: 0.6,
    marginTop: 8,
    marginBottom: 40,
  },
  backLogo: {
    width: 80,
    height: 80,
    opacity: 0.8,
  },
});
