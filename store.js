import Vue from 'vue'
import Vuex from 'vuex'
import domain from 'domain.js'
import api from './LOCKED.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cList: [],                      // 币种列表
        CListIndex:0,                   // 当前选中币种
	},
    getters:{
        /* 当前选中币种名 */
        cName(state){
            let result = 'BTC'
            if(Array.isArray(state.cList) && state.cList.length){
                let item = state.cList[state.CListIndex] || false
                if(item){
                    result = item.name || ''
                }
            }
            return result
        },
    },
    mutations:{
        /* 更改选中币种 */
        changeCListIndex(state,index){
            state.CListIndex = index
        },
    },
	actions:{
        // 拉取币种列表
        async getCList({state}){
            try{
                const response = await domain.www(api.c_list)
                const {code,data=[]} = response
                if(code == 200){
                    state.cList = data
                }
            }catch(e){}
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
    },
    
})
export default store