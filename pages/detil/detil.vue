<template>
<view class='detil' v-show='userDetil!==[]'>
<view class='dinfof'>
	<img src="https://img1.baidu.com/it/u=2749047691,1761575525&fm=253&fmt=auto&app=138&f=JPEG?w=538&h=500" alt="">
	<view class="dinfo">
		<view class='idrow'> 
		<view>{{userDetil[0].nick_name}}</view>
		<view class='uid'>编号：<text>{{userDetil[0].user_id}}</text></view>
		</view>
		<view class='sexrow' v-show='iscontent'>
			<view>性别：<text>{{content.sex===1?'男':'女'}}</text></view>
		</view>
		<view class='oldrow'>
			<view>籍贯：<text>{{userDetil[0].province}}</text></view>
			<view>联系方式：<text>{{userDetil[0].phone}}</text></view>
		</view>
	</view>
</view>
	<view class='lately'><text>{{look}}</text>人约看了此阿姨，已有<text>0</text>人收藏了此阿姨</view>
	<view class="certif">
		<view>
			相关证书
		</view>
		<view class='certifitem'>
			<view><img src="../../static/jkzm.png" alt=""><view>健康证明</view></view>
			<view><img src="../../static/sfz.png" alt=""><view>身份证</view></view>
		</view>
	</view>
	<view class='describe'>
		<view>类型：<text>{{userDetil[0].work_type}}</text></view>
		<view>工作能力：<text>做家务；全职带小孩</text></view>
		<view>工龄：<text>三年</text></view>
		<view>语言：<text>方言，普通话</text></view>
		<view>自我介绍：<text>擅长粤菜，煲汤，海鲜，干净卫生，受过专业育婴师培训，会抚摸被动操，会做营养辅食，性格开朗，从事家政多年，全职带过宝宝，有爱心有责任心</text></view>
	    <view>最高学历：<text>初中</text></view>
		<view>工作状态：<text>在岗</text></view>
		<view>期望月薪：<text>{{userDetil[0].h_price}}元</text></view>
		<view>目标城市：<text>{{userDetil[0].city}}</text></view>
		<view>更新时间：<text>{{userDetil[0].last_login_time}}</text></view>
	</view>
	<view class='order'>
		<view class='oimg'><img src="../../static/dz.png" alt=""><text>点赞</text></view>
		<view class='oimg'><img src="../../static/sc.png" alt=""><text>收藏</text></view>
		<view class='oimg'><img src="../../static/fx.png" alt=""><text>分享</text></view>
		<view class='vorder' @click='orderClick'>我要约看</view>
	</view>
</view>
</template>

<script>
import{$fetch_wklist,$fetch_addwork, $fetch_login,$fetch_userinfo}from '../../network/packreq.js'
	export default {
		data() {
			return {
				userDetil:[],
		         content:{},
				iscontent:true,
				work_user_id:0,
				look:0,
				uname:'',
				pw:''
			}
		},
		onLoad(options){
			const uname=options.uname
			const pw=options.pw
			this.uname=uname
			uni.showLoading({
				title:'加载中'
			})
			$fetch_login({name:uname,pw:pw}).then(res=>{
				console.log(res.data.code)
				console.log(res.data.data.token)
				if(res.data.code===2000){
					const token=res.data.data.token
					let tempcon=[]
					$fetch_userinfo({token:token}).then(res=>{
						if(res.data.code===2000){
							uni.hideLoading()
							this.work_user_id=res.data.data.user_id
							this.userDetil.push(res.data.data)
							console.log(this.userDetil[0])	
						}
					})
				}
				
			})
			
			
			

		},
		methods: {
			orderClick(){
			   const token=uni.getStorageSync('token')
               console.log('总价' +this.userDetil[0].h_price)
			   console.log('详细地址'+this.userDetil[0].province+this.userDetil[0].city+this.userDetil[0].area)
			   $fetch_addwork(
			                {
							token:token,
			   				work_user_id:this.work_user_id,
			   				address:this.userDetil[0].province===null?'四川省成都市双流区':this.userDetil[0].province+this.userDetil[0].city+this.userDetil[0].area,
			   				province:this.userDetil[0].province===null?'四川省':this.userDetil[0].province,
							start_time:'1710929455',
							end_time:'1742465455',
			   				city:this.userDetil[0].city===null?'成都市':this.userDetil[0].city,
			   				area:this.userDetil[0].area===null?'双流区':this.userDetil[0].area,
						    phone:this.userDetil[0].phone===null?'1234567890':this.userDetil[0].phone,
							content:'',
							remark:'',
			   				money:this.userDetil[0].h_price===0?1000:this.userDetil[0].h_price}).then(res=>{
			               if(res.data.code===2000){
			   				   uni.showToast({
			   				   	icon:'success',
			   				   	title:res.data.msg
			   				   })
							   setTimeout(()=>{
								   uni.redirectTo({
								   	url:'/pages/order/order'
								   },5000)
							   })
			               }else{
			   				 uni.showToast({
			   				 	icon:'fail',
			   				 	title:res.data.msg
			   				 })  
			   }
			   				})
			   
			   
			}
		}
	}
</script>

<style>
.detil{
	padding: 10px;	
	}
.dinfof{
	width: 100%;
	display: flex;
}
.dinfof img{
	width: 80px;
	height: 80px;
	margin-right: 10px;
}
.order{
	display:flex;
	justify-content: space-between;
}
.dinfo{
	width:100%;
}
.idrow{
width: 100%;
display: flex;
justify-content: space-between;
}
.uid,.sexrow,.oldrow{
	color:#C6C6C6;
}
.uid text,.sexrow text,.oldrow text{
	color:#848484;
}
.order img{
	width: 20px;
	height:20px;
	vertical-align: text-bottom;
}
.describe{
	border-bottom: 1px solid #E5E5E5;
}
.describe>view{
	color:#C6C6C6;
	margin: 10px 0;
}
.describe text{
	color:#848484 !important;
	
}
.vorder{
	background-color: #13B72D;
	color:#E5F7E8;
	font-size:18px;
	padding: 3px 10px;
	border-radius: 4px;
	margin-top:10px;
}
.oimg{
	margin-top:15px;
}
.lately{
	width: 100%;
	border-radius: 4px;
	color:#626262;
	background-color: #E8F6EE;
	font-size: 13px;
	padding:10px;
	margin-top:10px;
	font-weight: bold;
}
.lately text{
	color:#F93735;
}
.certif{
	border-top:solid 4px #EDEDEE;
	border-bottom:solid 4px #EDEDEE;
	padding-bottom:20px;
}
.certif>view:nth-of-type(1){
	margin: 10px 0 20px 0;
}
.certifitem{
	display: flex;
	font-size: 13px;
}
.certifitem>view:nth-of-type(2){
	margin-left: 20px;
}
.certifitem img{
	width: 25px;
	height: 25px;
	margin-left:10px;
}
</style>
