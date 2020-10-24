import moment from 'moment';
import * as cache from './cache';
import * as axios from './axios';
import * as uuid from 'node-uuid';
import * as underscore from 'underscore';
import * as jquery from 'jquery';

moment.locale('zh-cn');

export const Moment = moment;
export const Cache = cache;
export const Axios = axios;
export const Uuid = uuid;
export const _ = underscore;
export const $ = jquery;