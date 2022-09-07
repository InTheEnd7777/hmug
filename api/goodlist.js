import fly from '@/utils/request.js'
export function getgoodslist(data) {
	return fly.get('/goods/search', data)
}
