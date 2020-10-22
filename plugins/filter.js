import Vue from 'vue';
import { Moment } from '@utils';
// 时间处理
Vue.filter('dateFilter', (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return Moment(date).format(format)
})