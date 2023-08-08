import React, { useState } from 'react';
import { View, 
  Text, 
  Image, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Parse from 'parse/react-native';

function LoginDetails({ }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const user = await Parse.User.logIn(username, password);
      console.log("Login successful!")
      navigation.navigate('Home')
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  };

 const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (

    <ScrollView>
    
    <View style={styles.container}>
         <View style={styles.subContainer}>
         <Image  source={require('./assets/favicon.png')}
            style={styles.logo}
          />
                   <Text style={styles.welcome}>Easy-to-Use app for 
                   tracking daily tasks</Text>
                   
              </View>
                   
        <KeyboardAvoidingView>
        
        
        <View style={styles.inputContainer}>
          <Image source={require('./assets/trans.png')}
           style={styles.icon}  />
      
              <TextInput
              style={styles.input}
              placeholder="Enter your username" 
              value={username}
              onChangeText={text => setUsername(text)}
              />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./assets/passWord.png')} style={styles.icon} />
          
          <TextInput
              style={styles.input}
              placeholder="Enter your password" 
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={toggleShowPassword}>
              <Image
                source={
                  showPassword
                    ? require('./assets/showPass.png')
                    : require('./assets/showPass.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        
          <Text  style={styles.subtitleB}>
            Forgot Password?
        </Text>
        </TouchableOpacity>
        

        <TouchableOpacity 
                  onPress={handleLogin} 
                    style={styles.customLogIn}
                      >
                    <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Need an account? </Text>
                
                <TouchableOpacity onPress={() => navigation.navigate('UserSignUp')}>
                    <Text style={[styles.signupText, styles.signupLink]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fake}>
            
            </View>
        </KeyboardAvoidingView>
      </View>
  </ScrollView>
  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    //alignItems: 'center', 
    //justifyContent: 'center'
  },

  
  subContainer:{
        //backgroundColor: "#3C4142",
        //backgroundColor: "red",
        //padding: 100,
        height: 350,
        marginTop: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%'
      },
      
     optionTxt: {
      color: '#0bdc9f',
      fontSize: 25,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },

     welcome: {
      color: 'black',
      fontSize: 35,
      fontWeight: 'bold',
      fontStyle: 'normal',
      //flexDirection: 'row',
      textAlign: 'center',
      padding: 5
    },

      subtitle: { 
      color: 'white',
       fontSize: 16,
       textAlign: 'center',
      width: 250,
      marginBottom: 30,
      //fontWeight: 'bold',
    },

    logo: {
      width: 150,
      height: 150,
      marginTop: 30,
      marginBottom: 0,
      borderRadius: 40,
    },

    optionContainer:{
        alignItems: 'center',
        alignContent: 'center',
        flex: 1, 
    },

    inputContainer: {
      padding: 10,
      backgroundColor: 'white',
      marginTop: 30,
      flexDirection: 'row',
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      marginLeft: 20,
      marginRight: 20,    
    },
    
    
    icon: {
    marginRight: 10,
    height: 15,
    width: 15
  },

  input: {
    flex: 1,
    height: 40,
  },

     subtitleB: { 
      color: 'black',
      fontSize: 10,
      textAlign: 'right',
      width: 100,
      marginTop: 10,
      fontWeight: 'bold',
      right: 25,
      position: 'absolute',
     },

      subtitleC: { 
      color: 'black',
       fontSize: 10,
       textAlign: 'right',
      width: 100,
      marginTop: 10,
       fontWeight: 'bold',
       right: 25,
       position: 'absolute',
     },

      signupContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 60,
        alignSelf: 'center',
  },
      signupText: {
      color: 'black',
    },

    signupLink: {
      fontWeight: 'bold',
      marginLeft: 5,
      color: 'black'
  },

    customLogIn: {
    backgroundColor: '#0054a6',
    borderRadius: 10,
    padding: 8,
    width: '70%',
    alignSelf: 'center',
    marginTop: 50,
    alignItems: 'center',  
    height: 40,
    },
  
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },

  fake: {
    height: 20
  }
})


export default LoginDetails;