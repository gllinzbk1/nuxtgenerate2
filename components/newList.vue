<template>
    <blueblocksui-banner 
    pcBackgroundImage="https://www.lightbicycle.com/images/newsletter/specialized-road-bike-frame-with-light-bicycle-carbon-wheelset.jpeg" 
    mobileBackgroundImage="https://www.lightbicycle.com/images/newsletter/light-bicycle-carbon-wheelset-on-specialized-road-frame-red-disc-brake.jpeg"
    title="Why Buy From LIGHT BICYCLE?"
    description="Unprecedented value for cutting-edge rim technology."
    size="3"
    link="/newsletter/Nine-Reasons-Why-You-Should-Choose-LB-Rims.html"
    ></blueblocksui-banner>
    <div class="flex max-w-1366 mx-auto mt-6 mb-4">
        <span class="text-xl whitespace-nowrap">Narrow by ：</span>
        <div class="flex flex-wrap ml-4">
           <blueblocksui-tag v-for="tag,index in tagText" :key="index" :text="tag.text" type="round" roundType="nomal"></blueblocksui-tag>
           <blueblocksui-tag  type="close" :closeState="false"></blueblocksui-tag>
        </div>
    </div>
    <div class="max-w-1366 mx-auto mt-6 mb-4 grid grid-cols-3 gap-6">
        <blueblocksui-card type="news" v-for="item, index1 in newData" :key="index1" 
        :title="item.title"
        :thumbnail="item.thumbnail"
        :link="item.link"
        :description="item.description"
        :date="item.date"
        ></blueblocksui-card>
    </div>
    <div class="max-w-1366 mx-auto mb-10 mt-10 col-span-3">
          <blueblocksui-pagination :pagination="paginations" position="center"></blueblocksui-pagination>
    </div>
</template>
<script setup>
import {ref} from 'vue'
const tagText = [
    {text:'Gravel-Road'},
    {text:'MTB'  },
    {text:'Fat-Bike ' },
    {text:'New-In '  },
    {text:'Special-Offers '  },
    {text:'Component '  },
    {text:'Announcement '  },
    {text:'Tire  '  },
    {text:'Custom  '  },
]
const newData = [
{title: 'XC930 Ultra-Light XC Racer', description:'Beat your best PR with the XC930 270g.', date: '06-28-2023', thumbnail: 'https://www.lightbicycle.com/images/newsletter/super-light-xc930-270g-carbon-rim.jpg',link:'https://www.lightbicycle.com/newsletter/introducing-the-xc930-superlight-xc-wheels.html'},
{title: 'Classified × Light Bicycle', description:'We’re excited to offer Classified-ready wheels now.', date: '06-27-2023', thumbnail: 'https://www.lightbicycle.com/images/newsletter/Classified-hub-powershift.jpg',link:'https://www.lightbicycle.com/newsletter/classified-ready-carbon-wheelset-option.html'},
{title: 'Eurobike 2023 Invitation Letter', description:'Join us at Eurobike in Frankfurt from Jun 21 to 23!', date: '06-03-2023', thumbnail: 'https://www.lightbicycle.com/images/newsletter/Light-Bicycle-best-seller-buyer-guide.jpg',link:'https://www.lightbicycle.com/newsletter/eurobike-2023-invitation-letter.html'},
{title: 'Best Seller Buying Guide', description:'Road, gravel, BMX, and mountain wheels reviewed by your favorite Youtube personalities.', date: '05-30-2023', thumbnail: 'https://www.lightbicycle.com/images/newsletter/Light-Bicycle-best-seller-buyer-guide.jpg',link:'https://www.lightbicycle.com/newsletter/carbon-wheels-best-seller-buying-guide.html'},
{title: 'WG44: Ultra-Wide Aero Gravel Wheels', description:'A new frontier in gravel performance.', date: '04-13-2023', thumbnail: 'https://www.lightbicycle.com/images/newsletter/Light-Bicycle-WG44-wide-gravel-bike-wheelset-700c-disc-brake.jpg',link:''},
]

const paginations = ref(
  [
    { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/1', page_number: 1, is_current: true, type: 'link' },
    { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/2', page_number: 2, is_current: false, type: 'link' },
    { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/3', page_number: 3, is_current: false, type: 'link' },
    { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/4', page_number: 4, is_current: false, type: 'link' },
    { url: '', page_number: '', is_current: false, type: 'ellipsis' },
    { url: 'https://www.lightbicycle.com/carbon-mountain-bike/carbon-mountain-bike-rim/page/5', page_number: 8, is_current: false, type: 'link' },
  ],
)
</script>