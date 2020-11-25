import * as user from './actions/actionType'

let defaultState = {
	userInfo: {},
	geohash: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=defaultState,action={})=>{
	switch (action.type) {
		case user.SAVA_USERINFO:
			return {
				...state,
				userInfo: action.userInfo
			  }
		case user.MODIFY_USERINFO:
			return{
				...state,
				userInfo:{
					...state.userInfo, [action.key]: action.value
				}
			}
		default:
			return state
	}
}