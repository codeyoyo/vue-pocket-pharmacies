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
  let now=new Date();
  let dateStr=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
  let data = {
    code:200,
    model:{
      name:"限时秒杀",
      world:"21点场",
      startTime:+" 21:00:00",
      endTime:dateStr+" 22:00:00",
      promotionProductInfos:[
        {
          img:"http://image.360kad.com/group2/M00/17/38/CgAgFVoFfACADm3PAAF6hOmoMEE368.jpg_180x180.jpg",
          productName:"恩惠 医用棉签 12cm*50支",
          promotionPrice:"1",
          sellingPrice:"2.5",
          productCode:"0",
          merchantBasicId:"0"
        },
        {
          img:"http://image.360kad.com/group1/M00/B9/A2/CgAgEFmNWqyAA9hCAAHHTresBkQ829.jpg_180x180.jpg",
          productName:"强爱 创口贴 超弹防水型 10贴",
          promotionPrice:"1",
          sellingPrice:"9.9",
          productCode:"0",
          merchantBasicId:"0"
        },
        {
          img:"http://image.360kad.com/group1/M00/1F/E0/CgAgEFbT4LWAZaLFAAGjCQI3hrg639.jpg_180x180.jpg",
          productName:"恒健 碘酊 20ml",
          promotionPrice:"1",
          sellingPrice:"2.5",
          productCode:"0",
          merchantBasicId:"0"
        },
        {
          img:"http://image.360kad.com/group1/M00/AC/36/CgAgEFlB-EWAd3oZAAGY-_1V0fY632.jpg_180x180.jpg",
          productName:"韩纪 玻尿酸深度保湿蚕丝隐形面贴膜 1张",
          promotionPrice:"1",
          sellingPrice:"2.5",
          productCode:"0",
          merchantBasicId:"0"
        },
        {
          img:"http://image.360kad.com/group1/M00/49/4C/CgAgEVfD3zCAesNDAAG5r5CaWRA188.jpg_180x180.jpg",
          productName:"龙虎 氟轻松维B6乳膏 30g/支",
          promotionPrice:"1",
          sellingPrice:"2.5",
          productCode:"0",
          merchantBasicId:"0"
        }
      ]
    },
    message:""
  };
  return fakeRequest(data);
  //return ajax.getData('SpikeProduct', url, false);
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
