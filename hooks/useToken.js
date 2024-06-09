import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// This hook is used to use and transform connection token
const useToken = () => {
    const [token, setToken] = useState(null);

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
            console.log('Token removed');
        } catch (error) {
            console.error('Error with disconnection', error);
        }
    }, []);

    useEffect(() => {
        getToken();
    }, []);

    return { token, getToken, saveToken, deleteToken };
}

export default useToken;