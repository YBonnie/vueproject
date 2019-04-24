<template>
	<div class="drinks animated zoomInUp">
		<!--<van-nav-bar title="饮品" left-text="返回" left-arrow @click-left="onClickLeft" class="nav-bar" />-->
		<top-nav :title="title"></top-nav>
		<van-tabs :sticky="true" :offset-top="50" color="#00A862" v-model="active" title-active-color="#00A862" :swipeable="true" :animated="true" :ellipsis="false" @change="changeProducts(active)">
			<van-tab v-for="(item,index) in drinksList" :title="item.title">

				<div class="alldrinks">
					<div v-for="(item,index) in products" :key="index" class="DrinksListBox">
						<h2>{{item.title}}</h2>
						<van-row justify="space-around">
							<van-col class="animated fadeInUp" span="12" v-for="(i,index) in item.content" :key="index" @click.native="goStatus({name:'ProDetil', params: {pid: i.drinkId}})">
								<div class="ProductsBox">
									<img :src="i.src" class="auto-img" />
									<p>{{i.name}}</p>
								</div>
							</van-col>
						</van-row>
					</div>
				</div>

			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import { NavBar, Tab, Tabs, Row, Col } from 'vant';
	import TopNav from '../components/TopNav'
	export default {
		name: 'Drinks',
		data() {

			return {
				active: 0,
				drinksList: [],
				allDrinksList: [],
				products: [],
				title: '饮品'

			}
		},
		methods: {
			onClickLeft() {

				this.$router.push({ name: 'Quarter' })
			},
			changeProducts(active) {
				console.log('active ==>', active)
				this.allDrinksList.forEach(val => {

					if(val.id == active) {
						console.log('val ==>', val)
						this.products = [val]
					} else if(active == 0) {
						this.products = this.allDrinksList
					}
				})

				console.log('this.products ==>', this.products)
			},
			goStatus(path) {
				console.log('ncdsjbv')
				this.$router.push(path)
			}

		},
		created() {
			this.drinksList = JSON.parse(localStorage.getItem('product')).drinksList
			this.allDrinksList = JSON.parse(localStorage.getItem('product')).allDrinksList
			this.products = this.allDrinksList

			//			console.log("this.products ==>", this.products)

		},

		components: {
			[NavBar.name]: NavBar,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[Row.name]: Row,
			[Col.name]: Col,
			'top-nav': TopNav
		},
	}
</script>

<style lang="less" scoped>
	.alldrinks {
		background-color: beige;
	}
	
	.DrinksListBox {
		padding: 0.907rem 0.133rem;
		border-bottom: 1px solid #FFFFFF;
		h2 {
			padding-left: 0.533rem;
		}
		.ProductsBox {
			text-align: center;
			box-sizing: border-box;
			img {
				border-radius: 50%;
			}
			padding: 0.267rem;
			padding-bottom: 0.8rem;
			p {
				font-size: 0.347rem;
			}
		}
	}
</style>