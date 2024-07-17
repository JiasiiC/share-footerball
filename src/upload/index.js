const app = getApp()
class UploadFile {
	constructor(domin) {
		this.domin = domin
	}
	upload(url, name, filePath, formData) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: `${this.domin}${url}`,
				name,
				filePath,
				formData,
				header: {
					'Authorization': `Bearer ${app.globalData.token}`
				},
				success(res) {
					resolve(JSON.parse(res.data))
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
	uploadAvatar(filePath, formData) {
		return this.upload('/upload/avatar', 'avatar', filePath, formData)
	}
}

export default upload = new UploadFile('http://localhost:9000')