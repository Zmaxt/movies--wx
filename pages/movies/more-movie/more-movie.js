let util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let [that,categroy] = [this,options.categroy];
    this.data.barTitle = categroy;
    // 定义一个接口路径的变量
    let interfaceUrl = null;
    // 根据标题判断请求路径
    switch(categroy){
      case "正在热映":
        interfaceUrl = getApp().globalData.BASEPATH + "v2/movie/in_theaters";
        util.http(interfaceUrl,that.precessDoubanData);
        break;
      case "即将上映":
        interfaceUrl = getApp().globalData.BASEPATH + "v2/movie/coming_soon";
        util.http(interfaceUrl, that.precessDoubanData);
        break;
      default:
        interfaceUrl = getApp().globalData.BASEPATH + "v2/movie/top250";
        util.http(interfaceUrl, that.precessDoubanData);
    }
    this.data.requestUrl = interfaceUrl;
  },
  precessDoubanData:function(data){
    let movie = [];
    for (let subject of data.subjects) {
      let temp = {}
      temp.title = subject.title;
      temp.average = subject.rating.average.toFixed(1);
      temp.coverageUrl = subject.images.large;
      temp.movieId = subject.id;
      temp.stars = util.converToStarsArray(subject.rating.stars);
      movie.push(temp);
    }
    let moviesList = this.data.movies.concat(movie);
    // console.log(moviesList)
    this.setData({
      movies: moviesList
    })
    wx.hideNavigationBarLoading();
  // 保存当前电影总共条数。方便下拉加载使用
    this.data.totalCount += 20;
    // 去除下拉loading
    wx.stopPullDownRefresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
 onPullDownRefresh:function(e){
    this.data.movies = [];
    let requestUrl = this.data.requestUrl + "?count=" + this.data.totalCount;
    util.http(requestUrl,this.precessDoubanData);
    // 因为请求数据，就会自增20，所以我们在这里减去这20就可以达到我们想要的数据条数了
    this.data.totalCount -= 20;
 },
  /**
   * 页面上拉触底事件的处理函数
   */
 onReachBottom:function(e){
    wx.showNavigationBarLoading();
    let requestUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
   
    util.http(requestUrl,this.precessDoubanData)

 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.setNavigationBarTitle({
      title: that.data.barTitle,
    })
  },
  onMovieTap(e) {
    let mid = e.currentTarget.dataset.mid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?mid=' + mid
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})