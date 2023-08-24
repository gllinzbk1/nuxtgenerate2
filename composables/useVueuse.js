import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

/**
 * 这是一个vueuse的使用类可复用逻辑函数 
 */

/**
 * @function:获取窗口大小
 * @author:Beyond
 * @description: 实时获取窗口的宽高并返回
 * @returns object 
 * @example {width: number, height: number}
 */
export function useGetWindowSize() {
    return toRefs({ width: width, height: height })
}

