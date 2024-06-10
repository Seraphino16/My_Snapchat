import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Button, Image, Platform, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useToken from '@/hooks/useToken';

export default function TabTwoScreen() {

  const { deleteToken } = useToken();

  return (
    <View  style={{ margin: 150 }}>
      <Button title='Log out' onPress={deleteToken}/>
    </View>
  );
}