import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native'
import { firebase } from '../../firebaseConfig'
import colors from '../colors/colors'
import { Entypo, Feather } from '@expo/vector-icons'
import profilePic from '../images/blankProfile.png'

const Profile = ({route, navigation}) => {

	const userRef = firebase.firestore().collection('users')
  const user = route.params.user.document

  return (
    <View style={styles.container}>
      
			<SafeAreaView>
				<View style={styles.headerWrapper}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Entypo name='chevron-left' size={32} color={colors.white}/>
					</TouchableOpacity>

					<TouchableOpacity>
						<Feather name='settings' size={28} color={colors.white}/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			<View style={styles.profileDescription}>
				<Text style={styles.userName}>Hey, {user.name}</Text>
				<Image source={profilePic} style={styles.profilePicture}/>
				<Text style={styles.infoText}>Name: {user.name}</Text>
				<Text style={styles.infoText}>Email: {user.email}</Text>
				<Text style={[styles.infoText, {marginBottom: 30}]}>Username: {user.username}</Text>
			</View>

			<TouchableOpacity style={styles.logOutButton} onPress={() => {
				Alert.alert(
					"Log Out",
					"Are you sure you want to sign out?",
					[
						{
							text: "Cancel"
						},
						{
							text: "Yes",
							onPress: () => {
								firebase.auth().signOut()
								.then(() => {
									navigation.navigate('Login')
									alert('Logged out!')
								})
							}
						}
					]
				)
			}}>
				<Text style={styles.logOutButtonText}>Log Out</Text>
			</TouchableOpacity>
			
			<TouchableOpacity style={styles.logOutButton} onPress={() => {
				Alert.alert(
					"Delete account",
					"This one is forever, are you sure?",
					[
						{
							text: "Cancel"
						},
						{
							text: "Yes",
							onPress: () => {
								firebase.auth().signOut()
								.then(() => {
									userRef.doc(user.id)
									.delete()
									.then(() => {
										alert('User deleted!')
										navigation.replace('Login')
									})
									.catch(error => alert(error.message))
								})
								.catch(error => error.message)
							}
						}
					]
				)
			}}>
				<Text style={styles.logOutButtonText}>Delete Account</Text>
			</TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.purple,
		paddingHorizontal: 25,
	},

	headerWrapper: {
		marginTop: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	profileDescription: {
		marginTop: 20
	},

	userName: {
		fontSize: 32,
		color: colors.white,
		fontWeight: 'bold',
		marginBottom: 20
	},

	profilePicture: {
		width: 128,
		height: 128,
		alignSelf: 'center',
		borderRadius: 32,
		marginBottom: 30
	},

	infoText: {
		fontSize: 24,
		color: colors.white,
		fontWeight: 'bold',
		marginTop: 10
	},

	logOutButton: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: colors.red,
		paddingVertical: 15,
		borderRadius: 15,
		borderWidth: 2,
		borderColor: colors.white,
		marginTop: 20
	},

	logOutButtonText: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 16
	}
})