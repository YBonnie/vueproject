<template>
	<div><button @click="getValue"></button></div>
</template>

<script>
	import product from '../data/product.js'
	export default{
		name:'Test',
		methods:{
			getValue(){
				localStorage.setItem('product', JSON.stringify(product));
			}
		}
	}
</script>

<style>
</style>