import { Dimensions, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../colors/colors'
import { firebase } from '../../firebaseConfig'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Login = ({navigation}) => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [users, setUsers] = useState([])

	const usersRef = firebase.firestore().collection('users')

	useEffect(() => {
		usersRef
		.orderBy('registeredAt', 'asc')
		.onSnapshot(querySnapchot => {
			const users = []
			querySnapchot.forEach(doc => {
				const document = doc.data()
				users.push({
					id: doc.id,
					document
				})
			})
			setUsers(users)
		})
	}, [])

	const handleLogin = () => {
		let exist = false
		let usuario = {}
		for (let i = 0; i<users.length; i++) {
			if (users[i].document.email == email && users[i].document.password == password) {
				usuario = users[i]
				exist = true
			}
		}
		if (exist) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(userCredentials => {
			const user = userCredentials.user
			navigation.navigate('Home', {usuario: usuario})
		})
		.catch(error => alert(error.message))
		}
		else {
			alert("This user doesn't exist")
		}
	}

  return (
		<ImageBackground source={require('../images/endless-constellation.png')} style={styles.backgroundImage}>
    	<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={styles.loginWrapper}>
      	  <Text style={styles.headerTitle}>Market List</Text>
					<Text style={styles.text}>Welcome to the best market list for you and your family :)</Text>

					<TextInput 
						style={styles.input}
						placeholder='E-Mail'
						autoCapitalize='none'
						placeholderTextColor={colors.white}
						value={email}
						onChangeText={(email) => setEmail(email)}
					/>

					<TextInput 
						style={[styles.input, {marginTop: 20}]}
						placeholder='Password'
						autoCapitalize='none'
						placeholderTextColor={colors.white}
						value={password}
						onChangeText={(password) => setPassword(password)}
						secureTextEntry
					/>

					<TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
						<Text style={styles.loginText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
						<Text style={styles.registerText}>Register</Text>
					</TouchableOpacity>
      	</View>
    	</KeyboardAvoidingView>
		</ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
			alignItems: 'center',
      justifyContent: 'center',
    },

		backgroundImage: {
			width: width * 1,
			height: '100%',
		},

    loginWrapper: {
      backgroundColor: colors.white,
      width: width * 0.7,
      height: height * 0.47,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 20,
      alignItems: 'center',
      padding: 18
    },

    headerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
			color: colors.purple
    },

		text: {
			marginTop: 15,
			textAlign: 'center',
			fontSize: 18
		},

		input: {
			marginTop: 30,
			backgroundColor: colors.gray,
			width: '100%',
			paddingVertical: 13,
			paddingLeft: 10,
			borderRadius: 5,
			color: colors.white
		},

		loginButton: {
			alignItems: 'center',
			marginTop: 30,
			paddingVertical: 10,
			width: '100%',
			borderRadius: 5,
			borderWidth: 2,
			borderColor: colors.purple
		},

		loginText: {
			fontSize: 15,
			fontWeight: 'bold',
			color: colors.purple
		},

		registerButton: {
			alignItems: 'center',
			marginTop: 20,
			borderRadius: 5,
			backgroundColor: colors.purple,
			paddingVertical: 11,
			width: '100%',
		},

		registerText: {
			fontSize: 15,
			fontWeight: 'bold',
			color: colors.white
		}

})