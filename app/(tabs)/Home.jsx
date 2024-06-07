import { Image, StyleSheet, Platform, View } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import logo from "../../assets/images/logosnap.png";

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "yellow", dark: "#1D3D47" }}
            headerImage={
                <View>
                    <Image source={logo} style={{ width: 80, height: 80, top: 40, alignSelf: 'center' }} />
                    <Image
                        source={require("@/assets/images/devilbg.png")}
                        style={{
                            width: "100%",
                            height: 100,
                            top: "190%",
                            alignSelf: 'center',
                            resizeMode: "cover",
                            position: "absolute",
                        }}
                    />
                </View>
            }
        >
            <View
                style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
                <ThemedView style={styles.titleContainer}>
                    <View>
                        <ThemedText type="title">Welcome to the home page !</ThemedText>
                    </View>
                    <HelloWave />
                </ThemedView>
                <View>
                    <ThemedText>
                        {" "}
                        This is the home page !{" "}
                    </ThemedText>
                </View>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    }
});
