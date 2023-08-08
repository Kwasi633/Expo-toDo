import React, { useState } from 'react';
import { StyleSheet, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Parse from 'parse/react-native';
//import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Before using the SDK...ll
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("dailaApp", "dailaApp633");
Parse.serverURL = 'http://192.168.192.121:1337/parse'  

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigation = useNavigation();
  

  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

 const handleSignup = async () => {
  if (password !== confirmPassword) {
    setError("Passwords don't match.");
    return;
  }

  console.log("Signing up user...");
  try {
    await user.signUp();
    navigation.navigate('Home')
    console.log("Success!", user.id)
    
  } catch (error) {
    
    alert("Error: " + error.code + " " + error.message);
  }
};

const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

return (

<ScrollView>
  <View style={styles.container}>
     
    <View style={styles.boxx}>
       
    <View style={styles.inputContainer}>
    <Image source={require('./assets/trans.png')}
           style={styles.icon}  />
    <TextInput
        style={styles.inputt}
        placeholder="Create your username"
        value={username}
        onChangeText={setUsername}
      />

    </View>

    <View style={styles.inputContainer}>
    <Image source={require('./assets/gMail.png')}
           style={styles.icon} />

      <TextInput
        style={styles.inputt}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
    </View>
    
    <View style={styles.line} />


    <View style={styles.inputContainer}>
     <Image source={require('./assets/conti.png')} style={styles.icon} />
      <TextInput
        style={styles.inputt}
        placeholder="Country"
      />
    
    </View>

    <View style={styles.inputContainer}>
     <Image source={require('./assets/tower.png')} style={styles.icon} />
      <TextInput
        style={styles.inputt}
        placeholder="City"
      />
    </View>

    <View style={styles.line} />

    <View style={styles.inputContainer}>
     <Image source={require('./assets/passWord.png')} style={styles.icon} />
      <TextInput
        style={styles.inputt}
        placeholder="Create a password"
        value={password}
        onChangeText={setPassword}
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


    <View style={styles.inputContainer}>
     <Image source={require('./assets/passWord.png')} style={styles.icon} />
      <TextInput
        style={styles.inputt}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
      <TouchableOpacity style={styles.customLogIn} onPress={handleSignup}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
   
    </View>
     
    <View 
     style={styles.fake}>    
    </View>
    
    </View>      
  
</ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  boxx: {
    marginTop: 70,
  },
  
  inputContainer: {
      padding: 10,
      backgroundColor: 'white',
      marginTop: 20,
      flexDirection: 'row',
      borderRadius: 10,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      marginLeft: 20,
      marginRight: 20,    
    },

 inputt: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3C4142',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#0bdc9f',
    fontSize: 18,
    fontWeight: 'bold',
  },

 icon: {
    marginRight: 10,
    height: 15,
    width: 15,    
  },
  
    line: {
    height: 1.5,
    backgroundColor: 'black',
      marginTop: 20,
      width: '85%',
      left: 25
  },

    innerBottonsContainer:{
        //backgroundColor: 'yellow',
        height: 80,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 0,
        marginTop: 15,
        marginBottom: 0,
        //paddingBottom: 40,
        flexDirection: 'row',
        //marginLeft: 3,
        marginRight: 15, 
        width: '100%',
     },

    customLogIn: {
      padding: 10,
      backgroundColor: 'blue',
      marginTop: 40,
      //flexDirection: 'row',
      borderRadius: 35,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 15,
      marginLeft: 20,
      marginRight: 20,
      alignContent: 'center',
    },
    
    text: {
    color: 'white',
    position: 'relative',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

    fake: {
    height: 55
  },

});

export default UserSignUp;
