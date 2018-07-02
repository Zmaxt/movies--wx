let util = require("../../utils/util")
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow: true,
    closeImgShow: false,
    searchPanelShow: false,
    searchMovies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let inTheaters = app.globalData.BASEPATH + "v2/movie/in_theaters?count=3",
      comeingSoon = app.globalData.BASEPATH + "v2/movie/coming_soon?count=3",
      top250 = app.globalData.BASEPATH + "v2/movie/top250?count=3";
      // 调用三次不同的接口请求不同的数据,添加更多按钮对应请求的标题
    this.getData(inTheaters,'inTheaters',"正在热映");
    this.getData(comeingSoon, 'comeingSoon',"即将上映");
    this.getData(top250, 'top250',"TOP250");
  },
  // 参数（路径，接收结果的对象）
  getData:function(url,setKey,slogans){
    let that = this;
    wx.request({
      url: url,
      data: {
        // count: 3
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        // 调用专门处理数据的函数
        that.processDoubanData(res.data.subjects,setKey,slogans);
      }
    })
  },
  processDoubanData:function(data,setKey,slogans){
    var movie = [];
    for(let subject of data){
      let temp = {};
      temp.title = subject.title;//标题
      temp.average = subject.rating.average.toFixed(1);//评分
      temp.coverageUrl = subject.images.large;//封面图
      temp.movieId = subject.id;//电影ID
      // 导入方法
      temp.stars = util.converToStarsArray(subject.rating.stars)
      movie.push(temp);
  
    }
     this.setData({
       [setKey]: {
         slogan:slogans,
         movies: movie
       }
     })
  
    
    console.log(setKey.length)

  },
  onMoreTap:function(e){
    let categroy = e.currentTarget.dataset.categroy;
    wx.navigateTo({
      url: 'more-movie/more-movie?categroy=' + categroy,
    })
  },
  onBindFocus() {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
      closeImgShow: true
    })
  },
  onSearch:function(e){
    // 获取input的value
    let val = e.detail.value;
    let searchUrl = getApp().globalData.BASEPATH + "v2/movie/search?q=" + val;
    this.getData(searchUrl,'searchMovies','');

  },
  recover:function(e){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      closeImgShow: false
    })
  },
  onMovieTap(e) {
    let mid = e.currentTarget.dataset.mid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?mid=' + mid
    })
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