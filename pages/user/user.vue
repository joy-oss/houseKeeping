<template>
	<view class='user'>
            <view class='lgmodel'>
				<u-modal :show="show"  :title="title"
				 title="欢迎登录壹威客" :showConfirmButton='true' :showCancelButton='true' 
				 confirmText='注册' confirmColor="#20AC1F" cancelColor='#20AC1F' cancelText='登录'
				 @confirm="register" @cancel="login">
				</u-modal>
			</view>
<view :show='!show' class='centercon'>
<view class='uhdf'>
	<view class='userhead'>
		<view class='baseinfof'>
			<img src="../../static/tbaricon/wd.png" alt="">
			<view  class='bsinfo'>
				<view>{{phone?phone:12345678901}}</view>
				<view class='role'>当前身份：{{role}}</view>
			</view>
		</view>
		<view class='changerole' @click='changeRole'>切换身份></view>
	</view>
</view>
<view class='discount'>
   <u-grid col="5" :border="false">
    <u-grid-item v-for="(baseListItem,baseListIndex) in baseList"
    :key="baseListIndex">
    <u-icon
    :customStyle="{paddingTop:20+'rpx'}"
    :name="baseListItem.name"
    :size="22"
	:color='baseListItem.color'>
	</u-icon>
    <text class="grid-text">{{baseListItem.title}}</text>
    </u-grid-item>
</u-grid>	 
</view>
<view class='myserver'>
	<view class='svrtit'>我的服务</view>
<view>
   <u-grid col="4" :border="false">
    <u-grid-item v-for="(baseListItem,baseListIndex) in baseList2"
    :key="baseListIndex" @click='gridClick'>
    <u-icon
    :customStyle="{paddingTop:20+'rpx'}"
    :name="baseListItem.name"
    :size="18">
	</u-icon>
    <text class="grid-text">{{baseListItem.title}}</text>
    </u-grid-item>
</u-grid>		
</view>
</view>
</view>
</view>
</template>

<script>
	import {$fetch_userinfo}from '../../network/packreq.js'
	export default {
		data() {
			return {
				show:false,
				useinfo:{},
				phone:'',
				role:'',
				 baseList: [{
				  name: 'red-packet',
				  title: '钱包',
				  color:'#7CA8FA'
				  },
				  {
				    name: 'grid',
				    title: '积分',
					color:'#ACECC3'
				    },
				    {
				    name: 'bag-fill',
				    title: '优惠券',
					color:'#FF9192'
				    },
					{
					  name: 'rmb-circle',
					  title: '抵扣码',
					  color:'#F65961'
					  },
					  {
					  name: 'gift',
					  title: '推荐有礼',
					  color:'#FFD42C'
					  },
				    ],
					baseList2: [{
					 name: 'search',
					 title: '我的需求'
					 },
					 {
					   name: 'checkmark-circle',
					   title: '面试评价'
					   },
					   {
					   name: 'edit-pen',
					   title: '电子签名'
					   },
					{
                      name: 'file-text',
					 title: '电子收藏'
					 },
					 {
					   name: 'order',
					   title: '支付订单'
					   },
					   {
					   name: 'red-packet',
					   title: '申请发票'
					   },
					   {
                      name: 'server-fill',
					 title: '我的保险'
					 },
					 {
					   name: 'list',
					   title: '我的续约'
					   },
					   {
					   name: 'list-dot',
					   title: '我的续保'
					   },
					 {
					   name: 'star-fill',
					   title: '我的收藏'
					   },
					   {
					   name: 'heart',
					   title: '我的约看'
					   }
					   ]
			}
		},
		onLoad(){
		if(!uni.getStorageSync('token')){
			this.show=true
		}else{
			this.show=false
		}
		const token =uni.getStorageSync('token')
		this.role=uni.getStorageSync('type')==1?'雇主':'服务生'
		if(token){
			$fetch_userinfo({token:token}).then(res=>{
				if(res.data.code===2000){
					this.useinfo=res.data.data
					this.phone=res.data.data.phone
				}
			})
		}
		},
		methods: {
			register(){
				uni.redirectTo({
					"url":'/pages/login/login?flag=reg'
				})
			},
			login(){
				uni.redirectTo({
					"url":'/pages/login/login?flag=log'
				})
			},
			gridClick(n){
			if(n===0){
			uni.navigateTo({
				'url':'/pages/mask/mask'
			})	
			}else if(n===10)
			uni.switchTab({
				'url':'/pages/order/order'
			})		
			},
			changeRole(){
				uni.navigateTo({
					"url":'/pages/rolechange/rolechange'
				})
			}
		},
		onShow(){
		this.role=uni.getStorageSync('type')==1?'雇主':'服务生'
		}
	}
</script>

<style>
.centercon{
		background-color: #F1F1F1;
}
.userhead{
	width: 95%;
	padding:10px;
	position: relative;
	background-color: #fff;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
}
.changerole{
	position: absolute;
	right:10px;
	top:30px ;
	color:#A9E5B3;
	font-size: 14px;
}
.uhdf{
	background-color: #13B72D !important;
	padding:0 10px;
}
.baseinfof {
	display: flex;
	padding-top:10px;
}
.baseinfof img{
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-right:10px;
}
.role{
	margin-top:10px;
	font-size: 13px;
	color:#B5B5B5;
}
.discount,.myserver{
	font-size: 13px;
	color:#6C6C6C;
	background-color: #fff;
	margin:10px;
}
.svrtit{
	padding:10px 0 0 10px;
	font-size: 18px;
}
</style>
<style lang="scss">
    .grid-text {
        font-size: 14px;
        color: #909399;
        padding: 10rpx 0 20rpx 0rpx;
        /* #ifndef APP-PLUS */
        box-sizing: border-box;
        /* #endif */
    }
</style>
