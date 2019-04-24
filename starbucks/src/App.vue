<template>
  <div id="app" class="app">
  	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
 
}
</script>

<style>
body,html{
	padding: 0;
	margin: 0;
}
.app{
		max-width: 640PX;
		margin: 0 auto;
	}
.auto-img{
	width: 100%;
	display: block;
}

.clearfix{
		overflow: hidden;
	}

	.fl{
		float: left;
	}

	.fr{
		float: right;
	}
</style>
