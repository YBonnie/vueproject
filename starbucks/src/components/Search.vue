<template>
	<div class="search">
		<van-search ref="search" v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
			<div slot="action" @click="onSearch">搜索</div>
		</van-search>
		<div class="tags" v-if="show">
			<p>搜索历史</p>
			<ul class="tag-row clearfix">
				<li class="tag-col fl" v-for="(item,index) in this.searchHistory[this.userId]" @click="getText(item)">{{item}}</li>

			</ul>
		</div>

		<van-row justify="space-around" class="productBox" v-if="productShow">
			<van-col :ref="'van' + index" span="12" v-for="(i,index) in product" :key="index" class="productContent" @click.native="goStatus({name:'ProDetil', params: {pid: i.drinkId}})">
				<div class="ProductsBox animated fadeInUp">
					<img :src="i.src" class="auto-img animated fadeInUp" />
					<p class="animated fadeInUp">{{i.name}}</p>
				</div>
			</van-col>
		</van-row>

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'

	import WOW from '../../node_modules/wowjs/dist/wow.js'

	import { Search, Toast, Row, Col } from 'vant'

	export default {
		name: 'Search',

		data() {
			return {
				value: '',

				productList: [],

				product: [],

				show: true,

				productShow: false,

				userId: '',

				searchHistory: {}

			}
		},

		methods: {
			onSearch() {

				if(this.value == '' || this.value == undefined) {
					Toast('搜索关键不能为空');
					return
				}
				this.show = false;
				this.productShow = true

				var pat = new RegExp(this.value)
				//				console.log('pat ==>',pat)
				this.productList.forEach(value => {
					//					console.log('value.title==>', value.title)
					if(pat.test(value.title)) {

						this.product = value.content

					}
				})

				if(!this.searchHistory[this.userId]) {
					this.searchHistory[this.userId] = []
					//					console.log('this.searchHistory[this.userId]==>',this.searchHistory[this.userId])
				} else if(this.searchHistory[this.userId].length > 10) {

					this.searchHistory[this.userId].shift();

				}
				if(this.searchHistory[this.userId].indexOf(this.value) === -1) {
					//					console.log('this.value==>',this.value)
					this.searchHistory[this.userId].push(this.value)
					localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
				}

			},

			goStatus(path) {
				this.$router.push(path)
			},

			getText(item) {
				this.value = item
				this.onSearch()
			}
		},

		created() {
			var productsData = JSON.parse(localStorage.getItem('product')).allDrinksList
			//console.log('productsData ==》',productsData)
			this.allProducts = productsData

			productsData.forEach(value1 => {

				this.productList.push(value1)

			})
			//			console.log('this.productList ==>', this.productList)

			//获取用户id
			this.userId = JSON.parse(localStorage.getItem('userLogin')).userId;
			//获取当前用户的本地存储搜索历史记录
			var searchHistoryData = localStorage.getItem('searchHistory');

			this.searchHistory = searchHistoryData == undefined ? {} : JSON.parse(searchHistoryData);

		},

		mounted() {

			//			console.log(this.$refs.search.querySelector('input'))
			//页面自动聚焦
			this.$refs.search.querySelector('input').focus()
		},

		components: {
			[Search.name]: Search,
			[Row.name]: Row,
			[Col.name]: Col
		}
	}
</script>

<style lang="less" scoped>
	.tags {
		margin-top: 0.8rem;
		padding: 0.4rem;
		p {
			font-size: 17PX;
		}
		.tag-col {
			margin-right: 0.4rem;
			background-color: #f2f2f2;
			max-width: 6.933rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 0.2rem;
			padding: 0.1rem;
		}
	}
	
	.productBox {
		background-color: #E7E1CD;
		padding: 0.8rem 0;
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
</style>