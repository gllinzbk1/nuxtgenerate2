<script setup>
//--------------此页作路由分发，获取当前路由---------
const route = useRoute();
console.log("slug.route.params",route.params)

//--------------获取页面类型，列表/内容--------------  //1,列表，2 内容页
const pageStyle = useAnalyzeRouteIsListOrContent(route)
console.log('pageStyle',pageStyle)
//--------------获取路由分析结果--------------------
const routeResult = useAnalyzeRoute(route);
//--------------获取当前大类的产品列表,并初始ID为routeResult[0]的Store---------------  
//索引为0是产品大类，暂时没有严格大类列表模式
import { state, setProduct } from '~/stores/nav'

const product = computed({
  get: () => state.product,
  set: value => setProduct(value),
})

if(!Object.hasOwnProperty.call(product.value, 'data')){
  const { data:data } = await useFetch('/api/list?url='+category+'&page=1');
  // const { data:data } = await useFetch('/api/readjson',{      
  //     method: 'POST', // Post method works
  //     body: {
  //       category: routeResult[0]
  //     },
  //     responseType:'json'
  //   })
    setFooter(data.value)
  await useProductListInfo(routeResult[0],routeResult[0],data.value);
}else{
  await useProductListInfo(routeResult[0],routeResult[0],product.value);
}
</script>


<template>
  <shopList v-if="pageStyle==1"></shopList>
  <shopPage v-else-if="pageStyle==2"></shopPage>
</template>