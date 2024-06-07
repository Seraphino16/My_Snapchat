import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React from "react";

export default function useLogout () {
    const navigation = useNavigation();
    const router = useRouter();

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('@token');
            console.log('Token removed');
            router.replace('(login)');
        } catch (error) {
            console.error('Error while deconection: ', error);
        }
    }
   
    return logout;
}