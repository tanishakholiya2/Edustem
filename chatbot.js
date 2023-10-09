import React,{Component} from 'react';
import {View, Text, SafeAreaView} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';

const BOT = {
    _id: 2,
    name: "StemBot" 
}

export default Chatbot = () => {
    const [message, setMessage] = useState([{_id: 1, text:"Hi", createdAt: new Date(), user: BOT}])
    return(
        <View style={{flex: 1, backgroundColor:"fff"}}>
            <GiftedChat messages={messages}
            onSend={(message) => onSend(message)} 
            onQuickReply={(quickReply)=>{onQuickReply(quickReply)}}/>
        </View>
    )
}