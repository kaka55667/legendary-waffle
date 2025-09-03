<template>
  <view class="order-list-container">
    <!-- Empty State -->
    <view v-if="noResult && (list.length === 0)" class="empty-state">
      <view class="empty-state-image">
        <image :src="`${ossUrl}/no_data.png`" mode="aspectFit" />
      </view>
      <view class="empty-state-text">未查询到订单信息</view>
      <view class="empty-state-subtext">请检查您的查询条件或联系客服</view>
      <view class="empty-state-actions">
        <button @click="back" class="action-button action-button--primary">返回首页</button>
        <button @click="kefu" class="action-button action-button--secondary">联系客服</button>
      </view>
    </view>

    <!-- Order List -->
    <view class="order-list">
      <view 
        class="order-card" 
        v-for="(order, index) in list" 
        :key="index"
        @click="toggleOrderDetails(index)"
      >
        <view class="order-header">
          <text class="order-title">{{ order.title }}</text>
          <text class="order-status" :class="getStatusClass(order.statename)">{{ order.statename }}</text>
        </view>
        
        <view class="order-summary">
          <view class="order-image">
            <image :src="`${ossUrl}/goods.png`" mode="aspectFit" />
          </view>
          <view class="order-meta">
            <text class="meta-item">
              <text class="meta-icon">📦</text>
              订单号: {{ order.service_number }}
            </text>
            <text class="meta-item">
              <text class="meta-icon">🕒</text>
              下单时间: {{ order.down_time }}
            </text>
          </view>
        </view>
        
        <view class="order-details" v-if="expandedOrders[index]">
          <view class="order-detail-row">
            <text class="detail-label">
              <text class="detail-icon">👤</text>
              开户姓名
            </text>
            <text class="detail-value">{{ order.fullname }}</text>
          </view>
          
          <view class="order-detail-row">
            <text class="detail-label">
              <text class="detail-icon">📱</text>
              联系电话
            </text>
            <text class="detail-value">{{ order.telephone }}</text>
          </view>
          
          <view class="order-detail-row">
            <text class="detail-label">
              <text class="detail-icon">✈️</text>
              快递单号
            </text>
            <text class="detail-value">{{ order.tracking_number || '暂无信息' }}</text>
          </view>
          
          <view class="order-detail-row">
            <text class="detail-label">
              <text class="detail-icon">ℹ️</text>
              状态说明
            </text>
            <text class="detail-value status-text">{{ order.state_remarks }}</text>
          </view>
        </view>
        
        <view class="order-footer">
          <text class="toggle-details" @click.stop="toggleOrderDetails(index)">
            {{ expandedOrders[index] ? '收起详情' : '查看详情' }}
            <text class="toggle-icon">{{ expandedOrders[index] ? '▲' : '▼' }}</text>
          </text>
        </view>
      </view>
    </view>
    
    <view class="back-empty-state-actions" v-if="list.length > 0">
      <button @click="back" class="action-button action-button--primary">返回首页</button>
      <button @click="kefu" class="action-button action-button--secondary">联系客服</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      Myuid: '',
      ossUrl: uni.ossUrl,
      list: [],
      noResult: false,
      expandedOrders: {}
    };
  },
  onLoad(options) {
    if (typeof options.enuid !== 'undefined') {
      uni.setStorageSync('MyLcsxUid', options.enuid);
      this.Myuid = options.enuid;
    } else {
      this.Myuid = this.$MyLcsxUid();
    }

    const telephone = options.telephone;
    this.searchOrder(telephone);
  },
  methods: {
    back() {
      uni.redirectTo({
        url: '/p/i?enuid=' + this.$MyLcsxUid()
      });
    },
    kefu() {
      uni.redirectTo({
        url: '/p/chat/chat?enuid=' + this.$MyLcsxUid()
      });
    },
    searchOrder(telephone) {
      const params = {
        telephone: telephone,
        userId: this.Myuid,
      }
      this.$http.get('/v1/shopData/index/orderSeach_ajax', params).then(res => {
        if (res.code !== 200) {
          this.noResult = true;
          return false;
        }

        this.noResult = false;
        this.list = res.data;
        // Initialize expanded state for each order
        this.list.forEach((_, index) => {
          this.$set(this.expandedOrders, index, true);
        });
      }).catch(error => {
        console.error('Error fetching orders:', error);
        this.noResult = true;
      });
    },
    toggleOrderDetails(index) {
      this.$set(this.expandedOrders, index, !this.expandedOrders[index]);
    },
    getStatusClass(status) {
      if (status.includes('完成') || status.includes('成功')) {
        return 'status-success';
      } else if (status.includes('处理') || status.includes('进行')) {
        return 'status-processing';
      } else if (status.includes('失败') || status.includes('取消')) {
        return 'status-error';
      }
      return '';
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list-container {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 24rpx;
  padding-bottom: 140rpx;
}

/* Empty State Styles */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  text-align: center;
  
  &-image {
    width: 300rpx;
    height: 220rpx;
    margin-bottom: 40rpx;
    
    image {
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
  }
  
  &-text {
    font-size: 36rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 16rpx;
  }
  
  &-subtext {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 60rpx;
  }
  
  &-actions {
    display: flex;
    justify-content: center;
    gap: 30rpx;
    width: 100%;
    max-width: 600rpx;
  }
}

.action-button {
  width: 240rpx;
  height: 80rpx;
  border-radius: 48rpx;
  font-size: 30rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  
  &--primary {
    background: linear-gradient(135deg, #1678FF, #4A90E2);
    color: #fff;
    box-shadow: 0 4rpx 12rpx rgba(22, 120, 255, 0.3);
    
    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 2rpx 6rpx rgba(22, 120, 255, 0.3);
    }
  }
  
  &--secondary {
    background: #fff;
    color: #1678FF;
    border: 1rpx solid #1678FF;
    
    &:active {
      background: rgba(22, 120, 255, 0.1);
    }
  }
}

/* Order List Styles */
.order-list {
  margin-top: 20rpx;
}

.order-card {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  margin-bottom: 24rpx;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.99);
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  }
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.order-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-status {
  font-size: 26rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  margin-left: 20rpx;
  
  &.status-success {
    background: rgba(82, 196, 26, 0.1);
    color: #52C41A;
  }
  
  &.status-processing {
    background: rgba(24, 144, 255, 0.1);
    color: #1890FF;
  }
  
  &.status-error {
    background: rgba(255, 77, 79, 0.1);
    color: #FF4D4F;
  }
}

.order-summary {
  display: flex;
  padding: 32rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.order-image {
  width: 160rpx;
  height: 160rpx;
  flex-shrink: 0;
  background: #fafafa;
  border-radius: 8rpx;
  overflow: hidden;
  
  image {
    width: 100%;
    height: 100%;
  }
}

.order-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 24rpx;
}

.meta-item {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  
  .meta-icon {
    margin-right: 12rpx;
    opacity: 0.8;
  }
}

.order-details {
  padding: 0 32rpx 24rpx;
}

.order-detail-row {
  display: flex;
  justify-content: space-between;
  margin-top: 24rpx;
  font-size: 28rpx;
  line-height: 1.5;
}

.detail-label {
  color: #888;
  flex-shrink: 0;
  
  .detail-icon {
    margin-right: 12rpx;
  }
}

.detail-value {
  flex: 1;
  color: #333;
  text-align: right;
  word-break: break-all;
  padding-left: 20rpx;
}

.status-text {
  color: #1678FF !important;
}

.order-footer {
  padding: 20rpx 32rpx;
  border-top: 1rpx solid #f0f0f0;
  text-align: center;
}

.toggle-details {
  color: #1678FF;
  font-size: 26rpx;
  display: inline-flex;
  align-items: center;
  
  .toggle-icon {
    margin-left: 8rpx;
    font-size: 24rpx;
  }
}

.back-empty-state-actions {
  position: fixed;
  bottom: 40rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 30rpx;
  padding: 0 40rpx;
  background: transparent;
}
</style>