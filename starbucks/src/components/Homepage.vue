<template>
	<div class="homepage wow zoomInUp" >
		<div class="header">
			<span>心情惬意，来杯咖啡吧&nbsp;☕</span>
		</div>
		<div class="content">

			<div class="swipe">
				<van-swipe :autoplay="3000">
					<van-swipe-item v-for="(item, index) in images" :key="index">
						<img class="auto-img" :src="item.src" height="auto" @click="goPath(item)" />
					</van-swipe-item>
				</van-swipe>
			</div>
			
			<div class="grid">
				<a v-for="(item,index) in grid" :href="item.href" :key='index' class="wow fadeInUp">
					<img :src="item.src" height="auto" class="auto-img" />
				</a>
			</div>
			<div class="club wow fadeInUp">
				<h2>星享俱乐部</h2>
				<p>开启您的星享之旅，星星越多、会员等级越高、好礼越丰富。
					<a href="#">了解更多 ›</a>
				</p>
				<div class="btn">
					<a href="#" @click="goStatus('Register')">注册</a>
					<a href="#" @click="goStatus('Login')">登录</a>
				</div>
				<img src="../assets/img/grid/logo-msr-new.svg" class="auto-img" alt="" />
			</div>
			<div class="choiceness wow fadeInUp">
				<h2>星享俱乐部</h2>
				<p>在星巴克天猫旗舰店发现更多咖啡心意</p>
				<ul>
					<li v-for="(item,index) in choiceness" class="wow fadeInUp" :key="index" @click="goPath(item)">
						<a href="#">
							<img class="auto-img" :src="item.src" />
							<p class="title-1"><strong>{{item.title}}</strong></p>
							<p class="margin2">{{item.margin1}}<br>{{item.margin2}}</p>
							<p class="caption">{{item.more}}</p>
						</a>
					</li>

				</ul>
			</div>
			<div class="schoolroom wow fadeInUp">
				<h2>1912 派克街 | 咖啡星讲堂</h2>
				<p>了解更多星巴克咖啡文化</p>
				<van-swipe>
					<van-swipe-item v-for="(item,index) in schoolroom" :key="index">
						<div @click="coffee(item.path)">
							<img :src="item.src" class="auto-img" />
							<span>{{item.title}}</span>
							<p>{{item.msg}}</p>
						</div>
					</van-swipe-item>

				</van-swipe>

			</div>

		</div>
	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import { Swipe, SwipeItem } from 'vant';
	export default {
		name: 'Homepage',

		data() {
			return {
				images: [],
				grid: [],
				choiceness: [],
				schoolroom: [],

			}
		},
		methods: {
			goPath(item) {
				this.$router.push(item.path)
			},
			goStatus(value) {
				this.$router.push({ name: value })
			},
			coffee(path){
				this.$router.push(path)
			}

		},
		created() {
			this.images = JSON.parse(localStorage.getItem('product')).images
			this.grid = JSON.parse(localStorage.getItem('product')).grid
			this.choiceness = JSON.parse(localStorage.getItem('product')).choiceness
			this.schoolroom = JSON.parse(localStorage.getItem('product')).schoolroom
		},
		mounted() { new WOW.WOW().init() },
		components: {
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,

		},
	}
</script>

<style lang="less" scoped="scoped">
	.homepage {
		.header {
			box-sizing: border-box;
			padding: 0.427rem 0 0 0.427rem;
			height: 1.653rem;
			position: sticky;
			width: 100%;
			background-color: #ffffff;
			top: 0;
			left: 0;
			z-index: 10;
			span {
				color: rgba(0, 0, 0, 0.87);
				letter-spacing: 0.011rem;
				font-size: 0.587rem;
				font-weight: bolder;
			}
		}
		.content {
			
			/*padding-top: 1.653rem;*/
			.grid {
				background-color: whitesmoke;
				padding: 0 0 0.5rem;
			}
			.grid>a {
				display: block;
				box-sizing: border-box;
				padding: 0.4rem 0.4rem 0 0.4rem;
				img {
					box-shadow: 0.133rem 0.133rem 0.133rem #888888;
				}
			}
			.club {
				background-color: #ffffff;
				padding: 0.4rem 0 0.6rem;
				text-align: center;
				h2 {
					font-weight: 500;
					font-size: 0.48rem;
				}
				p {
					padding: 0 1.3rem;
					color: rgba(0, 0, 0, 0.56);
					font-size: 0.427rem;
					line-height: 0.9rem;
				}
				.btn {
					padding: 0 0 0.4rem;
					a {
						display: inline-block;
						border: 0.027rem solid green;
						height: 1.04rem;
						width: 1.893rem;
						text-align: center;
						line-height: 1.04rem;
						margin: 0 0.4rem;
						border-radius: 0.4rem;
						color: green;
						font-size: 0.427rem;
					}
				}
				img {
					margin: 0.4rem auto;
					display: block;
					width: 6.347rem;
					height: 1.92rem;
				}
			}
			.choiceness {
				padding: 0.4rem 0 0.5rem;
				text-align: center;
				background-color: whitesmoke;
				h2 {
					font-weight: 500;
					font-size: 0.48rem;
				}
				p {
					padding: 0 1.3rem;
					color: rgba(0, 0, 0, 0.56);
					font-size: 0.427rem;
					line-height: 0.9rem;
				}
				ul {
					overflow: hidden;
					margin-top: 1.0rem;
					
					li:nth-of-type(1),
					li:nth-of-type(3) {
						margin-left: 0.48rem;
					}
					li {
						float: left;
						width: 4.267rem;
						height: 5.2rem;
						text-align: center;
						margin: 0.8rem 0.267rem;
						a {
							box-shadow: 0 0.027rem 0.027rem 0.027rem rgba(0, 0, 0, 0.12);
							box-sizing: border-box;
							background: #fff;
							border-radius: 0.053rem;
							display: inline-block;
							position: relative;
							padding: 0 0.16rem;
							text-align: center;
							height: 100%;
							width: 100%;
							img {
								position: absolute;
								width: 2.667rem;
								height: 1.92rem;
								top: -0.833rem;
								left: 50%;
								margin-left: -1.334rem;
							}
							.title-1 {
								width: 100%;
								margin: 35px auto 0;
								padding: 0;
								color: #000000;
							}
							.margin2 {
								width: 100%;
								margin: 0 auto 0;
								padding: 0;
								font-size: 0.4rem;
							}
							.caption {
								width: 100%;
								margin: 0.32rem auto;
								padding: 0;
								color: chocolate;
								font-size: 0.4rem;
							}
						}
					}
				}
			}
			.schoolroom {
				padding-top: 0.4rem ;
				text-align: center;
				background-color: #ffffff;
				h2 {
					font-weight: 500;
					font-size: 0.48rem;
				}
				p {
					padding: 0 1.3rem;
					color: rgba(0, 0, 0, 0.56);
					font-size: 0.427rem;
					line-height: 0.9rem;
				}
				div {
					position: relative;
					overflow: hidden;
					padding: 0;
					box-shadow: 0 0.027rem 0.027rem 0.027rem rgba(0, 0, 0, 0.12);
					box-sizing: border-box;
					background: #fff;
					img {
						height: 6.667rem;
					}
					span {
						width: 2.667rem;
						height: 1.067rem;
						line-height: 1.067rem;
						text-align: center;
						display: block;
						background-color: #C2A661;
						color: white;
						font-size: 0.427rem;
						position: absolute;
						top: 0.8rem;
						z-index: 5;
					}
					p {
						font-size: 0.48rem;
					}
				}
			}
		}
	}
</style>