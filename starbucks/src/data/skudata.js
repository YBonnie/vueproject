/* eslint-disable */
export default {
  sku: {
    tree: [
      {
        //规格标题
        k: '颜色',

        //规格id
        k_id: '1',
        v: [
          {
            id: '1215', //当前规格的子规格id
            name: '白色' //子规格的名称
          }
        ],
        k_s: 's1' //必须和list的 s1字段名称一致
      }
    ],
    list: [
      {
        //单价单位为分
        price: 300,

        //该s1字段关联 tree 的 k_s字段的值, s1的值必须是 tree的 id值
        s1: '1215',

        //库存数量, 必须要有
        stock_num: 9999999,

        //商品id
        goods_id: 946755,

        //商品名称
        product_name: '水壶',

        //商品缩略图
        product_img: 'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg'

      }
    ],

    //是否无规格商品
    none_sku: false,

    //隐藏库存
    hide_stock: true
  },
  goods_info: {
    //缩略图商品名称
    title: '水壶',

    //商品图片链接
    picture:
      'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg',
  }
};
