export function Toast(msg) {
  var m = document.createElement("div");
  m.innerHTML = msg;
  m.style.cssText =
    "width:60%;padding:10px 20px;color: rgb(255, 255, 255);padding:15px;text-align: center;border-radius: 10px;position: fixed;bottom: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 19px;";
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition =
      "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
    m.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(m);
    }, d * 3000);
  }, 3000);
}
