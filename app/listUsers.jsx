import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { FlatList, Image, StyleSheet, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

function UserItem ({ user, onSelect, isSelected }) {

    return(
        <Pressable onPress={() => onSelect(user)}>
            <ThemedView style={styles.userItem} >
                <ThemedView style={styles.userInfo}>            
                    {user.profilePicture.length > 0 &&
                        <Image
                        source={{ uri: user.profilePicture }}
                        resizeMode='contain'
                        style={styles.image} />
                    }
                    <ThemedText>{user.username}</ThemedText>
                </ThemedView>
                {isSelected && (
                    <Icon name="check-circle" size={30} color='green' />
                )}
            </ThemedView>
        </Pressable>
    )
}

export default function ListUsers () {

    const [listUsers, setListUsers] = useState(null);
    const[user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPressed, setIsPressed] = useState(false);
    const route = useRoute();
    const { image, selectedTime } = route.params;

    if(image) {
        console.log(image.base64.substring(0, 50));
    }

    useEffect(() => {
        fetch('https://snapchat.epidoc.eu/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcmFwaGluLmJlbm9pdEBlcGl0ZWNoLmV1IiwiaWF0IjoxNzE3NzYzMDg5fQ.yVGQmbarWgv25YxWcwl01igKET7stSAfJ4eRvmaTvrU',
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
            console.log(data)
            setUser(data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])


    useEffect(() => {

        if(user && user.token) {
            fetch('https://snapchat.epidoc.eu/user', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcmFwaGluLmJlbm9pdEBlcGl0ZWNoLmV1IiwiaWF0IjoxNzE3NzYzMDg5fQ.yVGQmbarWgv25YxWcwl01igKET7stSAfJ4eRvmaTvrU',
                    'authorization': 'bearer ' + user.token
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setListUsers(data.data);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }, [user]);

    const handleSend = function () {

        const str = image.base64.substring(0, 50);
        console.log(str);

        fetch('https://snapchat.epidoc.eu/snap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlcmFwaGluLmJlbm9pdEBlcGl0ZWNoLmV1IiwiaWF0IjoxNzE3NzYzMDg5fQ.yVGQmbarWgv25YxWcwl01igKET7stSAfJ4eRvmaTvrU',
                    'authorization': 'bearer ' + user.token
                },
                body: JSON.stringify({
                    to: selectedUser._id,
                    image: image.base64,
                    duration: selectedTime,
                })
            })
            .then((response) => { 
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else if (contentType && contentType.includes('text/html')) {
                    return response.text();
                } else {
                    throw new Error('ContentType  not supported');
                }

                
            })
            .then((data) => { console.log(data) })
            .catch((error) => { console.error(error) });

    }

    return(
        <ThemedView styles={styles.container}>
            {!listUsers ? (
            <ThemedText>See the console to see users</ThemedText>
            ) : (
                <FlatList
                    data={listUsers}
                    renderItem={({ item }) => (
                        <UserItem 
                            user={item}
                            onSelect={setSelectedUser}
                            isSelected={selectedUser?._id === item._id} />
                    )}
                    keyExtractor={item => item._id}
                />
            )}
            { selectedUser && (
                <Pressable
                    style={[styles.button, isPressed && styles.buttonPressed]}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    onPress={handleSend}
                >
                    <Text style={styles.buttonText}>SEND</Text>
                    <Icon name='paper-plane' size={20} color='white' />
                </Pressable>
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
    userItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
    },
    button: {
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: [{ translateX: -50 }],
        zIndex: 1,
        backgroundColor: '#13bceb',
        width: 100,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        transitionDuration: 200,
        transitionProperty: 'background-color',
        transitoinTimingFunction: 'ease-in-out',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonPressed: {
        backgroundColor: '#1c9abd'
    },
    buttonText: {
        color: 'white',
        marginRight: 12,
    }
})