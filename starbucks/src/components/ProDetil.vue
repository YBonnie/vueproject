<template>
	<div class="proDetil">
		<!--<van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" class="nav-bar" />-->
		<top-nav :title="title"></top-nav>
		<ul>
			<li v-for="(item,index) in currentProduct" :key="index" class="proDetilBox">
				<img :src="item.src" class="auto-img" />
				<div class="content">
					<p>{{item.name}}</p>

					<p>{{item.dec}}</p>

					<p>{{item.price}}￥</p>
					<!--<p><span class="discrease" @click="discrease">-</span><input readonly="readonly" type="text" name="" id="" :value="textVal" /><span class="increase" @click="increase">+</span></p>-->

					<van-button class="cartBtn" type="primary" @click="addOrderBuy">
						<i class="iconfont icon-goumai"></i> 加入购物车({{num}})
					</van-button>
					<van-button class="buyBtn" type="warning" @click="addBuyProduct">
						<i class="iconfont icon-goumai1"></i> 立即购买
					</van-button>
				</div>
			</li>
		</ul>
		<van-sku v-model="showBase" :sku="skuData.sku" :goods="skuData.goods_info" :hide-stock="skuData.sku.hide_stock" reset-stepper-on-hide reset-selected-sku-on-hide disable-stepper-input :show-add-cart-btn="false" :close-on-click-overlay="closeOnClickOverlay" @buy-clicked="onBuyClicked">
			<!-- 自定义 sku actions -->
			<template slot="sku-actions" slot-scope="props">
				<div class="van-sku-actions">
					<!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
					<van-button type="warning" bottom-action @click="props.skuEventBus.$emit('sku:buy')">{{text == 0 ? '加入购物车' : '立即购买'}}</van-button>
				</div>
			</template>
		</van-sku>

	</div>
</template>

<script>
	import tip from '../utils/tip.js'
	import skuData from '../data/skudata.js'
	import tool from '../utils/tool.js'
	import TopNav from '../components/TopNav'
	import { Button, NavBar, Dialog, GoodsAction, GoodsActionBigBtn, Sku } from 'vant';

	export default {
		name: 'ProDetil',
		data() {
			this.skuData = skuData
			return {
				title: '商品详情',
				//当前商品信息
				currentProduct: null,
				//sku是否显示
				showBase: false,
				//关闭sku按钮
				closeOnClickOverlay: true,

				num: 0,
				text: 0,
				userLoginStatus: null

			}
		},
		methods: {
			onClickLeft() {
				//返回上一级
				this.$router.push({ name: 'Drinks' })
			},
			

			addOrderBuy() {
				if(!this.userLoginStatus) {
					this.$toast('您尚未登录')
				} else if(this.userLoginStatus) {
					this.showBase = true
				}
			},
			addBuyProduct() {
				if(!this.userLoginStatus) {
					this.$toast('您尚未登录')
				} else if(this.userLoginStatus) {
					this.showBase = true
					this.text = 1
				}
			},

			onBuyClicked(data) {
				console.log('data ==>', data)

				if(this.text == 0) {
					++this.num
					var shopcartData = localStorage.getItem('shopcartData')
					shopcartData = shopcartData == undefined ? [] : JSON.parse(shopcartData)

					var currentProduct = {
						userId: this.userLoginStatus.userId,
						id: this.currentProduct[0].drinkId,
						name: this.currentProduct[0].name,
						price: this.currentProduct[0].price * 100,
						src: this.currentProduct[0].src,
						desc:this.currentProduct[0].dec,
						count: data.selectedNum,
						isChecked:false,
						time: tool.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
					}
					shopcartData.unshift(currentProduct)
					localStorage.setItem('shopcartData', JSON.stringify(shopcartData))

					this.showBase = false
				} else if(this.text == 1) {
					var shopcartData01 = []
					var currentProduct = {
						userId: this.userLoginStatus.userId,
						id: this.currentProduct[0].drinkId,
						name: this.currentProduct[0].name,
						price: this.currentProduct[0].price * 100,
						src: this.currentProduct[0].src,
						desc:this.currentProduct[0].dec,
						count: data.selectedNum,
						time: tool.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
					}
					shopcartData01.push(currentProduct)
					localStorage.setItem('shopcartData01', JSON.stringify(shopcartData01))
					this.$router.push({ name: 'Orderpage' })
				}

			}
		},

		created() {
			//			this.value = JSON.parse(localStorage.getItem('pds'))
			//			console.log('value==>', this.value)
			console.log("this.$route.params.pid==>", this.$route.params.pid);
			var product = JSON.parse(localStorage.getItem('product')).allDrinksList;
			product.forEach(val => {
				var content = val.content
				content.forEach(val2 => {
					if(this.$route.params.pid === val2.drinkId) {
						this.currentProduct = [val2]
					}
				})
			})
//			console.log('this.currentProduct', this.currentProduct)

			var userLogin = localStorage.getItem('userLogin')
			this.userLoginStatus = userLogin == undefined ? null : JSON.parse(userLogin)
//			console.log('this.userLoginStatus ==>', this.userLoginStatus)
//			console.log('this.currentProduct.src ==>', this.currentProduct[0].src)

			//拿到sku的值
//			console.log('this.skuData ==>', this.skuData)
			this.skuData.goods_info = {
				picture: this.currentProduct[0].src,
				title: this.currentProduct[0].name
			}
			this.skuData.sku.list[0].goods_id = this.currentProduct[0].drinkId
			this.skuData.sku.list[0].price = this.currentProduct[0].price * 100
			this.skuData.sku.list[0].product_name = this.currentProduct[0].name
			this.skuData.sku.list[0].product_img = this.currentProduct[0].src
			this.skuData.sku.tree[0].v[0].name = this.currentProduct[0].color

		},

		components: {

			[Button.name]: Button,
			[NavBar.name]: NavBar,
			[Dialog.name]: Dialog,
			[GoodsAction.name]: GoodsAction,
			[GoodsActionBigBtn.name]: GoodsActionBigBtn,
			[Sku.name]: Sku,
			'top-nav': TopNav

		}
	}
</script>

<style lang="less" scoped>
	.nav-bar {
		position: sticky;
		top: 0;
		left: 0;
	}
	
	.proDetilBox {
		height: 17.6rem;
		background-color: beige;
		.content {
			/*padding: 0 0.4rem;*/
			p {
				margin: 0.8rem 0;
				padding: 0 0.4rem;
			}
			p:nth-of-type(1) {
				font-size: 0.427rem;
			}
			p:nth-of-type(3) {
				font-size: 0.427rem;
				color: red;
			}
			p:nth-of-type(2) {
				width: 60%;
				margin-bottom: 0.533rem;
				color: #666666;
				white-space: nowrap;
				/*不换行*/
				text-overflow: ellipsis;
				/*超出部分文字以...显示*/
				
			}
			.cartBtn,
			.buyBtn {
				width: 50%;
				color: #FFFFFF;
				
			}
		}
	}
</style>