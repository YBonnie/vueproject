<template>
	<div class="loginBox animated flipInY">
		<van-cell-group class="group">
			<van-field label="账号" v-model="reg.username" placeholder="请输入账号" left-icon="manager-o" class="username" />
			<van-field type="password" label="密码" v-model="reg.password" placeholder="请输入密码(8-16位)" left-icon="browsing-history-o" class="password" />
		</van-cell-group>
		<van-button class="login-box" size="large" @click="login">登录</van-button>
	</div>
</template>

<script>
	import animate from '../../node_modules/animate.css'
	import WOW from '../../node_modules/wowjs/dist/wow.js'
	
	import { Row, Col, CellGroup, Field, Button } from 'vant';

	import validForm from '../utils/validForm.js'

	import tip from '../utils/tip.js'

	import tool from '../utils/tool.js'
	export default {
		name: 'Login',
		data() {
			return {
				active: 0,
				reg: {
					username: '',
					password: ''
				},
				users: null,
				
			}
		},
		methods: {
			login() {

				//验证手机号
				if(!validForm.validUsername(this.reg.username)) {
					tip.dialogList('账号格式不正确', '账号只支持4-12位的英文字符', true, this.reg, 'username')
				} else if(!validForm.validPwd(this.reg.password, 8, 16)) {
					//验证密码
					tip.dialogList('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');

				} else {
					var userData = localStorage.getItem('users');
					if(userData) {
						//如果存在用户
						this.users = JSON.parse(userData);
//						console.log(this.users)
						for(var i = 0; i < this.users.length; i++) {

							if(this.users[i].username == this.reg.username) {
								//如果手机号匹配, 验证密码
								if(this.users[i].pwd == this.reg.password) {
									localStorage.setItem('userLogin',JSON.stringify({userId:this.users[i].userId,username:this.users[i].username}))
									return this.$router.push({ name: 'Quarter' });
								} else {
									return tip.dialogList('手机号或者密码不正确');
								}
							}
						}
						//不存该用户
						tip.dialogList('该用户不存在');

					}

				}

			}
		},
		created() {
			
			
			var userData = localStorage.getItem('users');

			this.users = userData == undefined ? [] : JSON.parse(userData);
		},
		components: {

			[Row.name]: Row,
			[Col.name]: Col,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button
		}
	}
</script>

<style lang="less" scoped>
	.loginBox {
		padding: 0 15px;
		overflow: hidden;
		background-color: beige;
		.group {
			margin-top: 3.467rem;
			background-color: beige;
		}
		.username {
			border-bottom: 0.027rem solid #00A862;
			background-color: transparent;
		}
		.password {
			margin-top: 0.8rem;
			border-bottom: 0.027rem solid #00A862;
			background-color: transparent;
		}
		.login-box {
			margin-top: 1.333rem;
			border: 0.027rem dashed #00A862;
			background-color: #00A862;
			color: #FFFFFF;
			margin-bottom: 7.3rem;
		}
	}
</style>