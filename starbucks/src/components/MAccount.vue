<template>
	<div class="maccount animated zoomInUp">
		<top-nav :title="title"></top-nav>

		<!--头像图片-->
		<div class="head-sculpture">
			<img src="http://127.0.0.1:8081/Carousel01/head-sculpture_01.jpg" class="auto-img" />
		</div>

		<van-list>
			<van-cell :title="item.title" v-for="(item, index) in maccountList" :key="index" @click="goState(item.path)">
				<van-icon name="arrow" /></van-cell>
		</van-list>

		<van-button type="danger" size="large" @click="quit">退出</van-button>

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import TopNav from '../components/TopNav'
	import { List, Cell, Icon, Button, Dialog } from 'vant';
	
	
	export default {
		name: 'MAccount',

		data() {
			return {
				title: '',

				maccountList: [
					{ title: "我的购物车", path: { name: 'Shopcart' } },
					{ title: "我的订单", path: { name: 'Orderpage' } },
					{ title: "地址管理", path: { name: 'Address' } },
					{ title: "账户设置", path: { name: 'EditAccount' } },
				],

			}
		},

		methods: {
			goState(path) {
				this.$router.push(path)
			},

			quit() {
				var userLogin = JSON.parse(localStorage.getItem('userLogin'))
				//				console.log('userLogin ==>', userLogin)

				Dialog.confirm({
					title: '退出提醒',
					message: '你确定要退出吗？'
				}).then(() => {
					userLogin = {}
					localStorage.setItem('userLogin', JSON.stringify(userLogin))
					this.$router.push({ name: 'Login' })
				}).catch(() => {
					return
				});

			}
		},

		created() {

			var user = localStorage.getItem('userLogin');

			this.title = user == undefined ? '' : JSON.parse(user).username

		},

		components: {
			'top-nav': TopNav,
			[List.name]: List,
			[Cell.name]: Cell,
			[Icon.name]: Icon,
			[Button.name]: Button,
			[Dialog.name]: Dialog

		}
	}
</script>

<style lang="less">
	.head-sculpture img {
		border-radius: 50%;
		width: 200px;
		height: 200px;
		background-size: cover;
		margin: 0 auto;
		border: 5px solid #E7E1CD;
	}
</style>