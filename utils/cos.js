import { Axios, Uuid } from '@utils';

/*
 *@title: 获取cos配置文件
 *@description:
 *@author: lupan
 *@date: 2020-10-26 15:01:57
*/
const getCosConfig = () => {
  return new Promise(async reslove => {
    if (window.cosConfig) {
      reslove(window.cosConfig)
      return false;
    }
    const cosConfig = await Axios.get('/admin/setting/cos');
    reslove(cosConfig)
  })
}

/*
 *@title: 上传文件
 *@description:
 *@author: lupan
 *@date: 2020-08-28 14:28:05
*/
export const upload = (file) => {
  const fileName = `${Uuid.v1()}.${file.name.split('.')[file.name.split('.').length - 1]}`
  return new Promise(async reslove => {
    if (!window.COS) {
      throw Error('请导入腾讯云COS js-sdk');
    }
    const { SecretId, SecretKey, Bucket, Region } = await getCosConfig();
    const cos = new COS({
      SecretId,
      SecretKey,
    })
    cos.putObject({
      Bucket, /* 必须 */
      Region,     /* 存储桶所在地域，必须字段 */
      Key: fileName,              /* 必须 */
      StorageClass: 'STANDARD',
      Body: file, // 上传文件对象
      onProgress: function (progressData) {
        console.log(progressData)
      }
    }, function (err, data) {
      reslove(data)
    });

  })
}

/*
 *@title: 删除文件
 *@description:
 *@author: lupan
 *@date: 2020-10-26 16:10:42
*/

export const del = fileName => {
  return new Promise(async reslove => {
    if (!window.COS) {
      throw Error('请导入腾讯云COS js-sdk');
    }
    const { SecretId, SecretKey, Bucket, Region } = await getCosConfig();
    const cos = new COS({
      SecretId,
      SecretKey,
    })
    cos.deleteObject({
      Bucket, /* 必须 */
      Region,     /* 存储桶所在地域，必须字段 */
      Key: fileName        /* 必须 */
    }, function (err, data) {
      reslove(data)
    });
  })
}