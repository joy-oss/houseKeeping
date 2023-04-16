<template>
<view>
	<view v-for='item,index in relinfo' :key='index'>
		<view class='reltit'>{{item.title}}</view>
		<view class='infoitem'>
			<view v-for='iitem,iindex in item.con' :key='iindex' @click='relClick($event,iindex,iitem,index)' :class="{selected:rellindex===index&&relindex===iindex}">{{iitem}}</view>
		</view>
	</view>
</view>
</template>

<script>
	export default{
		data(){
			return {
				relindex:0,
				rellindex:0,
				work_type:'住家保姆',
				content:['住家保姆','女','需要','能自理','需要','辅助带']
			}
		},
		props:['relinfo'],
		methods:{
			relClick(e,i,iitem,ii){
				this.relindex=i
				this.rellindex=ii
				this.content[ii]=iitem
				console.log(this.content)
				this.$emit("wktype",this.content)
				
			},
		}
	}
</script>

<style>
	.infoitem{
		display: flex;
		flex-flow:row wrap;
		justify-content: flex-start;
		align-items: flex-start;
		padding-top:10px;
		border-bottom: 3px solid #F7F9FA;
	}
	.infoitem>view{
		padding:5px 10px;
		font-size: 13px;
		border:solid 1px #E6E6E6;
		border-radius: 3px;
		margin-bottom: 10px;
	}
	.infoitem>view:nth-of-type(2n){
		margin-left:10px;
		margin-bottom: 10px;
		margin-right: 10px;
		}

		.selected{
			border:solid 1px #93E995 !important;
			color:#24B536;
		}
</style>