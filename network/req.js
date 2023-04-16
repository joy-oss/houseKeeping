import {baseurl} from './baseUrl.js'
const req =(url,method,data)=>{
	// 请求拦截
	return new Promise((resolve,reject)=>
	{
		uni.request({
			url:baseurl+url,
			method,
			data,
			success(res){
				resolve(res)
				}
			,
			fail(err){
				reject(err)
			}
			
		})
	})
}
export default req