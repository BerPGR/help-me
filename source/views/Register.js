import { Button, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../colors/colors'
import { firebase } from '../../firebaseConfig'

const Register = ({navigation}) => {
	
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const usersRef = firebase.firestore().collection('users')

	const handleRegister = () => {
		if (email && password && username) {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(userCredentials => {
				const user = userCredentials.user
				const timestamp = firebase.firestore.FieldValue.serverTimestamp()
				const data = {
					email: email,
					password: password,
					username: username,
					registeredAt: timestamp
				}
				usersRef
				.add(data)
				.then(() => {
					setEmail('')
					setPassword('')
					setUsername('')
					Keyboard.dismiss()
					navigation.replace('Login')
				})
				.catch(error => alert(error))
					alert('User created!')
			})
			.catch(error => { 
				alert(error)
				return
			})
		}
		else {
			alert('Check out for missing fields!')
		}
	}

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
			<ScrollView>
      	<SafeAreaView>
					<View style={styles.headerWrapper}>
				  	<Text style={styles.headerTitle}>Create your account</Text>
						<Text style={styles.headerText}>Create here your MarketHelp account in a easy way!</Text>
					</View>
				</SafeAreaView>

				<View style={styles.inputsWrapper}>
					<Text style={styles.inputTitle}>E-Mail</Text>
					<TextInput 
						placeholder='E-Mail'
						autoCapitalize='none'
						placeholderTextColor={colors.white}
						style={styles.input}
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>

					<Text style={styles.inputTitle}>Password</Text>
					<TextInput 
						secureTextEntry
						placeholder='Password'
						autoCapitalize='none'
						placeholderTextColor={colors.white}
						style={styles.input}
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>

					<Text style={styles.inputTitle}>Username</Text>
					<TextInput 
						placeholder='Username'
						autoCapitalize='none'
						placeholderTextColor={colors.white}
						style={styles.input}
						value={username}
						onChangeText={(text) => setUsername(text)}
					/>
				</View>

				<TouchableOpacity style={styles.createAccountButton} onPress={handleRegister}>
					<Text style={styles.buttonText}>Create Account</Text>
				</TouchableOpacity>
			</ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: colors.white
    },

    headerWrapper: {
      alignItems: 'center',
			marginTop: 15
    },

		headerTitle: {
			fontSize: 32,
			fontWeight: 'bold',
			color: colors.purple
		},

		headerText: {
			marginTop: 5,
			fontSize: 20,
			textAlign: 'center',
			color: colors.purple
		},

		inputsWrapper: {
			marginTop: 40
		},

		inputTitle: {
			fontSize: 28,
			color: colors.purple,
			fontWeight: 'bold',
			marginBottom: 5
		},

		input: {
			width: '100%',
			backgroundColor: colors.gray,
			color: colors.white,
			paddingVertical: 15,
			paddingLeft: 20,
			borderRadius: 10,
			marginBottom: 25
		},

		createAccountButton: {
			backgroundColor: colors.purple,
			paddingVertical: 14,
			alignItems: 'center',
			borderRadius: 10,
			marginTop: 20
		},

		buttonText: {
			color: colors.white,
			fontWeight: 'bold',
			fontSize: 16
		}
})