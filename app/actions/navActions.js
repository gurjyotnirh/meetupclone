exports.openCreateEvent = () => {
		return {
		type:'OPEN_CREATE_EVENT'
		}
}

exports.openEditProfile = () => {
	return {
		type:'OPEN_EDIT_PROFILE'
	}
}

exports.openFindFriends = () =>{
	return {
		type:'OPEN_FIND_FRIENDS',
		
	}
}

exports.openEventLoaction = (lat, lon) =>{
	return {
		type:'OPEN_EVENT_LOCATION',
		location:[lat,lon]
	}
}

exports.navigateToForgetPassword = () =>{
	return {
		type: 'OPEN_FORGET_PASSWORD'
	}
}

exports.openMainApp = () =>{
	return {
		type:'OPEN_MAIN_APP'
	}
}

exports.openflagObject = (isEvent = true) =>{
	return {
		type:'OPEN_FLAG_OBJECT',
		isEvent
	}
}

exports.OPEN_PEOPLE_INFO = () => {
	return {
		type:'OPEN_PEOPLE_INFO'
	}
}
exports.openEditEvent = () =>{
	return {
		type:'OPEN_EDIT_EVENT'
	}
}

exports.openUserProfile = () => {
	return {
		type:'OPEN_USER_PROFILE'
	}
}