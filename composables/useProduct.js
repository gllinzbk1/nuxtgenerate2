
// 获取产品信息,调用store,并存入；不需要重新获取数据，请用usePinia复用件getStoreById(storeName)获取
export async function useProductListInfo(category,storeName,data) {


  // const { data:data } = await useFetch('/api/list?url='+category+'&page=1')  
  // const pdata = JSON.parse(data.value)
  // console.log('apiDataLength',useSize(pdata),pdata)

  const productStore = registerStore(storeName)().init(data); 
    //------已改成pinia的actions，init方法处理---   
    // productStore.products = pdata.data.productList;
    // productStore.allTags = pdata.data.allTags;
    // productStore.cate = pdata.data.cate;
    // productStore.categories = pdata.data.cateItems;
    // productStore.quickArr = pdata.data.quickArr;
   // console.log('productStoreinit',productStore)
    return productStore;
}

// 产品字段整理信息，这个到时从api处优化，
export function useProductListFieldProcess(productStore,routeResult) {
  const p = productStore.products
  //console.log('ppppp',p,'1')
  const productlists = ref([])
  for (const index in p) {
    const pv = p[index];
   // if (pv.thumbnail?.file_path == undefined || pv.thumbnail?.file_path == null) continue
    productlists.value.push({
      id: pv.id,
      description: pv.cateItems?.cate_id,
      link: routeResult['pathProfix']+productStore.mainCategory.url+"/"+pv.categories+"/"+pv.seo.url,
      title: pv.name,
      info:pv.name,
      imageSrc: 'https://www.lightbicycle.com' + pv.imgMax,//pv.thumbnail?.file_path,
      thumbnail: 'https://www.lightbicycle.com' + pv.imgMax,//pv.thumbnail?.file_path,
      thumbnailMo: 'https://www.lightbicycle.com' + pv.imgMin,//pv.thumbnail?.file_path,
      imageAlt: p.index?.thumbnail?.alt,//p[index]['thumbnail']['file_path']['alt'],
      price: parseInt(pv.basic_price),
      standard: pv.basic_weight + ' +/- ' + pv.weight_interval,
      color: "#fff",
      size: pv.size,
      series: pv.series,
      internal_width: pv.internal_width,
      discipline: pv.discipline,
      availability: pv.availability,
      tire_width_range: pv.tire_width_range,
      bsd: pv.bsd,
      typed: pv.type,
      brake_system: pv.brake_system,
      wheel_profile: pv.wheel_profile,
      categories:pv.categories,
      quick_wheels:pv.quick_wheels,
      //type: 'product',
    })
  }
  console.log('productlists',useSize(productlists))
  return productlists

}


//产品搜索过滤
export function useFilteredProducts(productStore,productlists) {
//console.log('productlistsfilter',useSize(productlists),productStore)
  const sresult = productlists.filter((item) => {
    item.price != '' ? item.price : 0;
    //onsole.log('useFilteredProductsa',item.id,item)
    return (productStore.getSearchValue.length === 0 || item.name.toLowerCase.includes(productStore.getSearchValue.toLowerCase()))
      && (productStore.getSubCategoryActive.length === 0 || productStore.getSubCategoryActive.includes(item.categories))
      && (productStore.getSeriesActive.length === 0 || productStore.getSeriesActive=='all' || productStore.getSeriesActive.includes(item.series))
      && (productStore.getSizeActive.length === 0 || productStore.getSizeActive=='all' || productStore.getSizeActive.includes(item.size))
      && (productStore.getInternal_widthActive.length === 0 || productStore.getInternal_widthActive=='all' || productStore.getInternal_widthActive.includes(item.internal_width))
      && (productStore.getDisciplineActive.length === 0 || productStore.getDisciplineActive=='all' || productStore.getDisciplineActive.includes(item.discipline))
      && (productStore.getAvailabilityActive.length === 0 || productStore.getAvailabilityActive=='all' || productStore.getAvailabilityActive.includes(item.availability))

      && (productStore.getTire_width_rangeActiveActive.length === 0 || productStore.getTire_width_rangeActiveActive=='all' || productStore.getTire_width_rangeActiveActive.includes(item.tire_width_range))
      && (productStore.getBsdActive.length === 0 || productStore.getBsdActive=='all' || productStore.getBsdActive.includes(item.bsd))
      && (productStore.getTypeActive.length === 0 || productStore.getTypeActive=='all' || productStore.getTypeActive.includes(item.type))
      && (productStore.getBrake_systemActive.length === 0 || productStore.getBrake_systemActive=='all' || productStore.getBrake_systemActive=='all' || productStore.getBrake_systemActive.includes(item.brake_system))
      && (productStore.getWheel_profileActive.length === 0 || productStore.getWheel_profileActive=='all' || productStore.getWheel_profileActive.includes(item.wheel_profile)) 
      && (productStore.getQuick_buyActive.length === 0 || productStore.getQuick_buyActive.includes(item.quick_wheels))
      
    // && (productStore.getPriceRangeActive() === {} || item.basic_price >= productStore.getPriceRangeActive().min && item.basic_price <= productStore.getPriceRangeActive().max)
    // && (item.basic_price >= productStore.getPriceSlider()[0])
    // && (item.basic_price <= productStore.getPriceSlider()[1])
    // && (productStore.getRatingRangeActive() === {} || item.rating >= productStore.getRatingRangeActive().min && item.rating <= productStore.getRatingRangeActive().max)
  }).sort((a, b) => {
    if (productStore.getSortBy == 'price') {
      return a[productStore.getSortBy] - b[productStore.getSortBy]
    } else if (productStore.getSortBy == 'rating') {
      return b[productStore.getSortBy] - a[productStore.getSortBy]
    } else if (productStore.getSortBy == 'id') {
      return a[productStore.getSortBy].toString().localeCompare(b[productStore.getSortBy].toString())
    }
  })

  const data= useSetupPagination(sresult)
  //console.log('searchResult',data)
  return data;
}
//上面产品--------------------------分页---------------------------------下面路由
//分页处理
export function useSetupPagination(searchData) {

  const {
    page,
    limit,
    rows,
    total,
    pagesum,
    handlePageChange
  } = usePageSync(({ page, limit}) => {
    const resultRows = useSearchResult(() => {
      return {
        page,
        limit,
        searchData: searchData
      }
    })
    return {rows:resultRows,total:useSize(searchData),pagesum:useCeil(useSize(searchData)/limit)};
  })

  return {
    page,
    limit,
    rows,
    total,
    pagesum,
    handlePageChange
  };
}
//分页切隔
export function useSearchResult(query) {
  const route = useRoute()
  const params = query(); //函数
  const page = params.page
  const limit = params.limit
  const searchData = params.searchData
  const pagedata = searchData.filter(
    (item, index) => index < page * limit && index >= limit * (page - 1)
  );
  return pagedata;
}
//链接事件
export const handlePageChange = (p)=>{
  navigateTo({
      params:{
          ...route.params,
          page:p
      },
      query:{
          ...route.query
      }
  })
}
//上面分页--------------------------路由----------------------------------//
//由路由来处理标签选中値
export function useProductTagRoute(productStore,route) {
  console.log('init-route',route)
  const queryParam = route.query
  const newQP = useMapKeys(queryParam, function (value, key) { return useToLower(key) })
  console.log('useProductTagRoute-query', newQP,queryParam,JSON.stringify(queryParam),useSize(queryParam) )
  //新链接，清空route.query的store
  if(JSON.stringify(queryParam)=="{}"){
    console.log('useProductTagRoute-query','clear')
    productStore.clearFilter()
  }
  for (const key in newQP) {
    if (Object.hasOwnProperty.call(newQP, key) && key!='action') {
      const element = useToLower(newQP[key]);
      const fieldactive = useToLower(key)+"Active"
      productStore[fieldactive] = element
      console.log('useProductTagRoute-fieldactive',fieldactive,element)
    }
  }

  for (const key in productStore.allTags) {
    if (Object.hasOwnProperty.call(productStore.allTags, key)) {
      let element = productStore.allTags[key];
      for (const keyop in element['options']) {
        if (Object.hasOwnProperty.call(element['options'], keyop)) {
          const elementop = element['options'][keyop];
          const pskey = element['url'] + 'Active';

          const pskeyvalue = productStore[pskey];
          const labelvalue = useToLower(elementop['label']);
          if (pskeyvalue == labelvalue) {
            productStore.allTags[key]['options'][keyop]['checked'] = true;
            break;
          }
        }
      }
    }
  }
}
//监听路由并处理指向
export function useProductTagRoutenavigateTo(productStore,route) {
  const queryParam = route.query
  console.log('watch-route',route)
  let queryurl = route.path+'?action=search';
  console.log('watchroute',queryParam)
  const newQP = useMapKeys(queryParam, function (value, key) { return useToLower(key) })
  console.log('useProductTagRoutenavigateTo-query', newQP)
  //所有的路由query
  for (const key in newQP) {
    if (Object.hasOwnProperty.call(newQP, key) && key!='action') {
      const element = useToLower(newQP[key]);
      const fieldactive = useToLower(key)+"Active"
      productStore[fieldactive] = (element)
      console.log('useProductTagRoutenavigateTo-fieldactive',fieldactive,(element))
      queryurl += "&"+useToLower(key)+"=" + element 
    }
  }
  //分类
  if (productStore['categoriesActive'] != '' && queryParam.categories==undefined) {
    queryurl += "&categories=" + productStore.categoriesActive
  }
  // //快购
  // if (productStore['quick_buyActive'] != '' && queryParam.quick_buy==undefined) {
  //   queryurl += "&quick_buy=" + productStore.quick_buyActive
  // }
  if(queryParam.quick_buy==undefined){
    const fieldactive = useToLower('quick_buy')+"Active"
    productStore[fieldactive] = ''
  }
  //属性标签
  for (const key in productStore.allTags) {
    if (Object.hasOwnProperty.call(productStore.allTags, key)) {
      let element = productStore.allTags[key];
      const querykey = element['url']+"Active"
      if (productStore[querykey] != '' && queryParam[useToLower(element['url'])]==undefined) {
           // queryurl += "&"+element['url']+"=" + productStore[querykey]
      }

      for (const keyop in element['options']) {
        if (Object.hasOwnProperty.call(element['options'], keyop)) {
          const elementop = element['options'][keyop];
          const pskey = element['url'] + 'Active';

          const pskeyvalue = productStore[pskey];
          const labelvalue = useToLower(elementop['label']);
          if (pskeyvalue == labelvalue) {
            productStore.allTags[key]['options'][keyop]['checked'] = true;
            break;
          }
        }
      }
    }
  }
  return queryurl
}
//----------------------------