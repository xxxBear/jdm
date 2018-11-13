//功能实现
//思路：
//1. 给ul注册3个事件 touchstart touchmove touchend
//2. 在touchstart中获取到开始位置
//3. 在touchmove中获取到移动的距离，让ul跟着移动
//4. 松手的时候，判断一个范围

/*;(function () {

  var nav = document.querySelector(".jd_content .nav");
  var ul = nav.querySelector("ul");


  //记录开始的位置
  var startY;
  //核心的变量，用来记录每次滑动后的位置
  var current = 0;
  ul.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  });

  ul.addEventListener("touchmove", function (e) {

    var distance = e.touches[0].clientY - startY;
    //清除过渡
    removeTransition();
    //在原来的基础上设置位置
    setTranslate(current + distance);

  });

  //结束时，就应该把本地滑动的记录给添加到current里面。
  ul.addEventListener("touchend", function (e) {
    var distance = e.changedTouches[0].clientY - startY;
    current += distance;
    console.log(current);
    //判断current
    if(current > 0) {
      current = 0;
    }
    if(current < nav.offsetHeight - ul.offsetHeight) {
      current = nav.offsetHeight - ul.offsetHeight
    }

    addTransition();
    setTranslate(current);

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
    ul.style.transform = "translateY("+ value +"px)";
    ul.style.webkitTransform = "translateY("+ value +"px)";
  }


})();*/



//使用iscroll的步骤：
//1. 要满足条件：  父盒子里面要有一个子盒子，子盒子大大小超过父盒子
window.onload = function () {
  new IScroll(".nav", {
    scrollY:true,
    scrollX:false
  });

  new IScroll(".main");
}