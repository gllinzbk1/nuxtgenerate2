// /**
//  * https://zhuanlan.zhihu.com/p/51322888
//  * 
//  * https://blog.csdn.net/qq_42761482/article/details/123715586
//  * @param {// 设置值
// localStorage.myCat = 'Tom';
// localStorage['myCat'] = 'Tom';
// localStorage.setItem('myCat', 'Tom');
// // 获取值
// localStorage.myCat; // 'Tom'
// localStorage['myCat']; // 'Tom'
// localStorage.getItem('myCat'); // 'Tom'} areaId 
//  */
// //----localStorage
// //新增产品到localstorage
// export function useAddProudctToCart(areaId,productInfo) {
//     const cartAreaId = "cart_areaId_"+areaId
//     const cartList = []
//     if(localStorage.hasOwnProperty(cartAreaId)){
//         //取出
//         cartList = JSON.parse(localStorage['cartAreaId']);// 转为JSON
//         console.log('cartList',cartList); // 打印出原先对象       
//     }
//     cartList.push(productInfo);
//     localStorage['cartAreaId'] = JSON.stringify(cartList); //将JSON转为字符串
//     console.log('cartList',cartList); // 打印出原先对象

// }

// export function useGetCartLocalStorage(areaId) {
//     const cartAreaId = "cart_areaId_"+areaId
//     //取出
//     cartList = JSON.parse(localStorage['cartAreaId']);// 转为JSON
//     console.log('cartList',cartList); // 打印出原先对象   

// }

// export function useRemoveCartLocalStorage(areaId) {
//     const cartAreaId = "cart_areaId_"+areaId
//     //取出
//     localStorage.removeItem('cartAreaId')
//     console.log('cartList',cartList); // 打印出原先对象   
// }
// //----localStorage一个检查三个方法
// //判断是否有localStorage
// export function useIfExistLocalStorage(areaId) {
//     const cartAreaId = "cart_areaId_"+areaId
//     //取出
//     cartList = JSON.parse(localStorage['cartAreaId']);// 转为JSON
//     console.log('cartList',cartList); // 打印出原先对象   

// }
// //设置localStorage
// export function useSetLocalStorage(areaId) {
//     const cartAreaId = "cart_areaId_"+areaId
//     //取出
//     cartList = JSON.parse(localStorage['cartAreaId']);// 转为JSON
//     console.log('cartList',cartList); // 打印出原先对象   

// }
// //获取localstorage
// export function useGetLocalStorage(areaId) {
//     const cartAreaId = "cart_areaId_"+areaId
//     //取出
//     cartList = JSON.parse(localStorage['cartAreaId']);// 转为JSON
//     console.log('cartList',cartList); // 打印出原先对象   

// }
// //删除localstorage
// export function useRemoveLocalStorage(areaId) {
//     const cartAreaId = "cart_areaId_"+areaId
//     //取出
//     localStorage.removeItem('cartAreaId')
//     console.log('cartList',cartList); // 打印出原先对象   
// }
// //var cName = ['areaId', 'express', 'nv', 'optionStr', 'price', 'qty', 'weight', "productHub","pic"];
// //-----产品管理
// //-----优惠券
// export function useCouponCode(e){
//     var codeText = $.cookie("_couponCode"+AREA);
//     if (codeText !== '' || codeText.length !== 0) {
//         $(e).html('<i class="fa fa-spinner fa-spin fa-fw fa-lg"></i>');
//         var url = '/couponcode.html?code=' + codeText + '&areaId=' + AREA;

//         var ajaxcoupon = $.ajax({
//             url:url,
//             type : 'POST',
//             async: false,
//             dataType:'json',
//             success: function(rdata,status){
//                  console.log("rdata",rdata)
//                 if (typeof rdata !== "object") return;
//                 if (status == "success") {
//                     if (rdata.m.error == 1 || rdata.m.status == 0 || rdata.m.status == 4 || rdata.m == 0) {
//                         $.cookie("_couponCodeVal"+AREA,0);
//                         $("#couponCode-p" + AREA).slideDown(500);
//                         $("#couponCode" + AREA).addClass("error-f72424");
//                         $("#couponCode" + AREA).removeClass("border-0070ff-2x");
//                         _area[AREA].pices.discount = 0;
//                         $(".correctArrow_" + AREA).hide();
//                         $(".countText" + AREA).slideUp(500);
//                         fnCalculationTotalPrice();
//                     } else {
//                         $("#couponCode-p" + AREA).slideUp(500);
//                         $("#couponCode" + AREA).removeClass("error-f72424");
//                         console.log('code=' + codeText + '&areaId=' + AREA,rdata.info)
//                         $.cookie("_couponCodeVal"+AREA,(rdata.m * _cart.cart_currency_price).toFixed(2));
//                         _area[AREA].pices.discount = Number($.cookie("_couponCodeVal"+AREA));
//                         _area[AREA].coupon_Code = codeText;
//                         $(".countText" + AREA).slideDown(500);
//                         if($("#couponCode"+AREA).val() !== ""){
//                             $(".correctArrow_" + AREA).show();
//                         }
                       
//                         if(AREA == 2 && _area[AREA].currentStep == 1 && _area[AREA].pices.discount > 0){
//                             GstCost();
//                         };
//                         fnCalculationTotalPrice();
//                     }
//                     setTimeout(function(){
//                         $(e).html('Apply');
                        
//                     },500);
                    
//                 }       
//             },
//             error : function(XMLHttpRequest,status){ 
//                 $(".PromptText_"+AREA).html("It looks as if the request takes too long to process. Please refresh your page or try again later.");
//                 $(".promptBtn_" + AREA).hide();
//                 setTimeout(function(){
//                     dataError();
//                 },500);
//                 _area[AREA].pices.discount = 0;
//                 if (codeText == 'E1Z5MQGI') {
//                     $("#shareFbCode-" + AREA).show();
//                     $("#couponCode-p" + AREA).show();
//                 } else {
//                     $("#couponCode-p" + AREA).show();
//                     $("#shareFbCode-" + AREA).hide();
//                 }
//                 $(e).html('Apply')
//             }

//         });
//     };
// }

// //-----留言
// //-----价格
// //价格确认，与服务端确认，并写入购物开始的数据结构
// export function useCheckProductPriceOfCart(){

// }
// export function useCalculationTotalPrice() {
//     var sub = _area[AREA].pices.subtotal;
//     var dis = _area[AREA].pices.discount;
//     var sip = _area[AREA].pices.shipping;
//     var tax = _area[AREA].pices.tax;
//     var sdis = typeof _area[AREA].pices.shipping_discount != 'undefined' ? _area[AREA].pices.shipping_discount : 0;
//     console.log(sub,dis,sip,tax)
//     _area[AREA].pices.handling = ((sub + (sip == 'TBC' ? 0 : sip) - dis - sdis) * 0.035).toFixed(2) - 0;
//     var had = _area[AREA].pices.handling;
//     _area[AREA].pices.total = ((sub + (sip == 'TBC' ? 0 : sip) + had + tax - dis - sdis)).toFixed(2);
//     var tot = _area[AREA].pices.total - 0;
//     if (sip === "TBC") {
//         $(".shippingPices" + AREA).text("TBC");
//     } else {
//         $(".shippingPices" + AREA).text(sip.toFixed(2))
//     }
//     $(".subtotal" + AREA).text(sub.toFixed(2));
//     $(".couponTotal" + AREA).text(dis.toFixed(2));
//     $(".sandling" + AREA).text(had.toFixed(2));
//     if (AREA == 2) {
//         $(".tax" + AREA).text(tax);
//     };
//     $(".orderTotal" + AREA).text(tot.toFixed(2));

//     $("#FcouponTotal" + AREA).text(dis.toFixed(2));
// }
// //-----国家
// export function useSelectCountry(that, area, bool) {
//     _area[AREA]._country = $.trim($("#countyName" + AREA).select2('val'));
//     $(".shippingSel_" + AREA).css("pointer-events", "none");
//    // 
//    if($(".mtsShippingTPD_1")){
//     $(".mtsShippingTPD_1").slideUp(500)
//    }
//     if (AREA == 2) {
//         signatureFeeCss();
//         GstCost();
//         _area[AREA]._zipCode = "";
//         $(".zipInput2").val("");
//         $(".zipInput2").next(".tick").hide();
//         $(".zipInput2").parent().removeClass("active");
//         if ($(".calcuFee").is(":visible")) {
//             $(".calcuFee").slideUp();
//         }
//         if ($(".selCon_" + AREA).children().hasClass("shippingInfo")) {
//             $(".list-option_2>.list>ul").empty();
//             $(".selCon_" + AREA).html(`<div class="h-100 d-flex justify-content-start align-items-center"><div><span class="mr-2 color-999 d-inline-block">Please enter your zip code first...</span></div></div>`);
//             if ($(".calcuFee").is(":visible")) {
//                 $(".calcuFee").slideUp();
//             }
//             _area[AREA].pices.shipping = 'TBC';
//         }
//         fnCalculationTotalPrice();
//     }
//     if (_area[AREA]._country !== '') {
//         if (AREA == 2) {
//             $(".selCon_" + AREA).html(`<div class="h-100 d-flex justify-content-start align-items-center"><div><span class="mr-2 color-999 d-inline-block">Please enter your zip code first...</span></div></div>`);
//             $(".naZipCodeHint").slideUp();
//             buttonEnable(true, ".zipInput" + AREA);
//             buttonEnable(false, "#paymentBtn" + AREA);
//             if (_area[AREA]._zipCode !== '') {
//                 buttonEnable(true, "#paymentBtn" + AREA);
//                 shipping(AREA, _area[AREA]._country, _area[AREA]._zipCode);
//             }
//         }
//         if (AREA == 1 || AREA == 4 || AREA == 5) {
//             shipping(AREA, _area[AREA]._country, _area[AREA]._zipCode);
//         }
//     }
// }
// //-----运费
// export function useChangeShipping(event, e, shippNotes, shippPices, area) {
//     event.stopPropagation();
//     var shippPeriod = $(e).attr("data-period");
//     var shippingName = $(e).attr("data-shippingName");
//     _area[AREA].shipping.period = shippPeriod;
//     _area[AREA].shipping.type = shippNotes;
//     if(AREA == 2){
//         if (!_area[AREA].isSignature) {
//             //带签费
//             _area[AREA].pices.shipping = shippPices;
//         }else{
//             //无签费
//             if(_area[AREA].pices.shipping>0){
//                 _area[AREA].pices.shipping = parseFloat(shippPices) - parseFloat((5 * _cart.cart_currency_price).toFixed(2));
//             }else if(shippPices==0){
//                 _area[AREA].pices.shipping = parseFloat(shippPices); 
//             }else if(_area[AREA].pices.shipping=='TBC'){
//                 _area[AREA].pices.shipping = parseFloat(shippPices); 
//             }
//         }  
//     }else{
//         _area[AREA].pices.shipping = shippPices;
//     }
//         //是否优惠,只有中国区
//     //var shippingDiscount = 'Yes';
//     if(AREA==1 && window.open50Sale =='Yes'){
//         var sd = parseFloat((50 * _cart.cart_currency_price).toFixed(2));
//         if(_area[AREA].pices.shipping >= sd){
//             _area[AREA].pices.shipping_discount = sd;  
//         }else{
//             _area[AREA].pices.shipping_discount = _area[AREA].pices.shipping;
//         }
//     }
//     var is_include = false;
//     var is_includeTPD = false;
//     if (typeof shippingName == "string" && (shippingName == "MTS-Sea" || shippingName == "MTS-Air")) {
//         is_include = true
//     }
//     if (is_include) {
//         $(".mtsShipping_" + AREA).slideDown(500)
//     } else {
//         $(".mtsShipping_" + AREA).slideUp(500)
//     }
//     if (typeof shippingName == "string" && shippingName == "TPD") {
//         is_includeTPD = true
//     }
//     if (is_includeTPD) {
//         $(".mtsShippingTPD_" + AREA).slideDown(500)
//     } else {
//         $(".mtsShippingTPD_" + AREA).slideUp(500)
//     }
    
//     $.cookie(_area[AREA].prefix + 'shippingNotes', shippNotes, _cart._expires);
//     $(e).parent().parent("li").addClass("active").siblings().removeClass("active");
//     $(".imgs").removeClass("imgs2");
//     $(".list-option_" + AREA).hide();
//     $(".selCon_" + AREA).children(".option-con").remove();
//     $(".selCon_" + AREA).html($(e).children().clone());
//     console.log($(".selCon_" + AREA).children().hasClass("shippingInfo"),_area[AREA].pices.shipping)
//     if ($(".selCon_" + AREA).children().hasClass("shippingInfo") && _area[AREA].pices.shipping >= 0) {
//         buttonEnable(true, "#paymentBtn" + AREA);
//         $(".cart-signature").css("pointer-events", "");
//         $(".cart-signature").removeClass("color-999");
//         $(".cart-signature .rideo").css("border-color", "#72767b")
//     } else {
//         buttonEnable(false, "#paymentBtn" + AREA)
//     }
//     fnCalculationTotalPrice()
// }
// export function useSignature(e, area) {
//     var addShip = parseFloat((5 * _cart.cart_currency_price).toFixed(2));
//     if (area == 2) {
//         var freightPrice = $('.Freight-price-' + area);
//         if (freightPrice[0] == undefined || freightPrice[0] == '' || isNaN(_area[AREA].pices.shipping) || _area[AREA].pices.shipping == "TBC") {
//             return
//         } else {
//             if ($(e).hasClass('active')) {
//                 $(e).removeClass('active');
//                 $(freightPrice).map(function (i, val) {
//                     val.innerText = (val.innerText * 1 + addShip).toFixed(2)
//                 });
//                 _area[AREA].pices.shipping += addShip;
//                 _area[area].isSignature = false;
//                 fnCalculationTotalPrice();
//             } else {
//                 $(e).addClass('active');
//                 $(freightPrice).map(function (i, val) {
//                     val.innerText = (val.innerText * 1 - addShip).toFixed(2)
//                 });
//                 _area[area].isSignature = true;
//                 if (_area[AREA].pices.shipping != 0) {
//                     _area[AREA].pices.shipping -= addShip;
//                     fnCalculationTotalPrice();
//                 }
//             }
//         }
//     }
// }
// export function useshipping(area, country, zip) {
//     _area[AREA].pices.shipping = 'TBC';
//     fnCalculationTotalPrice();
//     $(".list-option_" + area + ">.list>ul").empty();
//     $(".cartTab>div").css("pointer-events", "none");
//     $(".mtsShipping_" + AREA).slideUp();
//     if (area == 2 && $(".calcuFee").is(":visible")) {
//         $(".calcuFee").slideUp()
//     }
//     $(".selCon_" + area).empty();
//     $(".selCon_" + area).html(`<div class="h-100 d-flex justify-content-start align-items-center"><div><span class="mr-2 color-999 d-inline-block">Please wait a while…</span><i class="fa fa-spinner fa-spin fa-1x fa-fw spinnerLoad"style="font-size:20px;"></i></div></div>`);
//     buttonEnable(false, "#paymentBtn" + AREA);
//     if (country == 0) return;
//     var datas = {
//         type: "stepTwoPay",
//         uu_id: _area[AREA].dataUu_id,
//         country_id: country,
//         zip_code: zip,
//     };
//     $.post('/step/cart-pay', datas, function (data, status) {
//         if (status == "success") {
//             buttonEnable(true, ".zipInput" + AREA);
//             $(".shippingSel_" + AREA).css("pointer-events", "");
//             $(".cartTab>div").css("pointer-events", "");
//             $(".selCon_" + area).find(".spinnerLoad").hide();
//             $(".selCon_" + area).html(`<div class="h-100 d-flex justify-content-start align-items-center"><div><span class="mr-2 color-999 d-inline-block">Select a shipping method...</span></div></div>`)
//         }
//         if (data.data.length < 1) {
//             return
//         }
//         var shippData = data.data.shipping_json[0];
//         var shipHtml = '';
//         var i = 0;
//         $(".list-option_" + area + ">.list>ul").empty();
//         for (var obj in shippData) {
//             var ship = shippData[obj];
//             if (typeof ship === "object") {
//                 if (AREA == 2 && ship.shipping_string == "UPS Standard" && ship.shipping_amount == 0) {
//                     $(".calcuFee").slideDown()
//                 } else {
//                     $(".calcuFee").slideUp()
//                 }
//                 ship.shipping_amount = parseFloat((ship.shipping_amount * _cart.cart_currency_price).toFixed(2));
//                 console.log(typeof(ship.shipping_amount))
//                 if (AREA == 2 && !_area[AREA].isSignature) {
//                     ship.shipping_amount = parseFloat(ship.shipping_amount) + parseFloat((5 * _cart.cart_currency_price).toFixed(2));
//                 }
//                 shipHtml += '<li class="px-3 pr-md-5" data-value="' + country + '">\n           <div class="shipping-content mb-0 py-2 py-lg-0 h-100 d-flex align-items-center ">\n               <div class="cart-check w-100 h-100 cursor-pointer" data-logistics="' + ship['shipping_notes'] + '" data-shippingName="' + ship['name'] + '" data-period="' + ship['shipping_string'] + '" onclick="fnChangeShipping(event, this, \'' + ship['shipping_notes'] + '\', ' + (ship["shipping_amount"]).toFixed(2) + ',' + AREA + ')">                   <div class="w-100 form-check-label px-0 font-16 d-flex justify-content-between align-items-center shippingInfo">\n                        <img src="' + ship.img + '" class="order-2 order-md-1" alt="" style="height:15px">\n                        <p class="mb-0 order-1 order-md-2 text-md-center haulCycle w-100">' + ship.shipping_string + '                        </p>\n                        <p class="mb-0 order-3 order-md-3">' + _cart.cart_currency_word + '&nbsp;<span class="Freight-price-' + AREA + '">' + (ship.shipping_amount).toFixed(2) + '</span></p>\n                   </div>\n               </div>\n           </div><hr class="my-0">\n       </li>';
//                 i++
//             }
//         }
//         $(".list-option_" + AREA + ">.list>ul").append(shipHtml);
//         $("#calculation" + AREA).html('Calculation');
//         fnCalculationTotalPrice()
//     })
// }
// //-----支付
// export function useChangePayment(e, area) {
//     if (area < 1 || area > 5) {
//         return
//     };
//     priceAndSuspend();
//     $(e).find(".payMethod" + area).slideDown(500);
//     $(e).siblings().find(".payMethod" + area).slideUp(500);
//     $(e).addClass("active border-0070ff-2x").siblings(".cart-check").removeClass("active border-0070ff-2x")
// }
// //-----联系信息,上下步
// export function useIsNext(e, pElement, bool, uuid, num) {
//     $(".cartLoad").fadeIn();

//     for (var i=0;i<_cart.areaText.length;i++){
//         cookie_dataRec(_cart.areaText[i]);
//     }
//     var strP = '',
//         bElemen = false,
//         sw = '';
//     if ((typeof pElement === "string") && (pElement !== "")) strP = pElement;
//     if ((typeof bool === "boolean")) {
//         bElemen = bool
//     }
//     if ((typeof num === "number") && (num !== undefined)) {
//         sw = num
//     }
//     var next_name = $(e).attr("data-next");
//     const paymentMet =  document.getElementById("paymentMethods") ? document.getElementById("paymentMethods").innerHTML:"";
//     const key = document.getElementById("clientKey") ? document.getElementById("clientKey").innerHTML:"";
//     const env = document.getElementById("environment") ? document.getElementById("environment").innerHTML:"";

//     var stepOneData = {
//         areaId: AREA
//     };
//     if (bElemen && sw && _cart._loading) {
//         switch (sw) {
//             case 1:
//                 var is_falg = true;
//                 stepOneData.type = 'stepOnePay';
//                 var releaseStatus = [];
//                 var basicP = [];
//                 var northaP = [];
//                 var productClear = [];

//                 var loadingEle = $(".cartLoad");
//                 var eurStocksEle = $("#eurStocks_"+AREA);
//                 var clearanceStocksEle = $("#clearanceStocks_"+AREA);
//                 var proinfoBtnEle = "#proinfoBtn";
//                 var productSoldEle = $("#productSoldOut_" + AREA);

//                 var showstr = ''
//                 $(".showclearance").html('')
//                 $("#proinfo" + AREA + " .cat-pro-list").each(function (i, item) {
//                     var isRelease = $(item).attr("data-release");
//                     var isBasicPrice = $(item).attr("data-basicprice");
//                     var isNorthaPrice = $(item).attr("data-northaprice");
//                     var isClearance = $(item).attr("data-clearance");
//                     var cartPrice = AREA == 1 ? isBasicPrice : isNorthaPrice;
//                     var bproductid = $(item).attr("data-productid");   //产品id
//                     var bproductid_count = +$(item).find(".pcs-num").val();  //产品数量
//                     releaseStatus.push(isRelease);
//                     basicP.push(isBasicPrice);
//                     northaP.push(isNorthaPrice);
//                     productClear.push(isClearance);
//                     if((isClearance == 'no' && isRelease < 1) || (isClearance == 'no' && cartPrice < 1)){
//                         is_falg = false;
//                         onlineProducts(loadingEle, productSoldEle, proinfoBtnEle, AREA);
//                     }
//                     if(isClearance == 'yes'){
//                         $.each(window.clearancedata[AREA], function(index, value) {                              
//                             if(index==bproductid && bproductid_count>value['num']){                                   
//                                 console.log(index,value,bproductid_count,value['num'])
//                                 showstr += '<p class="mb-2">Clearance '+value['title']+' <span id="clearance'+value['pro_id']+'">('+value['weight']+'g): </span>'+value['num']+' '+value['pcs']+' left</p>'    
//                             }              
//                         });
//                     }
//                 });
//                 if(showstr!=''){
//                     $(".showclearance").html(showstr)           
//                     is_falg = false;
//                     onlineProducts(loadingEle, clearanceStocksEle, proinfoBtnEle, AREA);
//                 }

                
//                 //阻止默认行为
//                 if(AREA==1 || AREA==2 || AREA==3){                       
//                     //var clearanceo = document.querySelector("#proinfo" + AREA + "");
//                     //clearanceo.addEventListener('click',clearancefn);
//                 }

//                 console.log(AREA, _cart.AR46AusStock);
//                 var initProXC, initProAR46_eu, initProAR465_eu, initProAR46_au;
//                 if (AREA == 4) {
//                     var produId = 0;
//                     $(`#proinfo${AREA}>div>.cat-pro-list`).each(function (i, item) {
//                         produId = $(item).attr("data-productid");
//                         if (produId == 520) {
//                             initProXC = +$(item).find(".pcs-num").val();
//                         }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
//                         if (produId == 681) {
//                             initProAR46_eu = +$(item).find(".pcs-num").val();
//                         }
//                         if (produId == 1264) {
//                             initProAR465_eu = +$(item).find(".pcs-num").val();
//                         }
//                         console.log(initProAR46_eu);
//                         console.log("欧洲："+_cart.AR46EurStock);
//                         if (+initProXC > _cart.XC925EurStock || +initProAR46_eu > _cart.AR46EurStock || +initProAR465_eu > _cart.AR465EurStock) {
//                             is_falg = false;
//                             onlineProducts(loadingEle, eurStocksEle, proinfoBtnEle, AREA);
//                         }
//                         return;
//                     })
//                 }

//                 if (AREA == 5) {
//                     var produId = 0;
//                     $(`#proinfo${AREA}>div>.cat-pro-list`).each(function (i, item) {
//                         produId = $(item).attr("data-productid");
//                         if (produId == 681) {
//                             initProAR46_au = +$(item).find(".pcs-num").val();
//                         }
//                         console.log(initProAR46_au);
//                         console.log("澳洲："+_cart.AR46AusStock);
//                         console.log(+initProAR46_au > _cart.AR46AusStock)
//                         if (+initProAR46_au > _cart.AR46AusStock) {
//                             is_falg = false;
//                             onlineProducts(loadingEle, eurStocksEle, proinfoBtnEle, AREA);
//                         }
//                         return;
//                     })
//                 };


//                 if(_area[AREA]._country !== ""){
//                     if (AREA == 2) {
//                         if (_area[AREA]._zipCode !== "") {
//                             signatureFeeCss();
//                             _area[AREA].isProductFreight = true;
//                         }
//                     }else{
//                         _area[AREA].isProductFreight = true;
//                     }
//                 }
//                 shippRefreshs(false);
//                 var msg = $.trim($("#isPro-box" + AREA + " textarea").val());
//                 if ((msg.length > 0) && (msg !== '')) stepOneData.cl_remark = msg;
//                 clickStatistics(uuid);

//                 var cName = ['areaId', 'express', 'nv', 'optionStr', 'price', 'qty', 'weight', "productHub"];
//                 var Details = {};
//                 for (var i = 1; i <= Number($.cookie(_area[AREA].prefix + "count")); i++) {
//                     for (var p in cName) {
//                         Details[_area[AREA].prefix + i + cName[p]] = $.cookie(_area[AREA].prefix + i + cName[p]);
//                     };
//                 };
//                 Details[_area[AREA].prefix + "count"] = $.cookie(_area[AREA].prefix + "count");
                
//                 var cl_remark = $.cookie(_area[AREA].prefix + 'msg');
//                 _area[AREA].coupon_Code = $.cookie("_couponCode"+AREA);
//                 let ajaxData = {
//                     areaId: stepOneData.areaId,
//                     type: stepOneData.type,
//                     _cartCurrency: _cart.cart_currency_word,
//                     _cartRate: _cart.cart_currency_price,
//                     _productInfo: Details,
//                     coupon_code: _area[AREA].coupon_Code,
//                     cl_remark: cl_remark
//                 };
//                 if (is_falg) {
//                     writeOrder(e, ajaxData, strP, next_name, bElemen, 1);
//                 };
//                 break;
//             case 2:
//                 $("#address-content-" + AREA).find('.address-list.required').hide();
//                 stepOneData.type = 'stepThreePay';
//                 let is_signature = 0;
//                 var Signature = $('.cart-signature').hasClass('active');
//                 if (!Signature && AREA == 2) {
//                     is_signature = 1
//                 } else {
//                     is_signature = 0
//                 }

//                 buttonEnable(false, ".zipInput" + AREA);
//                 if (typeof paymentMet !== "string") {throw "Data type error!";}
//                 if(paymentMet){
//                     initCheckoutAdyen(paymentMet, key, env);
//                 }
//                 if (stepOneData.payment_type_id == 1) {
//                     buttonEnable(false, "#addressBtn" + AREA);
//                     $("#address-method-" + AREA).show()
//                 } else if (stepOneData.payment_type_id == 11) {
//                     buttonEnable(true, "#addressBtn" + AREA);
//                     $("#address-method-" + AREA).hide();
//                     $("#address-content-" + AREA).find('.address-list.required').show();
//                     $("#address-content-" + AREA).find('.address-list').show()
//                 }
//                 if (_area[AREA].currentStep == 2) {
//                     $.each($(".inputs_" + AREA), function (i, item) {
//                         if ($(item).val() !== "") {
//                             $(item).next(".tick").show();
//                             $(item).parent().addClass("active")
//                         }
//                     });
//                     fnMailInputVal(_area[AREA].is_mailVal)
//                 }
            
//                 stepOneData.payment_type_id = _area[AREA].payment;
//                 stepOneData.shipping_type = _area[AREA].shipping.type;
//                 clickStatistics(uuid);
//                 let stepTwoData = {
//                     type: stepOneData.type,
//                     uu_id: _area[AREA].dataUu_id,
//                     payment_type_id: stepOneData.shipping_type,
//                     is_signature: is_signature,
//                     zip_code: _area[AREA]._zipCode
//                 };
//                 var freightPrice = $('.Freight-price-' + AREA);
//                 $(".PromptText_"+AREA).html("It seems that you’ve missed the country / zip code / shipping method, please complete your shipping information.");
//                 if (freightPrice[0] == undefined || freightPrice[0] == '' || typeof _area[AREA].pices.shipping == "string" || _area[AREA]._country == "") {
//                     buttonEnable(false, "#paymentBtn" + AREA);
//                     $(".promptBtn_" + AREA).show();
//                     setTimeout(function () {
//                         $(".cartLoad").fadeOut();
//                         $("#freightVal_" + AREA).modal();
//                     },1000);
//                     return;
//                 } else {
//                     writeOrder(e, stepTwoData, strP, next_name, bElemen, 2);
//                 };
//                 break;
//             case 3:
//                 var areaName = _area[AREA].prefix;
//                 stepOneData.type = 'stepFourPay';
//                 var pElment = $(".address-method-" + AREA);
//                 var _mail = "";
//                 var addressOne = pElment.children("[data-address=1]").hasClass("active");
//                 var addressTwo = pElment.children("[data-address=2]").hasClass("active");
//                 var paypal_address = null;
//                 if (addressOne) {
//                     _mail = $.trim(pElment.find('.mail1_' + AREA).val()).replace(/\s+/g, "");
//                     paypal_address = 1
//                 } else {
//                     _mail = $.trim(pElment.find('.mail2_' + AREA).val()).replace(/\s+/g, "");
//                     paypal_address = 0
//                 }
//                 var _cartNotes = $.trim($(".messageData" + AREA).find('textarea[name=mag' + AREA + ']').val()); // 获取Cart Notes提示
//                 var _first_name = $.trim(pElment.find('input[name=fullname]').val());
//                 var _company = $.trim(pElment.find('input[name=company]').val());
//                 var _addressline1 = $.trim(pElment.find('input[name=addressline1]').val());
//                 var _addressline2 = $.trim(pElment.find('input[name=addressline2]').val());
//                 var _city = $.trim(pElment.find('input[name=city]').val());
//                 var _state = $.trim(pElment.find('input[name=state]').val());
//                 var _phone = $.trim(pElment.find('input[name=phone]').val());
//                 $.cookie(areaName + "mail", _mail, _cart._expires);
//                 $.cookie(areaName + "fullname", _first_name, _cart._expires);
//                 $.cookie(areaName + "company", _company, _cart._expires);
//                 $.cookie(areaName + "addressline1", _addressline1, _cart._expires);
//                 $.cookie(areaName + "addressline2", _addressline2, _cart._expires);
//                 $.cookie(areaName + "city", _city, _cart._expires);
//                 $.cookie(areaName + "state", _state, _cart._expires);
//                 $.cookie(areaName + "phone", _phone, _cart._expires);
//                 $.cookie('cl_remark_b', null);
//                 $.cookie('is_paypal_pay', paypal_address);

//                 if (_area[AREA].vmail.test(_mail)) {
//                     stepOneData.mail = _mail
//                 }
//                 let stepThreeData = {
//                     type: stepOneData.type,
//                     uu_id: _area[AREA].dataUu_id,
//                     is_paypal_address: paypal_address,
//                     mail: _mail,
//                     first_name: _first_name,
//                     company: _company,
//                     address_line1: _addressline1,
//                     address_line2: _addressline2,
//                     city: _city,
//                     state: _state,
//                     phone: _phone,
//                 };
//                 if (_area[AREA].address == 2 || _area[AREA].payment == 11) {
//                     if (_first_name !== '') stepOneData.first_name = _first_name;
//                     if (_company !== '') stepOneData.company = _company;
//                     if (_addressline1 !== '') stepOneData.address_line1 = _addressline1;
//                     if (_addressline2 !== '') stepOneData.address_line2 = _addressline2;
//                     if (_city !== '') stepOneData.city = _city;
//                     if (_state !== '') stepOneData.state = _state;
//                     if (_phone !== "") stepOneData.phone = _phone
//                 };
//                 if (_mail == '' || !_area[AREA].vmail.test(_mail)) {
//                     buttonEnable(false, "#addressBtn" + AREA);
//                     $(".mailError" + AREA).show();
//                     $(".mailHint" + AREA).hide();
//                     $(".mail1_" + AREA).addClass("border-f72424-2x");
//                     $(".mail2_" + AREA).addClass("border-f72424-2x");
//                     setTimeout(function () {
//                         $(".cartLoad").fadeOut(); 
//                     },1000);
//                     return;
//                 } else {
//                     // console.log(_first_name,_company,_addressline1,_city,_state,_phone)
//                     // if(paypal_address!=1){
//                     //     if(_first_name=='' || _addressline1=='' || _city=='' || _state=='' || _phone==''){
//                     //         var loadingEle = $(".cartLoad");
//                     //         var eurStocksEle = $("#formFillmessage_"+AREA);
//                     //         var proinfoBtnEle = "#addressBtn";
//                     //         is_falg = false;
//                     //         onlineProducts(loadingEle, eurStocksEle, proinfoBtnEle, AREA);
//                     //     }
//                     // }
//                     writeOrder(e, stepThreeData, strP, next_name, bElemen, 3)
//                 };
//                 clickStatistics(uuid);
//                 var PayOne = $("#payment-method-" + AREA + " [data-mentod=1]");
//                 var PayAdyen = $("#payment-method-" + AREA + " [data-mentod=112]");
//                 if ($.cookie("is_paypal_pay") == 1) {
//                     PayOne.show();
//                     PayOne.find(".payMethod" + AREA).show();
//                     PayOne.addClass("active border-0070ff-2x");

//                     PayAdyen.removeClass("active border-0070ff-2x");
//                     PayAdyen.hide();
//                 }
//                 let countryc = $("#countyName" + AREA + " option:checked").text() ;
//                 if ($.cookie("is_paypal_pay") == 0) {
//                     if(countryc != "Philippines"){
//                         PayAdyen.show();
//                         PayAdyen.addClass("active border-0070ff-2x");
//                         PayAdyen.find(".payMethod" + AREA).show();

//                         PayOne.removeClass("active border-0070ff-2x");
//                         PayOne.show();
//                         PayOne.find(".payMethod" + AREA).hide()
//                     }else{
//                         PayAdyen.removeClass("active border-0070ff-2x");
//                         PayAdyen.hide();
                        
//                         PayOne.show();
//                         PayOne.find(".payMethod" + AREA).show();
//                         PayOne.addClass("active border-0070ff-2x");
//                     }


//                 };
//                 let productNameAndNum = "";
//                 $("[data-product=product_" + AREA + "]").each(function (i, item) {
//                     productNameAndNum += `${$(item).find(".hover_c").text()}\xa0(${$(item).find(".pcs-num").val()}\xa0${$(item).find(".productUnit").text()}),\xa0`;
//                 });
//                 let productStr = productNameAndNum.slice(0, productNameAndNum.length - 2);
//                 let zipAndPostal = $("[name=zipcode].zipInput" + AREA).val();
//                 let countryAndPostal = $("#countyName" + AREA + " option:checked").text() + (zipAndPostal == '' ? zipAndPostal : `\xa0(${zipAndPostal})`);
//                 $("#prductItemsName_" + AREA).text(productStr);
//                 $("#countryName_" + AREA).text(countryAndPostal);
//                 $("#shippingManner_" + AREA).text(_area[AREA].shipping.period);
//                 $("#mailName_" + AREA).text(_mail);
//                 if ((_cartNotes == "") || (_cartNotes == undefined)) {
//                     $("#cartNotesName_" + AREA).parent().hide();
//                 }else {
//                     $("#cartNotesName_" + AREA).text(_cartNotes); // 显示Cart Notes提示
//                     $("#cartNotesName_" + AREA).parent().show();
//                 }
//                 let _fullnames = _first_name == '' ? _first_name : _first_name + ', ';
//                 let _companys = _company == '' ? _company : _company + ', ';
//                 let _addressline1s = _addressline1 == '' ? _addressline1 : _addressline1 + ', ';
//                 let _addressline2s = _addressline2 == '' ? _addressline2 : _addressline2 + ', ';
//                 let _citys = _city == '' ? _city : _city + ', ';
//                 let _states = _state == '' ? _state : _state + ', ';
//                 let clientInfo = _fullnames + _companys + _addressline1s + _addressline2s + _citys + _states + _phone;
//                 if ($.cookie("is_paypal_pay") == 1) {
//                     $("#transportAddress_" + AREA).text("PayPal default address")
//                 } else {
//                     $("#transportAddress_" + AREA).text(clientInfo)
//                 }
//             break;
//         }
//     }
// };
// export function useIsPrev(e, ele, prevStep) {
//     _cart.is_active = false;
//     $(".cartLoad").fadeIn();
//     _area[AREA].currentStep = prevStep - 1;
//     currentPage(_area[AREA].currentStep, "prev");
//     shippRefreshs(true);
//     if (_area[AREA].currentStep == 2) {
//         buttonEnable(true, ".zipInput" + AREA)
//     }
//     if (_area[AREA].currentStep == 1) {
//         $(".shareIcon"+ AREA).show();
//     }
//     setTimeout(function () {
//         $(".cartLoad").fadeOut();
//         $('body,html').animate({
//             scrollTop: 200
//         }, 500);

//         if($(`.skip${_area[AREA].currentStep}_${AREA}`).hasClass("active")){
//             $(`.skip${_area[AREA].currentStep}_${AREA}`).removeAttr("data-target");
//         }
//     }, 500);
// }

// //-----生成定单，发起支付
// export function useWriteOrder(e, orderData, strP, next_name, bElemen, num) {
//     _cart.is_active = true;
//     _area[AREA].currentStep = num + 1;
//     priceAndSuspend();
//     setTimeout(function () {
//         $('body,html').animate({
//             scrollTop: 200
//         }, 500)
//     }, 500);
//     if (_area[AREA].currentStep == 3){
//         if ( $(".mts-content_" + AREA).hasClass("mtsConActive")) {
//             $(".mts-content_" + AREA).hide();
//             $(".mts-content_" + AREA).removeClass("mtsConActive")
//         }
//         $(".cart-content #address" + AREA).find("a,button,input,select,textarea").removeAttr("tabindex")
//     }
//     if (_area[AREA].currentStep > 1) {
//         $(".shareIcon"+ AREA).hide();
//     }
//     currentPage(_area[AREA].currentStep, "next");
//     var orderDatas = JSON.stringify(orderData);
//     if (typeof orderData !== "object" || orderDatas == "{}"){
//         $(".PromptText_"+AREA).html("Data submission failed, please try again!");
//         $(".promptBtn_" + AREA).hide();
//         setTimeout(function(){
//             dataError();
//         },500);
//         return;
//     }
// console.log("orderData",orderData)
//     var ajaxTimeoutTest = $.ajax({
//         url:'/step/cart-pay',
//         timeout : 10000,
//         type : 'POST',
//         data : orderData,
//         dataType:'json',
//         success: function(rdata,status){
//             //清仓数量判断在此
//             if(rdata.error==2){ 
//                 // $(".showclearance").html('')
//                 // var showstr = ''
//                 // $.each(JSON.parse(rdata.message), function(index, value) {
//                 //     console.log("ajax",index,value)
//                 //     productId = value
//                 //     showstr += '<p class="mb-2">Clearance '+window.clearancedata[AREA][productId]['title']+': <span id="clearance'+window.clearancedata[AREA][productId]['pro_id']+'">('+window.clearancedata[AREA][productId]['weight']+'g) </span>'+window.clearancedata[AREA][productId]['num']+' '+window.clearancedata[AREA][productId]['pcs']+'</p>'
//                 // });

//                 // $(".showclearance").html(showstr)           
//                 // $("#clearanceStocks_"+AREA).modal();  
//                 //clearanceo.removeEventListener('click',clearancefnback);
//                 alert("Don't do this!!!")
//                 return;
//             }
//             console.log(num,AREA)
//             if(num==1 && (AREA==1 || AREA==2 || AREA==3)){    
//                 // var clearanceo = document.querySelector("#proinfo" + AREA + "");            
//                 // //取消阻止默认行为
//                 // clearanceo.removeEventListener('click',clearancefn);  
//             }
//             if(rdata.data.item_amt_all > 0){
//                 _area[AREA].pices.subtotal = rdata.data.item_amt_all;
//                 $(".subtotal" + AREA).text(rdata.data.item_amt_all);
//             }
//             if(rdata.data.length === 0){
//                 $(".PromptText_"+AREA).html("Data request failed, please refresh and try again!");
//                 $(".promptBtn_" + AREA).hide();
//                 setTimeout(function(){
//                     dataError();
//                 },500);
//                 return;
//             }
//             $(".cartLoad").fadeOut();
//             if (num == 1 && $('#countyName' + AREA).select2('val') == '' && $("#countyName" + AREA + " option:checked").text() == '') {
//                 $("#countyName" + AREA).empty();
//                 $('#countyName' + AREA).append("<option></option>").trigger('change');
//                 $.each(rdata.data.countryList, function (i, item) {
//                     var newOption = new Option(item.country_name, item.id, false, false);
//                     $('#countyName' + AREA).append(newOption).trigger('change');
//                 });
//                 $('#countyName' + AREA).val(null).trigger('change');
//             }
//             $.cookie(_area[AREA]._mark + '-lb-uu-id', rdata.data.uu_id, _cart._expires);
//             _area[AREA].dataUu_id = $.cookie(_area[AREA]._mark + '-lb-uu-id');
//             if (rdata.error == '0') bElemen = false;
//             if (AREA == 2) {
//                 if (num == 2 || num == 3) {
//                     $.cookie("_gstVal", rdata.data.gst_price);
//                     var gst_price = $.cookie("_gstVal");
//                     _area[AREA].pices.tax = parseFloat((gst_price * _cart.cart_currency_price).toFixed(2));
//                     if (_area[AREA]._country == "38") {
//                         if (_area[AREA].pices.tax > 0) {
//                             $(".countTax" + AREA).slideDown();
//                         } else {
//                             _area[AREA].pices.tax = 0;
//                             $(".countTax" + AREA).slideUp();
//                         }
//                     } else {
//                         if (_area[AREA].pices.tax < 1) {
//                             _area[AREA].pices.tax = 0;
//                             $(".countTax" + AREA).slideUp();
//                         }
//                     }
//                     fnCalculationTotalPrice();
//                 }
//             }
//             if (typeof num !== 'undefined' && num == 3) {
//                 rdata.data.fromData.shipping = _area[AREA].pices.shipping;
//                 _area[AREA].paypalData = rdata;
//                 //--支付安钮
//                 var paypalData = _area[AREA].paypalData.data.fromData;
//                 var payments = _area[AREA].payment;
//                 console.log('paypalData',paypalData)
//                $(".paypal_loading_"+AREA).show();
//                 $('#paypalCheckoutContainer_'+AREA+'').html('<div class="h-100 d-flex justify-content-start align-items-center"><div class="paypal_loading_'+AREA+'"><span class="mr-2 color-999 d-inline-block">Please wait a while…</span><i class="fa fa-spinner fa-spin fa-1x fa-fw spinnerLoad"style="font-size:20px;"></i></div></div>');
//                 $("#paypalCheckoutContainer_data_"+AREA+"").html('');
//                 if (null != document.getElementById("PAYPAL-SCRIPT"+AREA)) {
//                     document.getElementById('PAYPAL-SCRIPT'+AREA).remove();
//                 }
//                 var disable_funding = '&enable-funding=paylater';  //&buyer-country=US
//                 // if(paypalData.is_paypal_address==1){
//                 //     disable_funding += '&disable-funding=card';
//                 // }
//                 disable_funding += '&components=buttons';  //test
//                 disable_funding += '&disable-funding=card';
//                 var btnScript = document.createElement("script");
//                 btnScript.type = "text/javascript";
//                 btnScript.src = "https://www.paypal.com/sdk/js?client-id=AQ6L_Mc5OpZRgpeC5E3xrIc7KTa0kummjJeHxHRg3kd0AoBBqcfpdGsJ8wXZNBj5QApenket3Xl00IeG&currency="+paypalData.inputs.currency_code+disable_funding+"";  //&disable-funding=card,credit
//                 btnScript.id = "PAYPAL-SCRIPT"+AREA;
//                 btnScript.setAttribute("data-namespace","paypalButton"+AREA);
//                 window.total_amt=0;
//                 btnScript.onload = function () {
//                     //加载按钮
//                     eval("paypalButton"+AREA).Buttons({
//                         // Set style of buttons
//                         style: {
//                             layout: 'vertical',   // horizontal | vertical
//                             size:   'responsive',   // medium | large | responsive
//                             shape:  'pill',         // pill | rect
//                             color:  'gold',         // gold | blue | silver | black,
//                             fundingicons: true,    // true | false,
//                             //tagline: false          // true | false,
//                         },
//                         onInit: function(data, actions)  {
//                             $(".paypal_loading_"+AREA).hide();
//                         },
//                         // Wait for the PayPal button to be clicked
//                         createOrder: function() {
//                             var item_amt_all=0;
//                             var allpayitems = [];
//                             console.log("paypalData.payItems[AREA]",paypalData.payItems[AREA])
//                             $.each(paypalData.payItems[AREA], function (i, itemsArr) {                                
//                                 console.log("itemsArr",itemsArr)
//                                 $.each(itemsArr, function(ii,items){
//                                     var payitems = {}
//                                     item_amt_all += items['price']*items['quantity'];
//                                     payitems.name = items['product']['item_no'];
//                                     payitems.unit_amount = {}
//                                     payitems.unit_amount.currency_code = paypalData.inputs.currency_code;
//                                     payitems.unit_amount.value = items['price'];
//                                     payitems.quantity = ""+items['quantity']+"";
//                                     payitems.category = "PHYSICAL_GOODS";
//                                     allpayitems.push(payitems) 
//                                 });
//                             });

//                             console.log("allpayitems",allpayitems)
//                             var updatedShipping = paypalData.shipping;
//                             window.total_amt = parseFloat(item_amt_all) +
//                                         parseFloat(paypalData.gst_price) +
//                                         parseFloat(paypalData.handling_fee) +
//                                         //parseFloat(SampleCart['tax_amt']) +
//                                         parseFloat(updatedShipping) -
//                                         parseFloat(paypalData.coupon_fee) - 
//                                         parseFloat(_area[AREA].pices.shipping_discount),
//                                 postData = new FormData();
//                                 postData.append('invoice_id',paypalData.inputs.invoice); 
//                                 postData.append('custom',paypalData.inputs.custom);
//                                 postData.append('payitems',JSON.stringify(allpayitems));
//                                 postData.append('tax_amt',(paypalData.gst_price));
//                                 postData.append('handling_fee',(paypalData.handling_fee));
//                                 // postData.append('insurance_fee','SampleCart['insurance_fee']');
//                                 postData.append('shipping_amt',updatedShipping);
//                                 postData.append('shipping_discount',_area[AREA].pices.shipping_discount);
//                                 postData.append('discount',(paypalData.coupon_fee));
//                                 postData.append('item_total',item_amt_all.toFixed(2));
//                                 postData.append('total_amt',total_amt.toFixed(2));
//                                 postData.append('currency',paypalData.inputs.currency_code);
//                                 postData.append('return_url',  paypalData.redirecturls.returnurl + '?commit=true');
//                                 postData.append('cancel_url', paypalData.redirecturls.cancelurl);
//                                 postData.append('is_paypal_address',paypalData.is_paypal_address);
                                
//                                 if(paypalData.is_paypal_address!=1){
//                                     postData.append('shipping_recipient_name',paypalData.shipping_detail.full_name);
//                                     postData.append('shipping_line1',paypalData.shipping_detail.address_line1);
//                                     postData.append('shipping_line2',paypalData.shipping_detail.address_line2);
//                                     postData.append('shipping_city',paypalData.shipping_detail.city);
//                                     postData.append('shipping_state',paypalData.shipping_detail.state);
//                                     postData.append('shipping_postal_code',paypalData.shipping_detail.country_code);
//                                     postData.append('shipping_country_code',paypalData.shipping_detail.postal_code);
//                                     postData.append('connect_phone',paypalData.shipping_detail.phone);
//                                 }
//                                 console.log("data-pp-amountxx",window.total_amt,paypalData.shipping_detail.country_code_pay,updatedShipping,paypalData.handling_fee,parseFloat(item_amt_all))     
//                             return fetch(
//                                 paypalData.services.orderCreate,
//                                 {
//                                     method: 'POST',
//                                     body: postData
//                                 }
//                             ).then(function(response) {  //console,return就是读两次
//                                 return response.json();
//                             }).then(function(resJson) {
//                                 console.log(resJson)
//                                 if(resJson.ack==false){
//                                     alert(resJson.data.id)
//                                     return;
//                                 }                
//                                 return resJson.data.id;
//                             });
//                         },

//                         // Wait for the payment to be authorized by the customer
//                         onApprove: function(data, actions) {
//                             return fetch(
//                                 paypalData.services.orderCapture,
//                                 {
//                                     method: 'GET'
//                                 }
//                             ).then(function(res) {
//                                 console.log(res)
//                                 return res.json();
//                             }).then(function(res) {
//                                 console.log(res)
//                                 if(res.data.purchase_units[0]['payments']['captures'][0]['status']=='COMPLETED' || res.data.purchase_units[0]['payments']['captures'][0]['status']=='PENDING'){   
//                                     //清除cookie  
//                                     var _cartcount = $.cookie(_area[AREA].prefix + 'count');
//                                     for (var i = 1; i <= _cartcount; i++) {
//                                         _cart.removeItem(i);
//                                     }
//                                     $.cookie(_area[AREA].prefix + 'count', 0, {
//                                         expires: -7
//                                     });
//                                     $.cookie(_area[AREA].prefix + 'msg', 0, {
//                                         expires: -7
//                                     });
//                                     $.cookie(_area[AREA]._mark + '-lb-uu-id', '', {
//                                         expires: -7
//                                     });
//                                     $.cookie("_couponCode" + AREA, '', {
//                                         expires: -7
//                                     });       
//                                     $.cookie("_couponCodeVal" + AREA, '', {
//                                         expires: -7
//                                     });                        
//                                     window.location.href = 'step/check-results?amt='+res.data.purchase_units[0]['payments']['captures'][0]['amount']['value']+'&cc='+res.data.purchase_units[0]['payments']['captures'][0]['amount']['currency_code']+'&cm='+res.data.purchase_units[0]['payments']['captures'][0]['custom_id']+'&st='+res.data.purchase_units[0]['payments']['captures'][0]['status']+'&tx='+res.data.purchase_units[0]['payments']['captures'][0]['id']+'&invoice_id='+res.data.purchase_units[0]['invoice_id'];

//                                 }else{
//                                     window.location.href = 'check-results-stripe?amt='+res.data.purchase_units[0]['payments']['captures'][0]['amount']['value']+'&cc='+res.data.purchase_units[0]['payments']['captures'][0]['amount']['currency_code']+'&cm='+res.data.purchase_units[0]['payments']['captures'][0]['custom_id']+'&st='+res.data.purchase_units[0]['payments']['captures'][0]['status']+'&tx='+res.data.purchase_units[0]['payments']['captures'][0]['id']+'&invoice_id='+res.data.purchase_units[0]['invoice_id'];
//                                 }
                                
//                             });
//                         },
//                         onError: function (err) {
//                             console.log(err)
//                             // For example, redirect to a specific error page
//                             //alert('An error occurred:'.err.message())
//                             //window.location.href = "/your-error-page-here"; 
//                         }

//                     }).render('#paypalCheckoutContainer_'+AREA+'');
//                 }   
//                 console.log("document.getElementsByTagName('head')",document.getElementsByTagName("head")[0])
//                 document.getElementsByTagName("head")[0].appendChild(btnScript);
//                 var arrCountry = ['US','AU'];
//                 console.log("paypalData.shipping_detail.country_code_pay",paypalData.shipping_detail.country_code_pay,arrCountry.indexOf(paypalData.shipping_detail.country_code_pay))
//                 if(arrCountry.indexOf(paypalData.shipping_detail.country_code_pay) > -1){
//                     console.log('1111')
//                     var item_amt_all=0;
//                     $.each(paypalData.payItems[AREA], function (i, itemsArr) {                                
//                         console.log("itemsArr",itemsArr)
//                         $.each(itemsArr, function(ii,items){
//                             item_amt_all += items['price']*items['quantity'];
//                         });
//                     });
//                     var updatedShipping = paypalData.shipping;
//                     window.total_amt = parseFloat(item_amt_all) +
//                                 parseFloat(paypalData.gst_price) +
//                                 parseFloat(paypalData.handling_fee) +
//                                 //parseFloat(SampleCart['tax_amt']) +
//                                 parseFloat(updatedShipping) -
//                                 parseFloat(paypalData.coupon_fee)
                    
//                     // var disable_funding = '&enable-funding=paylater';  //&buyer-country=US
//                     // // if(paypalData.is_paypal_address==1){
//                     // //     disable_funding += '&disable-funding=card';
//                     // // }
//                     // disable_funding += '&components=messages';  //test
//                     // disable_funding += '&disable-funding=card';		
//                     // if (null != document.getElementById("MSG-SCRIPT"+AREA)) {
//                     //     document.getElementById('MSG-SCRIPT'+AREA).remove();
//                     // }

//                     // var msgScript = document.createElement("script");
//                     // msgScript.type = "text/javascript";
//                     // msgScript.src = "https://www.paypal.com/sdk/js?client-id=AQ6L_Mc5OpZRgpeC5E3xrIc7KTa0kummjJeHxHRg3kd0AoBBqcfpdGsJ8wXZNBj5QApenket3Xl00IeG&currency="+paypalData.inputs.currency_code+disable_funding+"";  //&disable-funding=card,credit
//                     // msgScript.id = "MSG-SCRIPT"+AREA;
//                     // msgScript.setAttribute("data-namespace","paypalMsg"+AREA);
//                     // msgScript.onload = function () {
//                     //     eval("paypalMsg"+AREA).Messages({
//                     //         amount:window.total_amt.toFixed(2),
//                     //         placement: "product",
//                     //         buyerCountry: paypalData.shipping_detail.country_code_pay
//                     //     })
//                     //     .render('#paypalCheckoutContainer_data_'+AREA+'');
//                     // }
//                     // console.log("document.getElementsByTagName('head')msg",document.getElementsByTagName("head")[0])
//                     // document.getElementsByTagName("head")[0].appendChild(msgScript);   
                    
//                     paylaterMsg.Messages({
//                         amount: window.total_amt.toFixed(2),
//                         placement: "product",
//                         currency: paypalData.inputs.currency_code,
//                         buyerCountry: paypalData.shipping_detail.country_code_pay,
//                         style: {
//                             layout: "text",
//                             logo: {
//                                 type: "primary",
//                             },
//                             text: {
//                                 align: "left"
//                             }
//                         },
//                     })
//                     .render('#paypalCheckoutContainer_data_'+AREA+'');
//                     $("#paypalCheckoutContainer_data_"+AREA+"").show();

//                     //$("#paypalCheckoutContainer_data_"+AREA+"").attr('data-pp-amount',(window.total_amt).toFixed(2)) 
//                     //$("#paypalCheckoutContainer_data_"+AREA+"").attr('data-pp-buyercountry',paypalData.shipping_detail.country_code_pay) 
//                     //if(paypalData.shipping_detail.country_code_pay=='US') $("#paypalCheckoutContainer_data_"+AREA+"").show();
//                     console.log("data-pp-amount", _area[AREA].pices.total,_area[AREA].pices.handling)  
//                 }else{
//                     console.log(2222)
//                     $("#paypalCheckoutContainer_data_"+AREA+"").hide();
//                 }       
                
           
//                 //-------------
//             }
//             if (bElemen) return;
//             $(strP).prev('.step-title').find(".changeInfo").addClass("active");
//             if (_area[AREA].currentStep == 2){
//                 ShippingRates();
//             }
//         },
//         error : function(XMLHttpRequest,status){ 
//             $(".PromptText_"+AREA).html("It looks as if the request takes too long to process. Please refresh your page or try again later.");
//             if(status == 'timeout'){
//                 ajaxTimeoutTest.abort();
//                 $(".promptBtn_" + AREA).hide();
//                 setTimeout(function(){
//                     dataError();
//                 },500);
//             }
//             if(status == 'error'){
//                 console.log(status);
//             }
//         }
//     });
// }

// //-----分享