import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'

export default function checkLog() {
  if (Cookies.get("accessToken")) {
    const tokken = Cookies.get("accessToken")
    var decoded = jwt_decode(tokken);
    var currentDate = new Date()
    if ((decoded.exp * 1000) < currentDate.getTime()) {
      Cookies.set("islogged", false)
    }
  }
  if (Cookies.get("accessToken") == undefined) {
    Cookies.set("islogged", false)
  }
}
