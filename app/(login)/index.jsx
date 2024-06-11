import { Image, StyleSheet, Platform, View } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import logo from "../../assets/images/logosnap.png";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const navigation = useNavigation();
    const router = useRouter();



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
            <ThemedView
                style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
                <ThemedView style={styles.titleContainer}>
                    <View>
                        <ThemedText type="title">Welcome !</ThemedText>
                    </View>
                    <HelloWave />
                </ThemedView>
                <ThemedView>
                    <ThemedText>
                        {" "}
                        Sign up and never let them know your next move !{" "}
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <Button
                        title="Sign up"
                        onPress={() => router.push("/signup")}
                    />
                    <Button
                        title="Login"
                        onPress={() => router.push("/login")}
                    />
                </ThemedView>
            </ThemedView>
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
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
