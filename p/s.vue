<template>
	<view class="share" :style="{ background: `url(${ossUrl}/share_bg.png) no-repeat`, backgroundSize: '100% 100%' }">
		<view class="share_main">
			<view class="share_title">全国流量卡免费领</view>
			<view class="share_name"
				:style="{ background: `url(${ossUrl}/share_name_bg.png) no-repeat`, backgroundSize: '100% 100%' }">
				超值优惠·长期套餐·免费包邮</view>
			<view class="share_rent">
				月租
				<text>29</text>
				元、
				<text>39</text>
				元
			</view>
			<view class="share_img">
				<image :src="`${ossUrl}/share_c.png`" alt="" />
			</view>
			<view class="share_content"
				:style="{ background: `url(${ossUrl}/share_content_bg.png) no-repeat`, backgroundSize: '100% 100%' }">
				<view class="share_content_code">
					<!--<image :src="`${ossUrl}/share_code.png`" alt="" />-->
					<uv-qrcode ref="qrcode" size="200rpx" :value="shareLink"></uv-qrcode>
				</view>
				<view class="share_content_info">
					<view class="share_content_name">微信扫一扫</view>
					<view class="share_content_text">查看店铺更多精彩内容</view>
				</view>
			</view>
			<view class="share_btns">
				<view class="share_btn" @click="copy">复制链接</view>
				<view class="share_btn share_btn2" @click="downloadBefore">生成海报</view>
			</view>
		</view>
		 <cc-myTabbar :tabBarShow="3"></cc-myTabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ossUrl: uni.ossUrl,
			shareLink: '',
			       Myuid: '',
		};
	},
	onLoad(options) {
		if (typeof options.enuid !== 'undefined') {
		    uni.setStorageSync('MyLcsxUid', options.enuid);
		    this.Myuid = options.enuid;
		} else {
		    this.Myuid = this.$MyLcsxUid();
		}
		this.init();
	},
	methods: {
		init() {
			this.$http.get('/v1/shopData/h5/getDomain', {
				uid: this.Myuid,
			}).then(res => {
				console.log(res)
				this.shareLink = res.shopLink
			})
		},
		copy() {
			uni.setClipboardData({
				data: this.shareLink,
				success: function(res) {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
						duration: 1500
					});
				}
			});
		},
		downloadBefore() {
			uni.showLoading({
				title: '正在生成...',
				mask: true,
			})
			// 先获取店铺海报信息
			this.$http.get('/v1/shopData/h5/shop', {
				uid: this.Myuid,
			}).then(res => {
				console.log(res)
				const postLink = res.data['shares'][1];
				console.log(postLink)
				this.download(postLink);
			})
		},
		download(postLink) {
            // #ifndef H5
			uni.downloadFile({
                url: postLink,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: () => {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '保存成功',
                                    icon: 'success'
                                });
                            },
                            fail: () => {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '保存失败',
                                    icon: 'none'
                                });
                            }
                        });
                    } else {
                        alert(res);
                    }
                },
                fail: () => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '下载失败2',
                        icon: 'none'
                    });
                }
            });
            // #endif

			// 判断为H5环境
            // #ifdef H5
            const link = document.createElement('a')
            link.href = postLink
            // 名字用时间戳
            link.download = `poster_${Date.now()}.png`
            link.click()
            // #endif

			uni.hideLoading();
		}
	},
}
</script>


<style lang="scss" scoped>
.share {
  background: #F9F9F9;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  padding-bottom: 40rpx;
}

.share_main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.share_title {
  font-size: 48rpx;
  letter-spacing: 4rpx;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 3px 2px #0E48B6;
  margin-top: 60rpx;
  text-align: center;
  padding: 0 30rpx;
}

.share_name {
  width: 90%;
  height: 80rpx;
  color: #fff;
  font-size: 28rpx;
  margin: 20rpx auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2rpx;
  font-weight: 500;
}

.share_rent {
  font-size: 32rpx;
  letter-spacing: 1px;
  font-weight: 600;
  color: #fff;
  text-shadow: 1px 1px 0px #0E48B6;
  margin: 20rpx 0;
}

.share_rent text {
  font-size: 40rpx;
  color: #FFD700;
  margin: 0 8rpx;
}

.share_img {
  width: 90%;
  margin: 20rpx auto;
}

.share_img image {
  width: 100%;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.share_content {
  width: 90%;
  min-height: 280rpx;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  margin-top: 20rpx;
  border-radius: 16rpx;
}

.share_content_code {
  width: 200rpx;
  height: 200rpx;
  background-color: #fff;
  border-radius: 8rpx;
  margin-right: 30rpx;
  padding: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share_content_info {
  flex: 1;
}

.share_content_name {
  font-weight: 600;
  font-size: 36rpx;
  color: #FFFFFF;
  text-shadow: 1px 1px 1px #013680;
}

.share_content_text {
  font-weight: 500;
  font-size: 28rpx;
  color: #FFFFFF;
  text-shadow: 1px 1px 1px #013680;
  margin-top: 20rpx;
}

.share_btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 50rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.share_btn {
  width: 300rpx;
  height: 90rpx;
  background: #FFFFFF;
  box-shadow: 0 4rpx 8rpx rgba(1, 54, 128, 0.2);
  border-radius: 45rpx;
  font-weight: 600;
  font-size: 32rpx;
  color: #1667FF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.share_btn:active {
  transform: scale(0.95);
}

.share_btn2 {
  background: #1678FF;
  color: #fff;
  box-shadow: 0 4rpx 8rpx rgba(22, 120, 255, 0.3);
}
</style>
