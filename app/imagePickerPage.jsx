import { useEffect, useState } from "react";
import {
    Button,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const [selectedTime, setSelectedTime] = useState(5);
    const themeColor = useThemeColor({ light: "black", dark: "white" });

    useEffect(() => {
        setImage(null);
    }, []);

    if (image) {
        console.log(image.uri);
    }

    const timeValues = [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
    ];

    const navigateToListUsers = (image) => {
        navigation.navigate("listUsers", { image, selectedTime });
    };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    if (image) {
        if (!image.base64.startsWith("data:image")) {
            image.base64 = `data:${image.mimeType};base64,${image.base64}`;
        }

        console.log(image.base64.substring(0, 50));
    }

    return (
        <ThemedView style={styles.container}>
            {image ? (
                <>
                    <Image
                        source={{ uri: image.uri }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View style={{ alignItems: "center" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={pickImage}
                            >
                                <ThemedText style={styles.buttonText}>
                                    Choose another image
                                </ThemedText>
                            </TouchableOpacity>
                            <RNPickerSelect
                                onValueChange={(value) =>
                                    setSelectedTime(value)
                                }
                                items={timeValues}
                                darkTheme={true}
                                placeholder={{}}
                                value={selectedTime}
                                style={{
                                    inputIOS: styles.pickerSelect,
                                    inputAndroid: styles.pickerSelect,
                                    iconContainer: styles.iconContainer,
                                    container: styles.timerContainer,
                                }}
                                useNativeAndroidPickerStyle={false}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon
                                        name="clock-o"
                                        size={40}
                                        color="black"
                                    />
                                    <ThemedText style={styles.themedText}>
                                        Time selected: {selectedTime} seconds
                                    </ThemedText>
                                </View>
                            </RNPickerSelect>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                navigateToListUsers(image, selectedTime)
                            }
                        >
                            <ThemedText style={styles.buttonText}>
                                Send to one user
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Button
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "80%",
        height: "80%",
    },
    timerContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
    },
    pickerSelect: {
        flex: 1,
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    themedText: {
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 5,
        padding: 10,
        fontSize: 10,
    },
    iconContainer: {
        top: 5,
        right: 15,
    },
    button: {
        backgroundColor: "#007bff", 
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 10,
    },
});
