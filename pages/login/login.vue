<template>
<view class='wd'>
	<view class='tips'>用户名</view>
	<u--input
	  placeholder="请输入用户名"
	  border="surround"
	  v-model="name"
	></u--input>
	<view class='tips'>密码</view>
	  <u--input
	    placeholder="请输入密码"
	    border="surround"
	    v-model="pw"
	  ></u--input>    
   <view class='login' v-show='!islogin' @click='regClick'>
	注册
   </view>
   <view class='login' v-show='islogin' @click='lgClick'>
   	登录
   </view>
   <view class="radiorow">
   	<radio value="r1" checked="true" style="transform:scale(0.5)"/>
   		<view>我已经阅读并同意平台的</view>
   		<view class='proto'>《隐私政策》《需求协议》</view>
   </view>	
   <view><img src="../../static/logo.png" alt=""></view>
   <view class='feedback'>反馈</view>
</view>
	
</template>

<script>
	import { $fetch_reg,$fetch_login}from '../../network/packreq.js'
	export default {
		data() {
			return {
			name:'',
		    pw:'',
			type:1,
			islogin:true
			}
		},
		onLoad(options){
			console.log(options)
			if(options.flag==="log"){
				this.islogin=true
			}else if(options.flag==='reg'){
				this.islogin=false
			}
		},
		methods: {
			regClick(){
			console.log(this.name+this.pw)
			uni.setStorageSync('type',this.type)
				$fetch_reg({
				name:this.name,
				pw:this.pw,
				type:this.type
				}).then(res=>{
				if(res.data.code===2000){
				const token=res.data.data.token
			    uni.setStorageSync("token",token)
				uni.showToast({
					title:'注册成功请登录',
				    icon:'success'
					})
			   setTimeout(()=>{
					this.islogin=true
					},2000)  
					}else{
				    uni.showToast({
				    title: res.data.msg,
				    duration: 2000,
					icon:'error'
					})
					}
				})
			},
			lgClick(){
				$fetch_login({
				name:this.name,
				pw:this.pw,
				type:this.type
				}).then(res=>{
                  if(res.data.code===2000){
					  console.log(res)
					  const token=res.data.data.token
					  const user_id=res.data.data.user_id
					  uni.setStorageSync("token",token)
					  uni.setStorageSync('user_id',user_id)
					  uni.showToast({
					  	title:'登录成功',
						icon:'success'
					  })
					  setTimeout(()=>{
						  uni.switchTab({
						  	"url":'/pages/user/user'
						  })
					  },2000)
                      
				  }else{
					  	uni.showToast({
					  		title: res.data.msg,
					  	    duration: 2000,
							icon:'error'
					  	})
				  }
				})
			}
		}
	}
</script>

<style>
.wd{
	padding: 10px;
	
}	
.wd .tips{
	margin-bottom: 3px;
	color: #D5D4D8;
}
.wd .u--input::placeholder{
	color: #D5D4D8;
}
.pw{
	margin-top: 10px;
}
 .login{
	height:37px;
	width: 100%;
	line-height: 37px;
	background-color: #F7F7F7;
	color: #D5D4D8;
	text-align:center ;
	margin-top: 10px;
}
 .login:hover{
	 background-color: #20AC1F;
	 color:##E5F5E5;
 }
.radiorow{
	display: flex;
	width: 100%;
	font-size: 10px;
    height: 37px;
	justify-content: center;
	align-items: center;
	color: #D5D4D8;
}
.proto{
	color:#20AC1F;
}
.wd img{
	width: 100%;
}
.feedback{
	background-color: #20AC1F;
	color:#E5F5E5;
	padding: 10px 5px;
	border-radius: 50%;
	position: fixed;
	bottom: 40px;
	right:14px;
	font-size: 12px;
}
</style>
