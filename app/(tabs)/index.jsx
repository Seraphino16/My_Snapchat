import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import useToken from "@/hooks/useToken";

export default function HomeScreen() {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const { deleteToken } = useToken();

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
                <View style={styles.buttonGroupContainer}>
                    <View style={styles.logoutButtonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={deleteToken}
                        >
                            <Image
                                style={styles.logoutIcon}
                                source={require("@/assets/images/logout.png")}
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
                        <TouchableOpacity style={styles.button}>
                            <Link href="/imagePickerPage">
                                <FontAwesome5
                                    name="images"
                                    size={40}
                                    color={"black"}
                                />
                            </Link>
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
    flipButtonContainer: {},
    logoutButtonContainer: {},
    lensButtonContainer: {
        position: "absolute",
        left: 0,
        right: 140,
        bottom: 0,
        width: "100%",
        height: 120,
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    avatarButtonContainer: {},
    galleryButtonContainer: {},
    button: {
        alignSelf: "flex-end",
        alignItems: "center",
        opacity: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    flipIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
    lensIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
    },
    buttonGroupContainer: {
        position: "absolute",
        flexDirection: "column",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        justifyContent: "space-evenly",
        alignItems: "center",
        top: 25,
        right: 0,
        borderBottomLeftRadius: 30,
        padding: 10,
        width: 70,
        height: 300,
    },
    avatarIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
    logoutIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
});
