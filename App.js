import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import { auth } from './firebase';
import SignUp from './signup';
import Onboarding from './onboarding';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { db } from './firebase';
import { useEffect } from 'react';
import {doc, getDoc} from "firebase/firestore";
import Todo from './todo';
import "@expo/metro-runtime";
import Resources from './resources';
import ResourcesLink from './components/resourcesLink';
import Subjects from './subjects';
import SubjectInfo from './components/subjectInfo';
import UnitInfo from './components/unitInfo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Resources" component={Resources} />
        <Stack.Screen name="ResourcesLink" component={ResourcesLink} />
        <Stack.Screen name="Subjects" component={Subjects} />
        <Stack.Screen name="SubjectInfo" component={SubjectInfo} />
        <Stack.Screen name="UnitInfo" component={UnitInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({navigation}) {
  const [signedIn, setSignedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  if(signedIn) {
    return(
      <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#f5ced8' }}>
      <Text style={{fontSize:80}}>EduSTEM</Text>
      {/* <Button title="Memories" color='#172c42' onPress={()=>navigation.navigate('Memories')}/> */}
      {/* <TouchableOpacity onPress={()=>{navigation.navigate("Journal", {journalMorningFields: journalMorningFields, journalNightFields: journalNightFields})}} style={styles.button}>
        <Text style={styles.buttonText}>Journal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Workouts', {workoutFields})} style={styles.button}>
        <Text style={styles.buttonText}>Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Headache Tracker', {headacheFields})} style={styles.button}>
        <Text style={styles.buttonText}>Headache Tracker</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={()=>navigation.navigate('Todo')} style={styles.button}>
        <Text style={styles.buttonText}>Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Subjects', {mine: true})} style={styles.button}>
        <Text style={styles.buttonText}>Your Subjects</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Subjects', {mine: false})} style={styles.button}>
        <Text style={styles.buttonText}>All Subjects</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Resources')} style={styles.button}>
        <Text style={styles.buttonText}>Resources</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>auth.signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
    )
  }
  else {
    return(
      <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#f5ced8' }}>
      <Text style={{fontSize:80}}>EduSTEM</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      </View>
    )
  }
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
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
