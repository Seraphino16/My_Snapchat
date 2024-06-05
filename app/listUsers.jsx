import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

function UserItem ({ user }) {

    // console.log(user.profilePicture);
    return(
        <ThemedView style={styles.userIem}>
            {/* // <TouchableHighlight> */}
                {user.profilePicture.length > 0 &&
                    <Image
                    source={{ uri: user.profilePicture }}
                    resizeMode='contain'
                    style={styles.image} />
                }
                <ThemedText>{user.username}</ThemedText>
            {/* // </TouchableHighlight> */}
        </ThemedView>
    )
}

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

        // console.log(user);
        if(user && user.token) {
            fetch('https://snapchat.epidoc.eu/user', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + user.token
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log('Data to put in listUsers', data);
                setListUsers(data.data);
                // console.log('List user after fetch', listUsers);

            })
            .catch((error) => {
                console.error(error);
            })
        }
    }, [user]);

    return(
        <ThemedView styles={styles.container}>
            {!listUsers ? (
            <ThemedText>See the console to see users</ThemedText>
            ) : (
                <FlatList
                    data={listUsers}
                    renderItem={({ item }) => <UserItem user={item} />}
                    keyExtractor={item => item._id}
                />
            )}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 16,
    },
    userIem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        width: '100%',
        padding: 20,
        // borderWidth: 1,
        // borderColor: 'black',
    }
})