<template>
  <div class="search">
    <helmet url="/" title="搜索"></helmet>
    <div class="search-box">
      <div class="search-text">
          <input class="search-input" v-model="keyWord" id="keywordInput" />
          <span class="search-clear" @click="clearAll();" v-show="clearShow"></span>
      </div>
      <div @click="searchClick()" class="font26 search-button">
          <a id="search-btn">搜索</a>
      </div>
    </div>
    <div class="keyword-box" v-if="hotSearchKey.length>0">
      <div class="keyword-header">
        <div class="fl">
          热门搜索
        </div>
        <!-- <div class="fr">
          <span class="search-f5"></span>
          换一批
        </div> -->
      </div>
      <div class="keyword-content">
        <a v-for="(item,index) in hotSearchKey" :key="index" class="search-item" :href="'#/searchResult/'+item">
          {{item}}
        </a>
      </div>
    </div>
    <div class="search-history" v-show="history.length>0">
      <div class="history">
        最近搜索过
      </div>
      <div class="history-item" v-for='(item,index) in history' :key="index">
        <a :href="'#/searchResult/'+item" v-text="item"></a>
      </div>
      <div class="clear-history">
        <button type="button" @click="clearHistory()">清除搜索历史</button>
      </div>
    </div>
  </div>
</template>

<script>
import helmet from "../../components/public/helmet";
export default {
  name: "search",
  data() {
    return {
      keyWord: "",
      clearShow: false,
      history: [],
      hotSearchKey: []
    };
  },
  methods: {
    clearAll() {
      this.keyWord = "";
    },
    searchClick() {
      if (this.keyWord.trim() != "") {
        this.$store.dispatch("set_search_history", this.keyWord);
        this.$router.push(`/searchResult/${this.keyWord}`);
      }
    },
    clearHistory() {
      this.history = [];
      this.$store.dispatch("clear_history");
    }
  },
  components: {
    helmet
  },
  watch: {
    keyWord(curVal) {
      this.clearShow = !(curVal.trim() == "");
    }
  },
  created() {
    this.history = this.$store.getters.search_history;
    this.api.home.hotSearchKey().then(data => {
      this.hotSearchKey = data;
    });
  },
  mounted() {
    let input = document.getElementById("keywordInput");
    input.focus();
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.search-text {
  float: left;
  width: 78.87%;
  position: relative;
}

.search-box,
.keyword-box {
  background-color: #ffffff;
}

.search-box {
  padding: pxToRem(25px) pxToRem(10px);
  border-bottom: 1px solid #e3e3e3;
  overflow: hidden;
}

.search-text {
  height: pxToRem(60px);
}

.search-input {
  border-radius: pxToRem(10px) 0 0 pxToRem(10px);
  border: 2px solid #e3e3e3;
  color: #808080;
  border-right: none;
  text-indent: pxToRem(5px);
  width: 100%;
  height: pxToRem(60px);
  margin: 0;
  padding: 0;
  display: inline-block;
  line-height: normal;
  overflow: hidden;
  vertical-align: top;
  box-sizing: border-box;
  font-size: pxToRem(30px);
  outline: none;
}

.search-clear {
  position: absolute;
  display: block;
  width: pxToRem(28px);
  height: pxToRem(28px);
  top: pxToRem(15px);
  right: pxToRem(5px);
  margin: auto;
  background: url(../../assets/clear.jpg) no-repeat;
  background-size: 100%;
}

.search-button {
  float: right;
  background: #26a2ff;
  border-radius: 0 pxToRem(5px) pxToRem(5px) 0;
  width: 21.13%;
  text-align: center;
  height: pxToRem(60px);
  line-height: pxToRem(60px);
  display: inline-block;
  color: white;
  font-weight: bold;
  font-size: pxToRem(28px);
}

.keyword-box {
  padding-top: pxToRem(20px);
  .keyword-header {
    font-size: pxToRem(30px);
    overflow: hidden;
    height: pxToRem(40px);
    .fl {
      float: left;
      margin-left: pxToRem(15px);
      line-height: pxToRem(40px);
    }
    .fr {
      float: right;
      margin-right: pxToRem(15px);
    }
    .search-f5 {
      display: inline-block;
      float: left;
      width: pxToRem(32px);
      height: pxToRem(28px);
      background: url(../../assets/F5.jpg) no-repeat center;
      background-size: 100%;
      margin-right: pxToRem(10px);
      margin-top: pxToRem(9px);
    }
  }
  .keyword-content {
    padding: pxToRem(20px) pxToRem(10px);
    overflow: hidden;
  }
  .search-item {
    border: 1px solid #e3e3e3;
    border-radius: pxToRem(25px);
    height: pxToRem(54px);
    line-height: pxToRem(54px);
    float: left;
    padding: 0 3.5%;
    text-align: center;
    margin: 0 2.3% pxToRem(18px) 0;
    box-sizing: border-box;
    font-size: pxToRem(24px);
    text-decoration: none;
    color: black;
  }
}

.search-history {
  padding: pxToRem(10px);
  background-color: #fff;
  margin-top: pxToRem(30px);
  overflow: hidden;
}
.history {
  font-size: pxToRem(30px);
}
.history-item {
  font-size: pxToRem(25px);
  margin-top: pxToRem(35px);
}
.history,
.history-item {
  padding: pxToRem(10px);
  border-bottom: 1px solid #e3e3e3;
}
.clear-history {
  padding: pxToRem(10px);
  button {
    width: 100%;
    height: 100%;
    border: 1px solid #e3e3e3;
    background-color: #ffffff;
    padding: pxToRem(20px);
    font-size: pxToRem(30px);
    color: #808080;
  }
}
</style>


