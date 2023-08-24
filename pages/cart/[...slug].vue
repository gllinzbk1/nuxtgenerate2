<script setup>
import { ref, onMounted } from 'vue'


const list = ref([])
let items = ref([])
// 获取当前路由
const route = useRoute();
//--获取数据--
const routeResult = useAnalyzeRoute(route);
//获取产品列表，并同步存入store,返回store对象
const productStore =  await useProductListInfo(routeResult[0],routeResult[0]);
//console.log('storeId',getActivePinia()?._s.get('mountainindex'));

const { products, categories, cate, quickArr,allTags  } = storeToRefs(productStore)
//产品字段优化处理，以便传参到组件，同时生成productlists用于搜索的，这里可以再优化，直接用products，所以products生成时要优化
const  productlists   = useProductListFieldProcess(products.value)

//console.log('productlists',productlists.value)

//--数据加载与路由关联--


//初次加载，若有query参数，要处理过滤
useProductRouteUrl(productStore,routeResult)
items.value = useFilteredProducts(productStore,productlists.value)

//路由变化，监听，数据过滤
watch(routeResult, (currentrout, newroute) => {
  const queryurl = useProductRouteUrlWatch(productStore,currentrout)
  items.value = useFilteredProducts(productStore,productlists.value)
  navigateTo(queryurl)
})
</script>


<template>
  <div class="grid grid-cols-3 gap-4 justify-center">
    <div class="col-span-1">
      <blueblocksui-category-filters :list="list" :subCategories="categories" :filters="allTags" />
    </div>
    <div class="col-span-2">
      <ProductLists :list="list" :products="items.rows" @func-method="handlePageChange" />
    </div>
  </div>


  <div class="flex flex-nowrap justify-center">
    <div class="w-2/6"> dddd </div>
    <div class="w-4/6"></div>
  </div>
  <div class="pagination" v-if="productlists">
    <!-- <Paginate
          v-model="page"
          page-count="3"
          :click-handler="handlePageChange"
          :prev-text="''"
          :next-text="''"
          :container-class="'pagination__list'"
          :page-class="'pagination__item'"
        />-->
  </div>
  <NuxtLink to="/carbon-mountain-bike">carbon-mountain-bike</NuxtLink>&nbsp;&nbsp;&nbsp;&nbsp;
    <NuxtLink to="/carbon-road-bike">carbon-road-bike</NuxtLink>&nbsp;&nbsp;&nbsp;&nbsp;
      <NuxtLink to="/carbon-fat-bike">carbon-fat-bike</NuxtLink>&nbsp;&nbsp;&nbsp;&nbsp;
        <NuxtLink to="/carbon-BMX-bike">carbon-BMX-bike</NuxtLink>&nbsp;&nbsp;&nbsp;&nbsp;
          <NuxtLink to="/carbon-accessories">carbon-accessories"</NuxtLink>&nbsp;&nbsp;&nbsp;&nbsp;
            <NuxtLink to="/carbon-road-gravel-cx-disc-bike">carbon-road-gravel-cx-disc-bike</NuxtLink>&nbsp;&nbsp;&nbsp;&nbsp;
  <NuxtLink to="/carbon-tri-time-trial-track-bike">carbon-tri-time-trial-track-bike</NuxtLink>&nbsp;&nbsp;&nbsp;&nbsp;
</template>

<style>
a {
  text-decoration: none;
  color: #42b883;
}

li {
  line-height: 1.5em;
  margin-bottom: 20px;
}

.author,
.date {
  font-weight: bold;
}</style>