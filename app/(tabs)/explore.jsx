import { Button, View } from 'react-native';
import useToken from '@/hooks/useToken';

export default function TabTwoScreen() {

  const { deleteToken } = useToken();

  return (
    <View  style={{ margin: 150 }}>
      <Button title='Log out' onPress={deleteToken}/>
    </View>
  );
}
