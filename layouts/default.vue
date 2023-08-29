<template class="relative">
  <!-- 公共头部 -->
  <blueblocksui-header v-if="screenWidth > 999" :navData="headerSS.navData" :menuData="headerSS.menuData"
    :adventueData="headerSS.adventueData" :supportData="headerSS.supportData" :aboutData="headerSS.aboutData"
    :moneyList="headerSS.moneyList"></blueblocksui-header>
  <blueblocksui-mobile-header v-else></blueblocksui-mobile-header>

  <slot />

  <!-- 公共尾部 -->
  <blueblocksui-footer v-if="screenWidth > 765" :navigation="footerSS.footerMenu"
    :copyright="footerSS.copyRight"></blueblocksui-footer>
  <blueblocksui-mobile-footer v-else :navigation="footerSS.footerMenu"
    :copyright="footerSS.copyRight"></blueblocksui-mobile-footer>
</template>

<script setup >
import { ref } from 'vue'
// import { useGetWindowSize } from '~/composables/useVueuse'

//定义屏幕宽度,根据屏幕宽度自动切换头部尾部
const screenWidth = ref(0);
const { width, height } = useGetWindowSize();
watchEffect(() => {
  screenWidth.value = width.value;
  console.log('屏幕宽度', width.value, height.value, '-----------', screenWidth.value);
})
//头部,底部
const headerSS = ref({})
const footerSS = ref({})


const entries = await useCfEntries({ 'content_type': 'element' });

//头部,数据格式,通过nuxt数据useAsyncData,或useFetch,返回是ref,这里entries加工数据数组对象,所以没有.value
const mainpageTop = await useContentfulEntryLevel({ 'entry_id': '6CHJp2YhDqxbDo8NLlu9LV' });
//console.log('mainpageTop', mainpageTop)
//console.log('contentful-mainpage-WWWtop', mainpageTop, mainpageTop.value.fields.mainPageTopMenu)

const menu = useContentfulHeaderLevelJson(entries, mainpageTop.value.fields.mainPageTopMenu)
//console.log('menu', menu)
const menuRs = []//{navData:Object,menuData:Object,adventueData:Object,supportData:Object,aboutData:Object}
menuRs['navData'] = []//{navData:Object,menuData:Object,adventueData:Object,supportData:Object,aboutData:Object}
menuRs['menuData'] = []
menuRs['adventueData'] = []
menuRs['supportData'] = []
menuRs['aboutData'] = []
for (const key in menu) {
  if (Object.hasOwnProperty.call(menu, key)) {
    const element = menu[key];
    //console.log('element.elementTitle',element.name)
    switch (element.name) {
      case 'SHOP':
        menuRs.navData.push({ 'name': element.name })
        menuRs.menuData.push(element.children)
        break;
      case 'ADVENTURE':
        menuRs.navData.push({ 'name': element.name })
        menuRs.adventueData.push(element.children)
        break;
      case 'SUPPORT':
        menuRs.navData.push({ 'name': element.name })

        menuRs.supportData.push(element.children)
        break;
      case 'ABOUT US':
        menuRs.navData.push({ 'name': element.name })
        menuRs.aboutData.push(element.children)
        break;
    }

  }

}
//console.log('menuRs', menuRs)
headerSS.value.navData = menuRs.navData
headerSS.value.menuData = menuRs.menuData[0]
headerSS.value.adventueData = menuRs.adventueData[0]
headerSS.value.supportData = menuRs.supportData[0]
headerSS.value.aboutData = menuRs.aboutData[0]
headerSS.value.moneyList = useSplit(mainpageTop.value.fields.mainPageTopCurrencyType, ',')
//console.log('menudata',moneyList,menuRs,navData,menuData,adventueData,supportData,aboutData)

const footerNode = await useContentfulEntryLevel({ 'entry_id': '5btU4nDNHE0vT1Q3PGfSUv' });
//console.log('contentful-footer', footer)

footerSS.value.footerMenu = await useContentfulFooterLevelJson(entries, footerNode.value.fields.mainPageBottomMenu)
//console.log('footer',footer.value.footerMenu)
footerSS.value.copyRight = footerNode.value.fields.mainPageBottomCompanyInfo;
//const pdata = {header:headerSS.value,footer:footerSS.value,status:true}
//usePublicNavStore().init(pdata); //获取数据在[..slug]
//useState("publicNav",()=>pdata)
// console.log('header2.navData',headerSS.value.menuData)
//headerSS.value.moneyList = ref(['USD', 'AUD'])
//setHeader((headerSS.value))
//setFooter((footerSS.value))

//console.log('headss', headerSS)



//}
</script>
<style>
.body {
  min-width: 1000px;
  @apply bg-gray-100 flex flex-col min-h-screen;
}
</style>
