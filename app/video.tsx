import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function VideoScreen() {
  const { name, map, side, type, imageUrl, videoUrl } = useLocalSearchParams<{
    name?: string;
    map?: string;
    side?: string;
    type?: string;
    imageUrl?: string;
    videoUrl?: string;
  }>();

  const openVideo = async () => {
    if (!videoUrl) {
      Alert.alert('Vídeo não encontrado', 'Não foi possível abrir o vídeo desta utilitária.');
      return;
    }

    await WebBrowser.openBrowserAsync(videoUrl);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: name ?? 'Vídeo da utilitária' }} />
      <View style={styles.container}>
        {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" /> : null}
        <Text style={styles.title}>{name ?? 'Utilitária selecionada'}</Text>
        <Text style={styles.meta}>
          {map ?? '-'} • {side ?? '-'} • {type ?? '-'}
        </Text>
        <Pressable style={styles.button} onPress={openVideo}>
          <Text style={styles.buttonText}>Assistir vídeo da lineup</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    padding: 16,
    gap: 14,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 14,
  },
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
  },
  meta: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  button: {
    marginTop: 6,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
