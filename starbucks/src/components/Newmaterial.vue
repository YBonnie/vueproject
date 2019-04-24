<template>
	<div class="new-material wow zoomInUp">

		<top-nav :title="title" :ref="search" :icon="search" :is-has-icon="isHas" @edit="onClickRight"></top-nav>

		<van-search v-if="show" :class="active" v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch(value)" />

		<van-swipe v-if="searchShow" ref="banner" class="banner" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item,index) in materialList" :key="index">
				<img v-lazy="item.src" alt="" class="auto-img" />
				<article class="text">
					<small>{{item.small}}</small>
					<h1>{{item.title}}</h1>
					<p>{{item.msg}}</p>
				</article>
			</van-swipe-item>
		</van-swipe>

		<van-tabs v-if="searchShow" v-model="active1" ref="vtabs" color="#00A862" :swipeable="true" :animated="true" :ellipsis="false" title-active-color="#00A862" @change="selectNum(active1)" class="wow fadeInUp">
			<van-tab v-for="(item,index) in newmaterialList" :key="index" :swipeable="true" :title="item.title">

				<div class="content " v-for="(item,index) in MaterialData">
					<van-row class="content-box" v-for="(i,index) in item.list" @click.native="goPath(i.id)">
						<van-col span="8">
							<img :src="i.img" class="auto-img" />
						</van-col>
						<van-col span="16">
							<van-row>
								<van-col span="24">
									<p class="type">{{i.type}}</p>
								</van-col>
								<van-col span="24" class="title">
									<h3>{{i.title}}</h3>
									<p>{{i.desc}}</p>
								</van-col>
							</van-row>
						</van-col>

					</van-row>

				</div>

			</van-tab>

		</van-tabs>
		
		<div class="searchBox" v-if="searchShow02">
			<van-row class="content-box" v-for="(item,index) in content" @click.native="goPath(item.id)">
						
						
						<van-col span="8">
							<img :src="item.img" class="auto-img" />
						</van-col>
						<van-col span="16">
							<van-row>
								<van-col span="24">
									<p class="type">{{item.type}}</p>
								</van-col>
								<van-col span="24" class="title">
									<h3>{{item.title}}</h3>
									<p>{{item.desc}}</p>
								</van-col>
							</van-row>
						</van-col>

					</van-row>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue';
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import TopNav from '../components/TopNav'

	import { Toast, NavBar, Icon, Search, Swipe, SwipeItem, Lazyload, Tab, Tabs, Row, Col } from 'vant'
	Vue.use(Lazyload);
	export default {
		name: 'Newmaterial',
		data() {
			return {

				searchShow: true,
				
				searchShow02 : false,
				//开始截取下标
				startIndex: 0,

				//结束截取下标
				endIndex: 4,

				//				offsetTop: '',
				active1: 0,
				search: 'search',
				isHas: true,
				title: '咖啡知识',
				show: false,
				value: '',
				active: '',
				list01: [],
				newMaterialData: [],
				MaterialData: [],
				materialList: [{
						"src": 'http://127.0.0.1:8081/Carousel01/07.jpg',
						small: '咖啡知识',
						title: '咖啡的起源与培植',
						msg: '在地理概念上，全球性的咖啡种植区有三个——东非和阿拉伯半岛，东南亚和环太平洋地区，拉丁美洲。'
					},
					{ "src": 'http://127.0.0.1:8081/Carousel01/08.jpg', small: '咖啡知识', title: '咖啡的起源与培植', msg: '在地理概念上，全球性的咖啡种植区有三个——东非和阿拉伯半岛，东南亚和环太平洋地区，拉丁美洲。' },
					{ "src": 'http://127.0.0.1:8081/Carousel01/09.jpg', small: '咖啡知识', title: '咖啡的起源与培植', msg: '在地理概念上，全球性的咖啡种植区有三个——东非和阿拉伯半岛，东南亚和环太平洋地区，拉丁美洲。' },
					{ "src": 'http://127.0.0.1:8081/Carousel01/10.jpg', small: '咖啡知识', title: '咖啡的起源与培植', msg: '在地理概念上，全球性的咖啡种植区有三个——东非和阿拉伯半岛，东南亚和环太平洋地区，拉丁美洲。' },
				],

				newmaterialList: [{ title: '全部' }, { title: '咖啡知识' }, { title: '咖啡品鉴' }],

				searchList: [],
				
				//查找出来的内容
				content:{}

			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight() {
				
				this.show = !this.show
				this.active = this.show ? 'animated zoomIn' : 'animated zoomOut'
			},

			onSearch() {

				if(this.value == '' || this.value == undefined) {
					
					Toast('搜索关键不能为空');
					
					this.searchShow = true
					
					return
					
				} else {
					this.searchShow = false
					
					this.searchShow02 = true
					
					this.searchList =[]

					this.MaterialData.forEach(value1 => {

						value1.list.forEach(value2 => {
							
							this.searchList.push(value2)
							
						})
					})

					var pat = new RegExp(this.value)
					
					this.searchList.forEach(value => {
						if(pat.test(value.title)){
							this.content = [value]
						}
					})


				}

			},

			goPath(id) {

				this.$router.push({ name: 'LectureContent', params: { Mid: id, active1: this.active1 } })
			},
			selectNum(val) {
				
				console.log('val ==>', val)

				this.newMaterialData.forEach(value => {
					
					if(value.id == val) {
						
						this.MaterialData = [value]
						
					} else if(this.active1 == 0) {
						
						this.MaterialData = this.newMaterialData
					}
				})

			},

		},
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Search.name]: Search,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[Lazyload.name]: Lazyload,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			'top-nav': TopNav,
			[Row.name]: Row,
			[Col.name]: Col,
			[Toast.name]: Toast

		},

		created() {
			console.log('this.$route.params.active1 ==>', this.$route.params.active1)
			this.newMaterialData = JSON.parse(localStorage.getItem('product')).newMaterialData

			this.MaterialData = this.newMaterialData

			this.active1 = this.$route.params.active1

			this.newMaterialData.forEach(value => {
				if(value.id == this.active1) {
					this.MaterialData = [value]
				} else if(this.active1 == 0) {
					this.MaterialData = this.newMaterialData
				}

			})


		},
		//节点渲染完成后

		mounted() {

			new WOW.WOW().init()
		}
	}
</script>

<style scoped lang="less">
	.auto-img {
		width: 100%;
		height: 5.333rem;
		position: relative;
	}
	
	.banner {
		position: relative;
		z-index: -1;
	}
	
	.text {
		bottom: 15%;
		color: #FFF;
		left: 10%;
		position: absolute;
		right: 10%;
		z-index: 2;
		text-align: center;
	}
	
	.content {
		background-color: #F5F5F5;
		padding: 0.8rem 0.8rem;
		.content-box {
			background-color: #fff;
			border-radius:0.133rem;
			margin-bottom: 0.533rem;
			padding: 0 0.267rem 0 0;
			.type {
				text-align: right;
			}
			.title {
				text-align: center;
				padding: 0.533rem 0.533rem 0;
			}
		}
	}
	
	
	.searchBox {
		background-color: #F5F5F5;
		padding: 0.8rem 0.8rem 7.067rem;
		.content-box {
			background-color: #fff;
			border-radius: 0.133rem;
			margin-bottom: 0.533rem;
			padding: 0 0.267rem 0 0;
			.type {
				text-align: right;
			}
			.title {
				text-align: center;
				padding: 0.533rem 0.533rem 0;
			}
		}
	}
	
	button {
		margin-bottom: 5.333rem;
	}
</style>