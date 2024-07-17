<template>
	<view class="page">
		<view class="profile-box">
			<view class="profile-top">
				<view class="top_left" @tap="handleModifyAvatar">
					<image :src="avatar" mode="widthFix"></image>
				</view>
				<view class="top_right">{{ app.globalData.userInfo.name || '-' }}</view>
			</view>
			<view class="bottom">
				<view class="list" v-for="item in list" :key="item.id" @tap="handleItemTap(item)">
					<view class="pic">
						<image :src="item.src" mode="widthFix"></image>
					</view>
					<view class="text">
						{{ item.name }}
					</view>
					<view class="right">
						<image src="../../static/forward.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const app = getApp();
import api from '../../api/index.js';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
const avatar = ref();
const handleModifyAvatar = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	});
};

onShow(() => {
	const name = app.globalData.userInfo.name;
	api.getUserInfo(name).then((res) => {
		app.globalData.userInfo.avatar = res[0].avatar;
		avatar.value = `http://${app.globalData.userInfo.avatar}`;
		uni.setStorage({
			key: 'userInfo',
			data: app.globalData.userInfo
		});
	});
});
const list = [
	{
		id: 1,
		type: 1,
		name: '我的钱包',
		src: '/static/wallet.png',
		path: '/pages/wallet/wallet'
	},
	{
		id: 2,
		type: 2,
		name: '会员充值',
		src: '/static/vip.png',
		path: '/pages/recharge/recharge'
	},
	{
		id: 3,
		type: 3,
		name: '我的订单',
		src: '/static/order.png',
		path: '/pages/order/order'
	},
	{
		id: 4,
		type: 4,
		name: '奖品兑换',
		src: '/static/change.png',
		path: '/pages/cdk/cdk'
	},
	{
		id: 5,
		type: 5,
		name: '客服中心',
		src: '/static/support.png',
		path: '/pages/contact/contact'
	},
	{
		id: 6,
		type: 6,
		name: '关于我们',
		src: '/static/about.png',
		path: '/pages/about/about'
	}
];
// 点击跳转
const handleItemTap = (item) => {
	switch (item.type) {
		case 1:
			uni.navigateTo({
				url: item.path
			});
			break;
		case 2:
			uni.navigateTo({
				url: item.path
			});
			break;
		case 3:
			uni.navigateTo({
				url: item.path
			});
			break;
		case 4:
			uni.navigateTo({
				url: item.path
			});
			break;
		case 5:
			uni.navigateTo({
				url: item.path
			});
			break;
		case 6:
			uni.navigateTo({
				url: item.path
			});
			break;
	}
};
// 登录
const handleTap = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	});
};
</script>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	background-color: #efefef;
}

.profile-box {
	width: 90%;
	margin: 0 auto;
	display: flow-root;
}

.profile-top {
	overflow: hidden;
	height: 200rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	border-radius: 20rpx;
	box-shadow: 0 0 20rpx #ccc;
	margin: 40rpx 0;
	.top_left {
		width: 130rpx;
		height: 130rpx;
		margin: 0 30rpx;
		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			box-shadow: 0 0 20rpx #ccc;
		}
	}
	.top_right {
		font-weight: bold;
		font-size: 40rpx;
	}
}
.profile-box {
	.bottom {
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx #ccc;

		.list {
			display: flex;
			height: 100rpx;
			padding: 0rpx 20rpx;
			border-bottom: 2rpx solid #ccc;
			box-sizing: border-box;
			.pic {
				display: flex;
				align-items: center;
				image {
					width: 60rpx;
				}
			}
			.text {
				flex: 1;
				display: flex;
				align-items: center;
				padding-left: 20rpx;
			}
			.right {
				display: flex;
				align-items: center;
				image {
					width: 40rpx;
				}
			}
			&:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>
