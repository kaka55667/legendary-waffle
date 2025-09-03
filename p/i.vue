<template>
	<view class="home">
		<view class="home_top" :style="{
			background: `url(${ossUrl}/home_top_bg.png) no-repeat`,
			backgroundSize: '100% 100%',
		}">
			<text class="home_top_name">运营商官方授权</text>
			<view class="home_top_wrapper" :style="{
				background: `url(${ossUrl}/home_top_textbg.png) no-repeat`,
				backgroundSize: '100% 100%',
			}">
				<text>官方套餐&nbsp;免费包邮</text>
			</view>
			<text class="home_top_text">长期套餐·可选号码·官方售后</text>
		</view>
		<view class="home_main">
			<view class="home_info">
				<view class="home_info_main" :style="{
					background: `url(${ossUrl}/home_user_bg.png) no-repeat`,
					backgroundSize: '100% 100%',
				}">
					<view class="home_info_user">
						<view class="home_info_user_img">
							<uv-image :src="avatar" :observeLazyLoad="true" :radius="60" width="120rpx" height="120rpx"></uv-image>
						</view>
						<view>
							<view class="home_info_user_name">{{ shopName }}</view>
							<view class="home_info_user_text">
								三大运营商授权 官方正品保证
							</view>
						</view>
					</view>
					<view class="home_info_shop">
						<view class="home_info_shop_text">
							店铺口碑评分
							<text>4.9</text>
						</view>
						<view class="home_info_shop_xin">
							<uni-rate :readonly="true" color="#cccccc" activeColor="#FF7B00" :value="rateValue" />
						</view>
					</view>
				</view>
			</view>
			<view class="home_recommend" :style="{
				background: `url(${ossUrl}/home_recommend_bg.png) no-repeat`,
				backgroundSize: '100% 100%',
			}">
				<view class="home_recommend_top_img">
					<uv-image :src="`${ossUrl}/home_recommend_icon.png`" :observeLazyLoad="true" width="200rpx" height="47rpx"></uv-image>
				</view>
				<view class="home_recommend_list">
				  <scroll-view 
				    class="recommend_scroll" 
				    scroll-x 
				    show-scrollbar="false"
				    enable-flex
				    scroll-with-animation
				  >
				    <view 
				      class="recommend_item" 
				      v-for="(v, i) in hotData" 
				      :key="i"
				      @click="gotoGood(v.shopId)"
				    >
				      <view class="item_img_wrap">
				        <uv-image 
				          :src="v.graph" 
				          width="100%"
				          height="100%"
				          mode="aspectFill"
				          :observeLazyLoad="true"
				        ></uv-image>
				      </view>
				      <view class="item_content">
				        <text class="item_title">{{ v.title }}</text>
				        <text class="item_desc">{{ v.age }} | {{ v.toll }} | {{ v.other }}</text>
				      </view>
				    </view>
				  </scroll-view>
				</view>
			</view>
			<!-- <uv-sticky customNavHeight="80"> -->
			<view class="home_sticky"  :style="{ paddingTop: safeAreaInsets.top + 'px' }">
				<view class="home_tabs">
					<view class="home_tabs_row" :class="{ home_tabs_activate: v.id == tabValue }" v-for="v in tabList"
						:key="v.id" @click="tabChange(v)">
						{{ v.title }}
					</view>
				</view>
				<view class="home_search">
					<view class="home_search_area" @click="$refs.provincePopup.open()">
						<text class="home_search_area_text">{{ currentProvince || '地区' }}</text>
						<uv-icon name="arrow-down-fill" color="#666666" size="10"></uv-icon>
					</view>
					<uv-search v-model="keyWord" class="home_search_input" bgColor="#ffffff00" searchIconColor="#1678FF"
						:showAction="showAction" @search="onSearch" @cancel="onSearch" @focus="onFocus" actionText="搜索"
						:animation="true"></uv-search>
				</view>
			</view>
			<!--<view class="home_tags">
				<view class="" v-for="(v, i) in filterTag" :key="i">
					<view class="home_tags_item" @click="filterTagChange(v)"
						:class="{ home_tags_activate: filterTagValue.includes(v) }" v-if="tagExpand || i < 6">
						<text class="home_tags_item_text">{{ v }}</text>
					</view>
				</view>
				<view class="home_tags_item" @click="tagExpandChange">
					<text class="home_tags_item_text">
						{{ tagExpand ? "收起" : "展开更多" }}
					</text>
					<uv-icon v-show="tagExpand" name="arrow-up" size="10" />
					<uv-icon v-show="!tagExpand" name="arrow-down" size="10" />
				</view>
			</view>-->
			<view class="home_list">
				<view v-for="(v, i) in dataList" :key="i" class="home_goods" :class="{ hot: v.hot }">
					<image v-if="v.hot" class="hot_icon" :src="`${ossUrl}/hot.png`" :lazy-load="true"></image>
					<view class="home_goods_info">
						<view class="home_goods_img">
							<uv-image :src="v.graph" :observeLazyLoad="true" width="200rpx" height="200rpx"></uv-image>
						</view>
						<view class="home_goods_info_right">
							<view class="home_goods_name">
								{{ v.title }}
							</view>
							<view class="home_goods_tags">
								<text v-for="(tag, index) in v.tags" :key="index" class="home_goods_tags_item"
									:class="[getTagBg(index)]">{{ tag }}</text>
							</view>
							<view class="home_goods_warn">注意：不发北京地区</view>
						</view>
					</view>
					<view class="home_goods_bottom">
						<!--<view class="home_goods_btn">联系客服</view>-->
						<view class="home_goods_btn" @click="gotoShare(v.shopId)">立即分享</view>
						<view class="home_goods_btn home_goods_btn_shu home_goods_btn_to" @click="gotoGood(v.shopId)">
							立即下单
						</view>
					</view>
				</view>
				<uni-load-more :status="loading"></uni-load-more>
			</view>
		</view>
		<GoodShare ref="goodShare"></GoodShare>
		<uni-popup ref="provincePopup" type="center" border-radius="20rpx">
			<view class="country_page">
				<view class="country_title">
					地区选择
				</view>
				<view class="country_content">
					<view class="tags_row" v-for="(item,index) in countryList" :key="index"
						:class="{ active: item.territory == currentProvince}" @click="provinceChange(item.territory)">{{ item.territory
						}} ({{ item.rows}})</view>
				</view>
			</view>
		</uni-popup>
		
		
		  <cc-myTabbar :tabBarShow="0"></cc-myTabbar>
	</view>
</template>

<script>
const apiList = {
	getShopUserInfo: "/v1/shopData/h5/getShopUserInfo",
	getShopList: "/v1/shopData/h5/getShopList",
	getProductPoster: "/v1/shopData/h5/getProductNewPoster",
	getHotGoods: "/v1/shopData/h5/getHotGoods",
	getTerritory: "/v1/shopData/h5/getGoodsArea"
};
import GoodShare from "../components/goodShare/goodShare.vue";
export default {
	components: {
		GoodShare,
	},
	data() {
		return {
			safeAreaInsets: {
			        top: 0,
			        right: 0,
			        bottom: 0,
			        left: 0
			      },
			ossUrl: uni.ossUrl,
			rateValue: 3.9,
			tabValue: 0,
			tabList: [
				{
					id: 0,
					title: "全部",
				},
				{
					id: 1,
					title: "移动",
				},
				{
					id: 2,
					title: "电信",
				},
				{
					id: 3,
					title: "联通",
				},
				{
					id: 5,
					title: "广电",
				},
				/*{
					id: 6,
					title: "随身WiFi",
				},*/
			],
			loading: "more",
			dataList: [],
			keyWord: "",
			showAction: false,
			tagExpand: false,
			filterTag: [
				"是否选号",
				"办理年龄",
				"办理年龄",
				"是否长期办理",
				"收货地址归属地",
				"月租19元套餐",
				"月租29元套餐",
				"月租39元套餐",
				"月租59元套餐",
				"无合约随时注销",
				"注销有违约金",
			],
			filterTagValue: [],
			shopName: "",
			avatar: "",
			page: 1,
			pageSize: 10,
			hotData: [],
			countryList: [],
			currentProvince: '', // 当前选择省
			shareLink: '', // 分享链接
			copyLink: '', // 复制链接
			
			Myuid:'',
		};
	},
	mounted() {
		// #ifdef H5
		window.addEventListener("scroll", this.debounce(this.handleScroll, 300));
		// #endif
		this.getUserInfo();
	},
	beforeUnmount() {
		// #ifdef H5 
		window.removeEventListener("scroll", this.handleScroll);
		// #endif
	},
	// 新增小程序触底事件
	onReachBottom() {
		console.log('触底了')
		this.handleScroll()
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
		provinceChange(name) {
			this.currentProvince = name; // 更新当前选择省
			this.$refs.provincePopup.close(); // 关闭弹窗
			this.loadDataList("refresh"); // 刷新数据
		},
		gotoShare(shopId) {
			this.$refs.goodShare.open(shopId)
		},
		gotoGood(shopId) {
			uni.navigateTo({
				url: `/p/g?shopid=${shopId}`
			})
		},
		debounce(func, delay) {
			let timer = null;
			return function (...args) {
				const context = this;
				if (timer) clearTimeout(timer);
				timer = setTimeout(() => {
					func.apply(context, args);
				}, delay);
			};
		},
		checkScrollToBottom() {
			// #ifdef H5
			const scrollTop =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop; // 当前滚动距离
			const clientHeight =
				document.documentElement.clientHeight || window.innerHeight; // 视口高度
			const scrollHeight =
				document.documentElement.scrollHeight || document.body.scrollHeight; // 页面总高度
			return scrollTop + clientHeight + 50 >= scrollHeight; // 加50是为了微信环境下的兼容性
			// #endif

			// #ifdef MP-WEIXIN
			return true; // 小程序环境下直接返回true
			// #endif
		},
		handleScroll() {
			console.log('到底了');
			console.log(this.checkScrollToBottom());
			if (this.checkScrollToBottom()) {
				this.loadDataList("add"); // 调用加载数据的方法
			}
		},
		// add | refresh
		async loadDataList(type = "add") {
			const self = this;
			if (self.loading == "loading") return;
			self.loading = "loading";
			if (type == "refresh") {
				self.reset();
			}

			const params = self.genParams();

			const url = apiList.getShopList;
			const { code, data } = await self.$http.get(url, params);

			if (data.length == 0) {
				self.loading = "no-more";
			} else {
				data.forEach((e, i) => {
				
					// 构造一个标签数组
					const tags = [e.age, e.other, e.toll];
					e.tags = tags;
					e.hot = false;
					if (i < 2) {
						e.hot = true;
					}
				});
				self.dataList = self.dataList.concat(data);
				self.page++;
				self.loading = "more";
			}
		},
		genParams() {
			// 还有地区和标签
			const params = {
				page: this.page,
				pageSize: this.pageSize,
				id: this.Myuid,
				operator: this.tabValue,
				province: this.currentProvince, // 增加省份参数
				keyWord:this.keyWord
				
			};

			return params;
		},
		reset() {
			this.page = 1;
			this.dataList = [];
			this.loading = "more";
		},
		async getUserInfo() {
			const url = apiList.getShopUserInfo;
			const res = await this.$http.get(url, { userid: this.Myuid });
			if(res.code == 200){
				this.avatar = res.data.userall_LogoImg || `${ossUrl}/home_user.png`;
				this.shopName = res.data.userall_Nickname;
				this.initHotData()
				this.initCountry()
				this.loadDataList("refresh")
			}


		},
		initHotData() {
			const url = apiList.getHotGoods;
			return this.$http.get(url, { id: this.Myuid }).then((res) => {
				// 需要主图、title、标签、id（加密的）
				this.hotData = res.data.map((e, i) => {
				
					
					return {
						graph: e.graph,
						title: e.title,
						age: e.age,
						other: e.other,
						toll: e.toll,
						shopId: e.shopId,
					}
				})
			})
		},
		initCountry() {
			const url = apiList.getTerritory;
			return this.$http.get(url + "?id=" + this.Myuid).then((json) => {
				this.countryList = json.data
			});
		},
		tabChange(row) {
			this.tabValue = row.id;
			this.loadDataList("refresh");
		},
		onSearch() {
			
			
			this.loadDataList("refresh");
			console.log(this.keyWord);
		},
		onFocus() {
			this.showAction = true;
		},
		onCancel() {
			this.showAction = false;
		},
		filterTagChange(value) {
			//存在就删除，不存在就添加
			if (this.filterTagValue.includes(value)) {
				let index = this.filterTagValue.indexOf(value);
				this.filterTagValue.splice(index, 1);
			} else {
				this.filterTagValue.push(value);
			}
		},
		tagExpandChange() {
			this.tagExpand = !this.tagExpand;
		},
		getTagBg(key) {
			let bgColor = "";
			switch (key) {
				case 0:
					bgColor = "home_goods_tags_green";
					break;
				case 1:
					bgColor = "home_goods_tags_yellow";
					break;
				case 2:
					bgColor = "home_goods_tags_purple";
					break;
				default:
					bgColor = "home_goods_tags_blue";
					break;
			}
			return bgColor;
		},
		getSafeArea() {
		      try {
		        // #ifdef MP
		        const systemInfo = uni.getSystemInfoSync()
		        this.safeAreaInsets = systemInfo.safeAreaInsets || {
		          top: 0,
		          right: 0,
		          bottom: 0,
		          left: 0
		        }
		        // 小程序中通常需要额外处理iPhoneX等机型
		        if (systemInfo.model.indexOf('iPhone X') !== -1 || 
		            systemInfo.model.indexOf('iPhone 11') !== -1 ||
		            systemInfo.model.indexOf('iPhone 12') !== -1 ||
		            systemInfo.model.indexOf('iPhone 13') !== -1 ||
		            systemInfo.model.indexOf('iPhone 14') !== -1 ||
		            systemInfo.model.indexOf('iPhone 15') !== -1) {
		          this.safeAreaInsets.top = 44 // iPhone刘海屏状态栏高度
		        }
		        // #endif
		      } catch (e) {
		        console.error('获取安全区域失败', e)
		      }
		    }
	},
	onLoad(options) {
		
		if(typeof options.enuid !='undefined'){
			uni.setStorageSync('MyLcsxUid', options.enuid);
			this.Myuid = options.enuid;
		}else{
			this.Myuid = this.$MyLcsxUid();
		}
		
		
		   // 获取安全区域信息
		    this.getSafeArea()
		
		
		
		
	},
};
</script>

<style lang="scss" scoped>
.home {
  background: #f9f9f9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;

  .home_top {
    width: 100%;
    height: 400rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* background: linear-gradient(135deg, #1678ff 0%, #00a8ff 100%); */
      opacity: 0.9;
      z-index: 1;
    }

    .home_top_name {
      font-size: 72rpx;
      letter-spacing: 8rpx;
      font-weight: 700;
      white-space: nowrap;
      line-height: 88rpx;
      color: #fff;
      position: relative;
      z-index: 2;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
    }

    .home_top_wrapper {
      width: 382rpx;
      height: 42rpx;
      font-size: 26rpx;
      line-height: 42rpx;
      margin: 11rpx 0;
      text-align: center;
      color: #fff;
      font-weight: 600;
      letter-spacing: 2rpx;
      white-space: nowrap;
      position: relative;
      z-index: 2;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 21rpx;
      backdrop-filter: blur(5px);
    }

    .home_top_text {
      color: #fff;
      font-size: 24rpx;
      letter-spacing: 2rpx;
      position: relative;
      z-index: 2;
      opacity: 0.9;
    }
  }

  .home_main {
    padding: 20rpx;
    position: relative;
    z-index: 5;
    margin-top: -80rpx;

    .home_info {
      width: 100%;
      height: 240rpx;
      margin: 0 auto;
      border-radius: 20rpx;
      background: linear-gradient(140deg, #fdfeff 0%, #eff6ff 100%);
      box-shadow: 0 10rpx 30rpx rgba(6, 37, 80, 0.1);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5rpx);
        box-shadow: 0 15rpx 35rpx rgba(6, 37, 80, 0.15);
      }

      .home_info_main {
        width: 100%;
        height: 100%;
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .home_info_user {
          display: flex;
          align-items: center;

          .home_info_user_img {
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            margin-right: 20rpx;
            border: 4rpx solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            
            &:hover {
              transform: scale(1.05);
            }
          }

          .home_info_user_name {
            font-weight: 600;
            font-size: 36rpx;
            color: #333;
            line-height: 50rpx;
            letter-spacing: 1rpx;
          }

          .home_info_user_text {
            font-weight: 400;
            font-size: 24rpx;
            color: #666;
            line-height: 34rpx;
            margin-top: 8rpx;
            opacity: 0.8;
          }
        }

        .home_info_shop {
          font-size: 24rpx;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .home_info_shop_text {
            font-weight: 500;
            
            text {
              color: #FF7B00;
              font-weight: 600;
              font-size: 32rpx;
              margin-left: 8rpx;
            }
          }
        }
      }
    }

    .home_recommend {
      width: 100%;
      border-radius: 20rpx;
      padding: 57rpx 20rpx 40rpx;
      margin-top: 30rpx;
      background: linear-gradient(140deg, rgba(253, 254, 255, 0.9) 0%, #eff6ff 100%);
      box-shadow: 0 10rpx 30rpx rgba(6, 37, 80, 0.1);
      position: relative;
      box-sizing: border-box;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5rpx);
        box-shadow: 0 15rpx 35rpx rgba(6, 37, 80, 0.15);
      }

      .home_recommend_top_img {
        width: 200rpx;
        height: 47rpx;
        position: absolute;
        top: -16rpx;
        left: 50%;
        transform: translateX(-50%);
        filter: drop-shadow(0 4rpx 8rpx rgba(0, 0, 0, 0.1));
      }

     .home_recommend_list {
       width: 100%;
       padding: 10rpx 0 20rpx;
       
       .recommend_scroll {
         width: 100%;
         white-space: nowrap;
         height: 420rpx; 
         display: flex;
         align-items: center;
         
         &::-webkit-scrollbar {
           display: none;
         }
         
         .recommend_item {
           display: inline-flex;
           flex-direction: column;
           width: 240rpx;
           height: 380rpx;
           background: #fff;
           border-radius: 16rpx;
           box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
           margin-right: 20rpx;
           overflow: hidden;
           transition: all 0.3s ease;
           flex-shrink: 0;
           
           &:last-child {
             margin-right: 0;
           }
           
           &:active {
             transform: scale(0.98);
           }
           
           .item_img_wrap {
             width: 100%;
             height: 240rpx;  
             position: relative;
             overflow: hidden;
             
             &::after {
               content: '';
               position: absolute;
               bottom: 0;
               left: 0;
               right: 0;
               height: 60rpx;
               background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);
             }
           }
           
           .item_content {
             padding: 16rpx;
             flex: 1;
             display: flex;
             flex-direction: column;
             justify-content: space-between;
             height: 140rpx; 
             
             .item_title {
               font-size: 26rpx;
               font-weight: 600;
               color: #333;
               display: -webkit-box;
               -webkit-line-clamp: 2;
               -webkit-box-orient: vertical;
               overflow: hidden;
               text-overflow: ellipsis;
               white-space: normal;
               line-height: 1.4;
             }
             
             .item_desc {
               font-size: 22rpx;
               color: #999;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
               margin-top: 8rpx;
             }
           }
         }
       }
     }
    }

    .home_sticky {
      background: #fff;
      border-radius: 16rpx;
      padding: 20rpx;
      margin-top: 30rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .home_tabs {
      width: 100%;
      margin: 0 auto;
      padding: 20rpx 0;
      box-sizing: border-box;
      overflow-x: auto;
      display: flex;
      align-items: center;
      scrollbar-width: none;
      
      &::-webkit-scrollbar {
        display: none;
      }

      .home_tabs_row {
        flex: 0 0 auto;
        font-size: 28rpx;
        color: #666;
        padding: 10rpx 24rpx;
        margin-right: 10rpx;
        border-radius: 30rpx;
        transition: all 0.3s ease;
        white-space: nowrap;
        
        &:last-child {
          margin-right: 0;
        }
        
        &:hover {
          background: rgba(22, 120, 255, 0.1);
        }
      }

      .home_tabs_activate {
        font-size: 30rpx;
        color: #1678ff;
        font-weight: 600;
        position: relative;
        background: rgba(22, 120, 255, 0.1);
        
        &::after {
          content: "";
          width: 60%;
          height: 6rpx;
          background: linear-gradient(90deg, #1678ff 0%, rgba(22, 120, 255, 0.3) 100%);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          border-radius: 3rpx;
        }
      }
    }

    .home_search {
      width: 100%;
      height: 72rpx;
      background: #f5f9ff;
      border-radius: 36rpx;
      margin: 20rpx 0;
      display: flex;
      align-items: center;
      padding: 0 24rpx;
      box-sizing: border-box;
      box-shadow: inset 0 2rpx 8rpx rgba(1, 54, 128, 0.1);

      .home_search_area {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1rpx solid #d9e6ff;
        padding-right: 20rpx;
        margin-right: 20rpx;
        
        .home_search_area_text {
          font-size: 28rpx;
          color: #333;
          line-height: 39rpx;
          font-weight: 500;
        }
        
        .uv-icon {
          margin-left: 8rpx;
        }
      }
      
      .home_search_input {
        flex: 1;
      }
    }

    .home_tags {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 20rpx 0;

      .home_tags_item {
        padding: 10rpx 20rpx;
        background: #f5f5f5;
        border-radius: 30rpx;
        margin: 0 20rpx 20rpx 0;
        font-size: 24rpx;
        color: #666;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        
        .home_tags_item_text {
          margin-right: 6rpx;
        }
        
        &:hover {
          background: #e0e9ff;
          color: #1678ff;
        }
      }

      .home_tags_activate {
        background: #e0e9ff;
        color: #1678ff;
        font-weight: 500;
      }
    }

    .home_list {
      .home_goods {
        margin-top: 30rpx;
        border-radius: 16rpx;
        padding: 24rpx;
        box-sizing: border-box;
        position: relative;
        background: #fff;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-5rpx);
          box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
        }

        &.hot {
          background: linear-gradient(180deg, #e6f0ff 0%, #ffffff 60%);
          border: 1rpx solid #d0e2ff;
        }

        
       .hot_icon {
         position: absolute;
         top: -6rpx;
         left: -6rpx;
         width: 89rpx;
         height: 66rpx;
         z-index: 1;
         animation: swing 3s infinite ease-in-out;
         transform-origin: top center;
       }
       
       @keyframes swing {
         0%, 100% {
           transform: rotate(-5deg);
         }
         50% {
           transform: rotate(5deg);
         }
       }

        .home_goods_info {
          display: flex;
          margin-bottom: 20rpx;

          .home_goods_img {
            width: 200rpx;
            height: 200rpx;
            border-radius: 12rpx;
            margin-right: 20rpx;
            overflow: hidden;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            
            &:hover {
              transform: scale(1.02);
            }
          }

          .home_goods_info_right {
            flex: 1;
            
            .home_goods_name {
              font-size: 30rpx;
              color: #333;
              font-weight: 600;
              line-height: 42rpx;
              margin-bottom: 12rpx;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .home_goods_tags {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 12rpx;
              
              .home_goods_tags_item {
                padding: 4rpx 12rpx;
                border-radius: 6rpx;
                margin-right: 10rpx;
                margin-bottom: 10rpx;
                font-size: 22rpx;
                font-weight: 500;
              }
              
              .home_goods_tags_green {
                background: #e7fff8;
                color: #00bcac;
              }
              
              .home_goods_tags_yellow {
                background: #fff3e7;
                color: #ff7f23;
              }
              
              .home_goods_tags_purple {
                background: #fde7ff;
                color: #ff3ad8;
              }
              
              .home_goods_tags_blue {
                background: #e7f1ff;
                color: #1678ff;
              }
            }

            .home_goods_warn {
              font-size: 22rpx;
              color: #ff4d4f;
              background: #fff2f0;
              padding: 4rpx 12rpx;
              border-radius: 4rpx;
              display: inline-block;
            }
          }
        }

        .home_goods_bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20rpx;
          border-top: 1rpx solid #f0f0f0;
          
          .home_goods_btn {
            flex: 1;
            color: #666;
            font-size: 28rpx;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16rpx 0;
            transition: all 0.3s ease;
            border-radius: 8rpx;
            
            &:hover {
              background: #f5f5f5;
              color: #333;
            }
          }
          
          .home_goods_btn_shu {
            position: relative;
            
            &::before {
              content: "";
              width: 1rpx;
              height: 60%;
              background: #e0e0e0;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          
          .home_goods_btn_to {
            color: #1678ff;
            font-weight: 600;
            
            &:hover {
              background: rgba(22, 120, 255, 0.1);
              color: #1678ff;
            }
          }
        }
      }
    }
  }
}

.country_page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx;
  background-color: #fff;
  width: 600rpx;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 50rpx rgba(0, 0, 0, 0.2);
  
  .country_title {
    font-size: 32rpx;
    font-weight: 600;
    color: #3A4964;
    margin-bottom: 24rpx;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 60rpx;
      height: 4rpx;
      background: linear-gradient(90deg, #1678ff 0%, #00a8ff 100%);
      border-radius: 2rpx;
    }
  }

  .country_content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    
    .tags_row {
      padding: 12rpx 24rpx;
      margin: 0 20rpx 20rpx 0;
      background: #f5f5f5;
      border-radius: 30rpx;
      font-size: 24rpx;
      color: #333;
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        background: #e0e9ff;
        color: #1678ff;
      }
      
      &.active {
        background: #1678ff;
        color: #fff;
        font-weight: 500;
        box-shadow: 0 4rpx 12rpx rgba(22, 120, 255, 0.3);
      }
    }
  }
}
</style>
