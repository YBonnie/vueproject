<template>
	
	<div class="nav">
		<div v-if="isHasBack" class="back-text text" @click="back(isCheck,active1)">
			<van-icon name="arrow-left" />
		</div>
		<div class="p-detail">{{title}}</div>
		<div v-if="isHasIcon" class="edit text"  @click="click">
			<van-icon :name="icon" />
		</div>
	</div>

</template>

<script>
	import {Icon} from 'vant'
	export default {
		name: 'TopNav',
		props: {
			//导航标题
			title: {
				type: String
			},

			//导航右边的图标
			icon: {
				type: String,
				default: 'edit'
			},
			
			//判断是否自定义函数
			isCheck:{
				type:Boolean,
				default: true
			},
			
			active1:{
				type:Number,
				default: 0
			},

			//是否含有右边图标
			isHasIcon: {
				type:Boolean,
				default: false
			},

			//是否含有返回按钮
			isHasBack: {
				type: Boolean,
				default: true
			}
		},

		methods: {
			back(isCheck,active1) {
				if(isCheck){
					//返回上一级
				this.$router.go(-1);
				}else{
					this.$router.push({name:'Newmaterial',params:{active1:active1}})
				}
				
			},
			click() {
				this.$emit('edit');
			}
		},
		
		components:{
			[Icon.name]:Icon
		}
	}
</script>

<style lang="less" scoped>
	.nav{
		height: 1.3333rem;
		/*background-image: linear-gradient(to right, #62AAF5 0%, #1989FA 100%);*/
		position: sticky;
		top: 0;
		z-index: 9999;
		
		
		.text{
			font-size: 20PX;
			color: #00A862;
			margin-top: calc(~"1.3333rem / 2 - 0.24rem");
			position: relative;
			z-index: 2;
		}

		.back-text{
			float: left;
			margin-left: 0.5333rem;
		}

		.p-detail{
			background-color: #FFFFFF;
			color:  #00A862;
			text-align: center;
			font-size: 16PX;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			z-index: 1;
			line-height: 1.3333rem;
		}

		.edit{
			float: right;
			margin-right: 0.5333rem;
		}
	}
</style>