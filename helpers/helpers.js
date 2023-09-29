export function formerUserInfo(unformattedUserInfo, type) {
	if (type === 'FB') {
		return {
			id: unformattedUserInfo.id,
			name: unformattedUserInfo.name,
			email: unformattedUserInfo.email,
			picture_url: unformattedUserInfo.picture.data.url,
		};
	} else if (type === 'Google') {
		return {
			id: unformattedUserInfo.id,
			name: unformattedUserInfo.name,
			email: unformattedUserInfo.email,
			picture_url: unformattedUserInfo.picture,
		};
	}
}
