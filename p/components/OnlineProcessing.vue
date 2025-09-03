<template>
	<view>
		<uni-popup ref="orderPopup" type="bottom" :animation="true" @change="popupChange">
			<view class="OnlineProcessing">
				<view class="OnlineProcessing_top">
					<view class="OnlineProcessing_name">
						{{ goodsData.title }}
					</view>

				</view>
				<view class="OnlineProcessing_label">
					实名信息
				</view>
				<view class="OnlineProcessing_form">
					<view class="OnlineProcessing_form_col">
						<view class="OnlineProcessing_form_text">
							姓名：
						</view>
						<view class="OnlineProcessing_form_value">
							<input class="OnlineProcessing_form_input" placeholder="请输入联系姓名" type="text"
								v-model="form.fullname" />
						</view>
					</view>
					<view class="OnlineProcessing_form_col">
						<view class="OnlineProcessing_form_text">
							联系电话：
						</view>
						<view class="OnlineProcessing_form_value">
							<input class="OnlineProcessing_form_input" placeholder="请输入联系电话" type="number"
								v-model="form.telephone" />
						</view>
					</view>
					<view class="OnlineProcessing_form_col">
						<view class="OnlineProcessing_form_text">
							身份证号：
						</view>
						<view class="OnlineProcessing_form_value">
							<input class="OnlineProcessing_form_input" placeholder="请输入身份证号" type="text"
								v-model="form.idCard" />
						</view>
					</view>
				</view>
				<view class="OnlineProcessing_label">
					填写配送地址
				</view>
				<view class="OnlineProcessing_form">
					<view class="OnlineProcessing_form_col">
						<view class="OnlineProcessing_form_text">
							所在城市：
						</view>
						<view class="OnlineProcessing_form_value">
							<LiuChooseAddress v-if="cityList.length" :cityList="cityList" @change='chooseSuccess'
								ref="chooseAddress"
								:defaultValue="areaStr">
							</LiuChooseAddress>
						</view>
					</view>
					<view class="OnlineProcessing_form_col">
						<view class="OnlineProcessing_form_text">
							详细地址：
						</view>
						<view class="OnlineProcessing_form_value">
							<input class="OnlineProcessing_form_input" placeholder="请输入详细地址" type="text"
								v-model="form.address" />
						</view>
					</view>
					<!-- <view class="OnlineProcessing_form_col">
						<view class="OnlineProcessing_form_text">
							备注：
						</view>
						<view class="OnlineProcessing_form_value">
							<input class="OnlineProcessing_form_input" placeholder="备注信息" type="text"
								v-model="form.remarks" />
						</view>
					</view> -->
				</view>
				<template v-if="supportChooseNumber">
					<view class="OnlineProcessing_label">
						自助选号
					</view>
					<view class="OnlineProcessing_form">
						<view v-show="form.number != ''">
							<view class="OnlineProcessing_form_col" @click="form.number = ''">
								<view class="OnlineProcessing_form_text">
									选择号码：
								</view>
								<view class="OnlineProcessing_form_value">
									<input class="OnlineProcessing_form_input" type="text" v-model="form.number" />
								</view>
							</view>
						</view>
						<view v-show="form.number == ''">
							<view>
								<uni-search-bar v-model="searchValue" @confirm="searchBefore()" placeholder="生日、幸运数字等"></uni-search-bar>
							</view>
							<view class="search-group">
								<view class="mini-btn" @click="copyNumberList()">复制号码</view>
								<view :class="['mini-btn', {'active': searchCondition == 1}]" @click="setCondition(1)">靓号</view>
								<view :class="['mini-btn', {'active': searchCondition == 2}]" @click="setCondition(2)">不带4</view>
								<view :class="['mini-btn', {'active': searchCondition == 3}]" @click="setCondition(3)">不带7</view>
								<view :class="['mini-btn', {'active': searchCondition == 4}]" @click="setCondition(4)">优质号</view>
							</view>
							<view class="number-wrapper">
								<view v-if="numberList.length" class="number-list">
									<template v-for="(item, index) in numberList" :key="index">
										<view class="number-item" @click="selectNumber(item.originNumber)">
											<!--<text class="number-text" v-html="item.renderNumber"></text>-->
											<text class="number-text">
												<text v-if="item.preNumber">{{ item.preNumber }}</text>
												<text v-if="item.hotNumber" class="red">{{ item.hotNumber }}</text>
												<text v-if="item.postNumber">{{ item.postNumber }}</text>
												<text v-if="item.number">{{ item.number }}</text>
											</text>
											<text class="number-place">{{ numberPlace }}</text>
										</view>
									</template>
								</view>
								<view v-else-if="isSearch" class="number-loading">
                                    <view>正在加载，请稍后...</view>
                                </view>
								<view v-else-if="showNumberEmpty" class="number-empty">抱歉没有匹配的号码，请点击换一批重新搜索</view>
								<view v-show="showResetNumber" class="number-update">
									<button type="default" size="mini" style="color: #323233;" @click="searchBefore()">换一批</button>
								</view>
							</view>
						</view>
					</view>
				</template>
				<template v-if="needUpfile">
					<view class="OnlineProcessing_label">
						证件上传
					</view>
					<view class="OnlineProcessing_form">
						<view class="form_row">
							<view @click="openChooseImage('file1')" class="form_col">
								<image v-if="form.file1" :src="tmpfile1" model="aspectFill" style="width: 100%;max-height: 200rpx;"></image>
								<uni-icons v-else type="plusempty" size="50" color="#cccccc"></uni-icons>
							</view>
							<view class="form_col">
								<image :src="staticFace" mode="widthFix" style="width: 100%;"/>
							</view>
						</view>
						<view class="upload_tip"> 证件四角边缘留空隙，不要有反光，ps </view>
						<view class="form_row">
							<view @click="openChooseImage('file2')" class="form_col">
								<image v-if="form.file2" :src="tmpfile2" model="aspectFill" style="width: 100%;max-height:200rpx"></image>
								<uni-icons v-else type="plusempty" size="50" color="#cccccc"></uni-icons>
							</view>
							<view class="form_col">
								<image :src="staticBack" mode="widthFix" style="width: 100%;"/>
							</view>
						</view>
						<view class="upload_tip"> 证件四角边缘留空隙，照片清晰，不要有反光，ps </view>
						<view class="form_row">
							<view span="6" @click="openChooseImage('file3')" class="form_col">
								<image v-if="form.file3" :src="tmpfile3" model="aspectFill" style="width: 100%;max-height: 200rpx;"></image>
								<uni-icons v-else type="plusempty" size="50" color="#cccccc"></uni-icons>
							</view>
							<view class="form_col">
								<image :src="staticHead" mode="widthFix" style="width: 100%;"/>
							</view>
						</view>
						<view class="upload_tip"> 胸部以上露出双肩，现场拍照片清晰，不要佩戴眼睛，不要传证件照，一寸照 </view>
					</view>
				</template>
				<view class="OnlineProcessing_agreement">
					<checkbox-group @change="checkboxChange" style="display:inline-block;">
						<label>
							<checkbox class="OnlineProcessing_agreement_che" value="agreement"></checkbox>
							<text>阅读并同意</text>
						</label>
					</checkbox-group>
					<template v-for="(item, index) in protocolsList" :key="index">
						<text class="protocol-item" @click="onShowProtocol(item)">《{{ item.name }}》</text>
					</template>
				</view>
				<button type="primary" class="OnlineProcessing_btn" @click="submitBefore" :disabled="loading">
					{{ loading ? '提交中...' : '提交信息' }}
				</button>
			</view>
		</uni-popup>
		<uni-popup ref="protocolPopup" type="bottom">
			<view class="protocol-page" v-html="currentProtocol"></view>
		</uni-popup>
	</view>
</template>

<script>
import {
	mobile,
	empty,
	idCard
} from '@/uni_modules/uv-ui-tools/libs/function/test.js';
import LiuChooseAddress from '@/components/LiuChooseAddress/LiuChooseAddress'
const apiList = {
	getProtocol: '/v1/shopData/h5/getProtocolByOperators', // 获取协议
	orderSubmit: 'https://api.nnkj77.com/webapp/api/add', // 提交订单
	getNumbers: 'https://api.nnkj77.com/channel/DownFun/SelectNumber', // 获取号码
	getAreaListForUni: "/v1/shopData/h5/getAreaListForUni",
	mencodeUpload: "https://api.nnkj77.com/webapp/api/mencode_upload"
}
export default {
	name: "OnlineProcessing",
	components: {
		LiuChooseAddress
	},
	props: {
		goodsData: Object
	},
	data() {
		return {
			httpHeader: 'https://api.nnkj77.com',
			needUpfile: false, //是否需要上传图片
			needCaptcha: false, //是否需要验证码
			supportChooseNumber: false, //是否支持选择号码
			showResetNumber: false, //是否显示重置号码按钮
			form: {
				fullname: '',
				idCard: '',
				telephone: '',
				number: '',
				province: '',
				city: '',
				country: '',
				address: '',
				remarks: '',
				file1: '',
				file2: '',
				file3: '',
				captcha: ''
			},
			disableArea: '', //禁发地区 接接口改null 组件初始化的时候过滤的来的
			loading: false,
			checkedList: [], // 存储选中的值
			protocolsList: [], //协议信息
			currentProtocol: '', //当前协议信息
			cityList: [],
			searchValue: '',
			numberList: [],
			curAddress: {
				province: '',
				city: '',
			},
			searchCondition: '',
			isSearch: false, //是否正在搜索
			showNumberEmpty: false, //是否显示没有号码
			numberPlace: '', //号码归属地
			highNumberRule: ['11', '22', '33', '44', '55', '66', '77', '88', '99', '00', '123', '234', '345', '456', '567', '678', '789', '012', '987', '876', '765', '654', '543', '432', '321', '1314', '520'],
			goodNumberRule: ['1234', '2345', '3456', '4567', '5678', '6789', '7890', '0987', '9876', '8765', '7654', '6543', '5432', '4321', '3210',
				'111', '222', '333', '444', '555', '666', '777', '888', '999', '000',
				'0011', '0022', '0033', '0044', '0055', '0066', '0077', '0088', '0099',
				'1100', '1122', '1133', '1144', '1155', '1166', '1177', '1188', '1199',
				'2200', '2211', '2233', '2244', '2255', '2266', '2277', '2288', '2299',
				'3300', '3311', '3322', '3344', '3355', '3366', '3377', '3388', '3399',
				'4400', '4411', '4422', '4433', '4455', '4466', '4477', '4488', '4499',
				'5500', '5511', '5522', '5533', '5544', '5566', '5577', '5588', '5599',
				'6600', '6611', '6622', '6633', '6644', '6655', '6677', '6688', '6699',
				'7700', '7711', '7722', '7733', '7744', '7755', '7766', '7788', '7799',
				'8800', '8811', '8822', '8833', '8844', '8855', '8866', '8877', '8899',
				'9900', '9911', '9922', '9933', '9944', '9955', '9966', '9977', '9988',
				'0101', '0202', '0303', '0404', '0505', '0606', '0707', '0808', '0909',
				'1010', '1212', '1313', '1414', '1515', '1616', '1717', '1818', '1919',
				'2020', '2121', '2323', '2424', '2525', '2626', '2727', '2828', '2929',
				'3030', '3131', '3232', '3434', '3535', '3636', '3737', '3838', '3939',
				'4040', '4141', '4242', '4343', '4545', '4646', '4747', '4848', '4949',
				'5050', '5151', '5252', '5353', '5454', '5656', '5757', '5858', '5959',
				'6060', '6161', '6262', '6363', '6464', '6565', '6767', '6868', '6969',
				'7070', '7171', '7272', '7373', '7474', '7575', '7676', '7878', '7979',
				'8080', '8181', '8282', '8383', '8484', '8585', '8686', '8787', '8989',
				'9090', '9191', '9292', '9393', '9494', '9595', '9696', '9797', '9898',
				'012', '123', '234', '345', '456', '567', '678', '789', '890',
				'098', '987', '876', '765', '654', '543', '432', '321', '210'
			],
			staticFace: uni.ossUrl + '/face.jpg',
			staticBack: uni.ossUrl + '/back.jpg',
			staticHead: uni.ossUrl + '/head.jpg',
			tmpfile1: '', //临时文件1路径
			tmpfile2: '', //临时文件2路径
			tmpfile3: '', //临时文件3路径
		}
	},
	computed: {
		areaStr() {
			if (this.form.province == '' || this.form.city == '' || this.form.country == '') {
				return '请选择省市区';
			}
			return `${this.form.province} / ${this.form.city} / ${this.form.country}`;
		}
	},
	onLoad(row) { },
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.needUpfile = this.goodsData.isupfile == 1 ? true : false; //是否需要上传图片
			this.supportChooseNumber = this.goodsData.change_number == 0 ? false : true; // 0|1|2
			this.needCaptcha = this.goodsData.needCaptcha == 1 ? true : false; //是否需要验证码

			Promise.all([this.setProtocol(), this.initAreaList(), this.setLoacation()]).then(() => {
				this.nextApi();
			});
		},
		checkboxChange(e) {
			this.checkedList = e.detail.value;
		},
		openChooseImage(key) {
			let self = this
			const action = apiList.mencodeUpload + '?shopid=' + self.goodsData.id
			// #ifdef MP-WEIXIN
			uni.chooseMedia({
				count: 1,
				mediaType: ['image'],
				success: (res) => {
				const tempFilePath = res.tempFiles[0].tempFilePath
				uni.uploadFile({
					url: action,
					filePath: tempFilePath,
					name: 'file',
					success: (uploadFileRes) => {
					const { code, data } = JSON.parse(uploadFileRes.data)
					if (code == 200) {
						const { url, alt } = data
						self.form[key] = url
						self[`tmp${key}`] = tempFilePath
					} else {
						console.log('上传失败')
					}
					},
				})
				},
				fail: (err) => {
				console.error('uni.chooseMedia err->', err)
				},
			})
			// #endif
			// #ifndef MP-WEIXIN
			uni.chooseImage({
				count: 1,
				sourceType: ['album'],
				success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths
				uni.uploadFile({
					url: action,
					filePath: tempFilePaths[0],
					name: 'file',
					success: (uploadFileRes) => {
					const { code, data } = JSON.parse(uploadFileRes.data)
					if (code == 200) {
						const { url, alt } = data
						self.form[key] = url
						self[`tmp${key}`] = tempFilePaths[0]
					} else {
						console.log('上传失败')
					}
					},
				})
				},
			})
			// #endif
		},
		copyNumberList() {
			const list = this.numberList.map(item => {
				return item.originNumber;
			})
			uni.setClipboardData({
				data: list.join(','),
				success: () => {
					uni.showToast({
						title: '号码已复制',
						icon: 'none'
					});
				}
			});
		},
		setCondition(index) {
			// 重复点击代表取消，否则代表选中
			if (this.searchCondition == index) {
				this.searchCondition = '';
			} else {
				this.searchCondition = index;
			}
			this.searchValue = '';
			this.searchBefore();
		},
		async nextApi() {
			await this.setProvince()
			await this.createPlace();
		},
		// 获取当前地址
		async setLoacation() {
			const self = this;
			const res = await this.$http.get('https://api.v1.nnkj77.com/lcsx/api/v1/shopData/index/getLoacation')
			self.curAddress.province = res.data.pname;
			self.curAddress.city = res.data.name;
			return res;
		},
		onShowProtocol(item) {
			this.currentProtocol = item.text;
			this.$refs.protocolPopup.open();
		},
		async initAreaList() {
			const url = await apiList.getAreaListForUni;
			return this.$http.get(url, { secretStr: this.goodsData.shopId }).then(res => {
				this.cityList = res.data;
			})
		},
		// 根据当前地址选取一个可用的省市区
		setProvince() {
			const self = this;
			// 判断是否存在当前地址
			if (self.curAddress.province == '' && self.curAddress.city == '') {
				// 默认选择第一个省第一个市第一个区
				self.form.province = self.cityList[0].label;
				self.form.city = self.cityList[0].children[0].label;
				self.form.country = self.cityList[0].children[0].children[0].label;
				self.searchBefore();
				return;
			}

			// 遍历地址列表，看看当前省是否存在于地址中
			self.cityList.map(p => {
				// 查看item.label是否等于当前地址的省
					if (p.label.includes(self.curAddress.province)) {
					// 存在，则将item.value赋给province
					self.form.province = p.label
					// 遍历item.children，看看当前地址的市是否存在于item.children中
					p.children.map(c => {
						if (c.label.includes(self.curAddress.city)) {
							// 存在，则将item.value赋给city
							self.form.city = c.label
							self.form.country = c.children[0].label
							self.searchBefore()
						}
					})
				}
			})
			// 如果没有找到，则默认选择第一个省第一个市第一个区
			if (self.form.province == '' || self.form.city == '' || self.form.country == '') {
				self.form.province = self.cityList[0].label;
				self.form.city = self.cityList[0].children[0].label;
				self.form.country = self.cityList[0].children[0].children[0].label;
			}
			self.searchBefore()
		},
		searchBefore() {
			if (this.supportChooseNumber) {
				this.onSearch();
			}
		},
		onSearch() {
			const self = this;
			if (empty(self.form.province) || empty(self.form.city)) {
				self.showToast('请先选择省市区');
				return;
			}
			self.getNumberList()
		},
		genParams() {
			const self = this;
			// 对省字符作修正
			let provinceStr = this.form.province;
			const rule = ['省','市','维吾尔', '壮族', '回族', '自治区'];
			rule.forEach(item => {
				const isExit = provinceStr.includes(item);
				if (isExit) {
					provinceStr = provinceStr.replace(item, '');
				}
			})

			const params = {
				id: self.goodsData.shopId, // 店铺id
				province: provinceStr, // 省
				city: self.form.city, // 市
				searchValue: self.searchValue, // 搜索内容
			}

			return params;
		},
		getNumberList() {
			const self = this;
			self.numberList = [];
			self.form.number = '';
			self.isSearch = true;
			self.showNumberEmpty = false;

			const params = self.genParams();
			const url = apiList.getNumbers;
			self.$http.get(url, params).then(res => {
				const list = self.filterNumberList(res.list);
				if (list.length == 0) {
					self.showNumberEmpty = true;
				} else {
					// 数据预渲染处理
					self.renderNumberList(list);
				}
				self.showResetNumber = true;
			}).catch(function() {
				self.showToast('网络错误，请稍后重试');
			}).finally(() => {
				self.isSearch = false;
			})
		},
		filterNumberList(list) {
			let result = [];
			if (this.searchCondition) {
				if (this.searchCondition == 2) {
					result = this.excludeNumberList(list, 4);
				} else if (this.searchCondition == 3) {
					result = this.excludeNumberList(list, 7);
				} else if (this.searchCondition == 4) {
					result = this.includeNumberList(list, this.highNumberRule)
				} else if (this.searchCondition == 1) {
					result = this.includeNumberList(list, this.goodNumberRule)
				}
			} else if (this.searchValue) {
				result = this.includeNumberList(list, [this.searchValue])
			} else {
				result = list;
			}
			return result.slice(0, 10);
		},
		excludeNumberList(list = [], num = '') {
			const numberList = list.filter(item => {
				return String(item).includes(num) === false
			})
			return numberList;
		},
		includeNumberList(list = [], numList = []) {
			const numberList = [];
			list.forEach(item => {
				numList.forEach(num => {
					if (String(item).includes(num)) {
						numberList.push({
							number: item,
							goodNum: num
						})
					}
				})
			})
			return numberList;
		},
		renderNumberList(list) {
			const self = this;
			let tmpList = [];
			if (self.searchValue) {
				tmpList = list.map(item => {
					const number = String(item.number);
					const hotNumber = self.searchValue; // 匹配的号码
					const preNumber = number.slice(0, number.indexOf(hotNumber)); // 前号码
					const postNumber = number.slice(number.indexOf(hotNumber) + hotNumber.length); // 后号码
					return {originNumber: item.number, preNumber, postNumber, hotNumber, number: ''};
				})
			} else if (self.searchCondition == 2 || self.searchCondition == 3) {
				tmpList = list.map(item => {
					return {
						originNumber: item,
						preNumber: '',
						postNumber: '',
						hotNumber: '',
						number: item
					}
				});
			} else if (self.searchCondition == 1 || self.searchCondition == 4) {
				tmpList = list.map(item => {
					const number = String(item.number);
					const hotNumber = item.goodNum; // 匹配的号码
					const preNumber = number.slice(0, number.indexOf(hotNumber)); // 前号码
					const postNumber = number.slice(number.indexOf(hotNumber) + hotNumber.length); // 后号码
					return {originNumber: item.number, preNumber, postNumber, hotNumber, number: ''};
				})
			} else {
				tmpList = list.map(item => {
					return {
						originNumber: item,
						preNumber: '',
						postNumber: '',
						hotNumber: '',
						number: item
					}
				});
			}
			self.numberList = tmpList;
		},
		// 创建号码归属地
		createPlace() {
			const self = this;
			const operator = self.goodsData.operator; // 运营商
			if (operator == '') {
				return '';
			}
			// 1=移动 2=电信 3=联通 4=虚拟 5=广电
			const operatorMap = {1: '移动', 2: '电信', 3: '联通', 4: '虚拟', 5: '广电'};
			const operatorText = operatorMap[operator];
			let place = '';
			if (self.goodsData.city) {
				place = self.goodsData.city + operatorText
			} else if (self.goodsData.province == '全国' || self.goodsData.province == '') {
				const city = this.form.city.replace('市', '');
				place = city + operatorText;
			} else if (self.goodsData.province) {
				place = self.goodsData.province + operatorText
			}
			// 还有一个随机
			self.numberPlace = place;
		},
		async setProtocol() {
			const self = this;
			let operator = self.goodsData.operator; // 运营商
			const url = apiList.getProtocol;
			const res = await self.$http.get(url, {
				operator: operator
			});
			self.protocolsList = res.data;
			return res;
		},
		chooseSuccess(e) {
			console.log('所选择的地址信息:', e.value[0].label + e.value[1].label + e.value[2].label)
			this.form.province = e.value[0].label
			this.form.city = e.value[1].label
			this.form.country = e.value[2].label
		},
		popupChange(value) {
			if (!value.show) {
				this.cancel()
			}
		},
		cancel() {
			this.$emit('cancel')
			if (this.isTab) {
				uni.showTabBar()
			}
		},
		open() {
			this.$refs.orderPopup.open()
		},
		submitBefore() {
			if (this.loading) return;
			this.loading = true;
			this.submit();
		},
		async submit() {
			const self = this;
			if (empty(self.form.fullname)) {
				self.showToast("请输入姓名");
				return false;
			}

			if (mobile(self.form.telephone) == false) {
				self.showToast("请输入正确的联系电话");
				return false;
			}

			if (idCard(self.form.idCard) == false) {
				self.showToast("请输入正确的身份证号码");
				return false;
			}

			if (empty(self.form.province) || empty(self.form.city) || empty(self.form.country)) {
				self.showToast("请选择省市区");
				return false;
			}

			if (empty(self.form.address)) {
				self.showToast("请输入详细地址");
				return false;
			}

			// 本身支持选号，但是没有获取到号码，可以不选号
			if (this.supportChooseNumber) {
				if (this.numberList.length == 0) {

				} else if (this.form.number === '') {
					self.showToast('请先选择办理号码');
					return false;
				}
			}

			if (self.needUpfile) {
				if (empty(self.form.file1)) {
					self.showToast("请上传身份证人像照");
					return false;
				}

				if (empty(self.form.file2)) {
					self.showToast("请上传身份证国徽照");
					return false;
				}

				if (empty(self.form.file3)) {
					self.showToast("请上传手持身份证照");
					return false;
				}
			}
			
			if (!self.checkedList.includes('agreement')) {
				self.showToast('请阅读并同意入网协议和信息保护');
				return false;
			}

			const params = {
				fromWecaht: 1, // 代表小程序下单
				shopid: self.goodsData.shopId,
				fullname: self.form.fullname,
				identification: self.form.idCard,
				telephone: self.form.telephone,
				province: self.form.province,
				city: self.form.city,
				district: self.form.country,
				address: self.form.address,
				remarks: self.form.remarks,
				numberID: self.form.number,
				ag: 1,
				ad_info: '',
			}

			if (self.form.number) {
				params.numberIs = 1;
			}
			if (self.needUpfile) {
				params.file1 = self.form.file1;
				params.file2 = self.form.file2;
				params.file3 = self.form.file3;
			}
			const url = apiList.orderSubmit;
			const res = await self.$http.orderAdd(url, params);
			self.loading = false;
			self.showToast(res.msg);
			if (res.code == 8) {
				setTimeout(() => {
					uni.redirectTo({
						url: '/p/o?enuid=' + this.$MyLcsxUid() + "&iphone=" + self.form.telephone
					})
				}, 1000)
			} else if (res.code == 9) {
				const url = "https://api.nnkj77.com/webapp/epay?orderid=" + res.order
				uni.navigateTo({
					url: '/p/webview/webview?url=' + encodeURIComponent(url)
				})
			}
		},
		showToast(msg) {
			this.loading = false;
			uni.showToast({
				title: msg,
				icon: "none",
				duration: 1000,
			});
		},
		selectNumber(value) {
			this.form.number = value;
		}
	}
}
</script>
<style lang="scss" scoped>
.OnlineProcessing {
	padding: 40rpx 20rpx;
	background: #FFFFFF;
	border-radius: 30rpx 30rpx 0rpx 0rpx;
	max-height: 1200rpx;
	max-width: 750px;
	margin: 0 auto;
	overflow-y: auto;
	box-sizing: border-box;

	.OnlineProcessing_name {
		width: 657rpx;
		margin: 0 auto;
		font-weight: 500;
		font-size: 34rpx;
		color: #333333;
		line-height: 48rpx;
		text-align: center;
	}

	.OnlineProcessing_label {
		width: 100%;
		height: 64rpx;
		background: #DDEDFF;
		box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(1, 54, 128, 0.2);
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		font-size: 28rpx;
		color: #007BFF;
		margin: 30rpx 0;
	}

	.OnlineProcessing_form {
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(1, 54, 128, 0.2);
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		.form_row {
			display: flex;
			height: 320rpx;
			border-bottom: 1rpx #DEDEDE solid;
			.form_col {
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.OnlineProcessing_form_col {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx #DEDEDE solid;
			&.flex-col {
				flex-direction: column;
			}
			.flex {
				display: flex;
			}
			&:last-child {
				border-bottom: 0rpx;
			}

			.OnlineProcessing_form_text {
				width: 160rpx;
				font-size: 28rpx;
				color: #333333;
			}

			.OnlineProcessing_form_value {
				flex: 1;
				height: 100rpx;
			}

			.OnlineProcessing_form_input {
				flex: 1;
				height: 100rpx;
				text-align: right;

			}

			.card_left, .card_right {
				max-width: 300rpx;
				max-height: 300rpx;
				box-sizing: border-box;
				padding: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.search-group {
			color: #333333;
			display: flex;
			align-items: center;
			.mini-btn {
				box-sizing: border-box;
				padding: 8rpx 16rpx;
				border: 1px solid #E5E5E5;
				border-radius: 8rpx;
				font-size: 24rpx;
				color: #323233;
				margin-right: 10rpx;
				&.active {
					background-color: #3976ff;
					color: #fff;
				}
			}
		}
		.number-wrapper {
			color: #333333;
			.number-list {
				padding: 10px 0;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.number-item {
					display: flex;
					flex-direction: column;
					width: 47%;
					box-sizing: border-box;
					padding: 10px 4px;
					text-align: center;
					margin: 3px 0;
					border: 1px solid #dfdfdf;
					border-radius: 6px;
					cursor: pointer;
					.number-text {
						font-size: 32rpx;
						font-weight: 600;
						.red {
							color: #ff0000;
						}
					}
					.number-place {
						font-size: 20rpx;
						color: #ccc;
					}
				}
			}
			.number-loading {
				display: block;
				width: 100%;
				text-align: center;
				padding-top: 20rpx;
			}
			.number-empty {
				display: block;
				width: 100%;
				text-align: center;
			}
			.number-update {
				display: flex;
				justify-content: center;
				margin-top: 20rpx;
				font-size: 28rpx;
			}
		}
		.upload_tip {
			width: 100%;
			padding: 10px 0;
			font-size: 12px;
			color: #333;
		}
	}

	.OnlineProcessing_agreement {
		margin-top: 50rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: #333333;

		.OnlineProcessing_agreement_che {
			transform: scale(0.8);
		}

		.protocol-item {
			color: #007BFF;
			cursor: pointer;
		}
	}

	.OnlineProcessing_btn {
		color: #ffffff;
		background-color: #007aff;
		box-sizing: border-box;
		margin: 40rpx 20px 0 20px;
	}

	::v-deep .uni-input-input {
		font-size: 28rpx;
		color: #333333;
	}

	::v-deep .uni-input-placeholder {
		font-size: 28rpx;
	}

	::v-deep .uni-label-pointer {
		display: inline-flex;
		align-items: center;
	}
}

.protocol-page {
	max-height: 1400rpx;
	overflow-y: auto;
	padding: 48rpx;
	background: #FFFFFF;
	box-sizing: border-box;
}
</style>