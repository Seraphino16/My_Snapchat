import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ListUsers () {

    const [listUsers, setListUsers] = useState(null);
    const[user, setUser] = useState(null);

    useEffect(() => {
        fetch('https://snapchat.epicode.eu/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'seraphin@gmail.com',
                password: 'azerty',
            }),
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            setUser(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])


    // useEffect(() => {
    //     fetch('https://snapchat.epidoc.eu/user', {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'bearer' + user.token
    //         }
    //     })
    //     .then((response) => {
    //         if(response.ok) {
    //             return response.json();
    //         }
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
    // }, [user]);

    return(
        <ThemedView>
            <ThemedText>See the console to see users</ThemedText>
        </ThemedView>
    )
}