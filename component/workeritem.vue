<template>
<view class='workitem'>
	<img src="https://img1.baidu.com/it/u=2688999772,1224232427&fm=253&fmt=auto&app=138&f=PNG?w=490&h=500" alt="">
	<view class='workinfo'>
		<view class='name'>{{workinfo.nick_name}}</view>
		<view class='wkaddr'>
            <view>{{workinfo.age}}岁</view>
            <view>|</view>
            <view>{{workinfo.province}}</view>
            <view>|</view>
            <view>{{workinfo.h_price}}元/月</view>
		</view>
		<view class='wktype'>{{workinfo.work_type}}</view>
	</view>
	<view class='arrow' @click='jumptoDetil'></view>
</view>
</template>

<script>
	import {$fetch_userinfo } from '../network/packreq.js'
	export default{
		data(){
			return {
				
			}
		},
		props:['workinfo','page'],
		onLoad(){
		},
		methods:{
			jumptoDetil(){
				console.log(this.workinfo)
				const uname=this.workinfo.user_account
				const pw=this.workinfo.pw
				 uni.navigateTo({
					// "url":'/pages/detil/detil?user_id='+this.workinfo.user_id+'&page='+this.page
				"url":'/pages/detil/detil?uname='+uname+'&pw='+pw
				})
			}
		}
	}
</script>

<style>
	.workitem{
		display: flex;
		padding-bottom:10px ;
		border-bottom: 1px solid #F7F6F9;
	}
	.workitem img{
		width: 80px;
		height:80px;
		margin-right: 10px;
	}
	.workinfo{
		width: 180px;
	}
	.workinfo>view:nth-of-type(2){
		margin:5px 0;
	}
	.wkaddr{
		width: 100%;
		display: flex;
		flex-flow:row nowrap;
		font-size: 14px;
	}
		.wkaddr>view:nth-of-type(2n){
			margin:0 4px
		}
	.wktype{
		border:solid 1px #13B72C;
		color: #13B72C;	
		font-size: 14px;
		padding:2px 3px;
		width: 80px;
		text-align: center;
	}
	.arrow{
		width: 5px;
		height: 5px;
		background-color: transparent;
		border-style: solid;
		border-color: #CCCCCC;
		transform: rotate(45deg);
		border-width: 2px 2px 0 0;
		margin-top:35px;
		margin-left:20px;
	}
</style>