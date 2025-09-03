<template>
	<view class="goodsDetails">
		<view class="goodsDetails_banner">

			<swiper class="goodsDetails_banner_swiper" :show-scrollbar="false" circular :indicator-dots="false"
				:autoplay="true" :interval="2000" :duration="500">
				<swiper-item class="goodsDetails_banner_swiper_item">
					<image class="goodsDetails_banner_swiper_img" :src="goodsData.graph" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="goodsDetails_info">
			<view class="goodsDetails_info_name">
				{{ goodsData.title }}
			</view>
			<view class="goodsDetails_info_text">
				<image class="goodsDetails_info_text_icon" src="/static/icon/secure_icon_h.png" mode=""></image>
				官方保证，售后无忧
			</view>
			<view class="goodsDetails_info_tags">
				<view v-for="(item, index) in goodsData.tags" :key="index" class="goodsDetails_info_tags_row"
					:class="getTagBg(index)">
					{{ item }}
				</view>
			</view>
			<view class="goodsDetails_info_careful">
				注意：不发新疆、西藏
			</view>
			<view class="goodsDetails_info_col">
				<view class="goodsDetails_info_col_row">
					<view class="goodsDetails_info_col_text">
						通用流量
						<image src="/static/icon/lightning_icon.png" mode=""></image>
					</view>
					<view class="goodsDetails_info_col_value">
						{{ goodsData.traffic }}
					</view>
				</view>
				<view class="goodsDetails_info_col_row">
					<view class="goodsDetails_info_col_text">
						定向流量
						<image src="/static/icon/signal_icon.png" mode=""></image>
					</view>
					<view class="goodsDetails_info_col_value">
						{{ goodsData.fixed }}
					</view>
				</view>
				<view class="goodsDetails_info_col_row">
					<view class="goodsDetails_info_col_text">
						通话时长
						<image src="/static/icon/phone-fill.png" mode=""></image>
					</view>
					<view class="goodsDetails_info_col_value">
						{{ goodsData.minute }}
					</view>
				</view>
			</view>
			<view class="goodsDetails_info_btns">
				<view class="goodsDetails_info_btns_row left" @click="gotoSearchCard">
					<uni-icons type="search" size="20" color="#fff"></uni-icons>
					<text class="ml10">查名下卡</text>
				</view>
				<view class="goodsDetails_info_btns_row right" @click="gotoShare(goodsData.shopId)">
					<uni-icons type="redo" size="20" color="#fff"></uni-icons>
					<text class="ml10">分享</text>
				</view>
			</view>
			<view class="goodsDetail_info_albums">
				<template v-for="(item, index) in goodsData.albums" :key="index">
					<image :src="item" mode="widthFix"></image>
				</template>
			</view>
		</view>
		<!--<uv-tabs 
			:list="tabList"
			@click="tabClick"
			:activeStyle="{
				color: '#333',
				fontSize: '32rpx',
			}"
			:inactiveStyle="{
				color: '#333333',
				fontSize: '32rpx',
			}"
			:scrollable="false"
			:current="current"
			style="width: 100%"
			lineWidth="28"
			lineColor="#007BFF"
		>
		</uv-tabs>-->
		<!-- 属性 -->
		<!--<view class="goodsDetails_attr" v-if="current==1">
			<view class="goodsDetails_attr_main">
				<view class="goodsDetails_attr_plate">
					<view class="goodsDetails_attr_block">
						<view class="">
							原套餐29元30G定向，首月按天折算；
						</view>
						<view class="">
							套餐外及其他业务资费，国内语音包拨打0.1元/分钟，短信 0.1元/条，国内流量5元/GB，赠送来显。
						</view>
					</view>

				</view>
				<view class="goodsDetails_attr_plate">
					<view class="goodsDetails_attr_block">
						<view class="goodsDetails_attr_block_name">
							优惠详情
						</view>
						<view class="">
							激活当月任意渠道一次性首充100元，享受一下优惠
						</view>
						<view class="">
							1、首月赠送30元话费，激活当月有效，次月不结转。
						</view>
						<view class="">
							2、状态正常48小时内添加50G通用流量(24个月)，次月5日内叠加50G通用(24个月)+105G通用流量+100分通话，到期根据运营商政策续约；
						</view>
						<view class="">
							3、综上所述：首月免费，流量80G按天折算，2-24个月29元235G全国流量+100分钟通话，到期根据运营商政策续约。
						</view>
					</view>

				</view>
				<view class="goodsDetails_attr_plate">
					<view class="goodsDetails_attr_block">
						<view class="goodsDetails_attr_block_name">
							更多信息
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/fast_mail.png" mode=""></image>
								快递方式
							</view>
							<view class="goodsDetails_attr_col_value">
								京东快递
							</view>
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/activation_icon.png" mode=""></image>
								激活方式
							</view>
							<view class="goodsDetails_attr_col_value">
								快递激活
							</view>
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/link_icon.png" mode=""></image>
								充值链接
							</view>
							<view class="goodsDetails_attr_col_value">
								点击复制链接
							</view>
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/user_icon.png" mode=""></image>
								办卡年龄
							</view>
							<view class="goodsDetails_attr_col_value">
								18-60
							</view>
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/contract_icon.png" mode=""></image>
								合约期
							</view>
							<view class="goodsDetails_attr_col_value">
								24个月
							</view>
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/location_icon.png" mode=""></image>
								不发货地区
							</view>
							<view class="goodsDetails_attr_col_value">
								只发山东
							</view>
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/range_icon.png" mode=""></image>
								定向范围
							</view>
							<view class="goodsDetails_attr_col_value">
								无
							</view>
						</view>
						<view class="goodsDetails_attr_col">
							<view class="goodsDetails_attr_col_name">
								<image src="/static/icon/process_icon.png" mode=""></image>
								激活流程图
							</view>
							<view class="goodsDetails_attr_col_value">
								无
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>-->
		<!-- 常见问题 -->
		<!--<view class="goodsDetails_problem" v-if="current==2">
			<view class="goodsDetails_problem_plate" v-for="(v,i) in 3" :key="i">
				<view class="goodsDetails_problem_name">
					<image src="/static/icon/name_left.png" mode=""></image>
					<text>领卡前的常见问题</text>
					<image src="/static/icon/name_right.png" mode=""></image>
				</view>
				<view class="goodsDetails_problem_block">
					<view class="goodsDetails_problem_item" v-for="(vv,ii) in 4" :key="ii">
						<view class="goodsDetails_problem_item_name">
							<view class="goodsDetails_problem_item_index">
								{{ii + 1}}
							</view>
							我们的流量卡是否是正规的流量卡呢？
						</view>
						<view class="goodsDetails_problem_item_text">
							答：快递激活就是由运营商专门指派的快递小哥带着开卡器当面给 你激活开卡，你只需要带上身份证即可；自主激活就是由顺丰、京 东、EMS快递送到你的收货地址后，您根据快递包裹里的激活流程
							图操作激活即可；每个省份运营商激活规则不同，不管哪种激活方 式都是正规实名认证的。激活方式不可指定。
						</view>
					</view>
				</view>
			</view>
		</view>-->
		<view class="goodsDetails_bottom">
			<view class="goodsDetails_bottom_left">
				<view class="goodsDetails_bottom_icon" @click="gotoHome()">
					<uv-icon size="26" name="home" color="#007BFF"></uv-icon>
					首页
				</view>
				<view class="goodsDetails_bottom_icon" @click="showKefu()">
					<uv-icon size="26" name="kefu-ermai" color="#007BFF"></uv-icon>
					客服
				</view>

				<view class="goodsDetails_bottom_icon" @click.stop="gotoOrder()">
					<uv-icon size="26" name="order" color="#007BFF"></uv-icon>
					订单
				</view>
			</view>
			<view class="goodsDetails_bottom_btn" @click="applyImmediately">
				立即办理
			</view>
		</view>
		<uni-popup ref="chat" type="center" border-radius="20rpx">
			<view class="chat-popup">
				<view class="chat-header">
					<image class="chat-avatar" :src="userall_LogoImg || '/static/default-avatar.png'"
						mode="aspectFill" />
					<view class="chat-info">
						<text class="chat-name">{{userall_Nickname || '客服专员'}}</text>
						<view class="chat-contact">
							<text class="contact-label">微信: </text>
							<text class="contact-value">{{userall_weixin || '暂无微信号'}}</text>
							<text class="contact-copy" @click="copyWechat">复制</text>
						</view>
					</view>
				</view>
				<image class="chat-qrcode" :src="weixinImg" mode="widthFix" />
				<view class="chat-tip">长按识别二维码添加客服</view>
			</view>
		</uni-popup>
		<GoodShare ref="goodShare"></GoodShare>
		<OnlineProcessing v-if="goodsData.id" ref="onlineProcessing" :goodsData="goodsData"
			@keyboardShow="handleKeyboardShow" @keyboardHide="handleKeyboardHide">
		</OnlineProcessing>
	</view>
</template>

<script>
	const apiList = {
		// 获取商品详情
		getGoodsDetails: '/v1/shopData/h5/getGoodsDetail',
		getProductPoster: "/v1/shopData/h5/getProductNewPoster",
	}
	import GoodShare from "../components/goodShare/goodShare.vue";
	import OnlineProcessing from "./components/OnlineProcessing"
	export default {
		components: {
			GoodShare,
			OnlineProcessing,
		},
		data() {
			return {
				onlineProcessing: false,
				loadData: {},
				current: 1,
				tabList: [{
					name: '商品',
				}, {
					name: '套餐属性',
				}, {
					name: '常见问题'
				}],
				goodsData: {},
				weixinImg: '',
				shopid:'',

				userall_desc: '',
				userall_weixin: '',
				userall_weixin_img: '',
				userall_Nickname: '',
				userall_LogoImg: '',


			}
		},
		onLoad(options) {
			const {
				shopid
			} = options


			if (typeof options.enuid != 'undefined') {
				uni.setStorageSync('MyLcsxUid', options.enuid);
				this.Myuid = options.enuid;
			} else {
				this.Myuid = this.$MyLcsxUid();
			}


			if (typeof options.shopid != 'undefined') {
				uni.setStorageSync('MyLcsxUid', options.shopid);
				this.Myuid = options.shopid;
			} else {
				this.Myuid = this.$MyLcsxUid();
			}

this.shopid = shopid;
			this.initGoodsData(shopid)
		},
		methods: {
			copyWechat() {
				if (!this.userall_weixin) return;

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
			handleKeyboardShow() {
				this.$refs.onlineProcessing.$el.style.bottom = '300px'; // 根据实际情况调整
			},
			handleKeyboardHide() {
				this.$refs.onlineProcessing.$el.style.bottom = '0';
			},
			gotoHome() {
				uni.navigateTo({
					url: '/p/i?enuid='+  this.$MyLcsxUid()
				})
			},
			showKefu() {
				this.$refs.chat.open();
			},
			gotoOrder() {
				
				uni.setStorageSync('shopid', this.shopid);
				
				uni.navigateTo({
					url: '/p/o?enuid='+  this.$MyLcsxUid()
				})
			},
			gotoShare(shopId) {
				this.$refs.goodShare.open(shopId)
			},
			gotoSearchCard() {
				const url = 'https://getsimnum.caict.ac.cn/m/#/'
				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: url,
					success: () => {
						uni.showToast({
							title: '链接已复制，请粘贴到浏览器打开',
							icon: 'none'
						});
					}
				})
				// #endif
				// #ifdef H5
				window.open(url)
				// #endif
			},
			getTagBg(key) {
				let bgColor = "";
				switch (key) {
					case 0:
						bgColor = "goodsDetails_info_tags_yellow";
						break;
					case 1:
						bgColor = "goodsDetails_info_tags_purple";
						break;
					case 2:
						bgColor = "goodsDetails_info_tags_blue";
						break;
					default:
						bgColor = "goodsDetails_info_tags_blue";
						break;
				}
				return bgColor;
			},
			tabClick(e) {
				let index = e.index
				if (index < 1) index = this.current
				this.current = index
			},
			applyImmediately() {
				this.$refs.onlineProcessing.open()
			},
			async initGoodsData(shopId) {
				const url = apiList.getGoodsDetails
				const res = await this.$http.get(url, {
					id: shopId
				})

				// 构造主图和详情图
				res.data.graph = `${res.data.graph}`;
				// 将album按照|分隔
				const albums = res.data.album.split('|');
				albums.forEach((item, index) => {
					// 判断空字符串
					if (item === '') return;
					albums[index] = `${item}`;
				})

				res.data.albums = albums.filter(item => item != '');
				const tags = [res.data.age, res.data.other, res.data.toll];
				this.goodsData = res.data
				this.goodsData.tags = tags.filter(item => item !== '')


/* 
				if (this.goodsData.userall_weixin_img) {
					this.weixinImg = this.goodsData.userall_weixin_img;






				} else {
					this.weixinImg = '/static/nokefu.jpg';
				} */
				this.setTitle();



				const res2 = await this.$http.get('/v1/shopData/h5/getShopUserInfo', {
					userid: this.Myuid
				});

				if (res2.data) {
					
					//userall_LogoImg
					
					this.weixinImg = this.goodsData.userall_weixin_img;
					this.weixinImg = res2.data.userall_weixin_img || this.weixinImg;
					this.userall_desc = res2.data.userall_desc || '';
					this.userall_weixin = res2.data.userall_weixin || '';
					this.userall_Nickname = res2.data.userall_Nickname || '客服专员';
					this.userall_LogoImg = res2.data.userall_LogoImg || this.userall_LogoImg;
				}

			},
			setTitle() {
				uni.setNavigationBarTitle({
					title: this.goodsData.title || '商品详情'
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.goodsDetails {
		min-height: 100vh;
		padding-bottom: 200rpx;
		background-color: #F9F9F9;

		.goodsDetails_banner {
			width: 100%;
			display: flex;
			flex-direction: row;

			.goodsDetails_banner_swiper {
				width: 100%;
				display: flex;
				height: 750rpx;
			}

			.goodsDetails_banner_swiper_item {
				width: 100%;
				height: 750rpx;
			}

			.goodsDetails_banner_swiper_img {
				width: 100%;
				border-radius: 0rpx 0rpx 20rpx 20rpx;
			}

		}

		.goodsDetails_info {
			background: linear-gradient(180deg, #FFFFFF 0%, #F4F9FF 100%);
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.2);
			margin: 30rpx 0;
			border-radius: 20rpx;
			padding: 20rpx;

			.goodsDetails_info_name {
				font-weight: 600;
				font-size: 32rpx;
				color: #333333;
			}

			.goodsDetails_info_text {
				display: flex;
				align-items: center;
				font-weight: 500;
				font-size: 28rpx;
				color: #FF7607;
				margin: 20rpx 0;

				.goodsDetails_info_text_icon {
					width: 38rpx;
					height: 38rpx;
				}
			}

			.goodsDetails_info_tags {
				display: flex;
				align-items: center;

				.goodsDetails_info_tags_row {
					padding: 4rpx 8rpx;
					background: #E7FFF8;
					box-shadow: 0rpx 0rpx 2rpx 0rpx rgba(8, 106, 98, 0.1), inset 0rpx 0rpx 4rpx 0rpx rgba(255, 255, 255, 0.2);
					border-radius: 6rpx;
					font-size: 24rpx;
					color: #00BCAC;
					margin-right: 24rpx;
					margin-bottom: 20rpx;
				}

				.goodsDetails_info_tags_yellow {
					background: #FFF3E7;
					color: #FF7F23;
				}

				.goodsDetails_info_tags_purple {
					color: #FF3AD8;
					background-color: #FDE7FF;
				}

				.goodsDetails_info_tags_blue {
					color: #1678FF;
					background-color: #E7F1FF;
				}
			}

			.goodsDetails_info_careful {
				font-weight: 500;
				font-size: 24rpx;
				color: #FF4545;
			}

			.goodsDetails_info_col {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40rpx;

				.goodsDetails_info_col_row {
					padding: 20rpx;
					background: linear-gradient(315deg, #DFEFFF 0%, #FFFFFF 80%);
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.2), inset 0rpx 0rpx 60rpx 0rpx rgba(255, 255, 255, 0.3);
					border-radius: 10rpx 10rpx 10rpx 10rpx;

					.goodsDetails_info_col_text {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						color: #666666;

						image {
							width: 36rpx;
							height: 36rpx;
							margin-left: 34rpx;
						}
					}

					.goodsDetails_info_col_value {
						font-weight: 600;
						font-size: 36rpx;
						color: #333333;
						margin-top: 16rpx;
					}
				}
			}

			.goodsDetails_info_btns {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40rpx;

				.goodsDetails_info_btns_row {
					width: 345rpx;
					height: 80rpx;
					background: #007BFF;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(1, 54, 128, 0.3), inset 0rpx 0rpx 20rpx 0rpx rgba(255, 255, 255, 0.3);
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					border-radius: 10rpx;
					font-size: 32rpx;

					&.left {
						clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
					}

					&.right {
						clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
					}

					.ml10 {
						margin-left: 10rpx;
					}
				}
			}

			.goodsDetail_info_albums {
				image {
					width: 100%;
					border-radius: 10rpx;
					margin-top: 20rpx;
				}
			}
		}

		.goodsDetails_attr {
			margin-top: 30rpx;
			width: 100%;
			background-color: #023eb8;

			.goodsDetails_attr_main {
				width: 100%;
				min-height: 800rpx;
				background-image: url('https://api.nnkj77.com/static/goods_attr_bg.png');
				background-repeat: no-repeat;
				background-size: 100% auto;
				padding: 40rpx 20rpx;
				box-sizing: border-box;

				.goodsDetails_attr_plate {
					background: rgba(255, 255, 255, 0.3);
					box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(0, 0, 0, 0.3), inset 0rpx 0rpx 10rpx 0rpx rgba(255, 255, 255, 0.4);
					border-radius: 20rpx 20rpx 20rpx 20rpx;
					padding: 10rpx;
					margin-bottom: 40rpx;

					.goodsDetails_attr_block {
						background: #FFFFFF;
						box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);
						border-radius: 20rpx 20rpx 20rpx 20rpx;
						padding: 30rpx 10rpx;
						font-size: 26rpx;
						color: #333333;
						display: flex;
						flex-direction: column;
						line-height: 46rpx;

						.goodsDetails_attr_block_name {
							width: 300rpx;
							height: 64rpx;
							background: url('/static/name_bg.png') no-repeat;
							background-size: 100% 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							font-weight: 700;
							font-size: 32rpx;
							color: #FFFFFF;
							margin: 0 auto;
							margin-top: -42rpx;
							margin-bottom: 20rpx;
						}

						.goodsDetails_attr_col {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 30rpx 10rpx;
							border-bottom: 1rpx #DEDEDE solid;

							.goodsDetails_attr_col_name {
								display: flex;
								align-items: center;
								font-size: 28rpx;
								color: #333333;

								image {
									width: 38rpx;
									height: 38rpx;
									margin-right: 6rpx;
								}
							}

							.goodsDetails_attr_col_value {
								font-weight: 500;
								font-size: 28rpx;
								color: #333333;
							}
						}
					}
				}
			}
		}

		.goodsDetails_problem {
			padding: 20rpx;

			.goodsDetails_problem_plate {
				background: #007BFF;
				border-radius: 20rpx 20rpx;
				margin-bottom: 40rpx;

				.goodsDetails_problem_name {
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 14rpx;

					text {
						margin: 0 10rpx;
						font-weight: 600;
						font-size: 34rpx;
						color: #FFFFFF;
					}

					image {
						width: 48rpx;
						height: 22rpx;
					}
				}

				.goodsDetails_problem_block {
					background: linear-gradient(180deg, #FFFFFF 49%, #EDF6FF 100%);
					box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(1, 54, 128, 0.3);
					border-radius: 16rpx 16rpx 16rpx 16rpx;
					padding: 40rpx 10rpx;

					.goodsDetails_problem_item {
						margin-bottom: 30rpx;

						.goodsDetails_problem_item_name {
							display: flex;
							align-items: center;
							font-size: 30rpx;
							color: #333333;
							font-weight: 600;
							margin-bottom: 10rpx;


							.goodsDetails_problem_item_index {
								width: 34rpx;
								height: 34rpx;
								border-radius: 1000rpx;
								background-color: #1678FF;
								color: #fff;
								font-size: 24rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-right: 10rpx;
								font-weight: 500;
							}
						}

						.goodsDetails_problem_item_text {
							font-size: 24rpx;
							color: #333333;
						}
					}
				}
			}
		}

		.goodsDetails_bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 24rpx;
			padding-bottom: 44rpx;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			max-width: 750px;
			width: 100%;
			margin: 0 auto;
			box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(0, 0, 0, 0.3);
			z-index: 2;

			.goodsDetails_bottom_left {
				display: flex;
				align-items: center;
				font-size: 24rpx;

				.goodsDetails_bottom_icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 70rpx;
					height: 80rpx;
					/* #ifdef MP-WEIXIN */
					height: 86rpx;
					font-size: 24rpx;
					padding: 0;
					line-height: 38rpx;
					background-color: #fff;
					border: 0;

					/* #endif */
					&::after {
						border: 0;
					}
				}
			}

			.goodsDetails_bottom_btn {
				flex: 1;
				margin-left: 16rpx;
				height: 80rpx;
				background-color: #007BFF;
				border-radius: 14rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 500;
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
	}

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
			padding-top: 25rpx;

			.form-btn {
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: center;
				padding-left: 10rpx;
				padding-right: 10rpx;
				font-size: 28rpx;
				color: #1678ff;
			}
		}
	}

	.chat-page {
		padding: 24px 24px 0 24px;
		text-align: center;
		background-color: #fff;
		border-radius: 20rpx;

		.chat-desc {
			width: 100%;
			padding: 5px 0;
			align-items: center;
		}
	}


	.chat-popup {
		width: 580rpx;
		padding: 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-sizing: border-box;

		.chat-header {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.chat-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				border: 2rpx solid #f5f5f5;
			}

			.chat-info {
				flex: 1;
				text-align: left;

				.chat-name {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					display: block;
					margin-bottom: 10rpx;
				}

				.chat-contact {
					display: flex;
					align-items: center;
					font-size: 26rpx;

					.contact-label {
						color: #666;
					}

					.contact-value {
						color: #007BFF;
						margin: 0 10rpx;
						max-width: 200rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.contact-copy {
						color: #fff;
						background-color: #007BFF;
						padding: 4rpx 16rpx;
						border-radius: 20rpx;
						font-size: 22rpx;
					}
				}
			}
		}

		.chat-qrcode {
			width: 400rpx;
			height: 400rpx;
			margin: 0 auto;
			display: block;
			border: 1rpx solid #f5f5f5;
		}

		.chat-tip {
			font-size: 26rpx;
			color: #999;
			margin-top: 30rpx;
			text-align: center;
		}
	}
</style>