import { db } from "./firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Resources({route, navigation}) {
    const [id, setId] = useState("");
    const subjects = ["Math", "Physics", "Biology", "Chemistry", "Computer science"];
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });
    
    return(
        <View style={styles.container}>
        <ScrollView
            contentContainerStyle={{
                display: "flex",
                flexDirection: "column",
            }}
            keyboardDismissMode="on-drag"
        >
            <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#f5ced8' }}>
            {subjects.map((name, index)=>{ return(
            <View style={{marginVertical:10}} key={index}>
            <TouchableOpacity onPress={()=>navigation.navigate('ResourcesLink', {subject:name.toLowerCase()})} style={styles.button}>
                <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity>
            </View>)
            })}
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#f5ced8',
    },
    headacheInfo: {
        borderWidth: '2',
    },
    text: {
        fontWeight: "800",
        fontSize: 24,
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10, 
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
      },
      button: {
        backgroundColor: "#172c42",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        borderColor: "#172c42",
        borderWidth: 2,
      },
      buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#172c42",
        borderWidth: 2,
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
      buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
      },
      myStarStyle: {
        color: '#FDFD96',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
      },
      myEmptyStarStyle: {
        color: 'white',
      }
  });