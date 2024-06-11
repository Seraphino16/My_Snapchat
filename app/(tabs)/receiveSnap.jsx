import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import useToken from '@/hooks/useToken';
import { ThemedText } from '@/components/ThemedText';

function SnapListItem ({ snap, token, onSelect }) {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function fetchUser () {
      try {
        const response = await fetch(`https://snapchat.epidoc.eu/user/${snap.from}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXMuZm90aWVAZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc3ODc2NX0.Mmwlkue_haKhyXf_WGvkWLu2P2LxWHNHcUlA-6-ls2A', // Remplacez par votre clé API
            'authorization': 'bearer ' + token
          },
        })
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchUser();
    }, [snap]);

  if(user) {
    console.log(user);
  }

  const handleClickSnap = async () => {
    console.log(snap);
    fetch(`https://snapchat.epidoc.eu/snap/${snap._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXMuZm90aWVAZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc3ODc2NX0.Mmwlkue_haKhyXf_WGvkWLu2P2LxWHNHcUlA-6-ls2A', // Remplacez par votre clé API
        'authorization': 'bearer ' + token
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data.data.duration);
      setPhoto(data.data);
    })
  }


  return(
    <ThemedView style={styles.snapItemContainer}>
      {user && (
        <TouchableOpacity onPress={() => {
          handleClickSnap();
          onSelect(photo);
        }}>
        <ThemedView>
          <ThemedText>{user.username}</ThemedText>
          <ThemedView style={styles.newSnapContainer}>
            <View style={styles.square}></View>
            <ThemedText style={styles.redText}>Nouveau snap</ThemedText>
          </ThemedView>
        </ThemedView>
        </TouchableOpacity>
      )}
      
    </ThemedView>
  )
}


export default function ReceivedImagesPage() {
  const [snaps, setSnaps] = useState(null);
  const {token} = useToken();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    
    if(token) {
      fetch('https://snapchat.epidoc.eu/snap', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXMuZm90aWVAZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc3ODc2NX0.Mmwlkue_haKhyXf_WGvkWLu2P2LxWHNHcUlA-6-ls2A', // Remplacez par votre clé API
        'authorization': 'bearer ' + token
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setSnaps(data.data);
    })
    .catch((error) => console.error(error));
    }
    
  }, [token]);

  if (photo) {

    console.log(photo.duration);
    return(
      <ThemedView>
        <Image
          source={{ uri: photo.base64 }}
          style={styles.photo}
          resizeMode='contain'
        />

      </ThemedView>
    )
  }

  return(
    <ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Chat</ThemedText>
      </ThemedView>
      {/* {snaps && snaps.map((snap, index) => (
        <SnapListItem snap={snap} key={index} token={token} />
      ))} */}
      <FlatList
                    data={snaps}
                    renderItem={({ item: snap }) => (
                        <SnapListItem 
                            snap={snap}
                            token={token}
                            onSelect={setPhoto} />
                    )}
                    keyExtractor={snap => snap._id}
                />
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 20,
  },
  snapItemContainer: {
    padding: 12,
  },
  newSnapContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 16,
    height: 16,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  redText: {
    color: 'red',
    marginLeft: 8,
  },

})