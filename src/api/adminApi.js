export var API = {

    /**
     * 获取所有用户信息
     * 简易版，待完善。。。
     */
    getUser:async(from,to)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 ){
                return {
                    lenUsers: result.length,
                    users: result.slice(from,to)
                };
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
    getSexPercentage:async()=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && result instanceof Array){
                let male=0,female=0;
                for(let item of result){
                    if(item.sex==="男"){
                        male++;
                    }
                    else{
                        female++;
                    }
                }
                return {"numFemale":female,"numMale":male};
            }else{
                let err = {
                    tip: "获取男女比例失败",
                    response: result,
                }
                throw err;
            }
            
        }catch(err){
            throw err;
        }
    },
    getUserDetail:async(ac)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && result instanceof Array){
                for(let item of result){
                    if(item.accountName===ac){
                        return item;
                    }
                }
                return null;
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
    getUploadRoom:async(from,to)=>{
        try{
            let result = await require('./rooms.json');
            if(result.status !==0 && result instanceof Array ){
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
            
        }catch(err){
            throw err;
        }
    },
    getRoomDetail:async(rID)=>{
        try{
            let result = await require('./rooms.json');
            if(result.status !==0 && result instanceof Array){
                for(let item of result){
                    if(item.roomID===rID){
                        return item;
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
            
        }catch(err){
            throw err;
        }
    },
    getAdmin:async()=>{
        try{
            let result = await require('./myInfo.json').adminInfo;
            if(result.status !==0 && result instanceof Array){
                return {
                    lenAdmins: result.length,
                    admins: result
                };
            }else{
                let err = {
                    tip: "获取管理员信息失败",
                    response: result,
                }
                throw err;
            }
            
        }catch(err){
            throw err;
        }
    }
}