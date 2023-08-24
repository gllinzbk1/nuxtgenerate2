import { ref, toRefs, watchEffect } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios'

// const API_URL = 'https://phpstack-766467-2598647.cloudwaysapps.com/database_visualization/json.php'

// const commits = ref(null)
// watchEffect(async () => {
//   // 该 effect 会立即运行，
//   // 并且在 currentBranch.value 改变时重新运行
//   const url = `${API_URL}`  //${currentBranch.value}
//   commits.value = await (await fetch(url)).json()
// })
const API_URL = 'https://phpstack-766467-2598647.cloudwaysapps.com/tongyong_hasura_api/sql_query_results.php'

const commits = ref(null)

watchEffect(async () => {
  // 该 effect 会立即运行，
  // 并且在 currentBranch.value 改变时重新运行
  //https://blog.csdn.net/weixin_45919499/article/details/124281937
  const url = `${API_URL}`  //${currentBranch.value}
  let newdata = await (await fetch(url,{
                                          method: 'post',
                                          headers: {
                                              "Content-Type": "application/json;charset=utf-8"
                                          },
                                          body: JSON.stringify([{"query_sid": "44f3be87-1359-4abd-93ef-5c4b6a1ab800","condition": {},"offset": 0,"limit": 5000}])
                                      }
                                    )).json()
  let newd = newdata.message[0]['data'];

  var new_row = {};
  for(const k in newd){
    //console.log('xy',newd[k]['coordinate_x'],newd[k]['coordinate_y'],newd[k]);
    if(newd[k]['coordinate_y'] ==1){
      new_row[newd[k]['coordinate_x']] = newd[k];
      new_row[newd[k]['coordinate_x']]['child'] = {};
    }else{
      //console.log('kk',k,newd[k]['coordinate_x'],(Object.keys(new_row)).includes(newd[k]['coordinate_x']),newd[k],new_row)
      if((Object.keys(new_row)).includes(newd[k]['coordinate_x'])==false) {
        new_row[newd[k]['coordinate_x']] = {};
        new_row[newd[k]['coordinate_x']]['child'] = {};
      }
      new_row[newd[k]['coordinate_x']]['child'][newd[k]['coordinate_y']] = newd[k];
    }
  }
  commits.value =  new_row;

})

// await axios.post(API_URL, [{"query_sid": "44f3be87-1359-4abd-93ef-5c4b6a1ab800","condition": {},"offset": 0,"limit": 5000}])
//         .then((response) => {
//           if (response.status != 200) {
//             alert('数据请求失败，请刷新后重试！');
//             return false;
//           }
//           if(response.data.success == true){
//             var newd = response.data.message[0]['data'];

//             var new_row = {};
//             for(const k in newd){
//               //console.log('xy',newd[k]['coordinate_x'],newd[k]['coordinate_y'],newd[k]);
//               if(newd[k]['coordinate_y'] ==1){
//                 new_row[newd[k]['coordinate_x']] = newd[k];
//                 new_row[newd[k]['coordinate_x']]['child'] = {};
//               }else{
//                 //console.log('kk',k,newd[k]['coordinate_x'],(Object.keys(new_row)).includes(newd[k]['coordinate_x']),newd[k],new_row)
//                 if((Object.keys(new_row)).includes(newd[k]['coordinate_x'])==false) {
//                   new_row[newd[k]['coordinate_x']] = {};
//                   new_row[newd[k]['coordinate_x']]['child'] = {};
//                 }
//                 new_row[newd[k]['coordinate_x']]['child'][newd[k]['coordinate_y']] = newd[k];
//               }
//             }
//             commits.value =  new_row;
//           }
//         })
//         .catch(function (error) {
//           console.log("getdataerror:",error)
//         })


export const useSqlParamStore = defineStore('sqlparam', {
  state: () => ({
    selectEs:[],
    commits:commits,
    rightDrawerOpen:false,
    tselect:[],
    showul:'isParam',
    graphqlmessage:'',
    sqlmessage: '',
    colorset:[]

  }),

  getters: {
  },

  actions: {
    /**
     * 数据请求
     * @param {*} url
     * @param {*} param
     * @returns
     */
    getServerData(url, param) {
      return axios.post(url, param)
        .then(function (response) {

          if (response.status != 200) {
            alert('数据请求失败，请刷新后重试！');
            return false;
          }

          return response.data;

        })
        .catch(function (error) {
          console.log(error)
        })
    },

    getArrayKey(array, item) {
      for (var i in array) {
        if (array[i] == item) {
          return i;
        };
      }
    }
  }
})
