const keyName = 'YJS_Storage_';

let storage = null;
let hasStorage = true
if (!window.localStorage) {
  hasStorage = false;
} else {
  storage = window.localStorage;
}

export default {
  set(key, value) {
    storage.setItem(keyName + key, value)
  },
  get(key) {
    return storage.getItem(keyName + key);
  },
  remove(key) {
    storage.removeItem(keyName + key);
  },
  hasStorage
}
