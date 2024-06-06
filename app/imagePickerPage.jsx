import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import ListUsers from './listUsers'

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const navigateToListUsers = (image) => {
      navigation.navigate('listUsers', { image });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };  

  return (
    <ThemedView style={styles.container}>
      {image ? (
          <>
            <Image
            source={{ uri: image.uri }}
            style={styles.image}
            resizeMode='contain' />
            <Button title="Choose an other image" onPress={pickImage} />
            {/* <Link replace href='/listUsers'>
              <ThemedText>SEND</ThemedText>
            </Link>   */}
            <Button title='Send to one user'  onPress={() => navigateToListUsers(image)} />
          </>
      ) : (
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      )}
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});
