import {
	request
} from '../request/index.js'
export default {
	getUserInfo(data) {
		return request.get('/getUserInfo', data)
	}
}