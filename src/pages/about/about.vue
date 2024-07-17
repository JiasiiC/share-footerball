<template>
	<view class="pages">
		<view class="about-box">
			<image src="../../static/footerball.png" mode="widthFix"></image>
			<view class="text">强身健体，从我做起</view>
			<view class="about-main" v-for="item in list" :key="item.id" @tap="handleTap(item)">
				<view class="left">
					<image :src="item.src" mode="widthFix"></image>
				</view>
				<view class="center">{{ item.name }}</view>
				<view class="right">{{ item.content }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const list = [
	{
		id: 1,
		name: '公众号',
		content: '共享足球',
		src: '/static/gzh.png'
	},
	{
		id: 2,
		name: '邮箱',
		content: 'footerball@000.com',
		src: '/static/email.png'
	},
	{
		id: 3,
		name: '客服电话',
		content: '000-00000000',
		src: '/static/phone.png'
	},
	{
		id: 4,
		name: '了解更多',
		content: '000-00000000',
		src: '/static/more.png'
	}
];
const handleTap = (item) => {
	switch (item.id) {
		case 1:

		case 2:
			uni.setClipboardData({
				data: item.content,
				success(res) {
					console.log(res);
				}
			});
			break;
		case 3:

		case 4:
			uni.makePhoneCall({
				phoneNumber: item.content
			});
			break;
	}
};
</script>

<style lang="scss" scoped>
.pages {
	width: 100vw;
	height: 100vh;
	background-color: #efefef;
	.about-box {
		overflow: hidden;
		margin: 0 auto;
		background-color: #fff;
		width: 90%;
		image {
			display: block;
			width: 180rpx;
			margin: 0 auto;
			margin-top: 100rpx;
		}
		.text {
			text-align: center;
			margin: 40rpx 0;
		}
		.about-main {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			border-bottom: 1px solid #ccc;
			.left {
				width: 70rpx;
				padding-left: 15rpx;
				image {
					width: 100%;
					margin: 0;
				}
			}
			.center {
				flex: 1;
				padding-left: 30rpx;
				font-weight: 530;
			}
			.right {
				padding-right: 15rpx;
				color: #2086d3;
			}
			&:last-child {
				border: none;
			}
		}
	}
}
</style>
