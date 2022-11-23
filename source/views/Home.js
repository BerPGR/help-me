import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { firebase } from '../../firebaseConfig'
import colors from '../colors/colors'
import { Entypo } from '@expo/vector-icons'

const Home = ({route, navigation}) => {

  const userRef = firebase.firestore().collection('users')
  const listsRef = firebase.firestore().collection('lists')

  const user = route.params.usuario
  return (
		<View style={styles.container}>
			<SafeAreaView>
				<View style={styles.headerWrapper}>
					<TouchableOpacity>
						<Entypo name='menu' size={32} color={colors.white}/>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate('Profile', {user: user})}>
						<Image source={require('../images/blankProfile.png')} style={styles.profileImage}/>
					</TouchableOpacity>
				</View>
    	</SafeAreaView>

			<View styles={styles.listsWrapper}>
				{user.document.lists.length == 0 
					?
					<TouchableOpacity onPress={() => navigation.navigate('CreateList')} style={styles.createListButton}>
						<Text>Create MarketList</Text>
					</TouchableOpacity>
					:
					<Text>bawsldyiugfsdilbg</Text>
				}
			</View>
		</View>
  )
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.purple
	},

	headerWrapper: {
		paddingHorizontal: 20,
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	profileImage: {
		width: 52,
		height: 52,
		borderRadius: 5,
		resizeMode: 'contain'
	}
})