<template>
	<div class="lecturecontent animated zoomInUp">
		<!--<van-nav-bar class="nav-bar" title="标题" left-text="返回" left-arrow @click-right="onClickRight" @click-left="onClickLeft">
			<van-icon name="search" slot="right" />
		</van-nav-bar>-->
		<top-nav :title="title" :ref="search" :icon="search" :is-check="isCheck" :active1="active1" :is-has-icon="isHas" @edit="onClickRight"></top-nav>

		<van-search v-if="show" :class="active" v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch(value)" />
		<div><img :src="img" class="auto-img imgBox" /></div>
		<div class="content">
			<div class="box">
				<header class="header">
					<h1>{{title}}</h1>
					<p>
						{{desc}}
					</p>
					<section class="meta">

					</section>
				</header>
				<section class="breadcrumb">
					<a href="#" @click="goPath('Newmaterial')">首页</a><span>></span>
					<a href="#" @click="goPath('Newmaterial')">咖啡知识</a><span>></span>
					<a href="#" class="active">{{title}}</a>
				</section>
				<section class="text" v-html="content">

				</section>
			</div>
		</div>
		<div class="article">
			<h3><span>相关文章</span></h3>

			<van-row class="content-box wow fadeInUp" v-for="(i,index) in list" @click.native="goStatus(i.id)">
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

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import TopNav from '../components/TopNav'
	import { NavBar, Icon, Search } from 'vant'
	export default {
		name: 'LectureContent',
		data() {
			return {
				id: '',
				show: false,
				value: '',
				active: '',
				search: 'search',
				isHas: true,
				newMaterialData: [],
				MaterialData: [],
				list: [],
				title: '',
				desc: '',
				content: '',
				type: '',
				img: '',
				active1: '',
				isCheck:false,

			}
		},
		methods: {
			onClickLeft() {
				console.log('this.active1', this.active1)

			},
			onClickRight() {
				console.log('111')
				this.show = !this.show
				this.active = this.show ? 'animated zoomIn' : 'animated zoomOut'
			},
			onSearch(value) {
				console.log('value==>', value)
			},
			goPath(path) {
				console.log('kcod')
				this.$router.push({ name: path })
			},
			goStatus(id) {
				console.log('bhdcsbv')
				this.id = id
				var Data = JSON.parse(localStorage.getItem('product')).newMaterialData
				Data.forEach(value => {

					value.list.forEach(val => {

						if(this.id == val.id) {
							console.log('val ==>', val.id)
							this.title = val.title
							this.desc = val.desc
							this.content = val.content
							this.type = val.type
							this.img = val.img
						}
					})

					if(this.type == value.type) {
						this.MaterialData = [value]

						this.MaterialData.forEach(value1 => {
							console.log('value1.list', value1.list)
							value.list.forEach((value2, index) => {
								if(this.id == value2.id) {
									value1.list.splice(index, 1)
									this.list = value1.list
								}
							})
						})
					}
				})
			}
		},
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Search.name]: Search,
			'top-nav': TopNav,
		},
		created() {
			//			console.log('this.$route.params.Mid', this.$route.params.Mid)
			this.active1 = this.$route.params.active1
			//			console.log('this.$route.params.active1', this.$route.params.active1)
			this.id = this.$route.params.Mid
			console.log('this.id', this.id)
			this.newMaterialData = JSON.parse(localStorage.getItem('product')).newMaterialData
//			console.log('this.newMaterialData ==>', this.newMaterialData)
			this.newMaterialData.forEach(value => {

				value.list.forEach(val => {

					if(this.id == val.id) {
						console.log('val ==>', val.id)
						this.title = val.title
						this.desc = val.desc
						this.content = val.content
						this.type = val.type
						this.img = val.headerImg
					}
				})

				if(this.type == value.type) {
					this.MaterialData = [value]

					this.MaterialData.forEach(value1 => {
						console.log('value1.list', value1.list)
						value.list.forEach((value2, index) => {
							if(this.id == value2.id) {
								value1.list.splice(index, 1)
								this.list = value1.list
							}
						})
					})
				}
			})

		},

		mounted() { new WOW.WOW().init() }
	}
</script>

<style lang="less">
	.nav-bar {
		position: sticky;
		top: 0;
		left: 0;
	}
	
	.content {
		margin-top: -0.533rem;
		background-color: #E9E9E9;
		/*height: 1420px;*/
		padding: 0 0 1.333rem 0;
		.box {
			width: 90%;
			margin: 0 auto;
			position: relative;
			top: -0.8rem;
			left: 50%;
			margin-left: -45%;
			padding: 0 0 0.533rem 0;
			background-color: #FFFFFF;
			z-index: 1;
			.header {
				text-align: center;
				padding: 0.533rem 0.8rem 0;
				color: #404040;
				margin-bottom: 0.8rem;
				p {
					font-size: 0.373rem;
				}
			}
			.breadcrumb {
				text-align: center;
				padding: 0 0.8rem;
				margin-bottom: 0.8rem;
				a {
					padding: 0 0.24rem;
					color: #404040;
					font-size: 0.4rem;
					display: inline-block;
				}
				a.active {
					color: #D2691E;
				}
			}
			.text {
				padding: 0 0.8rem;
				p {
					line-height: 0.8rem;
				}
				h2 {
					font-size: 0.667rem;
				}
			}
		}
	}
	
	.article {
		background-color: #E7E1CD;
		padding: 0.533rem;
		text-align: center;
		h3 {
			color: #166e50;
			text-align: center;
			margin-bottom: 0.667rem;
			span {
				display: inline-block;
				letter-spacing: 0.267rem;
			}
		}
		h3:before {
			content: '★';
			display: block;
			border-bottom: 0.107rem solid #166e50;
			font-size: 1.067rem;
			font-size: 0.667rem;
			letter-spacing: 0;
			line-height: 1;
			margin: 0 auto 0.64rem;
			text-align: center;
			width: 1.28rem;
		}
		ul>li {
			margin-bottom: 2.667rem;
			a {
				background: #FFF;
				color: inherit;
				display: inline-block;
				position: relative;
				width: 100%;
				.img {
					height: 100%;
					left: 0;
					position: absolute;
					top: 0;
					width: 22%;
					overflow: hidden;
					div {
						background: url(http://127.0.0.1:8081/Carousel01/09.jpg);
					}
				}
			}
		}
	}
	
	.content-box {
		background-color: #fff;
		border-radius: 0.133rem;
		margin-bottom: 1.333rem;
		padding: 0 0.267rem 0 0;
		.type {
			text-align: right;
		}
		.title {
			text-align: center;
			padding: 0.267rem 0.267rem 0;
		}
	}
	.imgBox{
		height: 100%;
		height: 5.333rem;
	}
	
</style>