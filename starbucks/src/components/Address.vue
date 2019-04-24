<template>
	<div class="Address animated zoomInUp">
		<top-nav title="地址管理"></top-nav>

		<van-address-list v-model="chosenAddressId" ref="addBtn" :list="addressList" @edit="editAddress" @add="addAddress" @click.native="toggleDefault" />

		<van-actionsheet v-model="show">
			<van-address-edit :area-list="area" show-set-default show-search-result show-delete show-postal save-button-text="保存地址" delete-button-text="取消" @save="save" />
		</van-actionsheet>

		<van-actionsheet v-model="editShow" :actions="actions" @select="onSelect">
		</van-actionsheet>

		<van-actionsheet v-model="EDddress">
			<van-address-edit :address-info="addressInfo" :area-list="area" ref="editBox" show-set-default show-search-result show-delete show-postal save-button-text="修改地址" delete-button-text="取消" @save="saveEdit" />
		</van-actionsheet>
	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	
	import TopNav from '../components/TopNav'

	import { AddressList, Actionsheet, AddressEdit } from 'vant';

	import area from '../data/area.js'

	import tool from '../utils/tool.js'

	export default {
		name: 'Address',

		data() {
			return {
				//上拉菜单框
				show: false,

				//全国地址信息
				area: area,

				chosenAddressId: '', //默认选择地址, 关联地址的id

				addressList: [],

				//当前用户
				userId: '',

				//判断编辑按钮是否显示
				editShow: false,

				//actions
				actions: [{
						name: '编辑地址'
					},
					{
						name: '删除地址'
					},
					{
						name: '取消'
					}
				],

				index: '',

				addressId: '',

				//当前点击的address的信息
				currentAddress: {},

				//显示编辑地址的弹出框
				EDddress: false,

				addressInfo: {
					id: '',
					name: '',
					tel: '',
					province: '',
					city: '',
					county: '',
					addressDetail: '',
					areaCode: '',
					postalCode: '',
					isDefault: '',
					userId: '',
					addressTime: '',
					editTime: ''

				}

			}
		},

		methods: {
			//编辑地址
			editAddress(item, index) {

				this.editShow = true

				this.index = index
				this.addressId = item.id

				this.currentAddress = item
//				console.log('this.currentAddress ==>', this.currentAddress)

			},

			//添加地址
			addAddress() {
				this.show = true
			},

			save(data) {
				console.log('data ==>', data)

				var addressData = localStorage.getItem('addressData')
				addressData = addressData == undefined ? [] : JSON.parse(addressData)

				//如果设置为默认地址, 需要把当前用户地址的默认值 设置为false
				if(data.isDefault && addressData.length > 0) {

					for(var i = 0; i < addressData.length; i++) {
						if(this.userId == addressData[i].userId && addressData[i].isDefault) {
							addressData[i].isDefault = false
							break
						}
					}
				}

				//生成地址id, 加盐(撒盐)
				var addressId = 'address' + new Date().getTime()
				//用户Id
				data.userId = this.userId
				//地址Id
				data.id = addressId
				//生成地址的时间
				data.addressTime = tool.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
				//地址编辑时间
				data.editTime = ''

				//地址字段
				data.address = data.province + data.city + data.county + data.addressDetail

				addressData.push(data)
				//写到本地里面
				localStorage.setItem('addressData', JSON.stringify(addressData))

				//将当前地址添加到页面上
				if(data.isDefault) {
					for(var i = 0; i < this.addressList.length; i++) {
						if(this.addressList[i].isDefault) {
							this.addressList[i].isDefault = false

							this.chosenAddressId = this.addressList[i].id

							break

						}

					}
				}
				this.addressList.push(data)

				this.show = false;

			},

			saveEdit(data) {
				console.log('data ==>', data)

				var addressData = localStorage.getItem('addressData')
				addressData = addressData == undefined ? [] : JSON.parse(addressData)

				for(var i = 0; i < this.addressList.length; i++) {
					if(this.addressList[i].id == data.id) {

						data.address = data.province + data.city + data.county + data.addressDetail
						for(var key in this.addressList[i]) {
							this.addressList[i][key] = data[key]
						}

					}
				}
//				console.log('this.addressList ==>',this.addressList)

				if(data.isDefault) {
					this.chosenAddressId = data.id;
				}
				for(var j = 0; j < addressData.length; j++) {
					if(addressData[j].id == data.id) {
						for(var key in addressData[j]) {
							addressData[j][key] = data[key]
						}

					}

				}
				if(data.isDefault) {
					this.chosenAddressId = data.id;
				}
				localStorage.setItem('addressData', JSON.stringify(addressData))
				this.EDddress = false
			},

			onSelect(item, index) {
				//				console.log('item ==>', item)
				//				console.log('index ==>', index)

				if(index == 0) {
					//编辑地址
					console.log('编辑')
					this.EDddress = true
					for(var key in this.addressInfo) {
						this.addressInfo[key] = this.currentAddress[key]
					}

				} else if(index == 1) {
					//删除地址
					this.addressList.splice(this.index, 1)
					//获取本地存储的地址管理数据
					var addressData = JSON.parse(localStorage.getItem('addressData'))

					for(var i = 0; i < addressData.length; i++) {
						if(addressData[i].id == this.addressId) {
							addressData.splice(i, 1)
							break
						}
					}
					localStorage.setItem('addressData', JSON.stringify(addressData))
				}
				this.editShow = false;

			},

			//修改默认地址
			toggleDefault() {
				//获取本地存储的地址管理数据
				var addressData = JSON.parse(localStorage.getItem('addressData'));

				for(var i = 0; i < addressData.length; i++) {
					if(addressData[i].userId == this.userId && addressData[i].isDefault) {
						addressData[i].isDefault = false;
						break;
					}
				}

				for(var j = 0; j < addressData.length; j++) {
					if(this.chosenAddressId == addressData[j].id) {
						addressData[j].isDefault = true;
						break;
					}
				}

				localStorage.setItem('addressData', JSON.stringify(addressData))
			}
		},

		created() {
			//获取本地单签存储的地址数据
			var addressData = localStorage.getItem('addressData')
			addressData = addressData == undefined ? [] : JSON.parse(addressData)

			//获取用户Id
			this.userId = JSON.parse(localStorage.getItem('userLogin')).userId

			//筛选当前用户的地址
			addressData.forEach(value => {
				if(value.userId == this.userId) {
					console.log('value.id ==>', value.id)

					if(value.isDefault) {

						this.chosenAddressId = value.id
						
					}
					this.addressList.push(value)

				}
			})

//			console.log('this.addressList ==>', this.addressList)

		},

		//渲染完后
		mounted() {
			//			console.log('this.$refs ==>', this.$refs)
			this.$refs.addBtn.lastChild.style.zIndex = 1999;

		},

		components: {
			'top-nav': TopNav,
			[AddressList.name]: AddressList,
			[Actionsheet.name]: Actionsheet,
			[AddressEdit.name]: AddressEdit

		}
	}
</script>

<style>

</style>