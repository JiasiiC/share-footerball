<template>
	<view class="map-box">
		<map id="map" :latitude="latitude" :longitude="longitude" show-location :markers="markers" class="map" scale="5" @markertap="handleMarkerTap"></map>
		<view class="btn1" v-show="isScan" @tap="handleScan">扫码借还</view>
		<view class="btn2" v-show="!isScan">
			<view class="scan-box-left">
				<image :src="currentMarker.iconPath" mode="widthFix" />
			</view>
			<view class="scan-box-center">
				<view class="scan-box-center-item top">{{ currentMarker.title }}</view>
				<view class="scan-box-center-item bottom">{{ currentMarker.address }}</view>
			</view>
			<view class="scan-box-right">
				<image src="../../static/nav.png" mode="widthFix" @tap="handleNavTap" />
			</view>
		</view>
		<view class="action-box">
			<!-- <image src="../../static/search.png" mode="widthFix"></image>
			<image src="../../static/support.png" mode="widthFix"></image>
			<image src="../../static/origin.png" mode="widthFix"></image>
			<image src="../../static/profile.png" mode="widthFix"></image> -->
			<image v-for="item in actionList" :key="item.id" :src="item.src" mode="widthFix" @tap="handleImageTap(item)"></image>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import api from '../../api/index.js';
// import { markers } from '../../pages-data/index.js';
const app = getApp();
let markers = ref({});
// 地图坐标
let latitude = ref(0);
let longitude = ref(0);
// 当前标记点
let currentMarker = ref({});
// 切换扫码按钮
let isScan = ref(true);
// 是否有订单
let orderNo = ref(uni.setStorageSync('orderNo') || '');
onLoad(() => {
	api.getStadiumList().then((res) => {
		if (res.code === 0) {
			app.globalData.markers = markers.value = res.data.map((i) => {
				return {
					...i,
					latitude: +i.latitude,
					longitude: +i.longitude,
					title: i.name,
					iconPath: '/static/icon.png',
					width: 40,
					height: 40,
					img: 'https://img.qtx.com/asset/ec/7a/63/0a3f99a3392ea8e3cb7a9d151bf92928.jpeg'
				};
			});
		} else {
			uni.showToast({
				title: res.message,
				icon: none
			});
		}
	});
	// 获取当前位置
	uni.getLocation({
		success: (res) => {
			latitude.value = res.latitude;
			longitude.value = res.longitude;
		},
		fail: (err) => {
			console.log(err);
		}
	});
});
// 点击标记点回调
const handleMarkerTap = (e) => {
	currentMarker.value = markers.value.find((item) => item.id === e.detail.markerId);
	isScan.value = false;
};
const handleNavTap = () => {
	uni.navigateTo({
		url: `/pages/ground/ground?id=${currentMarker.value.id}`
	});
};
// 图标
const actionList = [
	{ id: 1, src: '/static/search.png', name: '地图搜索' },
	{ id: 2, src: '/static/support.png', name: '客服中心' },
	{ id: 3, src: '/static/origin.png', name: '回到原点' },
	{ id: 4, src: '/static/profile.png', name: '个人中心' }
];
// 首页按钮回调
const handleImageTap = (item) => {
	switch (item.id) {
		case 1:
			uni.chooseLocation({
				success(res) {
					latitude.value = res.latitude;
					longitude.value = res.longitude;
				}
			});
			break;
		case 2:
			uni.navigateTo({
				url: '/pages/contact/contact'
			});
			break;
		case 3:
			const mapContext = uni.createMapContext('map');
			mapContext.moveToLocation();
			break;
		case 4:
			if (!app.globalData.token) {
				uni.showModal({
					title: '尚未登录',
					content: '点击确认进行登录',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				});
				return;
			}

			uni.navigateTo({
				url: '/pages/profile/profile'
			});
			break;
	}
};
// 扫码按钮
const handleScan = () => {
	if (!app.globalData.token) {
		uni.showModal({
			title: '尚未登录',
			content: '点击确认进行登录',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			}
		});
		return;
	}
	uni.scanCode({
		success(res) {
			const stadiumId = res.result.split(':')[1];
			if (!orderNo.value) {
				api.orderCreate({ stadiumId }).then((res) => {
					if (res.data !== 'create order failed') {
						orderNo.value = res.data;
						uni.setStorage({
							key: 'orderNo',
							data: orderNo.value
						});
						uni.showToast({
							title: '创建成功',
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: '创建失败',
							icon: 'none'
						});
					}
				});
			} else {
				api.orderFinish({ orderNo: orderNo.value }).then((res) => {
					if (res.code === 0) {
						uni.removeStorage({
							key: 'orderNo'
						});
						uni.showToast({
							title: '结束成功',
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				});
			}
		}
	});
};
</script>

<style lang="scss">
.map-box {
	position: relative;
	.action-box {
		position: absolute;
		right: 10%;
		bottom: 300rpx;
		width: 90rpx;

		image {
			width: 50%;
			background-color: #fff;
			border-radius: 50%;
			padding: 20rpx;
			box-shadow: 0 0 20rpx 1296db;
			margin-bottom: 40rpx;
		}
	}
}
.map {
	width: 100vw;
	height: 100vh;
}
.btn1 {
	width: 80vw;
	height: 10vh;
	line-height: 10vh;
	position: absolute;
	bottom: 20vw;
	left: 50%;
	transform: translateX(-50%);
	font-size: 50rpx;
	background-color: #0e93d8;
	color: #fff;
	text-align: center;
	border-radius: 20rpx;
	box-shadow: 0 0 10rpx #1296db;
	font-weight: bold;
	letter-spacing: 4rpx;
}
.btn2 {
	width: 80vw;
	height: 120rpx;
	position: absolute;
	bottom: 20vw;
	left: 50%;
	transform: translateX(-50%);
	background-color: #fffeff;
	color: #1a1819;
	display: flex;
	border-radius: 20rpx;
	box-shadow: 0 0 10rpx #fffeff;

	.scan-box-left {
		padding: 20rpx;
		image {
			width: 80rpx;
			border-radius: 50%;
		}
	}
	.scan-box-center {
		flex: 1;
		.scan-box-center-item {
			height: 60rpx;
			line-height: 60rpx;
			width: 360rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.top {
			font-weight: bold;
		}
		.bottom {
			font-size: 28rpx;
		}
	}
	.scan-box-right {
		padding: 20rpx;
		image {
			width: 80rpx;
			border-radius: 50%;
		}
	}
}
</style>
