import { db } from "../firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function UnitInfo({route, navigation}) {
    const [id, setId] = useState("");
    let unit = route.params.unit;
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
                automaticallyAdjustKeyboardInsets={true}
            >
        <Text style={styles.text}> {unit.title} </Text>
        <View style={styles.textContainer}>
            <Text style={styles.infoText}> {unit.intro} </Text>
            <Text style={styles.infoText}> {unit.info} </Text>
            <Text style={styles.infoText}> {unit.info2} </Text>
            <Text style={styles.infoText}> {unit.info3} </Text>
        </View>
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
    textContainer: {
      borderRadius: 2,
      borderWidth: 2,
      borderColor: "#172c42",
      marginHorizontal: 6,
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
      infoText: {
        fontSize: 16,
        marginBottom: 10,
      }
  });