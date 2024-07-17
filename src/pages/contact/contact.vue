<template>
	<view class="contact-box">
		<view class="contact-top">
			<view class="contact-top-title">24H在线为您答疑解惑</view>
			<button open-type="contact">在线客服</button>
		</view>
		<view class="contact-bottom">
			<view class="title">常见问题</view>
			<view class="list">
				<view class="item" v-for="item in contactQuestion" :key="item.id" @tap="handleQuestion(item)">
					<image :src="item.src" mode="widthFix"></image>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
// import { contactQuestion } from '../../pages-data/index.js';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import api from '../../api/index.js';
const app = getApp();
const contactQuestion = ref([]);
onLoad(() => {
	api.getQuestionList().then((res) => {
		if (res.code === 0) {
			app.globalData.question = contactQuestion.value = res.data.map((i) => {
				let src = '';
				switch (i.id) {
					case 1:
						src = '/static/flow.png';
						break;
					case 2:
						src = '/static/machine.png';
						break;
					case 3:
						src = '/static/deposit.png';
						break;
					case 4:
						src = '/static/order.png';
						break;
					case 5:
						src = '/static/repair.png';
						break;
					case 6:
						src = '/static/more.png';
						break;
					default:
						break;
				}
				return {
					...i,
					src
				};
			});
		} else {
			uni.showToast({
				title: res.message,
				icon: none
			});
		}
	});
});
const handleQuestion = (item) => {
	uni.navigateTo({
		url: `/pages/question/question?id=${item.id}`
	});
};
</script>

<style lang="scss" scoped>
.contact-box {
	width: 100vw;
	height: 100vh;
	background-color: #efefef;
	.contact-top {
		height: 25%;
		background-color: #fff;
		margin-bottom: 20rpx;
		.contact-top-title {
			margin: 60rpx 0;
			text-align: center;
			font-weight: bold;
			letter-spacing: 2rpx;
		}
		button {
			background-color: #1c87d5;
			color: #fff;
			width: 50%;
			letter-spacing: 2rpx;
		}
	}

	.contact-bottom {
		background-color: #fff;
		.title {
			font-weight: bold;
			line-height: 100rpx;
			height: 100rpx;
			padding-left: 20rpx;
			border-bottom: 2px solid #f1f1f1;
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			.item {
				width: 50%;
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 2rpx solid #f1f1f1;
				box-sizing: border-box;
				image {
					width: 50rpx;
				}
			}
			.item:nth-child(2n-1) {
				border-right: 2rpx solid #f1f1f1;
				box-sizing: border-box;
			}
		}
	}
}
</style>
