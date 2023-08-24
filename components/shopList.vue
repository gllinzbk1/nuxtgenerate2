<template>
  <blueblocksui-banner :basics="true" title="MOUNTAIN BIKE RIMS/WHEELS" description=" "
    pcBackgroundImage="https://www.lightbicycle.com/images/page-img/Mountain-background-20190523.jpg"
    mobileBackgroundImage="https://www.lightbicycle.com/images/page-img/Mountain-background-mo-20190523.jpg"></blueblocksui-banner>
  <div class="py-4 border-b border-gray-300">
    <div class="max-w-1366 m-auto">
      <blueblocksui-Breadcrumb :separator="true" :link="link"></blueblocksui-Breadcrumb>
    </div>
  </div>
  <div class="max-w-1366 m-auto">
    <div class="grid grid-cols-4">
      <div class="mt-5 col-span-1  lg:block">
        <blueblocksui-category-filters :categories="subCategory" :filters="allTags"></blueblocksui-category-filters>
      </div>
      <div class="col-span-4 lg:col-span-3">
        <div class="grid grid-cols-2 lg:grid-cols-3 border-l border-gray-300">
          <blueblocksui-card type="product" :link="item.link" :thumbnail="item.thumbnail" :price="item.price" :standard="item.standard"
            :thumbnailMo="item.thumbnailMo" :title="item.title" :description="item.description"
            v-for="item, index in items.rows" :key="index"></blueblocksui-card>
        </div>

        <div class="mb-10 mt-7 col-span-3">
          <blueblocksui-pagination :pagination="paginations" position="center"></blueblocksui-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script setup>
import { ref } from 'vue'

//=============变量初始处理=======================
let items = ref([])

//=============逻辑处理==========================
// 获取当前路由
const route = useRoute();
console.log("shopList.route.params", route.params)

//--------------获取路由分析结果--------------------
const routeResult = useAnalyzeRoute(route);
//--------------以ID:routeResult[0]获取Store对象,并解构所要的变量-------------------------
const productStore = getStoreById(routeResult[0])
const { products, subCategory, cate, quickArr, allTags } = storeToRefs(productStore)
//产品字段优化处理，以便传参到组件，同时生成productlists用于搜索的，这里可以再优化，直接用products，所以products生成时要优化
const productlists = useProductListFieldProcess(productStore,routeResult)
//console.log('productlists',productlists.value)

//--------------数据加载与路由关联,从路由获取的参数，变成过滤参数-----------------------------

//初次加载，若有过滤参数，要处理过滤
useProductRouteUrl(productStore, routeResult)
items.value = useFilteredProducts(productStore, productlists.value)
//console.log('items.value',items.value)
//--------------路由变化，监听，数据过滤-----------------------------------------
watch(routeResult, (currentrout, newroute) => {
  useProductRouteUrlWatch(productStore, currentrout)
  items.value = useFilteredProducts(productStore, productlists.value)
})
//=============数据处理,meta==========================
//console.log('alltags', allTags)
const link = ref([
  { name: 'Shop', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
],)
const paginations = ref([]);
const currentPage = routeResult['page'] ?? 1

if(items.value.pagesum>0){
  for (let index = 1; index <= items.value.pagesum; index++) {
    paginations.value.push({ url: routeResult['fullPathNoPage']+'/page-'+index, page_number: index, is_current: currentPage==index ? true : false, type: 'link' });  
  }
}else{
  console.log('nopage',items.pagesum,items.value.pagesum)
}
// const paginations = ref(
//   [
//     { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/1', page_number: 1, is_current: true, type: 'link' },
//     { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/2', page_number: 2, is_current: false, type: 'link' },
//     { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/3', page_number: 3, is_current: false, type: 'link' },
//     { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/4', page_number: 4, is_current: false, type: 'link' },
//     { url: '', page_number: '', is_current: false, type: 'ellipsis' },
//     { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/5', page_number: 8, is_current: false, type: 'link' },
//   ],
// )
const appConfig = useAppConfig()
const seo = productStore.subCategory[routeResult[1] ? routeResult[1] : 'all']['seo']
useHead({
  templateParams: {
    site: {
      name: appConfig.siteName,
      url: 'https://www.lightbicycle.com',
    },
    separator: '-',
  },
  title: seo['title'],
  titleTemplate: '%s',
  meta: [
    {
      name: 'keywords',
      content: seo['keywords'],
    },
    {
      name: 'description',
      content: seo['description'],
    },
    {
      property: 'og:Title',
      content: seo['title'],
    },
    {
      property: 'og:Description',
      content: seo['description'],
    },
    {
      property: 'og:Image',
      content: '123',
    },
    {
      property: 'og:url',
      content: '%site.url'+routeResult['fullPath'],
    },
  ],
})
</script>
<style scoped>/* @import url(../../dist/shop/main.css); */</style>