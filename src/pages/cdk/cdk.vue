<template>
	<view class="cdk-box">
		<input v-model="cdkValue" type="number" placeholder="请输入兑换cdk" />
		<button @tap="handleTap">立即兑换</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api/index.js';
let cdkValue = ref('');
const handleTap = () => {
	if (!cdkValue.value) {
		uni.showToast({
			title: '请输入正确的cdkey',
			icon: 'none'
		});
		return;
	}
	api.cdkeyExchange({ code: cdkValue.value }).then((res) => {
		if (res.code === 0) {
			uni.showToast({
				title: '兑换成功',
				icon: 'none'
			});
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none'
			});
		}
	});
};
</script>

<style lang="scss" scoped>
.cdk-box {
	padding: 0 50rpx;
	input {
		margin-top: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #2086d3;
	}
	button {
		margin-top: 100rpx;
		width: 60%;
		background-color: #2086d3;
		color: #fff;
	}
}
</style>
