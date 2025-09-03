<template>
	<uv-tabbar :value="value" :fixed="true" @change="onChange">
		<uv-tabbar-item text="首页" name="home">
			<template v-slot:active-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/home_a.png`"></image>
			</template>
			<template v-slot:inactive-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/home.png`"></image>
			</template>
		</uv-tabbar-item>
		<uv-tabbar-item text="订单" name="order">
			<template v-slot:active-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/order_a.png`"></image>
			</template>
			<template v-slot:inactive-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/order.png`"></image>
			</template>
		</uv-tabbar-item>
		<uv-tabbar-item text="联系客服" name="customer">
			<template v-slot:active-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/customer_a.png`"></image>
			</template>
			<template v-slot:inactive-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/customer.png`"></image>
			</template>
		</uv-tabbar-item>
		<uv-tabbar-item text="分享" name="share">
			<template v-slot:active-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/share_a.png`"></image>
			</template>
			<template v-slot:inactive-icon>
				<image class="baseTabbar_icon" :src="`${ossUrl}/icon/share.png`"></image>
			</template>
		</uv-tabbar-item>
	</uv-tabbar>

</template>

<script>
export default {
	name: "BaseTabbar",
	props: {
		value: String,

	},
	data() {
		return {
			ossUrl: uni.ossUrl
		};
	},
	methods: {
		onChange(e) {
			if (e == this.value) return
			switch (e) {
				case 'home':
					uni.navigateTo({
						url: '/p/i'
					})
					break;
				case 'order':
					uni.navigateTo({
						url: '/p/o'
					})
					break;
				case 'share':

					uni.navigateTo({
						url: '/p/share'
					})
					break;
				case 'customer': //客服
					// url = '/pages/order/order'
					return
					break;
				default:
					break;
			}


		},
	},
}
</script>

<style lang="scss">
.baseTabbar_icon {
	width: 48rpx;
	height: 48rpx;
}
</style>