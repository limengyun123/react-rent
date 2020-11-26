export var API = {

    /**
     * 获取用户信息
     * 简易版，待完善。。。
     */
    getUser:async(an)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && (result instanceof Object)){
                for(let i=0;i<result.length;i++){
                    if(result[i].accountName===an){
                        return result[i]
                    }
                }
                return []
            }else{
                let err = {
                    tip: "获取用户信息失败",
                    response: result,
                }
                throw err;
            }
            
        }catch(err){
            throw err;
        }
    },

    setUser:async(info)=>{
        
        try{
            // TODO
         }
        catch(err){
            throw err;
        }   
    },

    /**
     * 登录时验证用户信息
     * 简易版，待完善。。。
     */
    validateUserInfo:async(an,psw)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && (result instanceof Object)){
                for(let i=0;i<result.length;i++){
                    if(result[i].accountName===an && result[i].password===psw){
                        return true;
                    }
                }
                return false;
            }else{
                let err = {
                    tip: "获取用户信息失败",
                    response: result,
                }
                throw err;
            }
        }
        catch(err){
            throw err;
        }
    },

    /**
     * 注册账号时，查找账号是否已被注册
     * 简易版，待完善。。。
     */
    findUser:async(an)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && (result instanceof Object)){
                for(let i=0;i<result.length;i++){
                    if(result[i].accountName===an){
                        return false;
                    }
                }
                return true;
            }else{
                let err = {
                    tip: "获取用户信息失败",
                    response: result,
                }
                throw err;
            }
        }
        catch(err){
            throw err;
        }
           
    },

    /**
     * 忘记密码时，通过账号和邮箱找回密码
     * 简易版，待完善。。。
     */
    checkAccountandEmail:async(an,email)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && (result instanceof Object)){
                for(let i=0;i<result.length;i++){
                    if(result[i].accountName===an && result[i].email){
                        return true;
                    }
                }
                return false;
            }else{
                let err = {
                    tip: "获取用户信息失败",
                    response: result,
                }
                throw err;
            }
        }
        catch(err){
            throw err;
        }
    },
    getRoomsInfo:async()=>{
        try{
            let result = await require('./rooms.json');
            if(result.status !==0 ){
                return result
            }else{
                let err = {
                    tip: "获取房屋信息失败",
                    response: result,
                }
                throw err;
            }
        }
        catch(err){
            throw err;
        }
    }

}