<template>
<scroll-view scroll-y="true" @scrolltolower='scroload' class='scroll' scroll-with-animation='5000'>
	<view class='workitem' v-for='item in dividelist' :key='index'>
		<img src="https://img1.baidu.com/it/u=2688999772,1224232427&fm=253&fmt=auto&app=138&f=PNG?w=490&h=500" alt="">
		<view class='workinfo'>
			<view class='name'>姓名：{{item.work_user[0].nick_name}}</view>
			<view class='wkaddr'>
	            <view>{{item.work_user[0].sex===3?'男':'女'}}</view>
	            <view>|</view>
	            <view>{{item.city}}</view>
	            <view>|</view>
	            <view>{{item.money}}元/月</view>
			</view>
			<view class='wktype'>{{item.work_type}}</view>
		</view>
		<!-- <view class='arrow' @click='jumptoDetil(item)'></view> -->
	</view>
</scroll-view>
</template>

<script>
	import workitem from'../../component/workeritem.vue'
	import {$fetch_worklist} from'../../network/packreq.js'
	export default {
		data() {
			return {
				orderlist:[],
				dividelist:[],
				endlist:[],
				page:0,
				pageindex:1,
				count:0
			}
		},
		methods:{
		jumptoDetil(i){
			console.log(item)
			 uni.navigateTo({
				
			})
		}	
		},
		onShow(){
			uni.showLoading({
				title: '加载中'
			})
        let allist=[]
		let masklist=[]
		let type=uni.getStorageSync('type')
		const token =uni.getStorageSync('token')
	$fetch_worklist({token:token,user_type:type,work:0}).then(res=>{
	if(res.data.code===2000){
		allist=res.data.data
		$fetch_worklist({token:token,user_type:type,work:1}).then(res=>{
		masklist=res.data.data
		this.orderlist=allist.filter(item=>{return item.work_user_id!==0})
		uni.hideLoading()
		console.log(this.orderlist)
		let temp=[]
		//计算总页数
		this.count=Math.ceil(this.orderlist.length/5)
		console.log(this.count)
		//原始数据分成每五项一页
        for(let i=0;i<this.count;i++){
			if(i===0){
				temp[i]=this.orderlist.slice(0,5)
			}else{
				temp[i]=this.orderlist.slice(5*i,5*i+5)
			}
		}
		console.log(temp)
		this.endlist=temp
		this.dividelist=temp[this.page]
		})
		}
		})
		},
		onHide(){
			this.orderlist=[]
		},
		methods: {
		  scroload(){
      if(this.count-1>this.page){
	      this.page=this.page+1
	      console.log(this.endlist[this.page])
	      for(let i=0;i<this.endlist[this.page].length;i++){
		    this.dividelist.push(this.endlist[this.page][i])
	       }}else{
			uni.showToast({
					title:'没有更多数据了'
				}) 
	}
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
	.scroll{
		height:450px;
	}
</style>
