<template>
	<view class="content">
		<view class='searchrow'>
        <view>
			<u--input
					    placeholder="请输入服务员编号"
					    prefixIcon="search"
					    prefixIconStyle="font-size: 20px;color: #909399"
						style='font-size:10px;background-color: #F5F5F5;'
						v-model="value"
					></u--input>
			</view>
				<u-button  type='success' shape="cirle" size='small'>搜索</u-button>
		</view >
		<view class='selectrow'>
			<view class='selcities arrowf'>
				<view>全部城市</view>
				<view class='contr up' v-show='isup' @click='cityClick'></view>
				<view class='contr down' v-show='!isup' @click='cityClick'></view>
			</view>
			<view class='seltype arrowf'>
				<view>所有人员类型</view>
				<view class='contr up' v-show='isdown' @click='typeClick'></view>
				<view class='contr down' v-show='!isdown' @click='typeClick'></view>
			</view>
		</view>
		<view class='selcon' v-show='showcity'>
         <view class='selconitem '>
		 <view v-for='item,index in allcities' :key='index' 
		 @click='cityItemClick($event,item,index)' :class="{selected:index===cityindex}">{{item}}</view>
		 </view>
         <view class='contrcheck'>
			 <view @click='reSet'>重置</view>
			 <view class='suresel' @click='cityReq'>确定</view>
		 </view>
		</view>
		<view class='selcon' v-show='showtype' :key='index'>		
		<view class='selconitem' >
		<view v-for='item,index in alltype' :key='index'  
		@click='typeItemClick($event,item,index)'
		 :class="{selected:index===typeindex}">{{item}}</view>
		</view>
		<view class='contrcheck'>
		<view @click='reSet'>重置</view>
		<view class='suresel' @click='typeReq'>确定</view>
		</view>
		</view>
		<scroll-view class='workerlist' scroll-y="true" @scrolltolower='scroload'>
		<workitem v-for='item in wklist' :workinfo="item" :key='index' :page='page'/>
		</scroll-view>
	</view>
</template>

<script>
	import{$fetch_wklist}from '../../network/packreq.js'
	import workitem from'../../component/workeritem.vue'
	export default {
		data() {
			return {
				value:'',
				isup:false,
				isdown:false,
				selectdata:[],
				showcity:false,
				showtype:false,
				city:'',
				cityindex:0,
				work_type:'',
				typeindex:0,
				wklist:[],
				page:1,
				allcities:[
					'全部城市',
					'北京',
					'深圳',
					'成都',
					'上海',	'武汉','广州','天津','重庆','西安','长沙','浙江','杭州','青岛','大连','南京','佛山','南通','东莞'],
			   alltype:[
				   '全部类型',
				   '住家保姆','不住家保姆','月嫂','育儿嫂','小时工','护工'
			   ]
			}
		},
		onLoad() {
			$fetch_wklist().then(res=>{
				if(res.data.code===2000){
					this.wklist=res.data.data.data
					console.log(res)
				}
			})
		},
		onShow(){
		},
		methods: {
        cityClick(){
			if(this.showtype===true){
				this.showtype=false
			}
			 this.isup=!this.isup
		     this.showcity=!this.showcity
		},
		typeClick(){
			if(this.showcity===true){
				this.showcity=false
			}
			 this.isdown=!this.isdown
		     this.showtype=!this.showtype
		},
		scroload(){
			this.page=this.page+1
			$fetch_wklist({page:this.page}).then(res=>{
				if(res.data.code===2000){
					this.wklist=res.data.data.data
				}
			})
		},
		cityItemClick(e,item,index){
			this.city=item
			this.cityindex=index
		},
		typeItemClick(e,item,index){
			this.work_type=item
			this.typeindex=index
		},
		cityReq(){
			if(this.showcity===true){
				this.showcity=false
			}
		if(this.city==='全部城市'){
			$fetch_wklist().then(res=>{
				if(res.data.code===2000){
					this.wklist=res.data.data.data
				}
			})	
		}else{
			let filtercty=[]
			   this.wklist.map(item=>{		
				if(item.city!==null&&item.city.includes(this.city)){
							filtercty.push(item)
						}
			})
			this.wklist=filtercty
		}
		},
		typeReq(){
			console.log(this.wklist)
			if(this.showtype===true){
				this.showtype=false
			}
		if(this.work_type==='全部类型'){
			$fetch_wklist().then(res=>{
				if(res.data.code===2000){
					this.wklist=res.data.data.data
				}
			})	
		}else{
			let filtercty=[]
			   this.wklist.map(item=>{		
				if(item.work_type!==null&&item.work_type===this.work_type){
							filtercty.push(item)
						}
			})
			this.wklist=filtercty
		}
		},
		reSet(){
			this.cityindex=0
			this.typeindex=0
			$fetch_wklist().then(res=>{
				if(res.data.code===2000){
					this.wklist=res.data.data.data
				}
			})	
		}
		},
		components:{
			workitem
		}
	}
</script>

<style>
	.content{
	padding-left:3px;
    padding-right: 10px;
	}
.searchrow,.selectrow,.contrcheck{
	display: flex;
}
.searchrow>view:nth-of-type(1){
	width: 1000px;
	margin-right:10px;
	border-radius: 20px;
}
button{
	border-radius: 20px;
	margin-top:3px;
}
.u--input{
	border:none;
	background-color: #F5F5F5;
	border-radius: 20px !important;
	font-size:13px;
}
.selectrow,.contrcheck{
	padding :10px 0;
	justify-content: space-around;
}
.down,.up{
	width: 5px;
	height: 5px;
	background-color: transparent;
	border-style: solid;
	border-color: #AAAAAA;
	transform: rotate(45deg);
	position: absolute;
	right:-20px;
	top:10px;
	
}
.down{
	border-width: 0 2px 2px 0;
}
.up{
	border-width: 2px 0 0 2px;
}
.arrowf{
	position: relative;
}
.selconitem{
	display: flex;
	flex-flow:row wrap;
	justify-content: space-around;
	align-items: flex-start;
	background-color: #F6F7F8;
} 
.selected{
	background-color: #13B72C !important;
	color:#E2F6E6;
}
.selconitem>view{
	padding: 5px 10px;
	background-color: #fff;
	font-size: 14px;border-radius: 20px;
	margin:3px 5px 5px 5px;
}
.contrcheck>view{
	width: 50%;
	height:37px;
	line-height: 37px;
	text-align: center;
}
.suresel{
background-color: #13B72C;
color: #E2F6E6;
}
.workerlist{
	height:800px;
}
</style>
