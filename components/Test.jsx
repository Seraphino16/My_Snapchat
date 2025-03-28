import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import logo from "../../assets/images/logosnap.png";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Test() {
    const navigation = useNavigation();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const bootstrapStyleSheet = new BootstrapStyleSheet();
    const { s, c } = bootstrapStyleSheet;

    const handleLogin = () => {
        fetch("https://snapchat.epidoc.eu/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                navigation.navigate('index');
                console.log(data);            })
            .catch((error) => {
                console.error("Erreur:", error);
            });
    };

    return (
        <View style={[s.container, { justifyContent: "center", flex: 1 }]}>
            <ThemedView style={[styles.titleContainer, { backgroundColor: 'transparent' }]}>
                <View>
                    <ThemedText type="title">Login !</ThemedText>
                </View>
            </ThemedView>
            <View
                style={[
                    s.container,
                    {
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 0.25,
                    },
                ]}
            >
                <Image source={logo} style={[{ width: 80, height: 80 }]} />
            </View>
            <Text style={[s.text, { color: c.danger }]}>Hello, Bienvenu sur la page de test:</Text>
            <TextInput
                style={[
                    s.border,
                    s.p1,
                    { minWidth: "80%", height: 40, backgroundColor: "white" },
                ]}
                value={email}
                onChangeText={setEmail}
            />
    
            <Text style={[s.text, s.mt4, { color: c.danger }]}>Password:</Text>
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
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
    }
    const styles = StyleSheet.create({
        titleContainer: {
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
        }
    });
