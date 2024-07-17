<template>
	<view class="ground-box">
		<image :src="groundInfo.img" mode="widthFix"></image>
		<view class="ground-title">{{ groundInfo.title }}</view>
		<view class="ground-info">
			<view class="info-row">
				<view class="pic">
					<image src="../../static/location.png" mode="widthFix"></image>
				</view>
				<view class="text">
					<text>{{ groundInfo.address }}</text>
				</view>
				<view class="pic">
					<image src="../../static/navTo.png" mode="widthFix" @tap="handleTap"></image>
				</view>
			</view>
			<view class="info-row">
				<view class="pic">
					<image src="../../static/hot.png" mode="widthFix"></image>
				</view>

				<view class="text">
					<text>球场热度：{{ groundInfo.hot }}</text>
					<text v-if="groundInfo.hot === 'SSS'">（非常高）</text>
				</view>
			</view>
			<view class="info-row">
				<view class="pic">
					<image src="../../static/time.png" mode="widthFix"></image>
				</view>
				<view class="text">
					<text>营业时间：{{ groundInfo.startTime }} - {{ groundInfo.endTime }}</text>
				</view>
			</view>
			<view class="info-row">
				<view class="pic">
					<image src="../../static/parking.png" mode="widthFix"></image>
				</view>

				<view class="text">
					<text>停车场：{{ groundInfo.isParking ? '踢球可免费停车' : '无' }}</text>
				</view>
			</view>
			<view class="info-row">
				<view class="pic">
					<image src="../../static/toilet.png" mode="widthFix"></image>
				</view>

				<view class="text">
					<text>卫生间：{{ groundInfo.isToilet ? '有' : '无' }}</text>
				</view>
			</view>
			<view class="info-row">
				<view class="pic">
					<image src="../../static/bathroom.png" mode="widthFix"></image>
				</view>

				<view class="text">
					<text>洗浴室：{{ groundInfo.isToilet ? '踢球可免费使用' : '无' }}</text>
				</view>
			</view>
			<view class="info-row">
				<view class="pic">
					<image src="../../static/light.png" mode="widthFix"></image>
				</view>

				<view class="text">
					<text>灯光：{{ groundInfo.isLight ? '球场以提供室内灯光服务' : '无' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { getGroundInfoById } from '../../pages-data';
import { ref } from 'vue';
const app = getApp();
// 存储场馆详情
let groundInfo = ref({});
onLoad((e) => {
	if (e.id) {
		// groundInfo.value = getGroundInfoById(+e.id);
		groundInfo.value = app.globalData.markers.find((i) => i.id === +e.id);
		console.log(groundInfo.value);
	}
});
const handleTap = () => {
	uni.openLocation({
		latitude: groundInfo.value.latitude,
		longitude: groundInfo.value.longitude,
		name: groundInfo.value.title,
		address: groundInfo.value.address
	});
};
</script>

<style lang="scss" scoped>
.ground-box {
	width: 90%;
	margin: 0 auto;
	image {
		width: 100%;
		border-radius: 20rpx;
	}
	.ground-title {
		font-size: 40rpx;
		font-weight: bold;
		margin: 30rpx 0;
	}
	.ground-info {
		.info-row {
			display: flex;
			border-bottom: 1px solid #1296db;
			justify-content: space-between;
			padding: 15rpx 0;
			.pic {
				width: 50rpx;
				image {
					width: 100%;
				}
			}
			.text {
				padding-left: 20rpx;

				flex: 1;
				text {
					color: #gray;
					font-size: 26rpx;
					line-height: 26rpx;
				}
			}
		}
	}
}
</style>
