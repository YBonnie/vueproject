import routesComponent from './routesComponent'

export default [{
		path: '/',
		name: 'Main',
		component: routesComponent.Main,
		children: [{
				path: '/homepage',
				name: 'Homepage',
				component: routesComponent.Homepage
			},
			{
				path: '/store',
				name: 'Store',
				component: routesComponent.Store
			},
			{
				path: '/account',
				name: 'Account',
				component: routesComponent.Account,
				children: [{
					path: '/login',
					name: 'Login',
					component: routesComponent.Login
				}, {
					path: '/register',
					name: 'Register',
					component: routesComponent.Register
				}]
			},
			{
				path: '/menu',
				name: 'Menu',
				component: routesComponent.Menu,

				children: [{
						path: '/quarter',
						name: 'Quarter',
						component: routesComponent.Quarter
					},

					{
						path: '/foods',
						name: 'Foods',
						component: routesComponent.Foods
					},
					{
						path: '/coffee',
						name: 'Coffee',
						component: routesComponent.Coffee
					},
					{
						path: '/products',
						name: 'Products',
						component: routesComponent.Products
					}
				]
			},
			{
				path: '/lecturecontent/:Mid',
				name: 'LectureContent',
				component: routesComponent.LectureContent
			},
			{
				path: '/drinks',
				name: 'Drinks',
				component: routesComponent.Drinks,

			},
			{
				path: '/proDetil/:pid',
				name: 'ProDetil',
				component: routesComponent.ProDetil
			},
			{
				path: '/orderpage',
				name: 'Orderpage',
				component: routesComponent.Orderpage
			},
			{
				path: '/shopcart',
				name: 'Shopcart',
				component: routesComponent.Shopcart
			},
//			{
//				path: '/card',
//				name: 'Card',
//				component: routesComponent.Card
//			},
			{
				path: '/more',
				name: 'More',
				component: routesComponent.More
			},
			{
				path: '/newmaterial',
				name: 'Newmaterial',
				component: routesComponent.Newmaterial
			},
			{
				path: '/maccount',
				name: 'MAccount',
				component: routesComponent.MAccount
			},
			{
				path: '/address',
				name: 'Address',
				component: routesComponent.Address
			},
			{
				path: '/editaccount',
				name: 'EditAccount',
				component: routesComponent.EditAccount
			},
			{
				path: '/search',
				name: 'Search',
				component: routesComponent.Search
			},
			{
				path: '*',
				redirect: { name: 'Homepage' }
				//redirect:{path:'Index'}

				/*  也可以写成函数的形式
				redirect(to){
					return {name : 'Home'}
				}*/
			}

		]
	},
	{
		path: '/test',
		name: 'Test',
		component: routesComponent.Test
	}
]