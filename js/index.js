//功能一：让header的透明度跟着滚动的scrollTop值改变
//功能二：动态计算秒杀商品的ul的宽度
//功能三：倒计时功能
//功能四：京东快报文字轮播图
//功能五：banner轮播图


//功能一：让header的透明度跟着滚动的scrollTop值改变
//思路：
//1. 给window注册滚动事件
//2. 获取到滚动的scrollTop值，动态的改变header的颜色
//3. 透明度的范围：0-0.9   如果scrollTop >= 500  0.9
//4. 如果scrollTop <= 500  当前的透明度/0.9 = 当前的scrollTop/500
;
(function () {

  var header = document.querySelector(".jd_header");

  window.addEventListener("scroll", function () {

    var scrollTop = window.pageYOffset;
    var opacity = 0;
    if (scrollTop <= 500) {
      opacity = scrollTop / 500 * 0.9;
    } else {
      opacity = 0.9;
    }

    //设置header的背景颜色
    header.style.backgroundColor = " rgba(222, 24, 27, " + opacity + ")";
  });

})();


//功能二：动态计算秒杀商品的ul的宽度
//思路：
//1. 找到秒杀商品的ul
//2. 找到所有的li，计算总的宽度
//3. 设置给ul即可
;
(function () {

  var ul = document.querySelector(".seckill_content ul");
  var lis = ul.querySelectorAll("li");
  //宽度 * 个数
  ul.style.width = lis[0].offsetWidth * lis.length + "px";


  //传的是父元素的选择器
  new IScroll(".seckill_content", {
    scrollY: false, //禁用垂直滚动
    scrollX: true //启动水平滚动
  });

})();


//功能三：倒计时功能
//思路
//1. 通过秒杀的时间 - 当前的时间 = 剩余的时间
//2. 把剩余的时间转换成小时，分钟，秒钟
//3. 开启定时器
//4. 当时间时间到了以后，还需要清除定时器
;
(function () {
  var spans = document.querySelectorAll(".seckill_time span:nth-child(odd)");

  function setTime() {
    //2018/05/30 12:00:00
    //但是：注意在移动端的safari浏览器中，时间格式不识别横杠
    var secTime = new Date(2018, 4, 30, 12, 0, 0);
    var nowTime = new Date();

    var total = parseInt((secTime - nowTime) / 1000);

    if (total <= 0) {
      total = 0;
      clearInterval(timeId);
    }

    //需要把total转换成时分秒
    //转换成时
    var hours = parseInt(total / 60 / 60);

    var minutes = parseInt(total / 60) % 60;

    var seconds = total % 60;

    spans[0].innerText = addZero(hours);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(seconds);
  }

  setTime();
  //开启定时器
  var timeId = setInterval(setTime, 1000);


  function addZero(n) {
    return n < 10 ? "0" + n : n;
  }

})();


//功能四：文字轮播的效果
//分析：
//1. 动的是谁？  ul
//2. 每次动多少？一个li的高度
//3. 能一直动，要无缝的效果，应该怎么办？？？   在最后面加一个第一个， 发现如果是最后一个，需要换成第一个。
//思路：
//1. 找到对应的ul和li
//2. 开启一个定时器，每隔一段时间，就让ul动，translateY(-30),
;
(function () {

  //1. 获取元素
  var ul = document.querySelector(".jd_news .info ul");
  var lis = ul.querySelectorAll("li");
  //获取li的高度
  var liHeight = lis[0].offsetHeight;

  //2. 开启定时器
  var count = 0;
  setInterval(function () {


    //获取了ul的宽度
    //ul.offsetWidth;

    count++;
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";

    ul.style.transform = "translateY(-" + liHeight * count + "px)";
    ul.style.webkitTransform = "translateY(-" + liHeight * count + "px)";

  }, 1000);

  //给ul注册一个动画结束事件
  ul.addEventListener("transitionend", function () {
    //如果是最后一个，需要瞬间变到0的位置
    if (count >= lis.length - 1) {
      count = 0;

      ul.style.transition = "none";
      ul.style.webkitTransition = "none";

      ul.style.transform = "translateY(0px)";
      ul.style.webkitTransform = "translateY(0px)";
    }

  })


})();





//1. 图片轮播图
//2. 考虑小圆点同步
//3. 手指的触摸
;
(function () {

  //找对象
  var banner = document.querySelector(".jd_banner");
  var ul = banner.querySelector("ul");
  var imgs = ul.querySelectorAll("li");
  var ol = banner.querySelector("ol");
  var points = ol.querySelectorAll("li");

  var liWidth = banner.offsetWidth;
  var count = 1;

  var interval = 3000;

  var timeId = setInterval(function () {

    count++;
    addTransition();
    setTranslate(-count * liWidth);

  }, interval);

  //注册过渡结束事件
  ul.addEventListener("transitionend", function () {

    //瞬间切换图片
    if (count >= imgs.length - 1) {
      count = 1;
    }
    if (count <= 0) {
      count = imgs.length - 2;
    }
    removeTransition();
    setTranslate(-count * liWidth);


    //同步小圆点  1-8,让count-1对应的小圆点亮起来
    points.forEach(function (e) {
      e.classList.remove("now");
    })
    points[count - 1].classList.add("now");


  });


  //1. 记录手指的初始的位置
  //2. 清除定时器
  var startX = 0;
  var startTime = 0; //开始的时间
  ul.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startTime = new Date();
    clearInterval(timeId);
  });

  //获取手指移动的距离，让ul在原来的基础上移动
  ul.addEventListener("touchmove", function (e) {

    var distance = e.touches[0].clientX - startX;
    removeTransition();
    setTranslate(-count * liWidth + distance);

  });

  //根据滑动的距离，判断是否要去下一屏或者上一屏
  //超过正的1/3屏，去上一屏
  //超过负的1/3屏，去下一屏
  //如果不超过1/3屏，留在当前屏

  //支持快速滑动，  如果持续时间<200ms,只需要滑动距离超过50px就算滑动成功
  ul.addEventListener("touchend", function (e) {

    var distance = e.changedTouches[0].clientX - startX;
    var duration = new Date() - startTime;
    console.log(distance, duration);

    if (distance >= liWidth / 3 || (duration <= 200 && distance >= 50)) {
      //去上一屏
      count--;

    } else if (distance <= -liWidth / 3 || duration <= 200 && distance <= -50) {
      //去下一屏
      count++;

    } else {
      //留在当前屏
    }

    addTransition();
    setTranslate(-count * liWidth);

    timeId = setInterval(function () {

      count++;
      addTransition();
      setTranslate(-count * liWidth);

    }, interval);

  });


  //给window注册resieze事件，动态的修改的liWidth的值
  window.addEventListener("resize", function () {
    liWidth = banner.offsetWidth;

    setTranslate(-count * liWidth);
  });

  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }

  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  function setTranslate(value) {
    ul.style.transform = "translateX(" + value + "px)";
    ul.style.webkitTransform = "translateX(" + value + "px)";
  }


})();