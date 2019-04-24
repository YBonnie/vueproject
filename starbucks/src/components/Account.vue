<template>
	<div class="account animated zoomInUp">

		<div class="header">
			<span>登录或创建一个新帐户 🌟</span>
		</div>
		<ul>
			<li v-for="(item, index) in accountList" :key="index" @click="goPath(item,index)" :class="{active: item.isCheck}">{{item.title}}</li>
		</ul>
		<div>
			<router-view></router-view>
		</div>

	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'

	export default {
		name: 'Account',
		data() {
			return {
				idx: 0,
				isCheck: false,
				accountList: [
					{ title: '登录', path: { name: 'Login' }, isCheck: true, flag: '/login' },
					{ title: '注册', path: { name: 'Register' }, isCheck: false, flag: '/register' },

				]
			}
		},
		methods: {

			goPath(item, index) {
				if(this.idx == index) {
					return
				}
				item.isCheck = true;

				//其他的就为false
				this.accountList[this.idx].isCheck = false;
				this.idx = index
				return this.$router.push(item.path)
			}

		},
		created() {
//			console.log('this.$route.params.flag==>', this.$route.params.flag)

			var hash = location.hash; // #/xxxx/xxx
			console.log(hash)
			for(var i = 0; i < this.accountList.length; i++) {
				if(hash.indexOf(this.accountList[i].flag) > -1) {
					this.accountList[i].isCheck = true;
					this.idx = i;
				} else {
					this.accountList[i].isCheck = false;
				}

			}
		}

	}
</script>

<style scoped lang="less">
	.account {
		overflow: hidden;
		clear: both;
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
		ul {
			position: sticky;
			top: 50px;
			li {
				display: inline-block;
				width: 50%;
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
	}
</style>