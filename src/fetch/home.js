import ajax from '@/func/fetch';
let url = "http://120.78.69.215:1100/api/v1/";

/**
 * 轮播图
 */
const carousel = () => {
  return ajax.getData('Carousel', url, false);
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
  return ajax.getData('HomeNavBoxes', url, false);
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
