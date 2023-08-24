//搜索和分页获取数据功能抽离
export async function usePageAsync(initListApiCallback){
    const route = useRoute()
    const page = ref(parseInt(route.query.page ?? 1))
    const limit = ref(8)

    const rows = await initListApiCallback({
        page:page.value,
        limit:limit.value
    })

    const total = 10
    console.log('usePageAsync',total,rows)
    const handlePageChange = (p)=>{
        navigateTo({
            params:{
                ...route.params,
                page:p
            },
            query:{
                ...route.query
            }
        })
    }

    return {
        page,
        limit,
        rows,
        total,
        handlePageChange
    }
}

//搜索和分页获取数据功能抽离
export function usePageSync(initListApiCallback){
    const route = useRoute()
    const routeResult = useAnalyzeRoute(route);
    const page = ref(parseInt(routeResult['page'] ?? 1))
    const limit = ref(9)


    const {rows,total,pagesum} = initListApiCallback({
        page:page.value,
        limit:limit.value
    })


//console.log('usePageSync',total,rows)
    const handlePageChange = (p)=>{
        //console.log('usePageSync->event',p)
        navigateTo({
            params:{
                ...route.params,
                page:p
            },
            query:{
                ...route.query
            }
        })
    }

    return {
        page,
        limit,
        rows,
        total,
        pagesum,
        handlePageChange
    }
}