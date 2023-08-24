// 搜索中间件校验
export default defineNuxtRouteMiddleware((to, from) => {
 // let { type, page } = to.params;
//   let { categories,series,size,internal_width,discipline,availability } = to.query;

// const url = useSplit(to.path,'/')
// console.log("query",size,to.query,to.path,to.params,to.fullPath,url[1])
//   let queryurl = to.path+'?status=search&url='+url[1];
//   if(categories){
//     queryurl += "&categories="+categories
//   } 
//   if(series){
//     queryurl += "&series="+series
//   } 
//   if(size){
//    // productStore.allTags.size.option.
//     queryurl += "&size="+size
//   } 
//   if(internal_width){
//     queryurl += "&internal_width="+internal_width
//   } 
//   if(discipline){
//     queryurl += "&discipline="+discipline
//   } 
//   if(availability){
//     queryurl += "&availability="+availability
//   } 
  console.log('queryurl',to.params,to.query)
//return queryurl;

//navigateTo(queryurl);

  // if (!size) {
  //   return abortNavigation("搜索内容不可以为空！");
  // }
  // return navigateTo("/bindphone?from=" + route.fullPath);
 // this.$router.push(`${this.$nuxt.$route.path}?page=${page}`)
  // if (!["course", "column"].includes(type) || isNaN(+page)) {
  //   return abortNavigation("Code:404! 页面走丢了");
  // }
});
