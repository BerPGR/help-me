import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../colors/colors'
import firebase from '../../firebaseConfig'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Login = ({navigation}) => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {

	}

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.loginWrapper}>
        <Text style={styles.headerTitle}>Market List</Text>
				<Text style={styles.text}>Welcome to the best market list for you and your family :)</Text>

				<TextInput 
					style={styles.input}
					placeholder='E-Mail'
					placeholderTextColor={colors.white}
					value={email}
					onChangeText={(email) => setEmail(email)}
				/>
				
				<TextInput 
					style={[styles.input, {marginTop: 20}]}
					placeholder='Password'
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
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.orange
    },

    loginWrapper: {
        backgroundColor: colors.white,
        width: width * 0.7,
        height: height * 0.5,
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
        padding: 20
    },

    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold'
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
			width: width * 0.5,
			borderRadius: 5,
			borderWidth: 2,
			borderColor: colors.orange
		},

		loginText: {
			fontSize: 15,
			fontWeight: 'bold',
			color: colors.orange
		},

		registerButton: {
			alignItems: 'center',
			marginTop: 20,
			borderRadius: 5,
			backgroundColor: colors.orange,
			paddingVertical: 11,
			width: width * 0.5,
		},

		registerText: {
			fontSize: 15,
			fontWeight: 'bold',
			color: colors.white
		}

})