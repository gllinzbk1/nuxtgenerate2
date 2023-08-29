//上面分页--------------------------路由----------------------------------//
//列表与内容页分析
export function useAnalyzeRouteIsListOrContent(route) {
  //1,列表，2 内容页
  console.log("AnalyzeRoute.params", route.params)
  //console.log("AnalyzeRoute.query",route.query)
  const routeParam = route.params.slug
  //const routeQuery = route.query
  //转小写
  const newRP = useMapKeys(routeParam, function (value, key) { return useToLower(key) })
  //const newRQ = useMapKeys(routeParam, function (value, key) { return useToLower(key) })
  //处理路由路径分析  
  if (newRP[2] != undefined) {
    //console.log('newRP',newRP)
    const element = useToLower(newRP[2]);
    //是否page
    const pagenum = element.search(/page-\d+/g);
    //console.log('newRP',newRP,pagenum)
    if ((pagenum != -1)) {
      //是page,就是列表
      return 1;
    } else {
      const Two = element.match(/--/g) //列表搜索特有的标签，返回索引位置
      const One = element.match(/\w+(-)\w+/g) //分页，内容页特有的标签，有些标签 值有-,返回数组列表或undefined
     // console.log('one,tow',One,Two,useSize(One))
      if (useSize(Two) ==1 && useSize(One) > 5) return 2;  //内容，有--
      if (useSize(Two) > 0) return 1;  //列表，有--
      if (useSize(Two)==0 && useSize(One) <= 2) return 1;  //列表，--,-都没有      
      if (useSize(Two)==0 && useSize(One) > 2) return 2;//--有是搜索列表>0，-1就是没有，就内容页;可能只有一个标签，就没--，这时最判断下长度,page的已排除;有些标签 值有-,返回数据

      //一个杠，后判断
      //if(useSize(One) == 0) return 1;
    }
  } else {
    return 1; //没有第3层,归入列表
  }

}

//路由分析
export function useAnalyzeRoute(route) {
  console.log("AnalyzeRoute.params", route.params)
  const routeParam = route.params.slug
  const routePath = route.path
  const routePathArr = routePath.split("\/")
  const routeResult = {};
  //console.log('routeSlug', routeParam, route.path, routePath.split("\/"), useSize(routePathArr) - useSize(routeParam))
  //path处理
  const pathCount = useSize(routePathArr) - useSize(routeParam)
  let pathProfix = '/'
  if (pathCount > 0) {
    for (let i = 0; i < pathCount; i++) {
      if (routePathArr[i] == '') continue
      pathProfix += routePathArr[i] + "/" //第一个为空
      //if(pathCount-i>1) pathProfix += "/"
    }
  }
  routeResult['pathProfix'] = pathProfix
  routeResult['fullPath'] = route.path
  //参数处理
  //处理路由路径分析
  for (let i = 0; i < useSize(routeParam); i++) {
    const element = (routeParam[i]);  //useToLower,由于路径会转化目标，所以大小写问题
   // console.log('i', i, element)
    if (element == '') continue;
    //是否page
    const pagenum = element.search(/page-\d+/g);
    //console.log('pagenum', pagenum)
    if ((pagenum != -1) && i != 0) {
      routeResult['page'] = element.match(/\d+/g)[0];
    } else {
      routeResult[i] = element
    }
  }
  routeResult['fullPathNoPage'] = useReplace(routeResult['fullPath'],/\/page-\d+/g,''); //去掉page
  //console.log('routeResult-1', routeResult)
  return routeResult
}
//----------------产品开始--------------------------
//由路由来处理标签选中値
export function useProductRouteUrl(productStore, routeResult) {
  //const routeList = useAnalyzeRoute(productStore, route)
  //console.log('useProductRouteUrl', routeResult)
  //新链接，清空route.query的store,只有大类一层
  if (routeResult.length == 1) {
    console.log('useProductRouteUrl&Store', 'clear')
    productStore.clearFilter()
  }
  // let fieldactive = ''
  // for (let i = 0; i < routeList.length; i++) {
  //   if (Object.hasOwnProperty.call(routeList, i)) {
  //     const element = useToLower(routeList[i]);
  //     switch (i) {
  //       case 0: //主类
  //         fieldactive = "mainCategoryActive"
  //         productStore[fieldactive] = element
  //         break;
  //       case 1: //子类
  //         fieldactive = "subCategoryActive"
  //         productStore[fieldactive] = element
  //         break;
  //       case 2:  //内容页或还是列表过滤,内容页不进入此地,需要标签的key-value来分解
  //         const searchkey = element.split(/--/g)
  //         if (searchkey != undefined) {
  //           searchkey.forEach(searchElement => {
  //             const tagkey = productStore.allTags.kv[searchElement]
  //             fieldactive = tagkey + "Active"
  //             //这里没有all
  //             productStore[fieldactive] = searchElement
  //             //productStore[fieldactive] = searchElement            
  //             console.log('useProductRouteUrl-search-fieldactive', fieldactive, searchElement)
  //           });
  //         }

  //         break;
  //     }
  //   }
  // }
  useChangeTagsHref(productStore, routeResult) 
  // for (const key in productStore.allTags) {
  //   if (Object.hasOwnProperty.call(productStore.allTags, key)) {
  //     let element = productStore.allTags[key];
  //     for (const keyop in element['options']) {
  //       if (Object.hasOwnProperty.call(element['options'], keyop)) {
  //         const elementop = element['options'][keyop];
  //         const pskey = element['url'] + 'Active';

  //         const pskeyvalue = productStore[pskey];
  //         const labelvalue = useToLower(elementop['label']);
  //         if (pskeyvalue == labelvalue) {
  //           productStore.allTags[key]['options'][keyop]['checked'] = true;
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }
}

//监听路由并处理指向
export function useProductRouteUrlWatch(productStore, routeResult) { 
  //const routeList = useAnalyzeRoute(productStore, route)
  console.log('useProductRouteUrlWatch', routeResult)
  //所有的路由query
  useChangeTagsHref(productStore, routeResult)
}


//返回最新的Tags链接url
export function useChangeTagsHref(productStore, routeResult) {
  //console.log('useChangeTagsHref-init',routeResult,routeResult['pathProfix'],productStore.subCategory)
  let queryurl = '';
  let allTagsResult = {}
  //--------------子类------------
  if (productStore.subCategory) {
    for (const key in productStore.subCategory) {
      if (Object.hasOwnProperty.call(productStore.subCategory, key)) {
        let element = productStore.subCategory[key]['href'];
        const regex = new String(routeResult['pathProfix'].replaceAll('/','\/'))
        var re = new RegExp(regex,"ig"); 
        console.log('regex',element,routeResult['pathProfix'],regex,re,element.search(re))
        if(element.search(re)==-1){
          productStore.subCategory[key]['href'] = routeResult['pathProfix'] + element;
        }        
      }
    }
  } else {
    console.log('productStore.subCategory', null)
  }
  //console.log('useChangeTagsHref-result',routeResult['pathProfix'],productStore.subCategory)
  //--------------子类------------
  let subCategories = ''
  //没有则黙认all,
  if (routeResult[1] == null || routeResult[1] == undefined) {
    for (const keyop in productStore.subCategory) {
      if (Object.hasOwnProperty.call(productStore.subCategory, keyop)) {
        productStore.subCategory[keyop]['checked'] = false
        if (keyop != 'all' && keyop != 'quick') {  //没有1,按顺序取一个
          //routeResult[1] = keyop  //不能这样，因为监听会促发
          subCategories = keyop
          break;
        }
      }
    }
    productStore.subCategory['all']['checked'] = true
  } else {
    subCategories = routeResult[1]
    productStore.subCategory[subCategories]['checked'] = true
  }
  if (routeResult[1] == null || routeResult[1] == undefined) {
    productStore.subCategoryActive = ''
  }else{
    productStore.subCategoryActive = subCategories
  }
  
  //quick
  if (routeResult[2] == 'quick') {
    //其它过滤要清空
    productStore.clearFilter()
    productStore.quick_buyActive = 'quick'
    productStore.subCategoryActive = routeResult[1]    
  }else{
    productStore.quick_buyActive = ''
  }
  
 // console.log('route.subCategories', subCategories,productStore.subCategory[subCategories]['allTags'])
  if (productStore.subCategory[subCategories]['allTags']) {
   
    allTagsResult = useProduceTagsHref(productStore,subCategories,routeResult)
    console.log('aa','111',subCategories,allTagsResult)
    productStore.allTags = allTagsResult
    // for (const key in productStore.subCategory[subCategories]['allTags']) {
    //   if (Object.hasOwnProperty.call(productStore.subCategory[subCategories]['allTags'], key)) {
    //     let element = productStore.subCategory[subCategories]['allTags'][key];
    //     for (const keyop in element['options']) {
    //       if (Object.hasOwnProperty.call(element['options'], keyop)) {
    //         const labelvalue = element['options'][keyop]['label'];
    //         if (useToLower(labelvalue) == 'all') {
    //           productStore.subCategory[subCategories]['allTags'][key]['options'][keyop]['href'] = routeResult['pathProfix'] + routeResult[0] + '/' + routeResult[1];
    //         } else {
    //           productStore.subCategory[subCategories]['allTags'][key]['options'][keyop]['href'] = routeResult['pathProfix'] + routeResult[0] + '/' + routeResult[1] + '/' + labelvalue;
    //         }
    //       }
    //     }
    //   }
    // }
  } else {
    allTagsResult = {}
    console.log('subCategories.allTags', null)
  }
  //console.log("allTags",productStore.subCategory[subCategories]['allTags'][0])
  productStore.allTags = allTagsResult
}
//监听路由并处理指向
export function useProduceTagsHref(productStore,subCategories,routeResult) {
  let queryurl = routeResult['pathProfix'] + productStore.mainCategoryActive + "/" + productStore.subCategoryActive;
  let allTagsStore = productStore.subCategory[subCategories]['allTags'];
  const subHref = productStore.subCategory[subCategories]['href']
  //属性标签，
  if (routeResult[2] ) {//&& routeResult[2]!=undefined
    //即有的链接kV
    let urlkey ={}
    const TagUlrStr = routeResult[2]
    const searchkey = TagUlrStr.split(/--/g)
    //console.log('useProduceTagsHref-urlkey', searchkey)
    if (searchkey != undefined) {
      searchkey.forEach(searchElement => {
        if(searchElement==undefined) return;
        const tagkey = productStore.kvTags[searchElement];
        if(tagkey==undefined) return;
        urlkey[tagkey] = searchElement;    
        const pskey = tagkey + 'Active';

        productStore[pskey] = searchElement
        //console.log('useProduceTagsHref-urlkey-result-for', urlkey)
      });
    }
   // console.log('useProduceTagsHref-urlkey-result', urlkey)
    //链接与标签组合新链接
    let querytags = '';
    for (const key in allTagsStore) {
      if (Object.hasOwnProperty.call(allTagsStore, key)) {
        //取标签Store
        let element = allTagsStore[key];
        // const querykey = element['url'] + "Active"
        // if (productStore[querykey] != '') {
        //   querytags += productStore[querykey] + "--"
        // }
        // //quick处理
        // const routeUrlTwo = routeResult[2]
        // if (routeUrlTwo != undefined && routeUrlTwo != 'quick') {
        //   const fieldactive = allTagsStore.kv[routeUrlTwo] + "Active"
        //   productStore[fieldactive] = (routeUrlTwo)
        //   querytags += routeUrlTwo
        //   console.log('useProductRouteUrlWatch-fieldactive', fieldactive, (element))
        // }
       // if(urlkey[element['url']]==undefined && urlkey!=undefined) useUnset(urlkey,element['url'])

        const keyOrg = urlkey[element['url']] //不存在时为undefined,必要处理
        for (const keyop in element['options']) {
          if (Object.hasOwnProperty.call(element['options'], keyop)) {

            const elementop = element['options'][keyop];
            const pskey = element['url'] + 'Active';

            const pskeyvalue = productStore[pskey];
            const labelvalue = useToLower(elementop['label']);
            //有说明，url已有此key,要用替换，而不是新加
              
              if(usePick(element['url'],urlkey) && urlkey[element['url']]!=undefined){   
                //console.log('urlkeyin',urlkey)  
                allTagsStore[key]['options'][keyop]['checked'] = false;           
                if(labelvalue=='all'){                
                  allTagsStore[key]['options'][keyop]['href'] =  useTagsHrefCombination(subHref,useOmit(urlkey,element['url']))
                }else{
                  urlkey[element['url']]=labelvalue
                  allTagsStore[key]['options'][keyop]['href'] =  useTagsHrefCombination(subHref,urlkey)
                  //复
                  //console.log('deldkey1',urlkey,element['url'])
                }   
                if (pskeyvalue == labelvalue) {
                  allTagsStore[key]['options'][keyop]['checked'] = true;
                }
                //if(urlkey[element['url']]==undefined) useUnset(urlkey,element['url'])           
              }else{
                //console.log('urlkeynotin',urlkey,labelvalue)        
                //不在里面，只能处理链接，处理完，要删除
                allTagsStore[key]['options'][keyop]['checked'] = false;
                if(labelvalue=='all'){
                  allTagsStore[key]['options'][keyop]['checked'] = true;
                  allTagsStore[key]['options'][keyop]['href'] =  useTagsHrefCombination(subHref,urlkey)
                }else{
                  urlkey[element['url']]=labelvalue
                  allTagsStore[key]['options'][keyop]['href'] =  useTagsHrefCombination(subHref,urlkey)
                  useUnset(urlkey,element['url'])
                  //console.log('deldkey2',urlkey,element['url'])
                }  
              }
            

          }
          
        }
        //复原
        if(keyOrg!=undefined) urlkey[element['url']]=keyOrg
       
      }
    }
  } else {
    //没有的话，原始标签做链接
    for (const key in allTagsStore) {
      if (Object.hasOwnProperty.call(allTagsStore, key)) {
        //取标签Store
        let element = allTagsStore[key];
        // const querykey = element['url'] + "Active"
        // if (productStore[querykey] != '') {
        //   querytags += productStore[querykey] + "--"
        // }
        // //quick处理
        // const routeUrlTwo = routeResult[2]
        // if (routeUrlTwo != undefined && routeUrlTwo != 'quick') {
        //   const fieldactive = allTagsStore.kv[routeUrlTwo] + "Active"
        //   productStore[fieldactive] = (routeUrlTwo)
        //   querytags += routeUrlTwo
        //   console.log('useProductRouteUrlWatch-fieldactive', fieldactive, (element))
        // }

        const pskey = element['url'] + 'Active';
        productStore[pskey] = ''
        for (const keyop in element['options']) {
          if (Object.hasOwnProperty.call(element['options'], keyop)) {
            const elementop = element['options'][keyop];
            const labelvalue = useToLower(elementop['label']);
            
            //有说明，url已有此key,要用替换，而不是新加
            if(labelvalue=='all'){                
              allTagsStore[key]['options'][keyop]['href'] =  subHref
              allTagsStore[key]['options'][keyop]['checked'] = true;
            }else{
              allTagsStore[key]['options'][keyop]['href'] = subHref+"/"+labelvalue+"--"
              allTagsStore[key]['options'][keyop]['checked'] = false;
            }              
            
            
          }
        }
      }
    }
  }
  console.log('allTagsStore',allTagsStore)
  return allTagsStore;

}
//tag组装成str
export function useTagsHrefCombination(queryurl,urlkey) {
  let TagUlrStr = '';
  let Tagi = 0;
 // console.log('queryurl1',urlkey)
  for (const keyTag in urlkey) {
    if (Object.hasOwnProperty.call(urlkey, keyTag)) {
      
      if(urlkey[keyTag]==undefined) continue
      //console.log('tagUrl',useSize(urlkey) - Tagi,urlkey)
      if(useSize(urlkey)==1){
        TagUlrStr += urlkey[keyTag]+"--"
      }else{
        if(useSize(urlkey) - Tagi > 1){  //为了准确判断是ta，是列表页，尾都加--
          TagUlrStr += urlkey[keyTag]+"--"
        }else{
          TagUlrStr += urlkey[keyTag]
        } 
      }     
    }
    Tagi++;
  }
 // console.log('queryurl2',queryurl)
  if(queryurl==''){
    return queryurl
  }else{
    return queryurl+"/"+TagUlrStr;
  }
  
}
//----------------产品结束--------------------------