<template>
	<view class="login-box">
		<view class="avator" v-if="app.globalData.token">
			<button open-type="chooseAvatar" @chooseavatar="chooseavatar"><image :src="avatarUrl" mode="widthFix"></image></button>
		</view>
		<view class="name" v-if="!app.globalData.token">
			昵称
			<input placeholder="请输入昵称" type="nickname" @change="handleChange" />
		</view>
		<view class="name" v-if="!app.globalData.token">
			密码
			<input placeholder="请输入密码" type="text" password @change="handleChangePassword" />
		</view>
		<view class="isLogin" @tap="handleToggle" v-if="!app.globalData.token">
			{{ isLogin ? '没有账号，点击注册' : '已有账号，点击登录' }}
		</view>
		<view class="submit" v-if="!app.globalData.token">
			<button @tap="handleTap">{{ isLogin ? '登录' : '注册' }}</button>
		</view>
		<view class="submit" v-if="app.globalData.token">
			<button @tap="handleModifyAvatar">确认</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api/index.js';
import upload from '../../upload/index.js';
const app = getApp();
let avatarUrl = ref(`http://${app.globalData.userInfo.avatar}`);
let name = ref('');
let password = ref('');
let isLogin = ref(true);

const chooseavatar = (e) => {
	avatarUrl.value = e.detail.avatarUrl;
};
const handleChange = (e) => {
	name.value = e.detail.value;
};
const handleChangePassword = (e) => {
	password.value = e.detail.value;
};
const handleTap = () => {
	if (!name.value || !password.value) {
		uni.showToast({
			title: '用户名和密码不能为空',
			icon: 'none'
		});
		return;
	}
	const data = {
		name: name.value,
		password: password.value
	};
	if (isLogin.value) {
		api.login(data).then((res) => {
			if (res.code === 0) {
				app.globalData.userInfo = res.data;
				app.globalData.token = res.data.token;
				uni.setStorage({
					key: 'userInfo',
					data: res.data
				});
				uni.setStorage({
					key: 'token',
					data: res.data.token
				});
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
				uni.navigateBack();
			} else {
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
			}
		});
	} else {
		api.register(data).then((res) => {
			if (res.code === 0) {
				uni.showToast({
					title: '注册成功',
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
};
const handleToggle = () => {
	isLogin.value = !isLogin.value;
};
const handleModifyAvatar = () => {
	console.log(avatarUrl.value);
	if (!avatarUrl.value) {
		uni.showToast({
			title: '请上传头像',
			icon: 'none'
		});
	}
	upload.uploadAvatar(avatarUrl.value).then((res) => {
		if (res.code === 0) {
			uni.showToast({
				title: '上传成功',
				icon: 'none'
			});
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none'
			});
		}
	});

	// const data = {
	// 	name: name.value,
	// 	password: password.value
	// };
	// api.login(data).then((res) => {
	// 	app.globalData.userInfo = res.data;
	// 	app.globalData.token = res.data.token;
	// 	uni.setStorage({
	// 		key: 'userInfo',
	// 		data: res.data
	// 	});
	// 	uni.setStorage({
	// 		key: 'token',
	// 		data: res.data.token
	// 	});
	// });

	uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.login-box {
	width: 90%;
	margin: 0 auto;
	.avator {
		width: 100%;
		height: 260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			width: 120rpx;
			height: 120rpx;
			padding: 0;
		}
		image {
			width: 120rpx;
			height: 120rpx;
		}
	}
	.name {
		display: flex;
		font-size: 40rpx;
		align-items: center;
		margin: 50rpx 0;
		input {
			padding-left: 50rpx;
		}
	}
	.submit {
		button {
			width: 60%;
			background-color: #1b88d8;
			color: #fff;
		}
	}
	.isLogin {
		text-align: center;
		text-decoration: underline;
		margin-bottom: 30rpx;
		color: #1b88d8;
	}
}
</style>
