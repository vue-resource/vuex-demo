<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script type="text/javascript">
  export default {
    name: "app"
  }
</script>

<style>
  @import "../node_modules/element-ui/lib/theme-chalk/index";
  @import './assets/style/index';
</style>
