import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import useToken from '@/hooks/useToken';



export default function ReceivedImagesPage() {
  const [images, setImages] = useState([]);
  const {token} = useToken();


  useEffect(() => {
    // console.log("ethan", token);

    fetch('https://snapchat.epidoc.eu/snap', { 

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXMuZm90aWVAZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc3ODc2NX0.Mmwlkue_haKhyXf_WGvkWLu2P2LxWHNHcUlA-6-ls2A', // Remplacez par votre clé API
        'authorization': 'bearer ' + token // Assurez-vous d'avoir le token d'utilisateur
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.id) {
        setImages(data.id);
      } else {
        console.error(data);

      }
    })
    .catch((error) => console.error(error));
}, [token]);

  return(
    <ThemedView>
      {images.map((images, index) => (
        <img key={index} src={images.url} alt="Received" /> // Remplacez par le champ correct pour l'URL de l'image
      ))}
    </ThemedView>
  );

}