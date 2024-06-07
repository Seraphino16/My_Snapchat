import useLogout from "@/components/LogOut";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React from "react";
import { Button } from "react-native";

export default function WelcomePage () {
    const navigation = useNavigation();
    const logout = useLogout();

    return(
        <ThemedView>
            <ThemedText style={{ marginTop: 100}}>THIS IS HOME</ThemedText>
            <Button title="Log out" onPress={logout} />
        </ThemedView>
    )
}