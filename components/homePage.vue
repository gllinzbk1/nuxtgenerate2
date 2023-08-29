<template>
  <!-- 横幅广告 -->
  <blueblocksui-banner v-for="(item, key) in homepage.mainpageBanner1" :size="1" textWidth="2/3"
    :title="item.paragraphTitle" :description="item.paragrapSubtitle" :link="item.paragraphButtonLink"
    :pcBackgroundImage="useBackgroudImage(item.paragraphBackGroundImage, 'pc')"
    :mobileBackgroundImage="useBackgroudImage(item.paragraphBackGroundImage, 'mo')"
    :buttonText="item.paragraphButtonText"></blueblocksui-banner>

  <!-- 横幅广告 *2 -->
  <div class="px-2 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <blueblocksui-banner v-for="(item, key) in homepage.mainpageBanner2" :size="2" textWidth="full"
      :title="item.paragraphTitle" :description="item.paragrapSubtitle" :link="item.paragraphButtonLink"
      :pcBackgroundImage="useBackgroudImage(item.paragraphBackGroundImage, 'pc')"
      :mobileBackgroundImage="useBackgroudImage(item.paragraphBackGroundImage, 'mo')"
      :buttonText="item.paragraphButtonText"></blueblocksui-banner>
  </div>

  <!-- 骑手最爱 -->
  <div class="mt-20">

    <blueblocksui-headings :size="2" :title="homepage.mainpageFavoriteTitle"
      :description="homepage.mainpageFavoriteSubitle"></blueblocksui-headings>

    <div class="px-5 py-8 pt-8 grid grid-cols-1  md:grid-cols-2 gap-4">
      <blueblocksui-banner v-for="(item, key) in homepage.mainpageFavoriteProduct" :size="2" textWidth="2/3"
        :title="item.paragraphTitle" :description="item.paragrapSubtitle" :link="item.paragraphButtonLink"
        :pcBackgroundImage="useBackgroudImage(item.paragraphBackGroundImage, 'pc')"
        :mobileBackgroundImage="useBackgroudImage(item.paragraphBackGroundImage, 'mo')"
        :buttonText="item.paragraphButtonText"></blueblocksui-banner>
    </div>
  </div>

  <!-- 为什么选择LIGHT BICYCLE -->
  <div class="mt-10 bg-gray-100 py-20">
    <blueblocksui-headings :size="2" :title="homepage.mainpageCompany" description=" "></blueblocksui-headings>
    <div class="mt-16">
      <blueblocksui-headings :size="3" :title="homepage.mainpageCompanySubtitle" description=" "></blueblocksui-headings>
      <div class="max-w-1024 mx-auto mt-8"><blueblocksui-layouts type="upDown"
          :content="useImageTextList(homepage.mainpageCompanyFeature)" :row="3"></blueblocksui-layouts></div>
    </div>


    <div class="mt-20 border-t border-gray-300 pt-20">
      <blueblocksui-headings :size="3" :title="homepage.mainpageStoryTitle" description=" "></blueblocksui-headings>
      <div class=" mt-12">

        <!-- useImageTextList(homepage.mainpageStoryContent) -->
        <blueblocksui-layouts type="leftRight" :content="riderStorySolt" :row="2">
          <template #img1>

            <img class="sm:hidden md:hidden lg:block"
              src="https://pic.lightbicycle.com/www/home/images/compressed/PC1-Review-Ryan.jpeg" />

            <img class="sm:hidden md:block lg:hidden"
              src="https://pic.lightbicycle.com/www/home/images/compressed/PAD-Rider-Review-Ryan-Sweeney.jpeg" />

            <img class="sm:block md:hidden lg:hidden"
              src="https://pic.lightbicycle.com/www/home/images/compressed/MO-rider-story-ryan-sweeney.jpeg" />

          </template>

          <template #img2>

            <img class="sm:hidden md:hidden lg:block"
              src="https://pic.lightbicycle.com/www/home/images/compressed/PC1-Review-Konstantine.jpeg" />

            <img class="sm:hidden md:block lg:hidden"
              src="https://pic.lightbicycle.com/www/home/images/compressed/PAD-Rider-Review-Konstantine-Kleine.jpeg" />

            <img class="sm:block md:hidden lg:hidden"
              src="https://pic.lightbicycle.com/www/home/images/compressed/rider2-story-konstantine-kleine.jpeg" />
          </template>
        </blueblocksui-layouts>

        <p class="mt-14 mx-auto text-2xl text-center">
          <blueblocksui-button type="text" mystyle="text-blue-600 hover:underline"
            text="More rider stories >>"></blueblocksui-button>
        </p>

      </div>
    </div>


    <div class="mt-20 border-t border-gray-300 pt-20">
      <blueblocksui-headings :size="3" title="Press Review" description=" "></blueblocksui-headings>
      <div class="mt-14">
        <blueblocksui-carousel type='gallery' :list="list"></blueblocksui-carousel>
      </div>
    </div>
  </div>


  <!-- 新闻 homepage.news_title -->
  <!-- <div class="mt-20">
    <blueblocksui-headings :size="2" :title="homepage.news_title"
      :description="homepage.news_subtitle"></blueblocksui-headings>
    <div class="px-4 py-8 grid grid-cols-5 gap-4" v-for="(item, key) in homepage.news_content">
      <blueblocksui-card type="info" :title="item.paragraphTitle"
        description="Whatever designed by you, handmade by us."></blueblocksui-card>
    </div>
  </div> -->
  <!-- 新闻 -->
  <div class="mt-20">
    <blueblocksui-headings :size="2" :title="homepage.mainpageNewsTitle"
      :description="homepage.mainpageNewsSubtitle"></blueblocksui-headings>

    <div class="px-4 py-8 grid grid-cols-5 gap-4">
      <blueblocksui-card v-for="(item, key) in homepage.mainpageNewscContent" type="info" :category="item.category"
        :title="item.paragraphTitle" description="item.paragrapContent.content[0].content[0].value"></blueblocksui-card>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
// import { useWindowSize } from '@vueuse/core'
// const { width, height } = useWindowSize()

// // watchEffect(() => {
//   console.log(`Window size changed to ${width.value} x ${height.value}`)
// })


// console.log('sss---', width, height);
//骑手故事插槽
const riderStorySolt = [
  { name: 'img1' },
  { name: 'img2' }
]

const list = [
  '"Saving thousands of dollars sounded very appealing, so we bought a pair of $181 carbon rims on our own dime and mounted them to a downhill bike. To our surprise, theyre still running strong."',
  '"The value in Light Bicycle’s wheels is all in the rims. An AM927 rim can be purchased for $289, so if you happen to have a hubset sitting around, Light Bicycle offers an affordable way to turn them into a carbon wheelset."',
  '"LB rims are made to order and take a few weeks to arrive at your door. Both sets built up with no issues and the mechanics, who started as skeptics, were generally impressed with the quality."',
  '"Now we have countless hours on various models, and have been nothing but impressed. Dollar for dollar, these are simply very hard to beat, and we think they provide a real value in our catalog. "',
  '"Light Bicycle has a broad range of rims for road bikes, both tubular and clincher, including tubeless compatible rims. They have carbon fat bike rims, and most importantly they have a variety of carbon mountain bike rims."',
]

//新闻列表
const newsList = [
  { category: 'Custom', title: 'Full Custom Like Nowhere Else', description: 'Whatever designed by you, handmade by us.', link: '' },
  { category: 'Custom', title: 'Introducing Laser Engraved Graphics', description: 'We are happy to introduce a more sustainable decal solution for you.', link: '' },
  { category: 'Wheel-Check', title: 'Free Service: Pre-Shipment Product Photoshots', description: 'Get some reassurance on your product before it ships out.', link: '' },
  { category: 'Rim-Tech', title: 'Tubeless or Tubeless Ready Rims, What’s Best For Me?', description: 'Find the methods to lace a rim without spoke access holes.', link: '' },
  { category: 'Gravel-Road', title: 'UCI-Approved Road Wheels Listing', description: 'R45, AR46, WR38, WR50, AR465, R65 have been UCI-accredited.', link: '' },
];

const homepage = await useContentfulEntry({ 'entry_id': '33RMNLdLtpRIlhWSia24IC' });
//console.log('contentful-mainpage', homepage)

</script>


