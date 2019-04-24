<template>
	<div class="main">
		<div class="main-content">
			<router-view></router-view>
		</div>

		<van-tabbar v-model="active" active-color="#00A862" class="menu">
			<van-tabbar-item v-for="(item,index) in list" :key="index" :class="item.class" :icon="item.icon" @click="goPath(item)">{{item.title}}</van-tabbar-item>
		</van-tabbar>

	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vant'
	import product from '../data/product.js'
	
	export default {
		name: 'Main',
		components: {
			[Tabbar.name]: Tabbar,
			[TabbarItem.name]: TabbarItem,

		},
		data() {
			return {
				active: 0,
				list:[
					{title:'主页', class:'menu-tabs',icon:'home-o',path:{name:'Homepage'},flag:'/homepage'},
					{title:'门店', class:'menu-tabs',icon:'shop-o',path:{name:'Store'},flag:'/store'},
					{title:'菜单', class:'menu-tabs',icon:'cart-o',path:{name:'Quarter'},flag:'/quarter'},
					{title:'我的', class:'menu-tabs',icon:'manager-o',path:{name:'Login'},flag:'/login'},
					{title:'更多', class:'menu-tabs',icon:'ellipsis',path:{name:'More'},flag:'/more'},
				]
			}
		},
		
		methods:{
			goPath(item){
				localStorage.setItem('product', JSON.stringify(product));
				this.$router.push(item.path)
				
			}
		},
		created() {

				
			var hash = location.hash; // #/xxxx/xxx
			console.log("hash ==>",hash)
			for(var i = 0; i < this.list.length; i++) {
				if(hash.indexOf(this.list[i].flag) > -1) {
					this.active = i;
				} 
			}

		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
body,html,.main{
	padding: 0;
	margin: 0;
}
.menu {
		max-width: 640PX;
		margin: 0 auto;
		right: 0;
	}
.main .menu .menu-tabs{
	font-size: 0.427rem;
	
}
</style>