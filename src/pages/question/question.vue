<template>
	<view class="question-box">
		<view class="detail" v-for="(item, index) in questionInfo" :key="item.id">
			<view class="title">{{ index + 1 }}.{{ item.title }}</view>
			<view class="desc">
				{{ item.answer }}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const app = getApp();
import { onLoad } from '@dcloudio/uni-app';
let questionInfo = ref([]);
onLoad((e) => {
	questionInfo.value = app.globalData.question.find((i) => i.id === +e.id).details;
	console.log(questionInfo.value);
});
</script>

<style lang="scss" scoped>
.question-box {
	padding: 20rpx;
	.detail {
		margin: 30rpx 0;
		.title {
			font-weight: bold;
			font-size: 38rpx;
			margin-bottom: 20rpx;
		}
		.desc {
			font-size: 30rpx;
			line-height: 40rpx;
		}
	}
}
</style>
