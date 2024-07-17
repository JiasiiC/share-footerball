<script>
export default {
	globalData: {
		markers: [],
		question: [],
		token: uni.getStorageSync('token') || null,
		userInfo: uni.getStorageSync('userInfo') || { name: '', amount: '', avatar: '' }
	},
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
