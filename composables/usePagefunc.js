//搜索和分页获取数据功能抽离
export function usePagefunc(initListApiCallback){
    const route = useRoute()
    const page = ref(parseInt(route.query.page ?? 1))
    const limit = ref(8)

    const {rows,total} = initListApiCallback({
        page:page.value,
        limit:limit.value
    })


console.log('dataxxxx',total,rows)
    const handlePageChange = (p)=>{
        //console.log('ppppp',p)
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
console.log('xxxxxxxxxxx',{
    page,
    limit,
    rows,
    total,
    handlePageChange
})
    return {
        page,
        limit,
        rows,
        total,
        handlePageChange
    }
}