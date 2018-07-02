let details = require("../talk/talk-data/talk-data");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: {},
    isPlaying: false
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
  
    that.setData({
      isPlaying: getApp().globalData.ISPLAYING
    })
   
    // console.log(options)//options 是跳转页面传来的参数
    let aid = options.aid;
    this.setData({
      articles : details.articleList[--aid]
    })
    // console.log(this.data.articles)
    let colBool = wx.getStorageSync(`colList[${aid}]`);
    // 是否在本地缓存，如果不在则加入缓存
    if(!colBool){
      wx.setStorageSync(`colList[${aid}]`, false);
      // console.log(`colList[${aid}]`)//colList[2]
    }
    this.setData({
      col: wx.getStorageSync(`colList[${aid}]`) //true or false
    })
   
    // 检验播放的文章ID是否一致，避免点击其余文章，也出现正在播放状态
   
    if (getApp().globalData.MUSICID === that.data.articles.id) {
      that.setData({
        isPlaying: getApp().globalData.ISPLAYING
      })
    }else{
      wx.pauseBackgroundAudio();
    }
    // 监听音乐启动
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlaying: true
      })
    })
    // 监听音乐暂停
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlaying: false
      })
    })
    // 监听音乐停止，图标初始化
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlaying: false
      })
      getApp().globalData.ISPLAYING = false;
      getApp().globalData.MUSICID = null;
    })
  },
  collect:function(e){
    let id = e.currentTarget.dataset.id;
    if(this.data.col){
      this.setData({
        col:false
      })
      wx.setStorageSync(`colList[${--id}]`,false)
    }else{
      this.setData({
        col:true
      })
      wx.setStorageSync(`colList[${--id}]`,true);
    }
  },
  share:function(){
    wx.showActionSheet({
      itemList: [
        "分享到QQ",
        "分享到微信好友",
        "分享到朋友圈",
        "分享到新浪微博",
      ],
      itemColor:"skyblue",
      success:function(res){
        // console.log(res.tapIndex);
        var toast = [
          "你确定分享到QQ吗",
          "你确定分享给微信好友吗",
          "你确定分享到朋友圈吗",
          "你确定分享到新浪微博吗",
        ];
        wx.showModal({
          title: toast[res.tapIndex],
          content: '咱们今天讲的是交互反馈，这个很重要',
        })
      }
    })
  },
  onMusic: function(event){
    let that = this;
    let isPlaying = this.data.isPlaying;
    if(!isPlaying){
      this.setData({
        isPlaying:true
      })
      getApp().globalData.ISPLAYING = true;
      // 将当前文章ID记录在app.js中的全局变量MUSICID中。【唯一改变的地方】
      getApp().globalData.MUSICID = that.data.articles.id;
      wx.playBackgroundAudio(that.data.articles.music)
      
    }else{
      this.setData({
        isPlaying: false
      })
      getApp().globalData.ISPLAYING = false;
      wx.pauseBackgroundAudio();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})