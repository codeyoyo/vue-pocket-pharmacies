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
}

/**
 * 广告图
 */
const advertising = () => {
  return fakeRequest([
    {
      "imageUrl":"http://image.360kad.com/group2/M00/7F/EE/CgAgFFtIRI-Add80AAFpyZTmHDQ156.jpg",
      "productId":0,
      "merchantBasicId":0,
      "advertisingType":20
    },
    {
      "imageUrl":"http://image.360kad.com/group2/M00/7F/D7/CgAgFFtIDKmAefM0AACcv0LjqS0128.jpg",
      "productId":0,
      "merchantBasicId":0,
      "advertisingType":20
    }
  ]);
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
  let floorListData=[
    {"productId":0,"imgUrl":"http://image.360kad.com/group2/M00/37/4D/CgAgFVp5ZvGAQ8m-AADhmUUpDW8565.jpg"},
    {"productId":0,"imgUrl":"http://image.360kad.com/group2/M00/37/4D/CgAgFFp5Z1eAfbZzAACw75ukQ1Q939.jpg"},
    {"productId":0,"imgUrl":"http://image.360kad.com/group2/M00/37/4D/CgAgFFp5ZzWAO0cyAACxGn3d0Bg076.jpg"},
    {"productId":0,"imgUrl":"http://image.360kad.com/group2/M00/37/4D/CgAgFFp5ZwyAE3zvAADYdDr2jEA346.jpg"},
    {"productId":0,"imgUrl":"http://image.360kad.com/group2/M00/27/A1/CgAgFVpAnziAZmbPAAA5xP2tVdA264.jpg"},
    {"productId":0,"imgUrl":"http://image.360kad.com/group2/M00/27/A1/CgAgFFpAoAaAQ4GgAAA9QwbYS8M385.jpg"},
    {"productId":0,"imgUrl":"http://image.360kad.com/group2/M00/27/A3/CgAgFFpAosOAP3a_AACpTK5PU_Y164.jpg"}
  ];
  let adList=[
    {
      "productId":0,
      "imgUrl":"http://image.360kad.com/group1/M00/BB/13/CgAgEVmUAJ-AcVVyAABG8WzWeh0473.jpg"
    },
    {
      "productId":0,
      "imgUrl":"http://image.360kad.com/group2/M00/44/37/CgAgFVqxtASAJwxWAABCQMXdxjQ672.jpg"
    }
  ];
  return fakeRequest([
    {
      name:"男科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    },
    {
      name:"妇科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    },{
      name:"皮肤科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    },{
      name:"神经科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    },{
      name:"呼吸科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    },{
      name:"心脑科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    },{
      name:"风湿科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    },{
      name:"慢性科",
      floorList:floorListData,
      adList,
      "answers":'让男人越来越虚的不良习惯，很多人全占了！',
      "headline":"打响呼吸道感染预防保卫战"
    }
  ]);
}

/**
 * 获取热门推荐
 */
const hotProduct = () => {
  return fakeRequest([{
    "imageUrl":'http://image.360kad.com/group2/M00/81/13/CgAgFFtMcRKAIxJEAABu2JDWwYQ855.jpg',
    "productId":0,
    "merchantBasicId":0
  },{
    "imageUrl":'http://image.360kad.com/group2/M00/81/13/CgAgFFtMcS2ATbEwAADlpfLlUTE259.jpg',
    "productId":0,
    "merchantBasicId":0
  },{
    "imageUrl":'http://image.360kad.com/group2/M00/81/13/CgAgFVtMcUGAMw1tAADtG9y3aro119.jpg',
    "productId":0,
    "merchantBasicId":0
  }]);
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
  let group=[];
  var item={
    "productId":0,
    "merchantId":0,
    "productName":"钙尔奇D 碳酸钙D3咀嚼片(Ⅱ)",
    "productImg":"http://image.360kad.com/group1/M00/2D/2C/CgAgEFcqv_KAYUEMAAHCMrvkrK0605.jpg_180x180.jpg",
    "productSpecifications":"300mg*30片",
    "sellingPrice":"22.0",
    "discountPrice":"28.0"
  };
  for(var i=0;i<30;i++){
    group.push(item);
  }
  return fakeRequest({
    "dataList":group,
    "pageeIndex":1,
    "pageCount":1,
  });
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
