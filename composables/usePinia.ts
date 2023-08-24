//根据store的id来取store值
export const getStoreById = (id: string) => {
    //@ts-expect-error _s is internal
    return getActivePinia()?._s.get(id);
};