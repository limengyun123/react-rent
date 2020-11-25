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
           
    }
}