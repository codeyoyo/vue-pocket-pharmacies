import ajax from "@/func/fetch.js";

/**
 * 支付结果
 */
const alipayPayCallback = () => {
  return ajax.getData('AlipayPayCallback');
}

/**
 * 获取用户收货地址
 */
const getDeliveryAddress = () => {
  return ajax.getData('GetDeliveryAddress');
}

/**
 * 添加用户收货地址
 * @param {Object} data 地址对象
 */
const addDeliveryAddress = (data) => {
  let send = {
    "id": 0,
    "consignee": data.consignee,
    "deliveryAddress": data.deliveryAddress,
    "deliveryZipCode": data.deliveryZipCode,
    "mobilePhone": data.mobilePhone,
    "landlinePhone": data.landlinePhone,
    "regionId": data.regionId,
    "isDefault": data.isDefault
  };
  return ajax.postData('AddDeliveryAddress', send);
}

/**
 * 更新用户地址
 * @param {Object} data 地址对象
 */
const editDeliveryAddress = (data) => {
  let send = {
    "id": data.addressId,
    "consignee": data.consignee,
    "deliveryAddress": data.deliveryAddress,
    "deliveryZipCode": data.deliveryZipCode,
    "mobilePhone": data.mobilePhone,
    "landlinePhone": data.landlinePhone,
    "regionId": data.regionId,
    "isDefault": data.isDefault
  };
  return ajax.postData("EditDeliveryAddress", send);
}

/**
 * 获取用户默认地址
 */
const defaultAddress = () => {
  return ajax.getData('DefaultDeliveryAddress');
}

/**
 * 删除地址ID
 * @param {String} addressId 地址ID
 */
const deleteAddress = (addressId) => {
  return ajax.postData("DeleteDeliveryAddress", {
    "addressId": addressId
  });
}

/**
 * 获取单个地址
 * @param {Number} addressId 地址ID
 */
const getOneDeliveryAddress = (addressId) => {
  return ajax.getData(`GetSingleDeliveryAddressController?addressId=${addressId}`);
}

/**
 * 获取全部地区
 */
const regions = () => {
  return ajax.getData("Regions");
}

/**
 * 支付方式
 */
const paymentType = () => {
  return ajax.getData("paymentType", "http://120.78.69.215:1100/api/v1/");
}

export default {
  alipayPayCallback,
  getDeliveryAddress,
  addDeliveryAddress,
  editDeliveryAddress,
  getOneDeliveryAddress,
  regions,
  deleteAddress,
  paymentType,
  defaultAddress
}
