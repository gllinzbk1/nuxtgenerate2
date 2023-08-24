import { el } from "date-fns/locale";
import {useNuxtApp} from "nuxt/app";

//获取指定入口数据，并加工处理返回
export async function useContentfulData(options = {}){
    const result = [];
    switch(options.content_type){
        case "Entry":
             result = await useContentfulEntry(options);
            break;
        case "Asset":
             result = await useContentfulAsset(options);
            break;            
    }
    
    return result;
}
//----对应api接口112233
//对content-type的entries,递归
export async function useContentfulContentType(data = [], options = {}) {
    console.log('content-type', options.content_type)
    const { $contentfulClient } = useNuxtApp();
    const ct = await $contentfulClient.getEntries(options);
    console.log('ct', options)

    if (ct) {
        // console.log('e',key,ct[key])
        const items = useIgnoreErrorAttr(ct, 'items') != '' ? ct['items'] : [];
        //const errors =  useIgnoreErrorAttr(ct,'errors')!='' ? ct['errors'] : [];
        const includes = useIgnoreErrorAttr(ct, 'includes.Entry') != '' ? ct['includes']['Entry'] : [];
        // console.log('items',items)
        // console.log('includes',includes)
        for (const key in items) {
            if (Object.hasOwnProperty.call(items, key)) {
                data[items[key].sys.id] = items[key].fields;
            }
        }
        for (const key in includes) {
            if (Object.hasOwnProperty.call(includes, key)) {
                data[includes[key].sys.id] = includes[key].fields;
            }
        }
        const pagesum = useCeil(ct['total'] / ct['limit'])
        if (ct['skip'] + 1 < pagesum) {
            options.skip = (ct['skip'] + 1)*ct['limit'];
            data = useContentfulContentType(data, options);
        }

    }
    return data;
}
//header menu
export  function useContentfulHeaderLevelJson(entries,data,menu=[],level=0,index0=0,index1=0,index2=0,index3=0){
    if(isEmpty(data)) return menu;
    //console.log('data',level,index0,index1,index2,index3)
    var index3cate = 0;

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            let element = []
            if(useIgnoreErrorAttr(data[key],'fields')=='') {
                //console.log('xxx2',data[key].sys.id,entries[data[key].sys.id])
                 element = entries[data[key].sys.id];
                //console.log('xxx',index0,element,data[key])
            }else{
                 element = useIgnoreErrorAttr(data[key],'fields')=='' ?  data[key] : data[key]['fields'];
                //console.log('ccc',data[key]['sys']['id'],element)
            }
            //console.log('dddd',element,data[key].sys.id,level,index0,index1,index2,index3)
            switch(level){
                //shop,adventrue,support,aboutus
                case 0:
                    menu.push({
                        name: isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                        isOnelink: isUndefined(element.elementUrl) ? false : true,
                        oneLink: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                        isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                        children:[]
                    })
                    index0 = key;
                    break;

                    //Rim/Wheelset
                case 1:
                   // console.log('111111',index0,'yes',menu[index0],menu,element,data[key].sys.id)                
                    if(menu[index0]['name']=='SHOP'){
                       const title = isUndefined(element.elementTitle) ? '' :  element.elementTitle
                        menu[index0]['children'].push({
                            category: isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                            isOnelink: isUndefined(element.elementUrl) ? false : true,
                            oneLink: isUndefined(element.elementUrl) ? '' : element.elementUrl,
                            isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                            showChild: title=='Equipment' ? false : true,
                            twoList: [],
                        })
                    }else{
                        menu[index0]['children'].push(                                
                            {
                            img: !isUndefined(element.elementimage) ? element.elementimage[0].fields.file.url : '',
                            link: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                            title: isUndefined(element.elementTitle) ? '' :  element.elementTitle, 
                            description: element.elementSubtitle, 
                            twoList: [], //无作用
                            }
                            )
                    }

                    index1 = key;
                   // console.log('111111e', index0,index1,!isUndefined(element.elementimage) ? element.elementimage[0] : '',menu[index0]['children'])
                    break;
                //Mountain Bike
                case 2:
                    //console.log('222222',index0,index1,menu,menu[index0],menu[index0]['children'][index1]['twoList'])
                    menu[index0]['children'][index1]['twoList'].push(
                        { 
                        name: isUndefined(element.elementTitle) ? '' :  element.elementTitle, 
                        isOnelink: isUndefined(element.elementUrl) ? false : true,
                        oneLink: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                        isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                        categorCenter: [],
                        imgCard:[],
                        toolCard:[]
                        }
                    )
                    index2=key;
                    break; 
                    //product
                case 3:
                   // console.log('33333',index0,index1,index2,menu[index0]['children'],menu[index0]['children'][index1]['twoList'][index2])
                    
  

                    switch(element.elementType){
                        case "Menu":
                            //console.log('33333','menu',element)
                            menu[index0]['children'][index1]['twoList'][index2]['categorCenter'].push(
                                {
                                listName:isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                                list:[], 
                                bottomName:!isUndefined(element.buttonText) ? element.buttonText : '',
                                bottomLink:!isUndefined(element.elementButtonUrl) ? element.elementButtonUrl : '',
                                }
                            )
                            index3=index3cate;
                            index3cate++;
                            break;
                        case "AD":
                           // console.log('33333','ad',element)
                            menu[index0]['children'][index1]['twoList'][index2]['imgCard'].push(
                                {
                                img: !isUndefined(element.elementimage) ? element.elementimage[0].fields.file.url : '',
                                link: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                                title: isUndefined(element.elementTitle) ? '' :  element.elementTitle, 
                                description: element.elementSubtitle, 
                                bottomName:!isUndefined(element.buttonText) ? element.buttonText : '',
                                bottomLink:!isUndefined(element.elementButtonUrl) ? element.elementButtonUrl : '',
                                }
                            )
                            break;   
                        case "Tool":
                           // console.log('33333','tool',element)
                            menu[index0]['children'][index1]['twoList'][index2]['toolCard'].push(
                                {
                                    name: isUndefined(element.elementTitle) ? '' :  element.elementTitle, 
                                    isOnelink: isUndefined(element.elementUrl) ? false : true,
                                    oneLink: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                                    isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                                }
                            )
                            break;                                                     
                    }
                   // console.log('33333',index0,index1,index2,menu[index0]['children'],menu[index0]['children'][index1]['twoList'][index2])
                    
                    break;  
                case 4:
                   // console.log('44444',index0,index1,index2,index3, menu[index0]['children'][index1]['twoList'][index2])
                    menu[index0]['children'][index1]['twoList'][index2]['categorCenter'][index3]['list'].push(
                        {
                         linkName:isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                         listLink:isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                         linkIsNew:isUndefined(element.elementCornerMark) ? false : element.elementCornerMark
                        }
                    )
                    break;                                         
            }
           
            if(useIgnoreErrorAttr(element,'elementSubelement')!=''){
                //console.log('element.elementSubelement',element.elementSubelement)
                if(element.elementTitle=='Equipment'){
                    menu[index0]['children'][index1]['twoList'].push(
                        { 
                            name: isUndefined(element.elementTitle) ? '' :  element.elementTitle, 
                            isOnelink: isUndefined(element.elementUrl) ? false : true,
                            oneLink: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                            isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                            categorCenter: [],
                            imgCard:[],
                            toolCard:[]
                            }
                    )
                    menu = useContentfulHeaderLevelJson(entries,element.elementSubelement,menu,level+2,index0,index1,index2,index3)
                    console.log('Equipment3',menu,level+2,index0,index1,index2,index3)

                }else{
                    menu = useContentfulHeaderLevelJson(entries,element.elementSubelement,menu,level+1,index0,index1,index2,index3)
                }
            }
        }
    }
    return menu;
}
//底部
export async function useContentfulFooterLevelJson(entries,data,menu=[],level=0,index0=0,index1=0,index2=0,index3=0){
    if(isEmpty(data)) return menu;
    //console.log('data',level,index0,index1,index2,index3,data)
    var index3cate = 0;

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            let element = []
            if(useIgnoreErrorAttr(data[key],'fields')=='') {
                //console.log('xxx2',data[key].sys.id,entries[data[key].sys.id])
                 element = entries[data[key].sys.id];
                //console.log('xxx',index0,element,data[key])
            }else{
                 element = useIgnoreErrorAttr(data[key],'fields')=='' ?  data[key] : data[key]['fields'];
              // console.log('ccc',data[key]['sys']['id'],element)
            }
           // console.log('dddd',element,element.elementSubelement,data[key].sys.id,level,index0,index1,index2,index3)
            switch(level){
                //shop,adventrue,support,aboutus
                case 0:
                   // console.log('menu1',menu)
                    menu.push({
                        name: isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                        isOnelink: isUndefined(element.elementUrl) ? false : true,
                        href: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                        isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                        list:[],
                        global:[],
                        north:[]
                    })
                    
                    index0 = key;
                    break;

                    //Rim/Wheelset
                case 1:
                   // console.log('111111',index0,'yes',menu[index0],menu,element,data[key].sys.id)   
                   
                   switch(element.elementType){
                    case "Footer_Global":
                        menu[index0]['global'] = {
                            name: isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                            isOnelink: isUndefined(element.elementUrl) ? false : true,
                            href: isUndefined(element.elementUrl) ? '' : element.elementUrl,
                            isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                            list:[]
                        }
                        index1 = 'global';
                        break;
                    case "Footer_North":
                        menu[index0]['north']={
                            name: isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                            isOnelink: isUndefined(element.elementUrl) ? false : true,
                            href: isUndefined(element.elementUrl) ? '' : element.elementUrl,
                            isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                            list:[]
                        }
                        index1 = 'north';
                        break;   
                    default:
                        menu[index0]['list'].push({
                            name: isUndefined(element.elementTitle) ? '' :  element.elementTitle,
                            isOnelink: isUndefined(element.elementUrl) ? false : true,
                            href: isUndefined(element.elementUrl) ? '' : element.elementUrl,
                            isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark,
                        })
                   }


                    
                   // console.log('111111e', index0,index1,!isUndefined(element.elementimage) ? element.elementimage[0] : '',menu[index0]['children'])
                    break;
                //Mountain Bike
                case 2:
                   console.log('222222',index0,index1,menu,menu[index0],menu[index0][index1])
                    menu[index0][index1]['list'].push(
                        { 
                        name: isUndefined(element.elementTitle) ? '' :  element.elementTitle, 
                        isOnelink: isUndefined(element.elementUrl) ? false : true,
                        href: isUndefined(element.elementUrl) ? '' :  element.elementUrl,
                        isOneNew: isUndefined(element.elementCornerMark) ? false : element.elementCornerMark
                        }
                    )
                    index2=key;
                    break; 
                    //product
                                                    
            }
           
            if(useIgnoreErrorAttr(element,'elementSubelement')!=''){
                //console.log('element.elementSubelement',element.elementSubelement)
                menu = await useContentfulFooterLevelJson(entries,element.elementSubelement,menu,level+1,index0,index1,index2,index3)
            }
        }
    }
    return menu;
}

export async function useContentfulAsset(options = {}){
    console.log('asset start',options.asset_id)
    const result =  await client.getAsset(options.asset_id);
    console.log("asset fieldkey", result,options.asset_id)
    const fieldkey = result['fields'];
    let data = []
    for (const key in fieldkey) {
        if (Object.hasOwnProperty.call(fieldkey, key)) {
                console.log(" asset fieldkey[key]",key,fieldkey[key])

                data[key] = fieldkey[key];

        }
    }
    console.log('asset data',data)
    return data;
}
//单条entry
export async function useContentfulEntry(options = {}){
   const { $contentfulClient } = useNuxtApp();
   const result = await $contentfulClient.getEntry(options.entry_id);
        //console.log("entry fieldkey", result.sys.type,options.entry_id,result)
    const fieldkey = result['fields'];
    let data = []
    if(result.sys.type=='Error') return data;
    for (const key in fieldkey) {
        if (Object.hasOwnProperty.call(fieldkey, key)) {
            // console.log("entry-fieldkey[key]",key,fieldkey[key])
            if(isObject(fieldkey[key])){
                data[key]=[]
                for (const fkey in fieldkey[key]) {
                    if (Object.hasOwnProperty.call(fieldkey[key], fkey)) {
                        const element = fieldkey[key][fkey];
                        if(element.sys.type!='Error'){
                            //console.log("element.sys['id']",element['sys']['type'],element['sys']['id'],element['fields'])
                           // data[key][element['sys']['id']] =     element['fields'];
                            data[key].push(element['fields'])
                        }
                    }
                }

            }else{
                data[key] = fieldkey[key];
            }
        }
    }
    //console.log('entry data',data)
    return data;
}
export async function useContentfulEntryLevel(options = {}){
    const { $contentfulClient } = useNuxtApp();
    const result = await $contentfulClient.getEntry(options.entry_id);
     return result;
 }
//屏幕的背景图获取
export function useBackgroudImage(imageObject,style){
    //console.log('imageObject',imageObject)
    for (const key in imageObject) {
        if (Object.hasOwnProperty.call(imageObject, key)) {
            const element = imageObject[key]['fields'];
            //console.log('item',element,element.title)
            if(useStartsWith(useToLower(element.title),style)==true){
                return element['file']['url'];
            }
        }
    }

    return '';
  }
  //获取图文列表-文-图
  export function useImageTextList(imageTextObject){
    //console.log('imageTextObject',imageTextObject)
    let data=[]
    for (const key in imageTextObject) {
        if (Object.hasOwnProperty.call(imageTextObject, key)) {
            const element = imageTextObject[key];
            console.log('xxxx',element)
            data.push({'text':element.paragrapContent.content[0].content[0].value,'img':element.paragraphImages[0].fields.file.url})            
            //console.log('item',element.content.content[0].content[0].value,element.images[0].fields.file.url)
        }
    }
    return data;
  }
  //