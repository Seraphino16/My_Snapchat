import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// This hook is used to use and transform connection token
const useToken = () => {
    const [token, setToken] = useState(null);
    const router = useRouter();

    const getToken = useCallback(async () => {
        try {
            const storedToken = await  AsyncStorage.getItem('@token');
            setToken(storedToken);
        } catch (error) {
            console.error('Failed to get token from storage: ', err);
        }
    });

    const saveToken = useCallback( async (newToken) => {

        try {
            await AsyncStorage.setItem('@token', newToken);
            setToken(newToken);
            console.log('Connexion OK');
        } catch (e) {
            console.error("Error saving token:", e);
        }
    }, []);

    const deleteToken = useCallback( async () => {
        try {
            await AsyncStorage.removeItem('@token');
            setToken(null);
            console.log('User disconnected');
            router.replace('(login)');
        } catch (error) {
            console.error('Error with disconnection', error);
        }
    }, []);

    const fetchToken = useCallback(async (email, password) => {
        try {
            const response = await fetch("https://snapchat.epidoc.eu/user", {
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

            const data = await response.json();
            if(data.data.token) {
                setToken(token);
                console.log('Connexion OK');
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getToken();
    }, []);

    return { token, getToken, saveToken, deleteToken, fetchToken };
}

export default useToken;