<template>
	<div class="more">
		<top-nav :title="title"></top-nav>

		<van-notice-bar text="星巴克更多知识等你来关注哦！加盟星巴克请联系：13527775175" left-icon="volume-o" />

		<ul class="animated zoomInUp">
			<li  v-for="(item,index) in moreList" :key="index" @click="goPath(item.path)">
				{{item.title}}
			</li>
		</ul>
		<ul class="ul02 animated zoomInUp">
			<li v-for="(item,index) in moreList02" :key="index" @click="goPath(item.path)">
				{{item.title}}
			</li>
		</ul>
	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	import TopNav from '../components/TopNav'
	import { NoticeBar } from 'vant'
	export default {
		name: 'More',
		data() {
			return {
				moreList: [
					{ title: '搜索', path: { name: 'Search' } },
					{ title: '菜单', path: { name: 'Quarter' } },
					{ title: '账号管理', path: { name: 'MAccount' } },
				],

				title: '星巴克更多内容',

				moreList02: [
					{ title: '星巴克移动应用', path: { name: 'Store' } },
					{ title: '星礼卡', path: { name: 'Quarter' } },
					{ title: '星巴克臻选™', path: { name: 'Login' } },
					{ title: '专星送™', path: { name: 'Login' } },
					{ title: '咖啡星讲堂', path: { name: 'Newmaterial' } },
					{ title: '上海烘焙工坊', path: { name: 'Login' } },
					{ title: '关于星巴克', path: { name: 'Login' } },
					{ title: '帮助中心', path: { name: 'Login' } },
				]
			}
		},

		methods: {
			goPath(path) {
				this.$router.push(path)
			}
		},

		components: {
			'top-nav': TopNav,
			[NoticeBar.name]: NoticeBar
		}
	}
</script>

<style lang="less" scoped>
	.ul02 {
		margin-bottom: 25px;
	}
	
	ul {
		width: 95%;
		margin: 0 auto;
		box-sizing: border-box;
		border-bottom: 1px solid #E9E9E9;
		padding: 10PX;
		li {
			font-size: 20PX;
			margin-bottom: 25PX;
			font-family: "arial, helvetica, sans-serif";
		}
	}
</style>