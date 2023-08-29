import { ref } from 'vue'
import axios from 'axios'

// const API_URL = 'http://f.lgl.lb.in:8080/vueapi/list?url=carbon-mountain-bike&page=1'


// const productList = ref([])
// const allTags = ref([])
// const mainCategory = ref([])
// const cateItems = ref([])
// const quickArr = ref([])
// watchEffect(async () => {
//   // 该 effect 会立即运行，
//   // 并且在 currentBranch.value 改变时重新运行
//   const url = `${API_URL}`  //${currentBranch.value}
//   const productData = await (await fetch(url,{headers:{"Access-Control-Allow-Origin":"*"}})).json()
//   console.log("pd:",productData)
//   if(productData.data != null){
//     productList.value = productData.data.productList;
//     allTags.value = productData.data.allTags;
//     mainCategory.value = productData.data.mainCategory;
//     cateItems.value = productData.data.cateItems;
//     quickArr.value = productData.data.quickArr;

//   }
// })
export const registerStore = (id) => {
  //export const useProductList = defineStore('productStore', {
    return id = defineStore(id, {
    state: () => ({
      //---已赋值
      products: [],         //产品列表 
      allTags: [],             //展示传参
      mainCategory: [],        //当前主类
      subCategory: [],        //子类
      //quickArr: [],           //快购菜单
      kvTags:[],
      filterResult:[], //搜索结果

      //---操作传值
      mainCategoryActive: '',  //选中的主类
      subCategoryActive: '',//选中的子类

      seriesActive: '',  //选中的Series属性
      sizeActive: '',  //选中的Size属性
      internal_widthActive: '',  //选中的INTERNAL WIDTH属性
      disciplineActive: '' , //选中的Discipline属性
      availabilityActive: '',  //选中的AVAILABILITY属性
      depthActive: '',
      tire_width_rangeActive:'',
      bsdActive:'',
      typeActive:'',
      brake_systemActive:'',
      wheel_profileActive:'',
      quick_buyActive:'',  

      maxPrice: 0,
      priceRange: [
        { id: 1, text: '$10', min: 0, max: 10 },
        { id: 2, text: '$10-$100', min: 10, max: 100 },
        { id: 3, text: '$100-$500', min: 100, max: 500 },
        { id: 4, text: '$500', min: 500 },
        { id: 5, text: 'All', min: 0 }
      ],
      priceRangeActive: { min: 0 },
      priceSlider: [0, 0],
      priceSliderOptions: { min: 0, max: 0, interval: 1, dotSize: 16, height: 6 },
      ratingRangeActive: { min: 0, max: 5 },
      sortBy: 'id',
      grid: true,
      searchValue: '',
      filterStatus: false


    }),

    getters: {
      getPreloader (state) {
        return state.preloader
      },
      getProducts (state) {
        return state.products
      },
      getSearchValue (state) {
        return state.searchValue
      },
      getMainCategoryActive (state) {
        return state.mainCategoryActive
      },
      getMainCategory (state) {
        return state.mainCategory
      },
      getSubCategoryActive (state) {
        return state.subCategoryActive
      },
      getSubCategory (state) {
        return state.subCategory
      },
      getSeriesActive (state) {
        return state.seriesActive
      },
      getSizeActive (state) {
        return state.sizeActive
      },
      getInternal_widthActive (state) {
        return state.internal_widthActive
      },
      getDisciplineActive (state) {
        return state.disciplineActive
      },
      getAvailabilityActive (state) {
        return state.availabilityActive
      },

      getTire_width_rangeActiveActive (state) {
        return state.tire_width_rangeActive
      },
      getBsdActive (state) {
        return state.bsdActive
      },
      getTypeActive (state) {
        return state.typeActive
      },
      getBrake_systemActive (state) {
        return state.brake_systemActive
      },
      getWheel_profileActive (state) {
        return state.wheel_profileActive
      },
      getQuick_buyActive (state) {
        return state.quick_buyActive
      },
      getkvTagsActive (state) {
        return state.kvTagsActive
      },
      

      getBrands (state) {
        return state.brands
      },
      getBrandsActive (state) {
        return state.brandsActive
      },
      getPriceRange (state) {
        return state.priceRange
      },
      getPriceRangeActive (state) {
        return state.priceRangeActive
      },
      getPriceSlider (state) {
        return state.priceSlider
      },
      getPriceSliderOptions (state) {
        return state.priceSliderOptions
      },
      getRatingRangeActive (state) {
        return state.ratingRangeActive
      },
      getSortBy (state) {
        return state.sortBy
      },
      getGrid (state) {
        return state.grid
      },
      getFilterStatus (state) {
        return state.filterStatus
      }
    },

    actions: {
      init(pdata){
        console.log('storeInitDataLength',useSize(pdata))
        this.products = pdata.data.productList;
        //this.allTags = pdata.data.allTags; ,可能因为空，赋值，倒致重写写不了
       // this.allTags = pdata.data.cateItems.all.allTags; //,可能因为空，赋值，倒致重写写不了
        this.mainCategory = pdata.data.cate;
        this.subCategory = pdata.data.cateItems;
        //this.quickArr = pdata.data.quickArr;
        this.kvTags = pdata.data.kvTags;
        return this
      },

      hidePreloader () {
        this.preloader = false
      },
      setMaxPrice (value) {
        this.maxPrice = value
        this.priceRangeActive.min = 0
        this.priceRangeActive.max = value
        this.priceSlider = [0, value]
        this.priceSliderOptions.min = 0
        this.priceSliderOptions.max = value
        this.priceRange[3].max = value
        this.priceRange[4].max = value
      },
      
      updatePriceRange (value) {
        this.priceRangeActive = value
        this.priceSlider = [value.min, value.max]
        this.priceSliderOptions.min = value.min
        this.priceSliderOptions.max = value.max
      },
      updatePriceRangeSlider (value) {
        this.priceSlider = value
      },
      updateRatingRange (value) {
        this.ratingRangeActive = value
      },
      updateSortBy (value) {
        this.sortBy = value
      },
      changeGrid (status) {
        this.grid = status
      },
      changeFilterStatus (state) {
        this.filterStatus = !this.filterStatus
      },
      clearFilter (state) {
        this.brandsActive = []
        this.priceRangeActive.min = 0
        this.priceRangeActive.max = this.maxPrice
        this.priceSlider = [0, this.maxPrice]
        this.priceSliderOptions.min = 0
        this.priceSliderOptions.max = this.maxPrice
        this.ratingRangeActive.min = 0
        this.ratingRangeActive.max = 5

        this.mainCategoryActive = ''  //选中的主类
        this.subCategoryActive = ''  //选中的子类
        this.seriesActive = ''  //选中的Series属性
        this.sizeActive = ''  //选中的Size属性
        this.internal_widthActive = ''  //选中的INTERNAL WIDTH属性
        this.disciplineActive = ''  //选中的Discipline属性
        this.availabilityActive = ''  //选中的AVAILABILITY属性
        this.depthActive = ''
        this.tire_width_rangeActive = ''
        this.bsdActive = ''
        this.typeActive = ''
        this.brake_systemActive = ''
        this.wheel_profileActive = ''
        this.quick_buyActive = ''

      },
      clearRating (state) {
        this.ratingRangeActive.min = 0
        this.ratingRangeActive.max = 5
      },

      /**
       * 数据请求
       * @param {*} url
       * @param {*} param
       * @returns
       */
      getServerData(url, param) {
        console.log('getServerData')
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
}
