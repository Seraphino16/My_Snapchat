import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Pressable,
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useNavigation } from "expo-router";
import RNPickerSelect from 'react-native-picker-select';

export default function HomeScreen() {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const cameraRef = useRef(null);
    const [isPressed, setIsPressed] = useState(false);
    const [selectedTime, setSelectedTime] = useState(5);
    const navigation = useNavigation();

    const timeValues = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 }
      ]    

    const getMimeType = (uri) => {
        const format = uri.split('.').pop();
        switch (format) {
          case 'jpg':
          case 'jpeg':
            return 'image/jpeg';
            break;
          case 'png':
            return 'image/png';
          default:
            return false;
        }
    }

    const navigateToListUsers = () => {
        const image = photo;
        navigation.navigate('listUsers', { image, selectedTime });
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    const takePhoto = async () => {
        try {
            if (cameraRef.current) {
                let image = await cameraRef.current.takePictureAsync({ base64: true });

                const mimeType = getMimeType(image.uri)
                if (!mimeType) {
                    throw new Error('Error with the image format');
                }

                image.base64 = `data:${mimeType};base64,${image.base64}`;

                console.log(image.base64.substring(0, 50));
                setPhoto(image)
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (photo) {
        console.log(photo.uri);
        return(
            <View style={styles.container} >
                <Image
                    source={{ uri: photo.uri }}
                    style={styles.photo}
                    resizeMode="contain"
                />
                <View style={styles.sendButtonContainer} >
                <Pressable
                    style={[styles.confirmButton, isPressed && styles.confirmButtonPressed]}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    onPress={() => {
                        navigateToListUsers();
                    }}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
                </View>
                <View style={styles.clockContainer} >
                <RNPickerSelect
                        onValueChange={(value) => setSelectedTime(value)}
                        // style={styles.clockContainer}
                        items={timeValues}
                        darkTheme={true}
                        placeholder={{}}
                        value={selectedTime}
                        >
                        <Icon name='clock-o' size={40} color='black' />
                    </RNPickerSelect>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.lensButtonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePhoto}
                    >
                        <Image
                            style={styles.lensIcon}
                            source={require("@/assets/images/camera-lens.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flipButtonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraFacing}
                    >
                        <Image
                            style={styles.flipIcon}
                            source={require("@/assets/images/flip.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarButtonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={() => navigation.navigate("Profile")}
                    >
                        <Image
                            style={styles.avatarIcon}
                            source={require("@/assets/images/avatar.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.galleryButtonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Link href='/imagePickerPage'>
                        <FontAwesome5 name='images' size={40} color={'black'} />
                        </Link>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    flipButtonContainer: {
        position: "absolute",
        top: 150,
        flexDirection: "row",
        backgroundColor: "transparent",
        right: 32,
    },
    lensButtonContainer: {
        position: "absolute",
        bottom: 5,
        flexDirection: "row",
        backgroundColor: "transparent",
        right: 140,
    },
    avatarButtonContainer: {
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        backgroundColor: "transparent",
        right: 20,
    },
    galleryButtonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        top: 80,
        right: 32,
    },
    clockContainer: {
        position: 'absolute',
        right: 32,
        top: 80,
    },
    button: {
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    flipIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 45,
    },
    lensIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
    },
    avatarIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    confirmButton: {
        position: 'absolute',
        bottom: 32,
        right: -12,
        transform: [{ translateX: -50 }],
        zIndex: 1,
        backgroundColor: '#13bceb',
        width: 100,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        transitionDuration: 200,
        transitionProperty: 'background-color',
        transitoinTimingFunction: 'ease-in-out',
        display: 'flex',
        flexDirection: 'row',
    },
    confirmButtonPressed: {
        backgroundColor: '#1c9abd'
    },
    buttonText: {
        color: 'white',
        marginRight: 12,
    }
});
