import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const MAPS = ['Dust II', 'Mirage', 'Inferno', 'Overpass', 'Anubis', 'Ancient', 'Nuke'];
const SIDES = ['CT', 'TR'];
const UTILITIES = ['Smoke', 'Flash', 'Molotov'];

const lineupData = {
  'Dust II': {
    CT: {
      Smoke: [
        {
          id: 'd2-ct-smoke-xbox',
          name: 'Smoke Xbox',
          image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&w=900&q=80',
          video: 'https://www.youtube.com/watch?v=a0zEGixjkt0',
        },
        {
          id: 'd2-ct-smoke-long',
          name: 'Smoke Long',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
          video: 'https://www.youtube.com/watch?v=3S6uV8i7-qY',
        },
      ],
      Flash: [
        {
          id: 'd2-ct-flash-retake-b',
          name: 'Flash Retake B',
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
          video: 'https://www.youtube.com/watch?v=OJxFvQd3A2Q',
        },
      ],
      Molotov: [
        {
          id: 'd2-ct-molotov-car',
          name: 'Molotov Car Long',
          image: 'https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=900&q=80',
          video: 'https://www.youtube.com/watch?v=ebJiIGfNKB4',
        },
      ],
    },
    TR: {
      Smoke: [
        {
          id: 'd2-tr-smoke-ct-a',
          name: 'Smoke CT A',
          image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=900&q=80',
          video: 'https://www.youtube.com/watch?v=xE6sY7f3jPk',
        },
      ],
      Flash: [
        {
          id: 'd2-tr-flash-long',
          name: 'Flash Saída Long',
          image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80',
          video: 'https://www.youtube.com/watch?v=3dY5wQ5K7p8',
        },
      ],
      Molotov: [
        {
          id: 'd2-tr-molotov-goose',
          name: 'Molotov Goose',
          image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80',
          video: 'https://www.youtube.com/watch?v=PQ1UmhA2zSE',
        },
      ],
    },
  },
};

const demoLineup = (map, side, utility) => ({
  id: `${map}-${side}-${utility}`,
  name: `${utility} padrão ${side} - ${map}`,
  image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80',
  video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
});

MAPS.forEach((map) => {
  if (!lineupData[map]) {
    lineupData[map] = {
      CT: {
        Smoke: [demoLineup(map, 'CT', 'Smoke')],
        Flash: [demoLineup(map, 'CT', 'Flash')],
        Molotov: [demoLineup(map, 'CT', 'Molotov')],
      },
      TR: {
        Smoke: [demoLineup(map, 'TR', 'Smoke')],
        Flash: [demoLineup(map, 'TR', 'Flash')],
        Molotov: [demoLineup(map, 'TR', 'Molotov')],
      },
    };
  }
});

const OptionGroup = ({ title, options, selected, onSelect, disabled }) => (
  <View style={styles.group}>
    <Text style={styles.groupTitle}>{title}</Text>
    <View style={styles.optionWrap}>
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            disabled={disabled}
            style={[styles.option, isActive && styles.optionActive, disabled && styles.optionDisabled]}
          >
            <Text style={[styles.optionText, isActive && styles.optionTextActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);

export default function App() {
  const [selectedMap, setSelectedMap] = useState('');
  const [selectedSide, setSelectedSide] = useState('');
  const [selectedUtility, setSelectedUtility] = useState('');

  const lineups = useMemo(() => {
    if (!selectedMap || !selectedSide || !selectedUtility) return [];
    return lineupData[selectedMap]?.[selectedSide]?.[selectedUtility] ?? [];
  }, [selectedMap, selectedSide, selectedUtility]);

  const openVideo = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Erro', 'Não foi possível abrir o vídeo.');
      return;
    }
    await Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Smokes CS2 (React Native + Expo)</Text>
        <Text style={styles.subtitle}>
          Escolha mapa, lado e utilitária. Toque na foto da lineup para carregar o vídeo tutorial.
        </Text>

        <OptionGroup
          title="1) Mapa"
          options={MAPS}
          selected={selectedMap}
          onSelect={(map) => {
            setSelectedMap(map);
            setSelectedSide('');
            setSelectedUtility('');
          }}
        />

        <OptionGroup
          title="2) Lado"
          options={SIDES}
          selected={selectedSide}
          disabled={!selectedMap}
          onSelect={(side) => {
            setSelectedSide(side);
            setSelectedUtility('');
          }}
        />

        <OptionGroup
          title="3) Utilitária"
          options={UTILITIES}
          selected={selectedUtility}
          disabled={!selectedSide}
          onSelect={setSelectedUtility}
        />

        <Text style={styles.resultsTitle}>
          {lineups.length
            ? `${lineups.length} posição(ões) para ${selectedUtility} em ${selectedMap} (${selectedSide})`
            : 'Selecione mapa, lado e utilitária para ver as lineups.'}
        </Text>

        <View style={styles.cardsWrap}>
          {lineups.map((lineup) => (
            <Pressable key={lineup.id} style={styles.card} onPress={() => openVideo(lineup.video)}>
              <Image source={{ uri: lineup.image }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{lineup.name}</Text>
                <Text style={styles.cardDescription}>Toque para abrir o vídeo ensinando a utilitária.</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#101820' },
  container: { padding: 16, paddingBottom: 40 },
  title: { color: '#ffffff', fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#b5c2d3', marginTop: 8, marginBottom: 18 },
  group: { marginTop: 10 },
  groupTitle: { color: '#ffffff', fontSize: 17, fontWeight: '700', marginBottom: 8 },
  optionWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    backgroundColor: '#15263a',
    borderWidth: 1,
    borderColor: '#2c425e',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  optionActive: { borderColor: '#5ea2ff', backgroundColor: '#24518a' },
  optionDisabled: { opacity: 0.45 },
  optionText: { color: '#ffffff', fontWeight: '600' },
  optionTextActive: { color: '#dcecff' },
  resultsTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 10 },
  cardsWrap: { gap: 12 },
  card: {
    backgroundColor: '#15263a',
    borderWidth: 1,
    borderColor: '#2a415f',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 180 },
  cardBody: { padding: 10 },
  cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  cardDescription: { color: '#c5d2e1', marginTop: 4 },
});
