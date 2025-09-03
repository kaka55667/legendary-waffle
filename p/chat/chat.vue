<template>
    <view class="chat-page">
        <!-- 头部信息区域 -->
        <view class="header">
            <image 
                class="logo-img"
                :src="userall_LogoImg || '/static/default-avatar.png'"
                mode="aspectFill"
            />
            <view class="user-info">
                <text class="nickname">{{userall_Nickname || '客服专员'}}</text>
                <view class="contact-area">
                    <text class="contact-label">微信:</text>
                    <text class="wechat-id">{{userall_weixin || '暂无微信号'}}</text>
                    <text class="copy-btn" @click="copyWechat">复制</text>
                </view>
            </view>
        </view>

        <!-- 二维码区域 -->
        <view class="qr-code-container">
            <view class="qr-code-card">
                <image 
                    class="qr-code-image"
                    :src="weixinImg"
                    mode="aspectFit"
                    @longpress="saveQRCode"
                    @error="handleImageError"
                />
                <text class="qr-code-tip">长按识别二维码添加客服</text>
            </view>
        </view>

        <!-- 提示信息区域 -->
        <view class="tips-container" v-if="userall_desc">
            <text class="tips-title">温馨提示</text>
            <text class="tips-content">{{userall_desc}}</text>
        </view>
			  <cc-myTabbar :tabBarShow="2"></cc-myTabbar>
    </view>
</template>

<script>
export default {
    data() {
        return {
            userall_desc: '',
            userall_weixin: '',
            userall_weixin_img: '',
            userall_Nickname: '',
            userall_LogoImg: '',
            weixinImg: '/static/nokefu.jpg',
            loading: true,
            Myuid: '',
        }
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
        async init() {
            try {
                this.loading = true;
                const res = await this.$http.get('/v1/shopData/h5/getShopUserInfo', {
                    userid: this.Myuid
                });
                
                if (res.data) {
                    this.weixinImg = res.data.userall_weixin_img || this.weixinImg;
                    this.userall_desc = res.data.userall_desc || '';
                    this.userall_weixin = res.data.userall_weixin || '';
                    this.userall_Nickname = res.data.userall_Nickname || '客服专员';
                    this.userall_LogoImg = res.data.userall_LogoImg || this.userall_LogoImg;
                }
            } catch (e) {
                uni.showToast({
                    title: '客服信息获取失败',
                    icon: 'none'
                });
            } finally {
                this.loading = false;
            }
        },
        saveQRCode() {
            uni.previewImage({
                urls: [this.weixinImg],
                success: () => {
                    uni.showToast({
                        title: '长按图片保存二维码',
                        icon: 'none'
                    });
                }
            });
        },
        copyWechat() {
            if (!this.userall_weixin) {
                uni.showToast({
                    title: '暂无微信号可复制',
                    icon: 'none'
                });
                return;
            }
            uni.setClipboardData({
                data: this.userall_weixin,
                success: () => {
                    uni.showToast({
                        title: '微信号已复制',
                        icon: 'success'
                    });
                }
            });
        },
        handleImageError() {
            this.weixinImg = '/static/nokefu.jpg';
        }
    }
}
</script>

<style lang="scss" scoped>
.chat-page {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(to bottom, #f7f9fc, #e8f0f9);
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    align-items: center;
    padding: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 40rpx;
    
    .logo-img {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        border: 4rpx solid #f0f4ff;
    }
    
    .user-info {
        flex: 1;
        margin-left: 30rpx;
        
        .nickname {
            font-size: 36rpx;
            font-weight: bold;
            color: #333;
            display: block;
            margin-bottom: 10rpx;
        }
        
        .contact-area {
            display: flex;
            align-items: center;
            background: #f5f9ff;
            padding: 10rpx 20rpx;
            border-radius: 50rpx;
            
            .contact-label {
                font-size: 26rpx;
                color: #666;
                margin-right: 10rpx;
            }
            
            .wechat-id {
                font-size: 28rpx;
                color: #2a82e4;
                font-weight: 500;
                flex: 1;
            }
            
            .copy-btn {
                font-size: 26rpx;
                color: #fff;
                background: #2a82e4;
                padding: 6rpx 20rpx;
                border-radius: 30rpx;
            }
        }
    }
}

.qr-code-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40rpx;
    
    .qr-code-card {
        background: #fff;
        padding: 40rpx;
        border-radius: 30rpx;
        box-shadow: 0 6rpx 30rpx rgba(42, 130, 228, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        
        .qr-code-image {
            width: 500rpx;
            height: 500rpx;
            border: 1rpx solid #f0f0f0;
            border-radius: 20rpx;
            margin-bottom: 30rpx;
        }
        
        .qr-code-tip {
            font-size: 28rpx;
            color: #888;
            text-align: center;
            line-height: 1.6;
        }
    }
}

.tips-container {
    background: #fff;
    padding: 30rpx;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    
    .tips-title {
        display: block;
        font-size: 32rpx;
        color: #333;
        font-weight: bold;
        margin-bottom: 20rpx;
        position: relative;
        padding-left: 20rpx;
        
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8rpx;
            height: 32rpx;
            background: #2a82e4;
            border-radius: 4rpx;
        }
    }
    
    .tips-content {
        font-size: 28rpx;
        color: #666;
        line-height: 1.8;
    }
}

/* 加载状态样式 */
.loading-container,
.error-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>