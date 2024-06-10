import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from "expo-router";

export default function HomeScreen() {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();

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

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.lensButtonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={}
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
                        <Link href='/imagePickerPage.tsx'>
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
});
