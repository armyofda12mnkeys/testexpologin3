import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';

import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Profile from './components/Profile';
import { formerUserInfo } from './helpers/helpers';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const [userInfo, setUserInfo] = useState(null);

	const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest({
		androidClientId: '486686041732-pc6bum5uurn4u8mvlvr5uohi9gj8c6u0.apps.googleusercontent.com',
		iosClientId: '', //add later
		webClientId: '486686041732-ideie2roo1ka25g18kanoba7bvgomv0e.apps.googleusercontent.com',
	});

	//##########################
	//Google Signin Code
	useEffect(() => {
		handleSigninWithGoogle();
	}, [responseGoogle]);

	async function handleSigninWithGoogle() {
		const user = await AsyncStorage.getItem('@user');
		if (!user) {
			if (responseGoogle?.type === 'success') {
				await getUserInfo(responseGoogle.authentication.accessToken);
			}
		} else {
			setUserInfo(JSON.parse(user)); //load from Async Storage
		}
	}
	const getUserInfo = async (token) => {
		if (!token) return;
		try {
			const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
				headers: { Authorization: `Bearer ${token}` },
			});
			const userInfoGoogle = await response.json();
			console.log('################################');
			const formattedUserInfo = formerUserInfo(userInfoGoogle, 'Google');
			setUserInfo(formattedUserInfo);
			await AsyncStorage.setItem('@user', JSON.stringify(formattedUserInfo));
		} catch (error) {
			console.log(error);
		}
	};
	//##########################

	return (
		<View style={styles.container}>
			<Text>{JSON.stringify(userInfo, null, 2)}</Text>
			{userInfo ? (
				<>
					<Profile user={userInfo} />
					<Button title="Delete Local Storage" onPress={() => AsyncStorage.clear()} />
				</>
			) : (
				<>
					<Button title="Sign In with Google" onPress={() => promptAsyncGoogle()} />
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
