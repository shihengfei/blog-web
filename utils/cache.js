// 缓存
import jsCookie from 'js-cookie';
// console.log(jsCookie)

const name = 'lupan_blog'

export const set = (key, data) => {
  jsCookie.set(`${name}_${key}`, JSON.stringify(data))
}

export const get = key => {
  const data = jsCookie.get(`${name}_${key}`);
  return data ? JSON.parse(data) : null;
}
