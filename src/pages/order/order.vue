<template>
	<view class="page">
		<view class="order-box" v-for="item in list" :key="item.id">
			<view class="order-item">场馆名称：{{ item.stadium.name }}</view>
			<view class="order-item">订单编号：{{ item.orderNo }}</view>
			<view class="order-item">消费金额：{{ item.amount }}</view>
			<view class="order-item">订单状态：{{ item.status === 1 ? '进行中' : '已结束' }}</view>
			<view class="order-item">订单时长：{{ item.duration }}</view>
			<view class="order-item">开始时间：{{ item.createAt }}</view>
			<view class="order-item">结束时间：{{ item.updateAt }}</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import api from '../../api/index.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const list = ref();

onLoad(() => {
	api.orderList().then((res) => {
		if (res.code === 0) {
			list.value = res.data.map((i) => {
				const createAt = dayjs(i.createAt);
				const updateAt = dayjs(i.updateAt);
				const duration = dayjs.duration(updateAt.diff(createAt));

				return {
					...i,
					amount: (+i.amount).toFixed(2),
					createAt: createAt.format('YYYY-MM-DD HH:mm:ss'),
					updateAt: updateAt.format('YYYY-MM-DD HH:mm:ss'),
					duration: `${duration.hours()}小时${duration.minutes()}分钟`
				};
			});
		}
	});
});
</script>

<style lang="scss" scoped>
.page {
	background-color: #efefef;
	width: 100vw;

	overflow: hidden;
	.order-box {
		width: 80%;
		margin: 35rpx auto;
		background-color: #fff;
		padding: 30rpx;
		.order-item {
			height: 50rpx;
			line-height: 50rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
