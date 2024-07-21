import Vue from 'vue'
import Vuex from 'vuex'
import domain from 'domain.js'
import api from './LOCKED.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cList: [],                      // 币种列表
        CListIndex:0,                   // 当前选中币种

        levelList:[],                   // 用户等级列表（原始）
	},
    getters:{
        /* 当前选中币种名 */
        cName(state){
            let result = 'YSC'
            if(Array.isArray(state.cList) && state.cList.length){
                let item = state.cList[state.CListIndex] || false
                if(item){
                    result = item.name || ''
                }
            }
            return result
        },
        levelList(state){
            let result = []
                if(Array.isArray(state.levelList) && state.levelList.length){
                    state.levelList.map(item => {

                        /* 处理折扣 */
                        if(item.integral_off){
                            item.integral_off_name = (item.integral_off / 10) + '折'
                        }else{
                            item.integral_off_name = '-'
                        }
                        
                        result.push(item)
                    })
                }
                return result
        },
    },
    mutations:{
        /* 更改选中币种 */
        changeCListIndex(state,index){
            state.CListIndex = index
        },
        /* 用户等级列表 */
        setLevelList(state,list){
            state.levelList = list
        }
    },
	actions:{
        // 拉取币种列表
        async getCList({state}){
            try{
                const response = await domain.www(api.c_list)
                const {code,data=[]} = response
                if(code == 200){
                    state.cList = data
                    return true
                }else{
                    return false
                }
            }catch(e){
                return false
            }
        },
        /* 拉取用户余额 */
        // async getUserBalance(){
        //     try{
        //         const response = await domain.www(api.user_balance)
        //         const {code,data=[]} = response
        //         if(code == 200){
        //             console.log(data)
        //             // state.cList = data
        //         }
        //     }catch(e){}
        // }
        /* 拉取等级列表 */
        async getLevelList({commit}){
            try{
                const response = await domain.www(api.levelList)
                const {code,data={}} = response
                if(code == 200){
                    commit('setLevelList',data.data || [])
                }
            }catch(e){}
        }
    },
    
})
export default store