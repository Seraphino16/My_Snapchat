import React, { useState } from "react";
import { View, Text, StyleSheet,TextInput, Button, Image } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import logo from "../../assets/images/logosnap.png";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import useToken from "@/hooks/useToken";

export default function SignUp() {
    const navigation = useNavigation();

    
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const bootstrapStyleSheet = new BootstrapStyleSheet();
    const { s, c } = bootstrapStyleSheet;
    const router = useRouter();
    const { saveToken, fetchToken } = useToken();

    const handleSignUp = () => {
        fetch("https://snapchat.epidoc.eu/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcmFwaGluLmJlbm9pdEBlcGl0ZWNoLmV1IiwiaWF0IjoxNzE3NzYzMDg5fQ.yVGQmbarWgv25YxWcwl01igKET7stSAfJ4eRvmaTvrU"
            },
            body: JSON.stringify({
                username: username,
                profilePicture: profilePicture,
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data._id) {
                    fetchToken(email, password)
                        .then(router.replace('(tabs)'));
                    
                }
                console.log(data);
            })
            .catch((error) => {
                console.error("Erreur:", error);
            });
    };

    return (
        <ThemedView style={[s.container, { justifyContent: "center", flex: 1 }]}>
          <ThemedView style={[styles.titleContainer, { backgroundColor: 'transparent' }]}>
                <ThemedView>
                    <ThemedText type="title">Sign up !</ThemedText>
                </ThemedView>
            </ThemedView>
            <View
                style={[
                    s.container,
                    {
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 0.35,
                    },
                ]}
            >
                <Image source={logo} style={[{ width: 80, height: 80 }]} />
            </View>
            <ThemedText>Username:</ThemedText>
            <TextInput
                style={[
                    s.border,
                    s.p1,
                    { minWidth: "80%", height: 40, backgroundColor: "white" },
                ]}
                value={username}
                onChangeText={setUsername}
            />

            <ThemedText>Email:</ThemedText>
            <TextInput
                style={[
                    s.border,
                    s.p1,
                    { minWidth: "80%", height: 40, backgroundColor: "white" },
                ]}
                value={email}
                onChangeText={setEmail}
            />

            <ThemedText>Password:</ThemedText>
            <TextInput
                style={[
                    s.border,
                    s.p1,
                    { minWidth: "80%", height: 40, backgroundColor: "white" },
                ]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={s.mt4}>
                <Button title="SignUp" onPress={handleSignUp} />
            </View>
            <Link style={styles.link} to='/(login)/login' >
                <ThemedText>You don't have an account ? Sign up here</ThemedText>
            </Link>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
  },
  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 60,
  }
});
