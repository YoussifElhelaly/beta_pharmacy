import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import axios from "axios";
import { BaseUrl } from "./app/layout";

export default function checkLog() {


  async function getNewToken() {
    let result = await axios.post(`${BaseUrl}/auth/refresh/`, {
      "refresh": Cookies.get("refreshToken")
    })
      .then(function (response) {
        Cookies.set("islogged", true)
        Cookies.set("accessToken", response.data.access)
        Cookies.set("refreshToken", response.data.refresh)
      })
      .catch(function (error) {
      });

  }

  if (Cookies.get("accessToken") != undefined && Cookies.get("accessToken") != "") {
    const tokken = Cookies.get("accessToken")
    var decoded = jwt_decode(tokken);
    var currentDate = new Date()
    if ((decoded.exp * 1000) < currentDate.getTime()) {
      getNewToken()
    }
  }
  if (Cookies.get("accessToken") == undefined ||
    Cookies.get("refreshToken") == undefined
  ) {
    Cookies.set("islogged", false)
    Cookies.set("accessToken", "")
    Cookies.set("refreshToken", "")
    window.location.reload()
  }
}
