import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { MapScreen } from './src/screens/MapScreen';
import { ListScreen } from './src/screens/ListScreen';
import { TripPlannerScreen } from './src/screens/TripPlannerScreen';
import { GarageScreen } from './src/screens/GarageScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { BottomNavigation } from './src/components/BottomNavigation';
import { NotificationToast } from './src/components/NotificationToast';
import { subtleTheme } from './src/constants/theme';

const MainScreenContainer: React.FC = () => {
  const { activeTab } = useApp();

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.id = 'expo-web-root-fix';
      style.innerHTML = `
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: ${subtleTheme.colors.background};
        }
      `;
      if (!document.getElementById('expo-web-root-fix')) {
        document.head.appendChild(style);
      }
    }
  }, []);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'map':
        return <MapScreen />;
      case 'list':
        return <ListScreen />;
      case 'planner':
        return <TripPlannerScreen />;
      case 'garage':
        return <GarageScreen />;
      case 'saved':
        return <FavoritesScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <MapScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={subtleTheme.colors.cardBackground} />
      <NotificationToast />
      <View style={styles.screenWrapper}>
        {renderActiveScreen()}
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainScreenContainer />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: subtleTheme.colors.cardBackground,
  },
  screenWrapper: {
    flex: 1,
    backgroundColor: subtleTheme.colors.background,
  },
});
