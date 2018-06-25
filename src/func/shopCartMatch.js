function matchArryHas(merchantBasicId, arr) {
  let boolenVal = false;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item == merchantBasicId) {
      boolenVal = true;
      break;
    }
  }
  return boolenVal;
}

let promotionsArray = [];

export default {
  match(dataList = []) {
    let group = [];
    let mg = [];
    for (let i = 0; i < dataList.length; i++) {
      var item = dataList[i];
      if (!matchArryHas(item.merchantBasicId, mg)) {
        mg.push(item.merchantBasicId);
      }
    }
    for (let i = 0; i < mg.length; i++) {
      let item = mg[i];
      let tempArray = [];
      for (let j = 0; j < dataList.length; j++) {
        let dataItem = dataList[j];
        if (dataItem.merchantBasicId == item) {
          tempArray.push(dataItem);
        }
      }
      group.push(tempArray);
      tempArray = [];
    }
    return group;
  },
  findProduct(dataList, productId, merchantBasicId) {
    let productObj = false;
    for (let i = 0; i < dataList.length; i++) {
      var item = dataList[i];
      if (
        item.productId == productId &&
        item.merchantBasicId == merchantBasicId
      ) {
        productObj = item;
        break;
      }
    }
    return productObj;
  },
  merchantChange(m) {
    let chageCount = 0;
    for (let i = 0; i < m.length; i++) {
      let item = m[i];
      if (item.productSelect) {
        chageCount++;
      }
    }
    return chageCount == m.length;
  },
  merchantSelect(array, selected, merchantBasicId) {
    let group = [];
    for (let i = 0; i < array.length; i++) {
      var item = array[i];
      if (item.merchantBasicId == merchantBasicId) {
        item.productSelect = selected;
      }
      group.push(item);
    }
    return group;
  },
  promotionsMatch(promotionsList, productId, merchantBasicId) {
    let obj = {
      promotionId: '',
      slogan: '',
      promotionCount: 0,
      productId,
      merchantBasicId
    };
    let hasItem = false;
    for (let i = 0; i < promotionsArray.length; i++) {
      let item = promotionsArray[i]
      if (item.productId == productId && item.merchantBasicId == merchantBasicId) {
        obj = item;
        hasItem = true;
        break;
      }
    }
    if (!hasItem && promotionsList) {
      let promotionObj = promotionsList[0];
      obj = {
        promotionId: promotionObj.promotionId,
        slogan: promotionObj.slogan,
        promotionCount: promotionsList.length,
        productId,
        merchantBasicId
      };
      promotionsArray.push(obj);
    }
    return obj;
  },
  findPromotionSelect(productId, merchantBasicId) {
    for (let i = 0; i < promotionsArray.length; i++) {
      let item = promotionsArray[i];
      if (item.productId == productId && item.merchantBasicId == merchantBasicId) {
        return item.promotionId;
      }
    }
    return "";
  },
  setPromotionSelect(promotionList, promotionId, productId, merchantBasicId) {
    var group = [];
    for (let i = 0; i < promotionsArray.length; i++) {
      let item = promotionsArray[i];
      if (item.productId == productId && item.merchantBasicId == merchantBasicId) {
        for (let j = 0; j < promotionList.length; j++) {
          let temp = promotionList[j];
          if (temp.promotionId == promotionId) {
            item.promotionId = promotionId;
            item.slogan = temp.slogan
            break;
          }
        }
      }
      group.push(item);
    }
    promotionsArray = group;
  },
  buildPromotion(shopcartList) {
    let group = [];
    for (let i = 0; i < shopcartList.length; i++) {
      let item = shopcartList[i];
      item.promotionModel = this.promotionsMatch(item.promotions, item.productId, item.merchantBasicId);
      group.push(item);
    }
    return group;
  },
  productCountMatch(dataGroup) {
    let list = [];
    for (let i = 0; i < dataGroup.length; i++) {
      let item = dataGroup[i];
      item.promotionModel = this.promotionsMatch(
        item.promotions,
        item.productId,
        item.merchantBasicId
      );
      list.push(item);
    }
    return list;
  }
}
