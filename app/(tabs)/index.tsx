import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Side = 'CT' | 'TR';
type UtilityType = 'Smoke' | 'Flash' | 'Molotov';

type UtilityLineup = {
  id: string;
  map: string;
  side: Side;
  type: UtilityType;
  name: string;
  imageUrl: string;
  videoUrl: string;
};

const MAPS = ['Dust II', 'Mirage', 'Inferno', 'Overpass', 'Anubis', 'Ancient', 'Nuke'] as const;
const SIDES: Side[] = ['CT', 'TR'];
const UTIL_TYPES: UtilityType[] = ['Smoke', 'Flash', 'Molotov'];

const LINEUPS: UtilityLineup[] = [
  {
    id: 'mirage-ct-smoke-a-ramp',
    map: 'Mirage',
    side: 'CT',
    type: 'Smoke',
    name: 'Smoke A Ramp (retake)',
    imageUrl: 'https://dummyimage.com/900x600/1f2937/ffffff&text=Mirage+CT+Smoke+A+Ramp',
    videoUrl: 'https://www.youtube.com/watch?v=2EMM4nM7Q8Q',
  },
  {
    id: 'mirage-ct-smoke-palace',
    map: 'Mirage',
    side: 'CT',
    type: 'Smoke',
    name: 'Smoke Palace (retake)',
    imageUrl: 'https://dummyimage.com/900x600/1f2937/ffffff&text=Mirage+CT+Smoke+Palace',
    videoUrl: 'https://www.youtube.com/watch?v=VK0tNANB8cE',
  },
  {
    id: 'mirage-tr-flash-a-exec',
    map: 'Mirage',
    side: 'TR',
    type: 'Flash',
    name: 'Flash A Execute',
    imageUrl: 'https://dummyimage.com/900x600/0f766e/ffffff&text=Mirage+TR+Flash+A+Exec',
    videoUrl: 'https://www.youtube.com/watch?v=fF04NQFF39U',
  },
  {
    id: 'dust2-tr-smoke-xbox',
    map: 'Dust II',
    side: 'TR',
    type: 'Smoke',
    name: 'Smoke Xbox (mid control)',
    imageUrl: 'https://dummyimage.com/900x600/0f172a/ffffff&text=Dust+II+TR+Smoke+Xbox',
    videoUrl: 'https://www.youtube.com/watch?v=HfwwWf5rRpk',
  },
  {
    id: 'inferno-ct-molotov-banana',
    map: 'Inferno',
    side: 'CT',
    type: 'Molotov',
    name: 'Molotov Banana (delay rush)',
    imageUrl: 'https://dummyimage.com/900x600/7f1d1d/ffffff&text=Inferno+CT+Molotov+Banana',
    videoUrl: 'https://www.youtube.com/watch?v=QdiDaPr1y78',
  },
  {
    id: 'nuke-tr-smoke-outside',
    map: 'Nuke',
    side: 'TR',
    type: 'Smoke',
    name: 'Outside Smokes',
    imageUrl: 'https://dummyimage.com/900x600/1e3a8a/ffffff&text=Nuke+TR+Outside+Smokes',
    videoUrl: 'https://www.youtube.com/watch?v=3GPl1xNCRwM',
  },
];

export default function HomeScreen() {
  const [selectedMap, setSelectedMap] = useState<string | null>(null);
  const [selectedSide, setSelectedSide] = useState<Side | null>(null);
  const [selectedType, setSelectedType] = useState<UtilityType | null>(null);

  const filteredLineups = useMemo(() => {
    if (!selectedMap || !selectedSide || !selectedType) {
      return [];
    }

    return LINEUPS.filter(
      (lineup) =>
        lineup.map === selectedMap && lineup.side === selectedSide && lineup.type === selectedType,
    );
  }, [selectedMap, selectedSide, selectedType]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Smokes CS2</Text>
        <Text style={styles.subtitle}>Escolha mapa, lado e utilitário para ver lineups e vídeo.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1) Escolha o mapa</Text>
          <View style={styles.chipsContainer}>
            {MAPS.map((mapName) => (
              <Pressable
                key={mapName}
                style={[styles.chip, selectedMap === mapName && styles.chipSelected]}
                onPress={() => {
                  setSelectedMap(mapName);
                  setSelectedSide(null);
                  setSelectedType(null);
                }}>
                <Text style={[styles.chipText, selectedMap === mapName && styles.chipTextSelected]}>
                  {mapName}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {selectedMap && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2) Escolha o lado</Text>
            <View style={styles.chipsContainer}>
              {SIDES.map((side) => (
                <Pressable
                  key={side}
                  style={[styles.chip, selectedSide === side && styles.chipSelected]}
                  onPress={() => {
                    setSelectedSide(side);
                    setSelectedType(null);
                  }}>
                  <Text style={[styles.chipText, selectedSide === side && styles.chipTextSelected]}>
                    {side}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {selectedMap && selectedSide && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3) Escolha o utilitário</Text>
            <View style={styles.chipsContainer}>
              {UTIL_TYPES.map((utilType) => (
                <Pressable
                  key={utilType}
                  style={[styles.chip, selectedType === utilType && styles.chipSelected]}
                  onPress={() => setSelectedType(utilType)}>
                  <Text style={[styles.chipText, selectedType === utilType && styles.chipTextSelected]}>
                    {utilType}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {selectedMap && selectedSide && selectedType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4) Escolha uma lineup</Text>
            {filteredLineups.length === 0 ? (
              <Text style={styles.emptyState}>
                Ainda não há lineups cadastradas para essa combinação.
              </Text>
            ) : (
              filteredLineups.map((lineup) => (
                <Pressable
                  key={lineup.id}
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: '/video',
                      params: {
                        name: lineup.name,
                        map: lineup.map,
                        side: lineup.side,
                        type: lineup.type,
                        imageUrl: lineup.imageUrl,
                        videoUrl: lineup.videoUrl,
                      },
                    })
                  }>
                  <Image source={{ uri: lineup.imageUrl }} style={styles.cardImage} contentFit="cover" />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{lineup.name}</Text>
                    <Text style={styles.cardMeta}>
                      {lineup.map} • {lineup.side} • {lineup.type}
                    </Text>
                    <Text style={styles.cardAction}>Toque para abrir o vídeo</Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1220',
  },
  container: {
    padding: 16,
    paddingBottom: 28,
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#f8fafc',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 15,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontSize: 17,
    fontWeight: '700',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#111827',
  },
  chipSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#3b82f6',
  },
  chipText: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  emptyState: {
    color: '#94a3b8',
  },
  card: {
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#111827',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 12,
    gap: 4,
  },
  cardTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 16,
  },
  cardMeta: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  cardAction: {
    color: '#60a5fa',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '600',
  },
});
