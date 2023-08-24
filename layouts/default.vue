<template class="relative">
  <!-- 公共头部 -->
  <blueblocksui-header v-if="screenWidth > 999" :navData="headerS.navData" :menuData="headerS.menuData"
    :adventueData="headerS.adventueData" :supportData="headerS.supportData" :aboutData="headerS.aboutData"
    :moneyList="headerS.moneyList"></blueblocksui-header>
  <blueblocksui-mobile-header v-else></blueblocksui-mobile-header>

  <slot />

  <!-- 公共尾部 -->
  <blueblocksui-footer v-if="screenWidth > 765" :navigation="footerS.footerMenu"
    :copyright="footerS.copyRight"></blueblocksui-footer>
  <blueblocksui-mobile-footer v-else :navigation="footerS.footerMenu"
    :copyright="footerS.copyRight"></blueblocksui-mobile-footer>
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


import {
  state,
  setHeader,
  setFooter,
  computeState
} from '~~/stores/nav';

const headerS = computed({
  get: () => (state.header),
  set: value => setHeader(value)
});

const footerS = computed({
  get: () => state.footer,
  set: value => setFooter(value)
});



//console.log('headerS',(headerS.value),(headerS.value),Object.hasOwnProperty.call(headerS.value, 'navData'),typeof(headerS.value))

const headerSS = ref({})
const footerSS = ref({})
// const publicStatus = ref(false)


// const publicNav = useState('publicNav')

//const publicNav = usePublicNavStore();
//console.log('publicnav','yes',publicNav.value,publicNav.value?.header)
//const { header ,footer,status } = storeToRefs(publicNav)
//console.log('hf',header.value,footer.value,status.value)
//  headerS.value = header.value
//  footerS.value = footer.value
//  publicStatus.value = status.value
// headerS.value = publicNav.value.header
//  footerS.value = publicNav.value.footer
//  publicStatus.value = publicNav.value.status

// console.log('publicStatus',publicStatus.value)
// if(typeof(headerS.value)!= 'undefined'){//
// console.log('33333333333333')
// // headerS.value = publicNav.value?.header
// //  footerS.value = publicNav.value?.footer
// //  publicStatus.value = publicNav.value?.status
// }else{
if (!Object.hasOwnProperty.call(headerS.value, 'navData')) {
  console.log('444444444444444')
  var data = [];
  var entries = await useContentfulContentType(data, { 'content_type': 'element', limit: 100, skip: 0 });
  //console.log('entries',entries)

  const mainpageTop = await useContentfulEntryLevel({ 'entry_id': '6CHJp2YhDqxbDo8NLlu9LV' });
  //console.log('contentful-mainpage-WWWtop', mainpageTop,mainpageTop.fields.mainPageTopMenu[0])

  const menu = await useContentfulHeaderLevelJson(entries, mainpageTop.fields.mainPageTopMenu)
  //console.log('menu',menu)
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
  //console.log('menuRs',menuRs)
  headerSS.value.navData = menuRs.navData
  headerSS.value.menuData = menuRs.menuData[0]
  headerSS.value.adventueData = menuRs.adventueData[0]
  headerSS.value.supportData = menuRs.supportData[0]
  headerSS.value.aboutData = menuRs.aboutData[0]
  headerSS.value.moneyList = useSplit(mainpageTop.fields.mainPageTopCurrencyType, ',')
  //console.log('menudata',moneyList,menuRs,navData,menuData,adventueData,supportData,aboutData)

  const footerNode = await useContentfulEntryLevel({ 'entry_id': '5btU4nDNHE0vT1Q3PGfSUv' });
  //console.log('contentful-footer', footer)

  footerSS.value.footerMenu = await useContentfulFooterLevelJson(entries, footerNode.fields.mainPageBottomMenu)
  //console.log('footer',footer.value.footerMenu)
  footerSS.value.copyRight = footerNode.fields.mainPageBottomCompanyInfo;
  //const pdata = {header:headerS.value,footer:footerS.value,status:true}
  //usePublicNavStore().init(pdata); //获取数据在[..slug]
  //useState("publicNav",()=>pdata)
  // console.log('header2.navData',headerS.value.menuData)
  headerSS.value.moneyList = ref(['USD', 'AUD'])
  setHeader(headerSS.value)
  setFooter(footerSS.value)




}
</script>
<style>
.body {
  min-width: 1000px;
  @apply bg-gray-100 flex flex-col min-h-screen;
}
</style>
