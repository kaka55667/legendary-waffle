<template>
    <uni-popup ref="share" type="center" border-radius="20rpx">
        <view class="poster-page">
            <view class="poster-content">
                <image :src="shareLink" mode="widthFix">
                </image>
            </view>
            <view class="poster-footer">
                <view class="form-btn" @click="copy">复制链接</view>
                <view class="form-btn" @click="downPoster">保存海报</view>
            </view>
        </view>
    </uni-popup>
</template>
<script>
export default {
    data() {
        return {
            shareLink: '', // 分享链接
            copyLink: '' // 复制链接
        }
    },
    methods: {
        copy() {
            uni.setClipboardData({
                data: this.copyLink,
                success: () => {
                    uni.showToast({
                        title: '复制成功',
                        icon: 'none'
                    });
                },
                fail: () => {
                    uni.showToast({
                        title: '复制失败',
                        icon: 'none'
                    });
                }
            });
        },
        downPoster() {
            uni.showLoading({
                title: '下载中',
                mask: true
            });

            // 判断为H5环境
            // #ifdef H5
            const link = document.createElement('a')
            link.href = this.shareLink
            // 名字用时间戳
            link.download = `poster_${Date.now()}.png`
            link.click()
            uni.hideLoading()
            // #endif

            // #ifndef H5
            uni.downloadFile({
                url: this.shareLink,
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
        },
        async open(shopId) {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            const url = '/v1/shopData/index/getProductNewPoster'
            const res = await this.$http.get(url, { secretStr: shopId })
            uni.hideLoading();
            this.shareLink = res.link;
            this.copyLink = res.copyLink;
            this.$refs.share.open();
        }
    }
}
</script>
<style lang="scss" scoped>
.poster-page {
    box-sizing: border-box;
    width: 632rpx;
    height: 990rpx;
    padding: 26rpx;
    background: #ffffff;
    border-radius: 30rpx 30rpx 30rpx 30rpx;

    .poster-img {
        width: 580rpx;
        height: 574rpx;

        image {
            width: 100%;
            height: 100%;
            border-radius: 18rpx;
        }
    }

    .poster-content {
        display: flex;
    }

    .poster-footer {
        display: flex;
        justify-content: space-around;

        .form-btn {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;     padding: 20rpx 60rpx;
			font-size: 28rpx;
			color: #1678ff;
		}
	}
}
</style>