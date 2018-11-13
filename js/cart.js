/**
 * Created by HUCC on 2018/6/5.
 */
;(function () {


  //1. 选中与不选中
  var all = document.querySelectorAll(".jd_checkbox");
  all.forEach(function (element, index) {
    element.addEventListener("click", function () {
      this.classList.toggle("checked");
    });
  });


  //全选功能
  //1. 给所有的goods_title里的checkbox注册事件
  //2. 让对应的goods_content下的所有的checkbox选中，或者不选中
  var titles = document.querySelectorAll(".goods_title .jd_checkbox");

  titles.forEach(function (element) {
    element.addEventListener("click", function () {
      //让当前元素的兄弟下的checkbox
      var eles = this.parentNode.nextElementSibling.querySelectorAll(".jd_checkbox");
      var isChecked = this.classList.contains("checked");
      eles.forEach(function (e) {
        if(isChecked) {
          e.classList.add("checked");
        }else {
          e.classList.remove("checked");
        }
      });

    });
  });




})();


//功能：遮罩框相关
;(function () {

  //1. 给按钮注册点击事件
  //2. 让遮罩框显示出来
  //3. 让盖子翻起来

  var deleteBoxes = document.querySelectorAll(".delete_box");
  var mask = document.querySelector(".jd_mask");
  var cancel = document.querySelector(".cancel");

  var gai;

  deleteBoxes.forEach(function (e) {
    e.addEventListener("click", function () {

      //显示遮罩框
      mask.style.display = "block";

      //翻盖子
      gai = this.firstElementChild;
      gai.style.transform = "rotate(30deg)";
      gai.style.transformOrigin = "right bottom";
      gai.style.transition = "all 1s";



    })
  });



  //给取消按钮注册点点击事件，让盖子翻回来，让遮罩层继续隐藏
  cancel.addEventListener("click", function () {
    mask.style.display = "none";
    console.log("1111");
    //盖子回来
    gai.style.transform = "rotate(0deg)";

  });


})();