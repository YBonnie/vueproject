<template>
	<div class="Orderpage">
		<top-nav :title="title"></top-nav>
		
		<!--没有订单的时候显示-->
		<van-notice-bar mode="closeable" v-if="orderCode.length == 0">
				亲，你没有订单哦！！！
			</van-notice-bar>
		<div class="order wow animated fadeInUp" v-for="(item, index) in orderCode" :key="index">
			
			<van-notice-bar mode="closeable" @close="removeOrderList(index,item)">
				订单编号: {{item}} 订单时间 {{orderTime[index]}}
			</van-notice-bar>
			<van-card :num="item1.count" :price="item1.price" :desc="item1.desc" :title="item1.name" v-for="(item1, index1) in orderList[item]" :key="index1" :thumb="item1.src" @click="goPath(item1.id)" />
		</div>

	</div>

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import TopNav from '../components/TopNav'
	import { Card, Button, Icon, NoticeBar, Dialog } from 'vant'

	export default {
		name: 'Orderpage',

		data() {
			return {
				title: '我的订单',

				orderList: {},

				//当前用户的订单编号
				orderCode: [],
				//订单时间
				orderTime: []

			}
		},

		methods: {
			goPath(id){
				this.$router.push({name:'ProDetil',params:{pid:id}})
			},
			
			removeOrderList(index,orderId){
				//index:下标
				//orderId:订单Id
				this.orderCode.splice(index,1)
				
				this.orderTime.splice(index,1)
				
				delete this.orderList[orderId]
				
				//当前用户Id
				var userId = JSON.parse(localStorage.getItem('userLogin')).userId
				

				//当前的订单列表
				var orderList = JSON.parse(localStorage.getItem('orderList'))
				
				
				
				for(var i = 0 ; i < orderList.length ; i++){
					
					if(orderId == orderList[i].orderId && userId == orderList[i].userId){

						orderList.splice(i,1)
						i--
					}
					
				}
				localStorage.setItem('orderList',JSON.stringify(orderList))
				
				
				
			}
		},

		created() {

			var orderList = JSON.parse(localStorage.getItem('orderList'))
			var userLogin = JSON.parse(localStorage.getItem('userLogin'))

			if(userLogin) {

				if(orderList.length == 0) {
					return
				}

				orderList.forEach(result => {
					if(result.userId == userLogin.userId) {
						var arr = [];
						//判断订单编号和时间是否存在，存在则省略，不存在就插入
						if(this.orderCode.indexOf(result.orderId) === -1) {
							this.orderCode.push(result.orderId)
							this.orderTime.push(result.time)

							orderList.forEach(value => {
								if(value.orderId == result.orderId) {
									arr.push(value)
								}
							})
							this.orderList[result.orderId] = arr

						}
					}
				})

				//			console.log('this.orderList ==>', this.orderList)
			} else {
				Dialog.confirm({
					title: '登录提示',
					message: '您还没有登录！请登录！'
				}).then(() => {
					this.$router.push({name:'Login'})
				}).catch(() => {
					
				});
			}

		},

		components: {
			'top-nav': TopNav,
			[Card.name]: Card,
			[Button.name]: Button,
			[Icon.name]: Icon,
			[NoticeBar.name]: NoticeBar,
			[Dialog.name]: Dialog

		}
	}
</script>

<style lang="less">
	
	.order{
		margin-bottom: 0.533rem;
	}
</style>