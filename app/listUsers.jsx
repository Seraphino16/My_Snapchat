import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ListUsers () {

    const [listUsers, setListUsers] = useState(null);
    const[user, setUser] = useState(null);

    useEffect(() => {
        fetch('https://snapchat.epidoc.eu/user', {
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
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            setUser(data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])


    useEffect(() => {
        console.log('User 2cd useEffect');
        console.log(user);
        if(user && user.token) {

            console.log(user.token)
            fetch('https://snapchat.epidoc.eu/user', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + user.token
                }
            })
            .then((response) => {
                console.log('knkjnkjnjkn');
                return response.json();
            })
            .then((data) => {
                console.log(data);

            })
            .catch((error) => {
                console.error(error);
            })
        }
    }, [user]);

    return(
        <ThemedView>
            <ThemedText>See the console to see users</ThemedText>
        </ThemedView>
    )
}