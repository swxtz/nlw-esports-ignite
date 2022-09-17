import React from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';


export function Game() {
  return (
    <Background>X
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
    </Background>
  );
}