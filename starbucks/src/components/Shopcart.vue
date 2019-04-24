<template>
	<div class="shopcart">
		<top-nav :title="title" :is-has-icon="isHas" @edit="onClickRight"></top-nav>

		<div class="shopcart-product">
			<!-- 用户已登录且购物车有商品 -->
			<div v-if="isCheck" class="found">
				<ul class="ul">
					<li v-for="(item,index) in currentUserProduct" :key="index" class="animated fadeInUp">

						<van-row type="flex">
							<van-col span="2">
								<van-checkbox v-model="item.isChecked" @change="danxuanChecked"></van-checkbox>
							</van-col>
							<van-col span="8">
								<img :src="item.src" class="auto-img" />
							</van-col>
							<van-col span="14" class="colBox">
								<van-col type="flex">
									<van-col span="24" class="minColBox">{{item.name}}
									</van-col>
									<van-col span="24" class="minColBox">{{item.price}}￥</van-col>
									<van-col span="24" class="minColBox">
										<span @click="discrease(item)">-</span><input type="text" readonly="readonly" :value="item.count" /><span @click="increase(item)">+</span>
									</van-col>
									<van-col span="24" class="minColBox" v-if="show">
										<van-button size="mini" @click="simpleDelect(index)" class="mini">删除</van-button>
									</van-col>

								</van-col>
							</van-col>
						</van-row>

					</li>

				</ul>

				<van-submit-bar :price="sumVal" :button-text="text" @submit="onSubmit" class="submit-bar">
					<van-checkbox v-model="checkedAll" @change="toggleCheckedAll">全选</van-checkbox>

				</van-submit-bar>

			</div>

			<!-- 用户未登录或者用户已登录且购物车没有商品 -->
			<div class="not-found" v-if="!isCheck">
				<p class="not-title">购物车空空如也</p>

				<van-row justify="space-around" class="productBox">
					<van-col :ref="'van' + index" span="12" v-for="(i,index) in product" :key="index" class="productContent" @click.native="goStatus({name:'ProDetil', params: {pid: i.drinkId}})">
						<div class="ProductsBox">
							<img :src="i.src" class="auto-img" />
							<p>{{i.name}}</p>
						</div>
					</van-col>
				</van-row>

				<div class="underline" v-if="isNone">嘿，我是有底线的！</div>
			</div>
		</div>

		<van-actionsheet v-model="orderShow" title="请填写收货人信息">
			<van-address-edit :area-list="areaList" :show-delete="false" show-search-result :address-info="addressInfo" save-button-text="确认" @save="comfirm" />
		</van-actionsheet>

	</div>
</template>

<script>
import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import TopNav from '../components/TopNav'
	import areaList from '../data/area.js'
	import tool from '../utils/tool.js'

	import { Row, Col, Button, Checkbox, SubmitBar, Toast, AddressEdit, Actionsheet } from 'vant';

	export default {
		name: 'Shopcart',
		data() {
			return {
				areaList,
				//标题名字
				title: '购物车',

				//是否要ICon
				isHas: true,

				//没登录的时候显示
				isCheck: false,

				//是否到底了
				isNone: false,

				//所有商品
				allProducts: [],

				//加载商品的开始位置
				startIndex: 0,

				//加载商品的结束位置
				endIndex: 8,

				//存放所有商品
				content: [],

				//当前加载商品的
				product: [],

				//当前用户购物车的商品
				currentUserProduct: [],

				//全选
				checkedAll: false,

				//总数
				count: 0,

				//总价
				sumVal: 0,

				//提交按钮的text
				text: '提交订单',

				flag: 1,

				//删除按钮是否显示
				show: false,

				//是否显示地址填写框
				orderShow: false,

				//addressInfo 地址填写框相关字段
				addressInfo: {
					//每条地址的唯一标识
					id: '',

					//收货人姓名
					name: '',

					//收货人手机号
					tel: '',

					//省份
					province: '',

					//城市
					city: '',

					//区县
					county: '',

					//详细地址
					addressDetail: ''
				}

			}
		},

		methods: {
			onClickRight() {
				console.log('nihai')
				this.show = !this.show
				if(!this.show) {
					this.text = "提交订单(" + this.num + ")"
					this.flag = 1
				} else {
					this.text = "全部删除"
					this.flag = 0
				}

			},
			sendProduct() {
				//获取8个商品
				var productsData = JSON.parse(localStorage.getItem('product')).allDrinksList
				//console.log('productsData ==》',productsData)
				this.allProducts = productsData

				productsData.forEach(value1 => {
					//					console.log('value1.content ==>',value1.content)

					value1.content.forEach(value2 => {
						this.content.push(value2)
					})

				})
				//				console.log('this.content ==>', this.content)

				this.product = this.content.slice(this.startIndex, this.endIndex)

				this.startIndex = this.endIndex

				this.endIndex += 8
			},

			goStatus(path) {
				this.$router.push(path)
			},

			//单选
			danxuanChecked() {
				//当前有一个是false  那么就不是全选
				
								var isExitCheckedNo = this.currentUserProduct.every(result => {
									return result.isChecked === true
								})

								if(isExitCheckedNo) {
									this.checkedAll = true
								} else {
									this.checkedAll = false
								}



				this.sum()
			},

			//全选
			toggleCheckedAll() {
				this.currentUserProduct.forEach((item) => {
					item.isChecked = this.checkedAll
				})
				this.sum()

			},

			sum() {
				var totalSum = 0;
				var num = 0
				this.currentUserProduct.forEach((item) => {
					if(item.isChecked) {
						//金钱转成分
						totalSum += item.price * item.count * 100;

						num += item.count

					}

					this.sumVal = totalSum;
					this.num = num
				})

			},

			//减少按钮
			discrease(item) {

				if(item.count <= 1) {
					this.$toast('数量最少为1')
					item.count = 1
				} else {
					--item.count
				}
				this.sum()
			},

			//增加按钮
			increase(item) {
				++item.count
				this.sum()
			},

			//提交
			onSubmit() {
				if(this.flag == 0 && this.checkedAll == true || this.isChecked) {
					var index = undefined
					this.simpleDelect(index)
				} else if(this.flag == 1) {
					this.orderShow = true
				}

			},

			//单个删除按钮
			simpleDelect(index) {
//				console.log('index ==>', index)

				//获取本地储存购物车数据
				var shopcartProduct = JSON.parse(localStorage.getItem('shopcartData'));

				var product = index == undefined ? this.currentUserProduct.splice(0) : this.currentUserProduct.splice(index, 1)
				//删除的那条数据
				//				console.log('product ==>', product)
				//剩余的商品数据
				//				console.log('this.currentUserProduct ==>', this.currentUserProduct)

				for(var i = 0; i < product.length; i++) {
					//记录当前商品被删除的时间
					var time = new Date(product[i].time).getTime()
					//查找匹配删除的商品, 从本地存储删除
					for(var j = 0; j < shopcartProduct.length; j++) {
						var timer = new Date(shopcartProduct[j].time).getTime();

						//匹配 如果用户名,商品id,时间一致, 则删除
						if(shopcartProduct[j].userId == product[i].userId && shopcartProduct[j].id == product[i].id && timer == time) {
							shopcartProduct.splice(j, 1)

							break;
						}
					}

				}
				//更新一下本地存储
				localStorage.setItem('shopcartData', JSON.stringify(shopcartProduct));
			},

			comfirm(data) {

//				console.log('data ==>', data)

				//设置订单id
				data.id = new Date().getTime().toString()
				var shopcartData = JSON.parse(localStorage.getItem('shopcartData'));

				//获取订单
				var orderList = localStorage.getItem('orderList')
				orderList = orderList == undefined ? [] : JSON.parse(orderList)

				//生成订单Id
				var orderId = 'order' + new Date().getTime().toString()

				var userLogin = JSON.parse(localStorage.getItem('userLogin'))

				//				console.log('userLogin.userId ==>', userLogin.userId)

				//获取勾选的商品，进入订单列表
				this.currentUserProduct.forEach((value) => {

					console.log('value ==>', value)

					if(value.isChecked) {

						//移除当前用户的购物车商品
						for(var i = 0; i < shopcartData.length; i++) {
							if(value.userId == shopcartData[i].userId && value.id === shopcartData[i].id && value.time == shopcartData[i].time) {
								shopcartData.splice(i, 1);
								break;
							}
						}

						value.orderId = orderId
						value.addressid = data.id
						value.userName = data.name
						value.tel = data.tel
						value.address = data.province + data.city + data.county + data.addressDetail
						value.areaCode = data.areaCode
						value.ordertime = tool.format(new Date(), 'yyyy-MM-dd hh:mm:ss');

						orderList.push(value)

					}
				})

				localStorage.setItem('orderList', JSON.stringify(orderList))

				localStorage.setItem('shopcartData', JSON.stringify(shopcartData));

				this.orderShow = false

				this.$router.push({ name: 'Orderpage' })

			}

		},

		created() {
			var userLogin = localStorage.getItem('userLogin')
			//			console.log('userLogin ==>', userLogin)
			if(userLogin) {
				//如果已经登录
				userLogin = JSON.parse(userLogin);
				//购物车数据
				var shopcartData = localStorage.getItem('shopcartData');
				shopcartData = shopcartData == undefined ? null : JSON.parse(shopcartData);

				//如果有购物商品
				if(shopcartData) {
					shopcartData.forEach(value3 => {
						if(userLogin.userId == value3.userId) {
							//判断两个Id是否相等
							value3.price = value3.price / 100
							value3.price.toFixed(2)
							this.currentUserProduct.push(value3);
						}
					})
				}

				//				console.log('this.currentUserProduct ==>', this.currentUserProduct)
				if(this.currentUserProduct.length === 0) {
					//					console.log('购物车没有商品');

					this.sendProduct();
				} else {
					//当前用户购物车有商品
					//					console.log('this.currentUserProduct ==> ', this.currentUserProduct);

					this.isCheck = true;
				}

			} else {
				//没有登录
				this.sendProduct()

			}
		},

		mounted() {
			var timers = []

			//商品懒加载
			window.onscroll = () => {

				//判断当前加载的商品是否大于全部商品的长度
				if(this.product.length >= this.content.length) {
					this.isNone = true
					return
				}

				//获取页面距离
				var scrollTop = document.documentElement.scrollTop;

				//获取最后一个节点
				var lastRef = this.$refs['van' + (this.product.length - 1)][0].$el;
				//				console.log('lastRef ==》',lastRef)

				//获取最后一个节点的offsetTop
				var offsetTop = lastRef.offsetTop;

				//获取最后一个节点的高度
				var height = lastRef.offsetHeight;

				var h = offsetTop - height - 200;

				if(scrollTop >= h) {
					var timer = setTimeout(() => {
						this.product.push(...this.content.slice(this.startIndex, this.endIndex))
						this.startIndex = this.endIndex;
						this.endIndex += 8;

						clearTimeout(timer);
						timer = null;
						timers = [];
					}, 500)

					//					console.log('timers ==>',timers)

					timers.push(timer);
					for(var i = 1; i < timers.length; i++) {
						clearTimeout(timers[i]);
					}

				}

			}

		},

		components: {
			'top-nav': TopNav,
			[Row.name]: Row,
			[Col.name]: Col,
			[Button.name]: Button,
			[Checkbox.name]: Checkbox,
			[SubmitBar.name]: SubmitBar,
			[Toast.name]: Toast,
			[AddressEdit.name]: AddressEdit,
			[Actionsheet.name]: Actionsheet
		}
	}
</script>

<style lang="less" scoped="scoped">
	.not-found {
		padding-top: 0.8rem;
		text-align: center;
		padding-bottom: 1.2rem;
		.not-title {
			font-size: 0.54rem;
			color: #aaa;
		}
		.productBox {
			background-color: #E7E1CD;
			/*padding-bottom: 0.8rem;*/
			.productContent {
				text-align: center;
				padding: 0.2rem;
				padding-bottom: 0.8rem;
				img {
					border-radius: 50%;
				}
				p {
					font-size: 14PX;
				}
			}
		}
		.underline {
			text-align: center;
			color: #aaa;
			font-size: 12PX;
			padding: 0.2666rem 0;
		}
	}
	
	.found {
		background-color: #FFFFFF;
		margin-bottom: 1.333rem;
		.submit-bar {
			box-sizing: border-box;
			padding: 0 0 0 0.267rem;
		}
		.ul {
			li {
				padding: 0.267rem;
				background-color: #F7F7F7;
				margin-bottom: 0.267rem;
				.colBox {
					padding: 0 0.533rem;
					.minColBox:nth-of-type(2) {
						color: red;
					}
					.minColBox {
						font-size: 0.427rem;
						margin-bottom: 0.18rem;
						span {
							display: inline-block;
							width: 0.7rem;
							height: 0.7rem;
							text-align: center;
							line-height: 0.7rem;
							/*border: 1px solie #222222;*/
							background-color: #CCCCCC;
						}
						input {
							margin: 0 0.133rem;
							width: 2.4rem;
							text-align: center;
						}
						.mini {
							width: 94%;
							span {
								display: inline-block;
								width: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>