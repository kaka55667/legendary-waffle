<template>
	<view class="order-container"
		:style="{ background: `url(${ossUrl}/order_bg.png) no-repeat`, backgroundSize: '100% 100%' }">
		<view class="logo-section">
			<image class="logo-image" :src="`${ossUrl}/order_se.png`" mode="aspectFit" />
		</view>

		<view class="search-section">
			<uv-search v-model="telephone" bgColor="#ffffff" searchIconColor="#1678FF" searchIconSize="30" :inputStyle="{ 
					height: '70rpx', 
					fontSize: '32rpx',
					color: '#333',
					paddingLeft: '20rpx'
				}" @search="onSearch" placeholder="请输入收货人手机号" :showAction="false" placeholderStyle="color: #999;"></uv-search>
			<button class="search-button" @click="onSearch">查询订单</button>


			<button v-if="shopid!=''" class="search-button-back" @click="backshop">返回商品列表</button>
		</view>

		<view class="divider-text">
			<view class="divider-line"></view>
			<text class="divider-content">运营商官方取消/查询订单</text>
			<view class="divider-line"></view>
		</view>

		<view class="operator-grid">
			<view class="operator-card" @click="changeOperator(1)">
				<image class="operator-logo" :src="`${ossUrl}/order_telecom.png`" mode="aspectFit" />
				<text class="operator-name">中国电信</text>
				<view class="operator-action">
					<text>前往</text>
					<uni-icons type="forward" size="16" color="#1678FF"></uni-icons>
				</view>
			</view>

			<view class="operator-card" @click="changeOperator(2)">
				<image class="operator-logo" :src="`${ossUrl}/order_unicom.png`" mode="aspectFit" />
				<text class="operator-name">中国联通</text>
				<view class="operator-action">
					<text>前往</text>
					<uni-icons type="forward" size="16" color="#1678FF"></uni-icons>
				</view>
			</view>

			<view class="operator-card" @click="changeOperator(3)">
				<image class="operator-logo" :src="`${ossUrl}/order_telecom.png`" mode="aspectFit" />
				<text class="operator-name">中国移动</text>
				<view class="operator-action">
					<text>前往</text>
					<uni-icons type="forward" size="16" color="#1678FF"></uni-icons>
				</view>
			</view>
		</view>
		<cc-myTabbar :tabBarShow="1"></cc-myTabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: uni.ossUrl,
				telephone: uni.getStorageSync('iphone'),
				shopid: '',
			};
		},
		methods: {
			changeOperator(key) {
				const self = this;
				let link = ''
				switch (key) {
					case 1:
						link = 'http://a.189.cn/IBbVib';
						// #ifdef H5
						window.open(link)
						// #endif
						// #ifdef MP-WEIXIN
						self.copy(link)
						// #endif
						break;
					case 2:
						link = 'https://m.10010.com/myorder';
						// #ifdef H5
						window.open(link)
						// #endif
						// #ifdef MP-WEIXIN
						self.copy(link)
						// #endif
						break;
					case 3:
						link = 'https://dev.coc.10086.cn/coc/web/coc2020/cardqueryorder';
						// #ifdef H5
						window.open(link)
						// #endif
						// #ifdef MP-WEIXIN
						self.copy(link)
						// #endif
						break;
				}
			},
			onSearch(e) {
				if (!this.telephone) {
					uni.showToast({
						title: '请输入收货人手机号',
						icon: 'none'
					});
					return;
				}
				if (!/^1[3-9]\d{9}$/.test(this.telephone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return;
				}
				uni.navigateTo({
					url: '/p/orderList/orderList?telephone=' + this.telephone
				})
			},
			backshop() {
				uni.navigateTo({
					url: `/p/g?shopid=` + this.shopid
				})
			},
			copy(url) {
				uni.setClipboardData({
					data: url,
					success: () => {
						uni.showToast({
							title: '链接已复制，请在浏览器打开',
							icon: 'none'
						});
					}
				});
			}
		},
		onLoad(options) {

			if (typeof options.enuid !== 'undefined') {
				uni.setStorageSync('MyLcsxUid', options.enuid);
				this.Myuid = options.enuid;
			} else {
				this.Myuid = this.$MyLcsxUid();
			}
			
			
			if (typeof options.iphone !== 'undefined') {
				
				
				uni.setStorageSync('iphone', options.iphone);
				this.telephone = options.iphone;
				
			}
			
			
			
			//this.shopid = uni.getStorageSync('shopid');


		},
	}
</script>

<style lang="scss" scoped>
	.order-container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		background-color: #f7f9fc;
	}

	.logo-section {
		width: 200rpx;
		height: 200rpx;
		margin: 60rpx 0 40rpx;

		.logo-image {
			width: 100%;
			height: 100%;
		}
	}

	.search-section {
		width: 100%;
		margin-bottom: 40rpx;

		.search-button {
			margin-top: 30rpx;
			width: 100%;
			height: 90rpx;
			border-radius: 30rpx;
			line-height: 90rpx;
			background: linear-gradient(135deg, #1678FF, #4A90E2);
			color: white;
			font-size: 32rpx;
			border-radius: 102rpx;
			box-shadow: 0 4rpx 12rpx rgba(22, 120, 255, 0.3);
			transition: all 0.3s;

			&:active {
				opacity: 0.9;
				transform: translateY(2rpx);
			}
		}

		.search-button-back {
			margin-top: 30rpx;
			width: 100%;
			color: #1678FF;
			height: 90rpx;
			border-radius: 30rpx;
			line-height: 90rpx;
			background: linear-gradient(135deg, #fff, #fff);

			font-size: 32rpx;
			border-radius: 102rpx;
			box-shadow: 0 4rpx 12rpx rgba(22, 120, 255, 0.3);
			transition: all 0.3s;

			&:active {
				opacity: 0.9;
				transform: translateY(2rpx);
			}
		}

	}

	.divider-text {
		display: flex;
		align-items: center;
		width: 100%;
		margin: 40rpx 0;
		color: #1678FF;
		font-size: 28rpx;
		font-weight: 500;

		.divider-line {
			flex: 1;
			height: 1px;
			background: linear-gradient(90deg, transparent, #1678FF, transparent);
		}

		.divider-content {
			padding: 0 20rpx;
		}
	}

	.operator-grid {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30rpx;
		margin-top: 30rpx;
	}

	.operator-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx 20rpx;
		background-color: white;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
		transition: all 0.3s;

		&:active {
			transform: scale(0.98);
		}

		.operator-logo {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 20rpx;
		}

		.operator-name {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
			font-weight: 500;
		}

		.operator-action {
			display: flex;
			align-items: center;
			color: #1678FF;
			font-size: 26rpx;
			padding: 8rpx 24rpx;
			border-radius: 20rpx;
			background-color: rgba(22, 120, 255, 0.1);
		}
	}
</style>