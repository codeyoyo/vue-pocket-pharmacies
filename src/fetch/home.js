import ajax from '@/func/fetch';
import fakeRequest from "@/func/fakeRequest";
import requestFunc from '../func/fakeRequest';
/**
 * 轮播图
 */
const carousel = () => {
  return fakeRequest([
    {
      imageUrl:"https://image.jianke.com/article/201806/20180621093317114.jpg",
      actionType:20,
      productId:0,
      merchantBasicId:0
    },
    {
      imageUrl:"https://image.jianke.com/article/201806/20180626093742771.jpg",
      actionType:20,
      productId:0,
      merchantBasicId:0
    },
    {
      imageUrl:"https://image.jianke.com/article/201806/20180621181124155.jpg",
      actionType:20,
      productId:0,
      merchantBasicId:0
    },
    {
      imageUrl:"https://image.jianke.com/article/201806/20180610213138629.jpg",
      actionType:20,
      productId:0,
      merchantBasicId:0
    }
  ]);
  //return ajax.getData('Carousel', url, false);
}

/**
 * 广告图
 */
const advertising = () => {
  return ajax.getData('Advertising', url, false);
}

/**
 * 获取特色会场信息
 */
const features = () => {
  return ajax.getData('Features', url, false);
}

/**
 * 获取楼层信息
 */
const floor = () => {
  return ajax.getData('Floor', url, false);
}

/**
 * 获取热门推荐
 */
const hotProduct = () => {
  return ajax.getData('HotProduct', url, false);
}

/**
 * 首页信息图
 */
const index = () => {
  return ajax.getData('Index', url, false);
}

/**
 * 猜你喜欢
 */
const recomendProduct = (pageIndex) => {
  return ajax.getData(`RecomendProduct?pageIndex=${pageIndex}&pageSize=20`, url, false);
}

/**
 * 获取秒杀产品信息
 */
const spikeProduct = () => {
  return ajax.getData('SpikeProduct', url, false);
}

/**
 * 商品分类
 */
const departmentCategory = () => {
  return ajax.getData('DepartmentCategory', url, false);
}

/**
 * 关键字
 * @param {String} keyWorld 
 */
const search = (keyWorld) => {
  return ajax.getData(`search?q=${keyWorld}`, url, false);
}

/**
 * 热门搜索
 */
const hotSearchKey = () => {
  return ajax.getData('HotSearchKey', url, false);
}

/**
 * 首页按钮
 */
const homeNavBoxes = () => {
  return requestFunc([
    {
      iconText:"全部分类",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/all.png",
      actionContent:""
    },
    {
      iconText:"对症找药",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/findacure.png",
      actionContent:""
    },
    {
      iconText:"男性",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/man.png",
      actionContent:""
    },
    {
      iconText:"女性",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/woman.png",
      actionContent:""
    },
    {
      iconText:"无痛测糖",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/yapei_new.png",
      actionContent:""
    },
    {
      iconText:"个人中心",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/center.png",
      actionContent:""
    },
    {
      iconText:"物流查询",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/logistics.png",
      actionContent:""
    },
    {
      iconText:"购物车",
      imageName:"https://img.jianke.com/jk2016/mjianke/m/images/shoppingcar2017.png",
      actionContent:""
    }
  ]);
  //return ajax.getData('HomeNavBoxes', url, false);
}

export default {
  carousel,
  advertising,
  features,
  floor,
  hotProduct,
  index,
  recomendProduct,
  spikeProduct,
  departmentCategory,
  search,
  hotSearchKey,
  homeNavBoxes
}
