import * as user from './actionType'

// 保存用户信息
export const saveUserInfo=(userInfo)=>{
    return {
        type: user.SAVA_USERINFO,
        userInfo
    }
}