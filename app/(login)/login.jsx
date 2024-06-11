import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import logo from "../../assets/images/logosnap.png";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import useToken from "@/hooks/useToken";


export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const bootstrapStyleSheet = new BootstrapStyleSheet();
    const { s, c } = bootstrapStyleSheet;
    const router = useRouter();
    const { saveToken } = useToken();

    const handleLogin = () => {
        fetch("https://snapchat.epidoc.eu/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcmFwaGluLmJlbm9pdEBlcGl0ZWNoLmV1IiwiaWF0IjoxNzE3NzYzMDg5fQ.yVGQmbarWgv25YxWcwl01igKET7stSAfJ4eRvmaTvrU"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                
                try {
                    // Assure que le token est dans l'objet data
                    if(data.data.token) {
                        saveToken(data.data.token);
                        router.replace('(tabs)');
                    } else {
                        console.log('Error with connexion');
                    }
                } catch (e) {
                    console.error("Erreur de sauvegarde du token:", e);
                }
            })

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
            <ThemedText >Email:</ThemedText>
            <TextInput
                style={[
                    s.border,
                    s.p1,
                    { minWidth: "80%", height: 40, backgroundColor: "white" },
                ]}
                value={email}
                onChangeText={setEmail}
            />
    
            <ThemedText >Password:</ThemedText>
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
            <Link style={styles.link} to='/(login)/signup' >
                <ThemedText>You don't have an account ? Sign up here</ThemedText>
            </Link>
        </View>
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
