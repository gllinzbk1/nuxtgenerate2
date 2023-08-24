import { ref, toRefs, watchEffect } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios'

export const usePublicNavStore = defineStore('publicnav', {
  state: () => ({
    header:[],
    footer:[]

  }),

  getters: {
  },

  actions: {
    init(pdata){
     console.log('storeInitPublicNav',useSize(pdata),pdata.header)
      this.header = pdata.header;
      //this.allTags = pdata.data.allTags; ,可能因为空，赋值，倒致重写写不了
      this.footer = pdata.footer;
      return this
    },
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
