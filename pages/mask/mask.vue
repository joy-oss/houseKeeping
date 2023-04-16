<template>
	<scroll-view  scroll-y="true" @scrolltolower='scroload'  scroll-with-animation='5000' class='scroll'>
		<view v-for='item,index in divideinfo' :key='index'>
			<view class='datef'><text>找服务求编号：{{item.work_id}}</text><text class='date'>更新时间：{{item.created_at}}</text></view>
			<view class='detilinfo'>
				<img class='logoicon' src="https://img1.baidu.com/it/u=1277583656,1235113486&fm=253&fmt=auto&app=138&f=JPEG?w=314&h=302" alt="">
				<view class='workinfo'>
					<text>{{item.work_type}}</text>
					<text>{{item.money}}元</text>
					<text @click='cancelMask(item)'>取消</text>
					<view class='other sec'><view>{{content[index]===undefined?other:content[index]}}</view></view>
				</view>
			</view>
			<view class='uinfo'>
			<view>
			<img class='headicon' src="https://img2.baidu.com/it/u=4146388923,1923339050&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500" alt="">
			{{user_id}}
			</view>
			<view class='phone'>手机:{{item.phone}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {$fetch_tasklist, $fetch_canceltask} from'../../network/packreq.js'
	export default {
		data() {
			return {
				workinfo:[],
				divideinfo:[],
				endinfo:[],
				type:1,
				content:[],
				other:'暂无其他需求',
				user_id:0,
				page:0,
				count:0
			}
		},
		onLoad(){
			console.log('hello')
			const token =uni.getStorageSync('token')
			const user_id=uni.getStorageSync('user_id')
			this.user_id=user_id
			$fetch_tasklist({token:token,user_type:this.type,user_id:user_id}).then(res=>{
				console.log(res)
				this.workinfo=res.data.data.data
				this.count=Math.ceil(this.workinfo.length/4)
				let temp=[]
				for(let i=0;i<this.count;i++){
					if(i===0){
						temp[i]=this.workinfo.slice(0,4)
					}else{
						temp[i]=this.workinfo.slice(4*i,4*i+4)
					}
				}
				this.endinfo=temp
				console.log(this.endinfo)
				this.divideinfo=this.endinfo[this.page]
				let contemp=[]
				for(let i=0;i<this.divideinfo.length;i++){
					contemp.push(JSON.parse(this.divideinfo[i].content))
				}
				console.log(contemp)
				this.content=contemp
				
			})
		},
		onShow(){
			this.type=uni.getStorageSync('type')
		},
		methods: {
			scroload(){
			  if(this.count-1>this.page){
			      this.page=this.page+1
				  console.log(this.page)
			      for(let i=0;i<this.endinfo[this.page].length;i++){
				    this.divideinfo.push(this.endinfo[this.page][i])
			       }
                   let contemp=[]
                   console.log(this.divideinfo)
                   for(let i=0;i<this.divideinfo.length;i++){
                   	contemp.push(JSON.parse(this.divideinfo[i].content))
                   }
                   this.content=contemp
				   }else{
					uni.showToast({
							title:'没有更多数据了'
						}) 
			}
				  }
			,
			cancelMask(item){
				const _this=this
				uni.showModal({
					title:'确定取消任务么?',
					success: function (res) {
			if (res.confirm) {
			const work_id=item.work_id
			const token =uni.getStorageSync('token')
		    $fetch_canceltask({token:token,work_id:work_id}).then(res=>{
		    console.log(res)
			if(res.data.code===2000){
			const token =uni.getStorageSync('token')
			const user_id=uni.getStorageSync('user_id')
            $fetch_tasklist({token:token,user_type:_this.type,user_id:user_id}).then(res=>{
				console.log(res)
                 _this.workinfo=res.data.data.data
                 _this.count=Math.ceil(_this.workinfo.length/4)
                 let temp=[]
                 for(let i=0;i<_this.count;i++){
                 	if(i===0){
                 		temp[i]=_this.workinfo.slice(0,4)
                 	}else{
                 		temp[i]=_this.workinfo.slice(4*i,4*i+4)
                 	}
                 }
                 _this.endinfo=temp
				 _this.page=0
                 _this.divideinfo=_this.endinfo[_this.page]
                 console.log(_this.divideinfo)
                 let contemp=[]
                 for(let i=0;i<_this.divideinfo.length;i++){
                 	contemp.push(JSON.parse(_this.divideinfo[i].content))
                 }
                 console.log(contemp)
                 _this.content=contemp
				
			}) 
							 }else{
								 uni.showToast({
								 	title: res.msg,
								 	duration: 2000
								 });
							 }
						 })
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
.detilinfo{
	display: flex;
	padding: 0 10px;
}
.logoicon{
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin-right:15px;
}
.headicon{
	width: 20px;
	height:20px;
	border-radius: 50%;
	margin-right:5px;
	vertical-align: middle;
}
.detilinfo{
	border-top:solid 1px  #F1F1F6;
}
.workinfo{
	width: 100%;
	position: relative;
}
.workinfo>text:nth-of-type(1){
	margin-right: 10px;
}
.workinfo>text:nth-of-type(2){
	font-weight: bold;
}
.other{
	font-size: 12px;
}
.sec{
	margin-top:10px;
}
.datef{
	position: relative;
	font-size: 14px;
	padding:4px 0px 4px 10px;
}
.date{
	position:absolute;
	right:0;
	color:#DEDEDE;
	font-size: 14px;
}
.uinfo{
	padding:10px;
    position: relative;
	background-color: #F3FFF5;
}
.phone,.workinfo>text:nth-of-type(3){
	position: absolute;
	right:3px;
	top:10px;
	font-size: 14px;
}
.workinfo>text:nth-of-type(3){
	padding:5px 10px;
	background-color: #FF0000;
	color:#FEF5F4;
	font-weight: lighter;
	font-size: 13px;
	border-radius: 3px;
	margin-top:-5px;
}
.scroll{
	height:480px;
}
</style>
