import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, Image, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import useToken from '@/hooks/useToken';
import { ThemedText } from '@/components/ThemedText';

function SnapListItem ({ snap, token, onSelect }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser () {
      try {
        const response = await fetch(`https://snapchat.epidoc.eu/user/${snap.from}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXMuZm90aWVAZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc3ODc2NX0.Mmwlkue_haKhyXf_WGvkWLu2P2LxWHNHcUlA-6-ls2A',
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
    setLoading(true);
    console.log(snap);
      fetch(`https://snapchat.epidoc.eu/snap/${snap._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXMuZm90aWVAZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc3ODc2NX0.Mmwlkue_haKhyXf_WGvkWLu2P2LxWHNHcUlA-6-ls2A',
          'authorization': 'bearer ' + token
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onSelect(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false))
  }


  return(
    <ThemedView style={styles.snapItemContainer}>
      {user && (
        <TouchableOpacity 
          onPress={() => { handleClickSnap() }}
          disabled={ loading } >
        <ThemedView>
          <ThemedText>{user.username}</ThemedText>
          <ThemedView style={styles.newSnapContainer}>
            <View style={styles.square}></View>
            <ThemedText style={styles.redText}>
              {loading ? 'Chargement' : 'Nouveau  Snap' }
            </ThemedText>
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
  const [time, setTime] = useState(null);

  useEffect(() => {
    
    if(token) {
      fetch('https://snapchat.epidoc.eu/snap', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXMuZm90aWVAZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc3ODc2NX0.Mmwlkue_haKhyXf_WGvkWLu2P2LxWHNHcUlA-6-ls2A',
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


  useEffect(() => {

    let timer;

    if(photo && photo.duration) {
      setTime(photo.duration);
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [photo])

  useEffect(()=> {
    if (time === 0) {
      setPhoto(null);
    }
  }, [time])

  if (photo) {
    return(
      <ThemedView>
        <Image
          source={{ uri: photo.image }}
          style={styles.photo}
          resizeMode='contain'
        />
        <View style={styles.chronoContainer}>
          <Text style={styles.chrono}>{time}</Text>
        </View>

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
  photo: {
    width: '100%',
    height: '100%',
  },
  chronoContainer: {
    position: 'absolute',
    top: 100,
    right: 32,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  chrono: {
    color: 'white'
  }
})