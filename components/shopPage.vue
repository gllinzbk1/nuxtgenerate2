<template>
    <div class="bg-gray-100 py-6">
        <blueblocksui-carousel type="around" :list="showImages" ></blueblocksui-carousel>
    </div>
            
    <div class="mx-auto mt-10 mb-5 lg:w-6/12 ">
        <blueblocksui-headings size="3" title="Build Your Recon Pro RIM XC924" description="All wheels are 100% customizable at Light Bicycle. If your preferred specs are not listed, feel free to contact us (sales@lightbicycle.com) with your special requirements described."></blueblocksui-headings>
       
    </div>
    <div class="text-center pb-10 border-b border-gray-200">
        <blueblocksui-dialog width="5xl" :time="1000">
            <template v-slot:openDialog><div @click="openDialog" class="w-60"><blueblocksui-button text="Customize & Buy" :isLoading="isLoading"></blueblocksui-button></div></template>
            <template v-slot:dialogContent><blueblocksui-tabs :tabs="tabs"> </blueblocksui-tabs></template>
        </blueblocksui-dialog>
        
        <p class="mt-4 text-blue-600 underline"><router-link to="#"><blueblocksui-button text="Buy wheelset" mystyle="text-blue-600 underline" type="text"></blueblocksui-button></router-link></p>
    </div>
    <div class="mx-auto mt-10 lg:w-6/12 text-center pb-8 border-b border-gray-200">
        <blueblocksui-tabs :tabs="tabs" type = 'underline'>
            <template #Overview>
               <div class="py-4">
                    <blueblocksui-paragraph position="center"></blueblocksui-paragraph>
               </div>
            </template>
            <template #Specs>
                <div class="py-4 text-left">
                    <blueblocksui-product-detail type="detail"></blueblocksui-product-detail>
                </div>
            </template>
            <template #Tech>
                <div class="py-4">
                    <img src="https://pic.lightbicycle.com/www/product/drawings/road/images/wru88c02d-f/source/PC-road-disc-falcon-series-rim-tech.jpg" alt="PC-road-disc-falcon-series-rim-tech.jpg">
                    <p class="my-3"><router-link to="/"><blueblocksui-button text="Learn More >>" mystyle="text-blue-600 underline" type="text"></blueblocksui-button></router-link></p>
                </div>
            </template>
            <template #Warranty>
                <div class="py-4">
                    <blueblocksui-paragraph position="center" :texts="warrantyText"></blueblocksui-paragraph>
                    <p class="my-3"><router-link to="/"><blueblocksui-button text="Learn More >>" mystyle="text-blue-600 underline" type="text"></blueblocksui-button></router-link></p>
                    <div class="flex justify-center"><blueblocksui-product-detail type="warranty" :warrantyType="2"></blueblocksui-product-detail></div>
                </div>
            </template>
            <template #InTheBox>
                <div class="py-4">
                    <blueblocksui-paragraph position="center" :texts="boxText"></blueblocksui-paragraph>
                    <p class="my-3"><router-link to="/"><blueblocksui-button text="Download user guides >>" mystyle="text-blue-600 underline" type="text"></blueblocksui-button></router-link></p>
                    <blueblocksui-layouts type="upDown" :content="layoutsContent" :row="5">
                
                    </blueblocksui-layouts>
               </div>
            </template>
        </blueblocksui-tabs>
    </div>
    <div class="mx-auto mt-10 lg:w-6/12 pb-10 border-b border-gray-200">
        <blueblocksui-headings size="4" title="Gallery" description=""></blueblocksui-headings>
        <div class="grid grid-cols-4 mt-5 gap-4">
            <blueblocksui-card type="gallery" :thumbnail="item.thumbnail" :title="item.title" :person_name="item.person_name" :comments_total="item.comments_total" v-for="item ,index in galleryCard" :key="index"></blueblocksui-card>
        </div>
    </div>
    <div class="mx-auto mt-10 mb-16 lg:w-6/12 pt-6">
        <blueblocksui-comment-list></blueblocksui-comment-list>
        <div class="mt-16">
            <blueblocksui-comment></blueblocksui-comment>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from 'vue'
const isLoading = ref(false)
const openDialog = () =>{
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
    }, 1000);
}
const layoutsContent = [
    {img :"https://pic.lightbicycle.com/www/product/package/images/source/R88-Disc-Front-Wheel.jpg?t=20211208"},
    {img :"https://pic.lightbicycle.com/www/product/package/images/compressed/Package_light-bicycle-user-manual.jpeg?t=20211208"},
    {img :"https://pic.lightbicycle.com/www/product/package/images/compressed/Package_quick-release-skewers.jpeg?t=20211208"},
    {img :"https://pic.lightbicycle.com/www/product/package/images/compressed/Package_tubeless-valve-stems.jpeg?t=20211208"},
    {img :"https://pic.lightbicycle.com/www/product/package/images/compressed/Package_carbon-rim-tapes.jpeg?t=20211208"},
    {img :"https://pic.lightbicycle.com/www/product/package/images/source/wheel-inspection-checklist.jpg?t=20211208"},
]
const warrantyText = [
      {text:'Please carefully inspect your package when unboxing it and contact us immediately if it is damaged or if anything is missing.'},
      {text:'Together we can make this planet better. Join our sustainability program to reduce paper waste using digital docs.'},
]
const boxText = [
      {text:'For Non-Pro Series Rims: From the date of purchase, 3-year Standard Warranty.'},
      {text:'For Pro Series Rims: From the date of purchase, 5-year Pro Warranty as standard and an upgraded optional lifetime Premium Warranty with minimum charge.'},
      {text:'Crash Replacement: It is applicable with the same period as the warranty time range that you purchased for the rims with 10% /25% discount for Non-Pro series /Pro series.'},
]
let showImages = [] //图片轮播列表
// 获取当前路由
const route = useRoute();
console.log("shopPage.route.params",route.params)

//--------------获取路由分析结果--------------------
const routeResult = useAnalyzeRoute(route);

//--------------获取产品列表数据，并同步存入store,返回store对象-----------------------------
const productStore =  getStoreById(routeResult[0])  //获取数据在[..slug]
const { products } = storeToRefs(productStore)
const currentProduct = useToLower(routeResult[2])
if(currentProduct=='' || currentProduct==undefined){
    console.log('404')
}else{
    products.value[currentProduct]['showimages'].forEach(element => {
        showImages.push({
            image:element.image['lb_url'] ? element.image['lb_url'] : 'https://www.lightbicycle.com/' + element.image['file_path'],
            url:''
        })
    });
}
//console.log('products',products[currentProduct],showImages)
const appConfig = useAppConfig()
const seo = productStore.products[currentProduct]['seo']
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

// const list = ref(
//     [
//         { image: 'https://www.lightbicycle.com/light-bicycle/XC924-Ultra-Light-Carbon-XC-MTB-Rim-29er-Asymmetric-Profile/XC924-XC-Carbon-Rim-29er-250g.jpg', url: 'http://www.baidu.com' },
//         { image: 'https://www.lightbicycle.com/light-bicycle/XC924-recon-pro-paintless-carbon-rim.jpg', url: 'http://www.baidu.com' },
//         { image: 'https://www.lightbicycle.com/light-bicycle/laser-engraving-decal-for-mtb-wheel.jpg', url: 'https://www.lightbicycle.com/newsletter/' },
//         { image: 'https://www.lightbicycle.com/light-bicycle/XC924-tubeless-ready-xc-mountain-rim.jpg', url: 'https://www.lightbicycle.com/newsletter/' },
//         { image: 'https://www.lightbicycle.com/light-bicycle/XC924-29er-ultra-lightweight-xc-rim.jpg', url: 'https://www.lightbicycle.com/newsletter/' }
//     ]
// )

const tabs = ref(
    [
        { name: 'Overview' },
        { name: 'Specs'},
        { name: 'Tech'},
        { name: 'Warranty'},
        { name: 'In The Box'},
    ]
)
const galleryCard = ref(
[
{
    person_name: "Tony",
    title: "2 AM930 and 1 AM930S with Sapim CX-Ray. AM930 and 1 AM930S with Sapim CX-Ray. Onyx Vesper, Chris King, and Stan’s Single Speed.",
    type: 'gallery',
    country: 'United States',
    comments_total: 10,
    thumbnail: 'https://www.lightbicycle.com/photowall/AM930-AM930S-Review-Custom-29er-Mountain-Bike-Wheels/AM930-AM930S.jfif'
},
{
    person_name: "Light Bicycle",
    title: "Rims: XC924 UD Paintless 28/28H External Hole With Drain Holes With Access Holes Hubs: DT SWISS 180 15/110mm 12/148mm BOOST straight pull Center lock 28H ceramic EXP 54 Sram XD",
    type: 'gallery',
    country: 'United States',
    comments_total: 1,
    thumbnail: 'https://www.lightbicycle.com/photowall/xc924-review-29er-high-performance-dt-swiss-180-xc-wheels/superlight-carbon-xc-mtb-wheels.JPG'
},
{
    person_name: "Tony",
    title: "2 AM930 and 1 AM930S with Sapim CX-Ray. AM930 and 1 AM930S with Sapim CX-Ray. Onyx Vesper, Chris King, and Stan’s Single Speed.",
    type: 'gallery',
    country: 'United States',
    comments_total: 10,
    thumbnail: 'https://www.lightbicycle.com/photowall/AM930-AM930S-Review-Custom-29er-Mountain-Bike-Wheels/AM930-AM930S.jfif'
},
{
    person_name: "Light Bicycle",
    title: "Rims: XC924 UD Paintless 28/28H External Hole With Drain Holes With Access Holes Hubs: DT SWISS 180 15/110mm 12/148mm BOOST straight pull Center lock 28H ceramic EXP 54 Sram XD",
    type: 'gallery',
    country: 'United States',
    comments_total: 1,
    thumbnail: 'https://www.lightbicycle.com/photowall/xc924-review-29er-high-performance-dt-swiss-180-xc-wheels/superlight-carbon-xc-mtb-wheels.JPG'
},
{
    person_name: "Light Bicycle",
    title: "Rims: XC924 UD Paintless 28/28H External Hole With Drain Holes With Access Holes Hubs: DT SWISS 180 15/110mm 12/148mm BOOST straight pull Center lock 28H ceramic EXP 54 Sram XD",
    type: 'gallery',
    country: 'United States',
    comments_total: 1,
    thumbnail: 'https://www.lightbicycle.com/photowall/xc924-review-29er-high-performance-dt-swiss-180-xc-wheels/superlight-carbon-xc-mtb-wheels.JPG'
},
]
)
</script>