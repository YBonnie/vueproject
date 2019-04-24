<template>
	<div class="menu animated zoomInUp">
		<div class="header">
			<span>菜单</span>
		</div>

		<ul>
			<li v-for="(item, index) in navList" :key="index" @click="goPath(item,index)" :class="{active: item.isCheck}">{{item.title}}</li>
		</ul>

		<div class="seacherBtn" @click="seacherBtn">搜索菜单</div>
		<router-view></router-view>

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	export default {
		name: 'Menu',
		data() {
			return {
				idx: 0,
				isCheck: false,
				navList: [
					{ title: '季度精选', path: { name: 'Quarter' }, isCheck: true },
					{ title: '饮料', path: { name: 'Drinks' }, isCheck: false },
					{ title: '美食', path: { name: 'Foods' }, isCheck: false },
					{ title: '咖啡产品', path: { name: 'Coffee' }, isCheck: false },
					{ title: '商品', path: { name: 'Products' }, isCheck: false },
				]
			}
		},

		methods: {
			seacherBtn() {
				return this.$router.push({ name: 'Drinks' })
			},
			goPath(item, index) {
				if(this.idx == index) {
					return
				}
				item.isCheck = true;

				//其他的就为false
				this.navList[this.idx].isCheck = false;
				this.idx = index
				return this.$router.push(item.path)
			}
		}

	}
</script>

<style lang="less" scoped>
	.header {
		box-sizing: border-box;
		padding: 0.4rem 0 0 0.4rem;
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
			font-size: 0.7rem;
			font-weight: 700;
		}
	}
	
	ul {
		position: sticky;
		top: 0;
		li {
			display: inline-block;
			width: 20%;
			text-align: center;
			height: 1.067rem;
			line-height: 1.067rem;
			font-size: 0.427rem;
		}
		li.active {
			border-bottom: 0.053rem solid #00A862;
			font-weight: bolder;
		}
	}
	
	.menu {
		.seacherBtn {
			width: 2.667rem;
			height: 1.333rem;
			line-height: 1.333rem;
			text-align: center;
			border-radius: 0.4rem;
			font-size: 0.48rem;
			background-color: #00A862;
			color: #FFFFFF;
			position: fixed;
			right: 0.267rem;
			bottom: 2.133rem;
			z-index: 999;
		}
	}
</style>