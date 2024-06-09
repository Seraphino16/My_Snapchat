import useLogout from "@/components/LogOut";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useToken from "@/hooks/useToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useNavigation } from "expo-router";
import React from "react";
import { Button } from "react-native";

export default function WelcomePage () {
    const navigation = useNavigation();
    const { deleteToken } = useToken();

    return(
        <ThemedView>
            <ThemedText style={{ marginTop: 100}}>THIS IS HOME</ThemedText>
            <Button title="Log out" onPress={deleteToken} />
            <Link style={{ marginTop: 100}} href='/imagePickerPage' >Choose a photo</Link>
        </ThemedView>
    )
}