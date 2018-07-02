let tolkData = require("talk-data/talk-data");
Page({
  data: {},
  onLoad: function (options) {
    // 模拟后台假数据
    this.setData(tolkData);
  },
  onShareAppMessage: function(){
    let that = this;
    let shareObj = {
      title:'影视大爆炸',
      path:'/pages/talk/talk',
      success:function(res){
        // 转发成功之后的回调
      },
      fail:function(){
        //转发失败之后的回调
        if(res.errMsg == 'shareAppMessage:fail cancel'){
          // 用户取消转发
        }else if(res.errMsg == 'shareAppMessage:fail'){
          // 转发失败
        }
      },
      complete:function(){
        // 转发结束之后的回调
      }
    };
    return shareObj;
  },
  likeThis:function(e){
    let [that,index] = [
      this,
      -- e.target.dataset.id
    ];
    let status = that.data.articleList[index].canLike;
    if(status){
      let likeCount = that.data.articleList[index].likes;
      that.setData({
        ['articleList['+index+'].likes']: ++ likeCount,
        ['articleList[' + index + '].canLike']: false
      })
    }else{
      wx.showToast({
        title: '您已经点过赞了',
        icon:'none',
        duration:2000
      })
    }

  },
  details:function(e){
    let aid = e.currentTarget.dataset.aid;
    wx.navigateTo({
      url:"../talk-details/talk-details?aid="+aid+"&nn=1"
    })
  }
 
})
