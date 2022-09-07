<template>
	<view>
		<van-card :thumb-link="`/subpkg/goods-detail/goods-detail?id=${item.goods_id}`" v-for="item in goods"
			:key="item.goods_id" :price="item.goods_price|toFixed" :title="item.goods_name"
			:thumb="item.goods_small_logo||defaultPic" />
	</view>
</template>

<script>
	import {
		getgoodslist
	} from '@/api/goodlist.js'
	import
	toast
	from '@/utils/toast.js'
	export default {
		data() {
			return {
				fromdata: {
					cid: '',
					query: '',
					pagenum: 1,
					pagesize: 10
				},
				total: 0,
				goods: [],
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				loading: false
			};
		},
		methods: {
			async getgoodslist(cb) {
				this.loading = true
				const res = await getgoodslist(this.fromdata)
				this.loading = false
				// console.log(res)
				const goods = res.message.goods
				this.goods = [...this.goods, ...goods]
				this.total = res.message.goods
				cb && cb()
			},

		},

		onLoad({
			query
		}) {
			this.fromdata.query = query
			this.getgoodslist()
		},
		//监听下拉
		onPullDownRefresh() {
			this.fromdata = {
				cid: '',
				query: this.fromdata.query,
				pagenum: 1,
				pagesize: 10
			}
			this.total = 0
			this.goods = []
			this.getgoodslist(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if (this.fromdata.pagenum * this.fromdata.pagesize >= this.total) return toast('没有更多了')
			if (this.loading) return
			this.fromdata.pagenum++
			this.getgoodslist()
		}
	}
</script>

<style lang="scss">

</style>
