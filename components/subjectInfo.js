import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../firebase';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase';
import { useEffect } from 'react';
import {doc, getDoc} from "firebase/firestore";
import "@expo/metro-runtime";

const Stack = createNativeStackNavigator();

export default function SubjectInfo({route, navigation}) {
    const [signedIn, setSignedIn] = useState(false);
    const [id, setId] = useState("")
    const subject = route.params.subject;
    const [units, setUnits] = useState([])
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
        setId(user.uid)
      } else {
        setSignedIn(false);
        setId("")
      }
    });

    async function fetchData() {
        const querySnapshot = await getDoc(doc(db, "curriculum", subject));
        setUnits(Object.values(querySnapshot.data()))
        console.log(units)
    }
    useEffect(()=>{
            fetchData();
    }, [id])
    return(
      <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#f5ced8' }}>
        <ScrollView
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                    gap:10
                }}
                keyboardDismissMode="on-drag"
                automaticallyAdjustKeyboardInsets={true}
            >
      <Text style={{fontSize:80}}>Units</Text>
      
      {units.map((unit)=>{
        console.log(unit)
      return(
      <TouchableOpacity onPress={()=>navigation.navigate('UnitInfo', {unit:unit})} style={styles.button}>
          <Text style={styles.buttonText}>{unit.title}</Text>
      </TouchableOpacity>)
      })}
      </ScrollView>
      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ced8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#172c42",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});