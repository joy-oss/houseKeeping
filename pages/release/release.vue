<template>
	<view class='container'>
	<view class='tabf'>
	<u-tabs :list="tab" :activeStyle="{color: '#24B536'}" lineColor="#24B536"/>
	</view>
     <view class='relf'>
		 <releaseitem  :relinfo="releaseinfo" @wktype='getWktype'/>
	 </view>
	 <view class='reltit'>期望月薪</view>
	   <u--input
	     placeholder="请输入期望薪资"
	     border="surround"
	     v-model="money"
	   ></u--input>
	 <view class='reltit'>服务地址</view>
	   <u--input
	     placeholder="请格式输入省-市-县"
	     border="surround"
	     v-model="address"
	   ></u--input>
	 <view class='reltit'>联系方式</view>
	   <u--input
	     placeholder="请填入手机号"
	     border="surround"
	     v-model="phone"
	   ></u--input>
       <view class='subrow'><view>存草稿</view>
	   <view @click='submitClick'>提交</view></view>
	</view>
</template>

<script>
	import {$fetch_addtask}from'../../network/packreq.js'
	import releaseitem from'../../component/releaseitem.vue'
	export default {
		data() {
			return {
			money:1000,
			address:'',
			phone:'',
			work_type:'住家保姆',
			tab:[{name:'家政服务'},{name:'企业服务'}]	,
			content:[],
			releaseinfo:[
				{
			    id:0,
				title:'您需要的服务员类型是？',
				con:['住家保姆','不住家保姆','月嫂','育儿嫂','小时工','护工'],
				},
				{
			    id:1,
				title:'您需要的性别是？',
				con:['女','男'],
				},
				{
				id:2,	
				title:'您需要做家务么？',
				con:['需要','不需要'],
				},				
				{
				id:3,
				title:'您需要照顾老人/病人么？',
				con:['能自理','半自理','不能自理','病人','不照顾'],
				},				
				{
				id:4,
				title:'您需要饲养宠物么？',
				con:['需要','不需要'],
				},				
				{
				id:5,	
			    title:'您需要带孩子么？',
				con:['辅助带','全职带','不带孩子'],
				}
			]
			}
		},
		methods: {
			getWktype(content){
				console.log(content)
				this.content=content
				this.work_type=content[0]
			},
			submitClick(){
				const token=uni.getStorageSync('token')
				const tempaddr=this.address.split('-')
				const province=tempaddr[0]
				const city=tempaddr[1]
				const area=tempaddr[2]
				const content=JSON.stringify(this.content)
				$fetch_addtask({
				token:token,
				start_time:'1677515248',
				end_time:'1737367115',
				phone:this.phone,
				address:province+city+area,
				province:province,
				city:city,
				area:area,
				content:content,
				money:Number(this.money),
				work_type:this.work_type,
				}).then(res=>{
					console.log(res)
					if(res.data.code===2000){
					uni.showToast({
						icon:'success',
						title:res.data.msg
						})
					setTimeout(()=>{
					uni.redirectTo({
					url:'/pages/mask/mask'
					},5000)
					})
					}else{
						uni.showToast({
						icon:'fail',
						title:res.msg
						})  
					}
				})
			}
		},
		components:{
			releaseitem
		}
	}
</script>

<style>
.tabf{
	padding-left:80px;
	border-bottom: 1px solid #D7D7D7;
}
.relf{
	padding-left:10px;
}
.reltit{
		margin:10px 10px;	
		font-weight: bold;
		}
.subrow{
	width: 100%;
	display: flex;
	justify-content: space-around;
	padding: 10px;
}
.subrow>view{
	width: 100px;
	text-align: center;
	padding: 5px 15px;
	font-size: 14px;
	border-radius: 4px;
}
.subrow>view:nth-of-type(1){
	border:solid 1px #93E995;
	color:#24B536;
}
.subrow>view:nth-of-type(2){
	background-color: #24B536;
	color:#DFF3E2;
}
</style>
