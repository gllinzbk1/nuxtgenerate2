<template>
    <!-- 横幅广告 -->
    <blueblocksui-banner :size="1" textWidth="2/3" title="A CARBON SPOKE WHEEL UPGRADE FOR ALL RIDERS"
        description="And we offer 2 editions for your choice." link="#"
        pcBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-Light-Bicycle-XC930-mtb-wheelset.jpeg"
        mobileBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-Light-Bicycle-XC930-mtb-wheelset.jpeg"
        buttonText="EXPLORE NOW"></blueblocksui-banner>

    <!-- 横幅广告 *2 -->
    <div class="px-2 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <blueblocksui-banner :size="2" textWidth="full" title="WG44 DISC: ULTRA-WIDE AERO GRAVEL WHEELS"
            description="Perfect for 35mm+ gravel tires." link="#"
            pcBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-WG44-Wide-Gravel-Aero-Wheelset.jpeg"
            mobileBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/MO-WG44-Wide-Gravel-Aero-Wheelset.jpeg"
            buttonText="EXPLORE NOW"></blueblocksui-banner>
        <blueblocksui-banner :size="2" textWidth="full" title="AR25 DISC: LIGHT, NIMBLE, FAST"
            description="Build your lightest gravel wheelset yet." link="#"
            pcBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-XC924-AR25-disc-wheelset.jpeg"
            mobileBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/MO-XC924-AR25-disc-wheelset.jpeg"
            buttonText="EXPLORE NOW"></blueblocksui-banner>
    </div>

    <!-- 骑手最爱 -->
    <div class="mt-20">
        <blueblocksui-headings :size="2" title="RIDER FAVORITES" description="Get ride ready."></blueblocksui-headings>

        <div class="px-5 py-8 pt-8 grid grid-cols-1  md:grid-cols-2 gap-4">
            <blueblocksui-banner :size="2" textWidth="2/3" title="AR46 Disc For Any Adventure" description="" link="#"
                pcBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-Bestseller-AR46-disc.jpeg"
                mobileBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/MO-AR46-disc-wheelset-on-Specialized-road-bike.jpeg"
                buttonText="BUILD MINE"></blueblocksui-banner>
            <blueblocksui-banner :size="2" textWidth="2/3" title="AR465 Disc New Aero Look" description="" link="#"
                pcBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-Bestseller-AR465-Disc.jpeg"
                mobileBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/MO-AR465-disc-wheelset-review.jpeg"
                buttonText="BUILD MINE"></blueblocksui-banner>
            <blueblocksui-banner :size="2" textWidth="2/3" title="AM930 All Mountain Player" description="" link="#"
                pcBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-Bestseller-AM930.jpeg"
                mobileBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/MO-AM930-wheelset-on-Santa-Cruz-MTB.jpeg"
                buttonText="BUILD MINE"></blueblocksui-banner>
            <blueblocksui-banner :size="2" textWidth="2/3" title="AM930-S Low Profile Trail Crusher" description="" link="#"
                pcBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/PC-AM930S-All-Mountain-Wheels.jpeg"
                mobileBackgroundImage="https://pic.lightbicycle.com/www/home/images/compressed/MO-AM930S-All-Mountain-Carbon-Wheels.jpeg"
                buttonText="BUILD MINE"></blueblocksui-banner>
        </div>

    </div>


    <!-- 为什么选择LIGHT BICYCLE -->
    <div class="mt-10 bg-gray-100 py-20">
        <blueblocksui-headings :size="2" title="WHY LIGHT BICYCLE?" description=" "></blueblocksui-headings>
        <!-- Our Mission -->
        <div class="mt-16">
            <blueblocksui-headings :size="3" title="Our Mission" description=" "></blueblocksui-headings>
            <div class="max-w-1024 mx-auto mt-8"><blueblocksui-layouts type="upDown" :content="ourMissionContent" :row="3"
                    :gap="1"></blueblocksui-layouts>
            </div>
        </div>

        <!-- Rider Story -->
        <div class="mt-20 border-t border-gray-300 pt-20">
            <blueblocksui-headings :size="3" title="Rider Story" description=" "></blueblocksui-headings>
            <div class=" mt-12">
                <blueblocksui-layouts type="leftRight" :content="riderStorySolt">
                    <template #img1><img
                            src="https://pic.lightbicycle.com/www/home/images/compressed/PC1-Review-Ryan.jpeg" /></template>
                    <template #img2><img
                            src="https://pic.lightbicycle.com/www/home/images/compressed/PC1-Review-Konstantine.jpeg" /></template>
                </blueblocksui-layouts>
                <p class="mt-14 mx-auto text-2xl text-center"><blueblocksui-button type="text"
                        mystyle="text-blue-600 hover:underline" text="More rider stories >>"></blueblocksui-button></p>
            </div>
        </div>

        <!-- Press Review -->
        <div class="mt-20 border-t border-gray-300 pt-20">
            <blueblocksui-headings :size="3" title="Press Review" description=" "></blueblocksui-headings>
            <div class="mt-14">
                <blueblocksui-carousel type='gallery' :list="pressReviewContent"></blueblocksui-carousel>
            </div>
        </div>

    </div>

    <!-- 新闻 -->
    <div class="mt-20">
        <blueblocksui-headings :size="2" title="NEWSLETTER"
            description="Master your products and ride."></blueblocksui-headings>

        <div class="px-4 py-8 grid grid-cols-5 gap-4">
            <blueblocksui-card v-for="item in newsList" type="info" :category="item.category" :title="item.title"
                :description="item.description"></blueblocksui-card>
        </div>
    </div>

    <blueblocksui-suspension></blueblocksui-suspension>
</template>
  
  
  
<script setup>
import { ref, onMounted } from 'vue'



// 我们的使命内容
const ourMissionContent = [
    {
        img: 'https://www.lightbicycle.com/images/index/oneindex/pc/8.png',
        text: 'Go Lighter.'
    },
    {
        img: 'https://www.lightbicycle.com/images/index/oneindex/pc/9.png',
        text: 'Get Personalized.'
    },
    {
        img: 'https://www.lightbicycle.com/images/index/oneindex/pc/10.png',
        text: 'Customer-First.'
    }
]

//骑手故事插槽
const riderStorySolt = [
    { name: 'img1' },
    { name: 'img2' }
]

//客户评论
const pressReviewContent = [
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
  