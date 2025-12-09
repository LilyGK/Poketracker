/**
 * Main App entry point
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useStore } from './src/store';
import { RewardModal } from './src/components/RewardModal';

export default function App() {
  const loadState = useStore((state) => state.loadState);
  const isLoaded = useStore((state) => state.isLoaded);
  const rewardModal = useStore((state) => state.rewardModal);
  const closeRewardModal = useStore((state) => state.closeRewardModal);

  useEffect(() => {
    loadState();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFB444" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
      <RewardModal
        visible={rewardModal.visible}
        pokemon={rewardModal.pokemon}
        onClose={closeRewardModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
