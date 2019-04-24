<template>
	<div class="quarter animated zoomInUp">
		<ul class="quarter-box">
			<li v-for="(item,index) in quarList" :key="index" class="wow fadeInUp">
				<img :src="item.src" class="auto-img" />

				<van-collapse v-model="activeNames">
					<van-collapse-item :title="item.title" :name="item.name" :icon="item.icon">
						<div class="hotBox">
							<h2>{{item.title}}</h2>
							<p style="padding:0 20px">
								{{item.msg}}
							</p>
						</div>
					</van-collapse-item>
				</van-collapse>
			</li>
		</ul>

		<div class="newProducts wow fadeInUp">
			<h2>所有新品</h2>
			<van-row type="flex" justify="center">
				<van-row justify="space-around">
					<van-col span="12" class="wow fadeInUp"  v-for="(item,index) in newProducts" :key="index" >
						<div class="ProductsBox" @click="goPath(item)">
						<img :src="item.src" class="auto-img" />
						<p>{{item.name}}</p>
						</div>
					</van-col>
				</van-row>
			</van-row>
		</div>

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import { Collapse, CollapseItem, Row, Col } from 'vant';
	export default {
		name: 'Quarter',
		data() {
			return {
				activeNames: ['1'],
quarList:[],
				newProducts:[],
			}
		},
		methods:{
			goPath(item){
				return this.$router.push(item.path)
			}
		},
		created(){
			this.quarList = JSON.parse(localStorage.getItem('product')).quarList
			this.newProducts = JSON.parse(localStorage.getItem('product')).newProducts
		},
			mounted() { new WOW.WOW().init() },
		components: {
			[Collapse.name]: Collapse,
			[CollapseItem.name]: CollapseItem,
			[Row.name]: Row,
			[Col.name]: Col

		}
	}
</script>

<style lang="less" scoped>
	.quarter {
		height: 100%;
		/*background-color: pink;*/
	}
	
	.hotBox {
		text-align: center;
		color: dimgrey;
		h2 {
			font-weight: 700;
		}
		p {
			font-size: 0.427rem;
		}
	}
	
	.newProducts {
		margin-top: -0.4rem;
		background-color: #F5F5F5;
		height: 48rem;
		text-align: center;
		box-sizing: border-box;
		padding: 0.533rem 0.267rem;
		
		h2{
			margin-top: 0.8rem;
			margin-bottom: 0.667rem;
		}
		.ProductsBox{
			
			box-sizing: border-box;
			padding: 0.267rem;
			p{
				font-size: 0.373rem;
			}
		}
	}
</style>