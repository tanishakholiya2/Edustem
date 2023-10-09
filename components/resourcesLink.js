import { db } from "../firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection, query, deleteDoc } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Alert, Dimensions } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Calendar from 'expo-calendar';

export default function ResourcesLink({route, navigation}) {
    const [id, setId] = useState("");
    const [resources, setResources] = useState([]);
    const [todos, setToDos] = useState([]);
    const subject = route.params.subject;
    const [calId, setCalId] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });
      const createTodo = (add, date) => {
        const todo = {
            title: add,
            completed: false,
            priority: false,
            date: date,
        };
        let temp = [...todos]
        temp.push(todo);
        setToDos(temp);
        addInfo(add, date);
    }
    const addInfo = (add, date) => {
        if(add !== "") {
        try{
            const data = {
                title: add,
                completed: false,
                priority: false,
                date: date
            } 
            const docRef = addDoc(collection(db, "users", id, "todos"), {
                data
        })
        fetchData();
    }
        catch(e) {
            console.error(e);
        }
    }
    }

    async function fetchData() {
        const querySnapshot = await getDoc(doc(db, "resources", subject));
        const temp = [];
        if (querySnapshot.exists()) {
          temp.push(querySnapshot.data())
        } else {
            // docSnap.data() will be undefined in'/ this case
            Alert.alert("No such document!");
          }
          setResources(temp)
        
          const todoSnapshot = await getDocs(collection(db, "users", id, "todos"));
          const temp2 = [];
          todoSnapshot.forEach((doc) => {
              temp2.push({completed: doc.data().data.completed, title: doc.data().data.title, id: doc.id, priority: doc.data().data.priority, id:doc.id});
          });
          setToDos(temp2);
    }
    useEffect(()=>{
            fetchData();
    }, [id])

    useEffect(() => {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        console.log(status)
        if (status === 'granted') {
          const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          setCalId(Object.values(calendars)[0].id);
        }
      })();
    }, []);

    async function addEvent(title, date) {
      createCalendar();
      let d = new Date();
      d.setFullYear(date.substring(0, 4))
      d.setMonth(date.substring(5,7))
      d.setDate(date.substring(8))
      console.log(d);
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      try {
        await Calendar.createEventAsync(defaultCalendar.id, {title: title, startDate: d, allDay: true, endDate: d.setHours(d.getHours()+1)})
        Alert.alert('Event saved successfully');
      } 
      catch (e) {
        Alert.alert('Event not saved successfully', e.message);
      }
    }

    async function createCalendar() {
      const defaultCalendarSource =
        Platform.OS === 'ios'
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: 'Expo Calendar' };
      const newCalendarID = await Calendar.createCalendarAsync({
        title: 'Expo Calendar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      console.log(`Your new calendar ID is: ${newCalendarID}`);
    }
    
    const deleteTodo = async (title) => {
      let index = todos.map(todo => todo.title).indexOf(title)
      let docId = todos[index].id
      await deleteDoc(doc(db, "users", id, "todos", docId)).then(fetchData());
    }
    
    return(
        <View style={styles.container}>
        <ScrollView
            contentContainerStyle={{
                display: "flex",
                flexDirection: "column",
            }}
            keyboardDismissMode="on-drag"
        >
        <View style={styles.buttonContainer}>
        </View>
        {resources.length > 0 && (Object.values(Object.values(resources)[0])).map((resource2, index) => {
            const bool = todos.map(todo => todo.title).indexOf(resource2.title) != -1
            return(
              <View key={index}>
              <View style={{display:"flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                {bool ? <Icon name={'bookmark'} size={20} onPress={()=>{deleteTodo(resource2.title)}} />: <Icon name={'bookmark-outline'} size={20} onPress={()=>{
                  createTodo(resource2.title, resource2.deadline)
                  addEvent(resource2.title, resource2.deadline)
                }
                } 
                   /> }
                <Text style={styles.text}> {resource2.title} </Text>
              </View>
              <View style={styles.textContainer}>
                  <Text style={styles.infoText}> Dates: {resource2.dates} </Text>
                  <Text style={styles.infoText}> Deadline to apply: {resource2.deadline} </Text>
                  <Text style={styles.infoText}> Link to apply: {resource2.link} </Text>
                  <Text style={styles.infoText}> Location: {resource2.location} </Text>
              </View>
              </View>
          )
          })
          }
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
    textContainer: {
        borderRadius: 2,
        borderWidth: 2,
        borderColor: "#172c42",
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
      },
      infoText: {
        fontSize: 16,
        marginBottom: 10,
      }
  });