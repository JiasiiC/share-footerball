import {
	request
} from '../request/index.js'
export default {
	orderCreate(data) {
		return request.post('/order/create', data)
	},
	orderFinish(data) {
		return request.post('/order/finish', data)
	},
	orderList() {
		return request.post('/order/list')
	}
}