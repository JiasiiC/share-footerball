<template>
	<view class="page">
		<view class="pic">
			<image class="iconMoney" src="../../static/money.png" mode="widthFix"></image>
		</view>
		<view class="myMoney">我的钱包</view>
		<view class="text">
			<text class="left">￥</text>
			<text>{{ amount }}</text>
		</view>
		<button @tap="handleTap">立即充值</button>
	</view>
</template>

<script setup>
// 格式化余额
import { formatAmount } from '../../utils';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import api from '../../api/index.js';
const app = getApp();
let amount = ref(formatAmount(app.globalData.userInfo.amount));
const handleTap = () => {
	uni.navigateTo({
		url: '/pages/recharge/recharge'
	});
};
onShow(() => {
	const name = app.globalData.userInfo.name;
	api.getUserInfo(name).then((res) => {
		app.globalData.userInfo.amount = res[0].amount;
		amount.value = formatAmount(app.globalData.userInfo.amount);
		uni.setStorage({
			key: 'userInfo',
			data: app.globalData.userInfo
		});
	});
});
</script>

<style lang="scss" scoped>
.page {
	.pic {
		width: 120rpx;
		height: 120rpx;
		margin: 40rpx auto;
		.iconMoney {
			width: 120rpx;
			height: 120rpx;
			background-color: #2086d3;
			border-radius: 50%;
		}
	}
	.myMoney {
		text-align: center;
	}
	.text {
		font-size: 70rpx;
		font-weight: bold;
		margin: 40rpx 0;
		text-align: center;
		.left {
			font-size: 50rpx;
		}
	}
	button {
		width: 50%;
		background-color: #1c87d5;
		color: #fff;
		margin-top: 100rpx;
	}
}
</style>
