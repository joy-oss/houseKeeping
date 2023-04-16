<template>
	<view class='rolec'>
		<view class="box">
			<view>
				我是{{type==2?'服务生':'雇主'}}
			</view>
			<img src="../../static/gz.png" alt="">
		</view>
		<view class='rtips'>您当前的身份是{{type==2?'服务生':'雇主'}}</view>
		<view class='cgbtn' @click='changer'>切换到{{type==2?'雇主':'服务生'}}身份</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			type:2	
			}
		},
		onLoad(){
			this.type=uni.getStorageSync('type')
			console.log(this.type)
		},
		methods: {
			changer(){
				if(this.type==1){
					this.type=2
					uni.setStorageSync('type',this.type)
				}else if(this.type==2){
					this.type=1
					uni.setStorageSync('type',this.type)
				}
				
			}
		}
	}
</script>

<style>
	.rolec{
		padding:20px 10px 0 10px;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}
.box{
	width: 300px;
	height: 200px;
	background-color: #F5FDF6;
	border:solid 1px #3BC251;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	margin-bottom:30px;
}
.box>view{
	font-weight: bold;
}
.rtips{
	margin-bottom: 5px;
	font-size: 12px;
	font-weight: bold;
}
.box img{
	width: 80px;
	height: 100px;
}
.cgbtn{
	width:100%;
	border-radius: 3px;
	text-align: center;
	height:25px;
	line-height: 25px;
	background-color: #3BC251;
	color:#F6F9F6;
	font-size: 14px;
	
}
</style>
