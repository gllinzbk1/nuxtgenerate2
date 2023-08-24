//将接收的对象数据转为请求url接口参数
export function useQueryToString(query = {}) {
  let q = "";
  for (const key in query) {
    if (q == "") {
      q = `?${key}=${query[key]}`;
    } else {
      q += `&${key}=${query[key]}`;
    }
  }
  return q;
}

//回车事件
export function useEnterEvent(event) {
  let handleEnterEvent = (e) => {
    if (e.key === "Enter") {
      event();
      e.preventDefault();
    }
  };
  onBeforeMount(() => {
    document.addEventListener("keydown", handleEnterEvent);
  });

  //移除事件
  onUnmounted(() => {
    document.removeEventListener("keydown", handleEnterEvent);
  });
}

//时间状态判断
export function useTimeStatus(start, end) {
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  const now = Date.now();

  let status = "";
  if (start < now && now < end) {
    status = "ing";
  } else if (start >= now) {
    status = "pending";
  } else {
    status = "end";
  }

  return status;
}

//对象存在判断
export function useIgnoreErrorAttr(obj, search = "", re = "") {
  const arr = search.split(".");
  if (!obj) {
      return re;
  }
  for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf("[") >= 0 && arr[i].indexOf("]") >= 0) {
          let index = arr[i].split("[")[1].split("]")[0]
          obj = obj[index];
      } else {
          obj = obj[arr[i]];
      }
      if (obj === undefined) {
          return re;
      }
  }
  return obj;
}
//js版的in_array的实现方法
export function useJsInArray(search,array){
  for(var i in array){
      if(array[i]==search){
          return true;
      }
  }
  return false;
}

export function useGetComputeApi(){
  console.log('11111111111')
  import('https://github-javascript-package-daodao.s3.us-west-1.amazonaws.com/src/modules/compile/post_generate_sql/bundle.esm.js').then(
    module=> {
     return module;
    }
  

  );
}

