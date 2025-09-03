<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	#app {
		max-width: 750px;
		margin: 0 auto;
	}
	
		/* #ifdef H5 */
		
		.uni-tabbar,
		.uni-tabbar-bottom,.tab-list {
			max-width: 750px !important;
			margin: 0 auto;
		}
		
		/* #endif */
</style>
