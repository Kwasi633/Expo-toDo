import React, {useState} from 'react';
import { Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import LoginDetails from './src/logInDetails';
import UserSignUp from './src/userSignUp';
import HomeScreen from './src/home';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

          <Stack.Screen name="LogInDetails" component={LoginDetails} 
          options={{
            headerTitle: '',
             headerShown: false
          }}
        />

         <Stack.Screen name="Home" component={HomeScreen} 
        options={{
            headerTitle: '',
          }}
        />

      <Stack.Screen name="UserSignUp" component={UserSignUp} 
         options={{
            headerTitle: '',
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
   
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED', 
  },
  
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

    input: {
      padding: 15,
      paddingHorizontal: 15,
      width: 250,
      backgroundColor: 'white',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    
     date: {
    fontSize: 18,
    // marginBottom: 10,
  },

    addWrapper:{
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    }
});

export default App;