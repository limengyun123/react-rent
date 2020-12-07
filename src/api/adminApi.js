export var API = {

    /**
     * 获取所有用户信息
     * 简易版，待完善。。。
     */
    getUser:async(an)=>{
        try{
            let result = await require('./myInfo.json').userInfo;
            if(result.status !==0 && (result instanceof Array)){
                return result
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
}