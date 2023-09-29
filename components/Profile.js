import { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function Profile({ user }) {
	return (
		<View>
			<Text>User Profile Comp</Text>
			<Image source={{ uri: user.picture_url }} style={styles.image} />
			<Text style={styles.name}>{user.name}</Text>
			<Text>Email: {user.email}</Text>
			<Text>ID: {user.id}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	profile: { alignItems: 'center' },
	name: { fontSize: 20 },
	image: { width: 100, height: 100, borderRadius: 50 },
});
