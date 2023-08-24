
import { createDiscreteApi } from "naive-ui";

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref(null);

  nuxtApp.hook("app:mounted", (e) => {
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(["loadingBar"]);
      bar.value = loadingBar;
    }
  });
  nuxtApp.hook("page:start", (e) => {
    bar.value?.start();
  });
  nuxtApp.hook("page:finish", (e) => {
    setTimeout(() => bar.value?.finish(), 300);
  });
  nuxtApp.hook("app:error", (e) => {
    //判断是否在客户端
    if (process.client) {
      setTimeout(() => bar.value?.finish(), 300);
    }
  });
});

// //import {useContentfulContentType} from "~~/composables/useProduct"
// export default defineNuxtPlugin(async (nuxtApp) => {
// console.log(111111111111)
//   var data = [];
//     var entries =  await useContentfulContentType(data,{'content_type':'element',limit:100,skip:0});
//     console.log('entries',entries)
    
//     const mainpageTop =  await useContentfulEntryLevel({'entry_id':'6CHJp2YhDqxbDo8NLlu9LV'});
//     //console.log('contentful-mainpage-WWWtop', mainpageTop,mainpageTop.fields.mainPageTopMenu[0])
    
//     const menu =await useContentfulHeaderLevelJson(entries,mainpageTop.fields.mainPageTopMenu)
//     //console.log('menu',menu)
//     const headerData = []//{navData:Object,menuData:Object,adventueData:Object,supportData:Object,aboutData:Object}
//      headerData['navData'] = []//{navData:Object,menuData:Object,adventueData:Object,supportData:Object,aboutData:Object}
//      headerData['menuData'] = []
//      headerData['adventueData'] = []
//      headerData['supportData'] = []
//      headerData['aboutData'] = []
//      headerData['moneyList'] = []
//     for (const key in menu) {
//       if (Object.hasOwnProperty.call(menu, key)) {
//         const element = menu[key];
//         //console.log('element.elementTitle',element.name)
//         switch(element.name){
//           case 'SHOP':
//             headerData.navData.push({'name':element.name})
//             headerData.menuData.push(element.children)
//             break;
//           case 'ADVENTURE':
//             headerData.navData.push({'name':element.name})
//             headerData.adventueData.push(element.children)
//             break; 
//           case 'SUPPORT':
//             headerData.navData.push({'name':element.name})
    
//             headerData.supportData.push(element.children)
//             break;
//           case 'ABOUT US':
//             headerData.navData.push({'name':element.name})
//             headerData.aboutData.push(element.children)
//             break;               
//         }
        
//       }
      
//     }
//     headerData.menuData =  headerData.menuData[0]
//     headerData.adventueData =  headerData.adventueData[0]
//     headerData.supportData =  headerData.supportData[0]
//     headerData.aboutData =  headerData.aboutData[0]
//     headerData.moneyList = useSplit(mainpageTop.fields.mainPageTopCurrencyType,',')
//     //console.log('menudata',moneyList,headerData,navData,menuData,adventueData,supportData,aboutData)
//     const footerData=[]
//     const footernode =  await useContentfulEntryLevel({'entry_id':'5btU4nDNHE0vT1Q3PGfSUv'});
//     //console.log('contentful-footer', footer)
    
//     footerData['footerMenu'] =await useContentfulFooterLevelJson(entries,footernode.fields.mainPageBottomMenu)
//     footerData['copyRight'] = footernode.fields.mainPageBottomCompanyInfo
//    // console.log('headerxx',headerData)

//     const pdata = {header:headerData,footer:footerData}
//     console.log('plugin',pdata)
//     usePublicNavStore().init(pdata)
//     console.log('plugin2')
//     return;
// });

// import { createDiscreteApi } from "naive-ui";

// export default defineNuxtPlugin((nuxtApp) => {
//   const bar = ref(null);
//   //const pdata = ref(null);

//   nuxtApp.hook("app:mounted", async (e) => {




//     var data = [];
//     var entries =  await useContentfulContentType(data,{'content_type':'element',limit:100,skip:0});
//     //console.log('entries',entries)
    
//     const mainpageTop =  await useContentfulEntryLevel({'entry_id':'6CHJp2YhDqxbDo8NLlu9LV'});
//     //console.log('contentful-mainpage-WWWtop', mainpageTop,mainpageTop.fields.mainPageTopMenu[0])
    
//     const menu =await useContentfulHeaderLevelJson(entries,mainpageTop.fields.mainPageTopMenu)
//     //console.log('menu',menu)
//     const headerData = []//{navData:Object,menuData:Object,adventueData:Object,supportData:Object,aboutData:Object}
//      headerData['navData'] = []//{navData:Object,menuData:Object,adventueData:Object,supportData:Object,aboutData:Object}
//      headerData['menuData'] = []
//      headerData['adventueData'] = []
//      headerData['supportData'] = []
//      headerData['aboutData'] = []
//      headerData['moneyList'] = []
//     for (const key in menu) {
//       if (Object.hasOwnProperty.call(menu, key)) {
//         const element = menu[key];
//         //console.log('element.elementTitle',element.name)
//         switch(element.name){
//           case 'SHOP':
//             headerData.navData.push({'name':element.name})
//             headerData.menuData.push(element.children)
//             break;
//           case 'ADVENTURE':
//             headerData.navData.push({'name':element.name})
//             headerData.adventueData.push(element.children)
//             break; 
//           case 'SUPPORT':
//             headerData.navData.push({'name':element.name})
    
//             headerData.supportData.push(element.children)
//             break;
//           case 'ABOUT US':
//             headerData.navData.push({'name':element.name})
//             headerData.aboutData.push(element.children)
//             break;               
//         }
        
//       }
      
//     }
//     headerData.menuData =  headerData.menuData[0]
//     headerData.adventueData =  headerData.adventueData[0]
//     headerData.supportData =  headerData.supportData[0]
//     headerData.aboutData =  headerData.aboutData[0]
//     headerData.moneyList = useSplit(mainpageTop.fields.mainPageTopCurrencyType,',')
//     //console.log('menudata',moneyList,headerData,navData,menuData,adventueData,supportData,aboutData)
//     const footerData=[]
//     const footernode =  await useContentfulEntryLevel({'entry_id':'5btU4nDNHE0vT1Q3PGfSUv'});
//     //console.log('contentful-footer', footer)
    
//     footerData['footerMenu'] =await useContentfulFooterLevelJson(entries,footernode.fields.mainPageBottomMenu)
//     footerData['copyRight'] = footernode.fields.mainPageBottomCompanyInfo
//    // console.log('headerxx',headerData)

//     const pdata = {header:headerData,footer:footerData}
//     console.log('plugin',pdata)
//     usePublicNavStore().init(pdata)
//     console.log('plugin2')

//     // if (!bar.value) {
//     //   const { loadingBar } = createDiscreteApi(["loadingBar"]);
//     //   bar.value = loadingBar;
//     // }

//   });
//   nuxtApp.hook("page:start", (e) => {
//     //bar.value?.start();
//   });
//   nuxtApp.hook("page:finish", (e) => {
//    //setTimeout(() => bar.value?.finish(), 300);
//   });
//   nuxtApp.hook("app:error", (e) => {
//     //判断是否在客户端
//     if (process.client) {
//       setTimeout(() => bar.value?.finish(), 300);
//     }
//   });
// });
