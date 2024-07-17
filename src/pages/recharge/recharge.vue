<template>
	<view class="recharge-box">
		<view class="top">
			当前账户余额：
			<text class="money">{{ amount }}</text>
			元
		</view>

		<view class="center">
			<button class="btn-item" v-for="(item, index) in list" :key="item.id" @tap="handleTap(index)" :class="{ active: index === activeIndex }">￥{{ item.amount }}</button>
		</view>
		<button class="btn" @tap="handleRecharge">立即充值</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { formatAmount } from '../../utils';
import api from '../../api/index.js';

const app = getApp();
let amount = ref(formatAmount(app.globalData.userInfo.amount));

const list = [
	{ id: 1, amount: 10 },
	{ id: 2, amount: 20 },
	{ id: 3, amount: 50 },
	{ id: 4, amount: 100 }
];
let activeIndex = ref(0);

const handleTap = (index) => {
	activeIndex.value = index;
};

// 获取用户信息并更新余额
const fetchUserInfo = async () => {
	const name = app.globalData.userInfo.name;
	const res = await api.getUserInfo(name);
	app.globalData.userInfo.amount = res[0].amount;
	amount.value = formatAmount(app.globalData.userInfo.amount);
	uni.setStorage({
		key: 'userInfo',
		data: app.globalData.userInfo
	});
};

// 获取充值数据
const handleRecharge = async () => {
	const activeItem = list.find((_, index) => index === activeIndex.value);
	const res = await api.recharge({ amount: activeItem.amount * 100 });

	if (res.code === 0) {
		uni.showToast({
			title: `成功充值：${activeItem.amount}元`,
			icon: 'none',
			mask: true
		});
		await fetchUserInfo(); // 充值成功后重新获取用户信息
	} else {
		uni.showToast({
			title: res.message,
			icon: 'none'
		});
	}
};

onShow(() => {
	fetchUserInfo();
});
</script>

<style lang="scss" scoped>
.recharge-box {
	width: 85%;
	margin: 0rpx auto;
	.top {
		.money {
			color: #1c87d5;
		}
		margin: 50rpx 0;
		font-size: 40rpx;
		font-weight: bold;
	}
	.center {
		display: flex;
		flex-wrap: wrap;

		justify-content: space-between;
		.btn-item {
			box-sizing: border-box;
			width: 45%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			margin: 30rpx 0;
			background-color: #fff;
			border: 2rpx solid #d1d1d1;
		}
	}
	.btn {
		margin-top: 50rpx;
		width: 60%;
		background-color: #1c87d5;
		color: #fff;
	}
	.active {
		border-color: #1296db;
		color: #1296db;
	}
}
</style>
