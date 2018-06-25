import dataHelp from "../../func/dataHelp";

const payKey = "yjs-pay";
const payEnd = 'yjs-end';
let state = {
  invoice: {
    invoiceType: 2,
    invoiceTitleType: "1",
    taxpayerId: "",
    invoiceContentType: "1",
    invoiceReceiveMail: ""
  },
  orderRemark: '',
  payType: '2',
  orderPay: false,
  ordreEnd: {
    orderAmountPayableSum: '',
    paymentTypeDesc: ""
  }
}

const getters = {
  invoice(state) {
    return state.invoice;
  },
  orderRemark(state) {
    return state.orderRemark;
  },
  payType(state) {
    return state.payType;
  },
  orderPay(state) {
    let result = dataHelp.getData(payKey);
    if (result) {
      state.orderPay = JSON.parse(result);
    }
    return state.orderPay;
  },
  ordreEnd(state) {
    let result = dataHelp.getData(payEnd);
    if (result) {
      state.ordreEnd = JSON.parse(result);
    }
    return state.ordreEnd;
  }
}

const actions = {
  saveInvoice({
    commit,
    state
  }, data) {
    state.invoice = data;
  },
  saveOrderRemark({
    commit,
    state
  }, data) {
    state.orderRemark = data
  },
  savePayType({
    commit,
    state
  }, data) {
    state.payType = data;
  },
  saveOrderPay({
    commit,
    state
  }, data) {
    state.orderPay = data;
    dataHelp.setData(payKey, JSON.stringify(state.orderPay));
  },
  saveOrderEnd({
    commit,
    state
  }, data) {
    state.ordreEnd = data;
    dataHelp.setData(payKey, JSON.stringify(state.ordreEnd));
  }
}

export default {
  state,
  getters,
  actions
}
