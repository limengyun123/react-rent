export const ADMIN_VALIDATED = 2;
export const USER_VALIDATED = 1;

export var API = {

    /**
     * 获取用户信息
     * 简易版，待完善。。。
     */
    getUser:async(an)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && (result instanceof Array)){
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
            let result = await require('./myInfo.json');
            if(result.status !==0 && (result instanceof Object)){
                let userInfo = result.userInfo;
                for(let i=0;i<userInfo.length;i++){
                    if(userInfo[i].accountName===an && userInfo[i].password===psw){
                        return USER_VALIDATED;
                    }
                }
                let adminInfo = result.adminInfo;
                for(let ad of adminInfo){
                    if(ad.id===an && ad.password===psw){
                        return ADMIN_VALIDATED;
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

    /**
     * 加载主页时，获取分页房源信息
     * 简易版，待完善。。。
     */
    getRoomsInfo:async(from,to)=>{
        try{
            let result = await require('./rooms.json');
            if(result.status !==0 ){
                return {
                    lenRooms: result.length,
                    rooms: result.slice(from,to)
                };
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
    },
    /**
     * 获得某一具体房源信息
     * 简易版，待完善。。。
     */
    getRoomDetail:async(roomID)=>{
        try{
            let result = await require('./rooms.json');
            if(result.status !==0 ){
                for(let room of result){
                    if(room.roomID===roomID){
                        return room;
                    }
                }
                return null;
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
    },
    /**
     * 获得评论
     * 简易版，待完善。。。
     */
    getComments:async(from,to)=>{
        try{
            let result = await require('./comments.json');
            if(result.status !==0 ){
                return {
                    lenComments: result.length,
                    comments: result.slice(from,to)
                };
            }else{
                let err = {
                    tip: "获取评论失败",
                    response: result,
                }
                throw err;
            }
        }
        catch(err){
            throw err;
        }
    },
    postRoomInfo:async(from,to)=>{
        return false;
    }

}