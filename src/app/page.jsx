'use client'

import Layout from '../components/layout/layout'
import HomeBox from '../components/homeBox/homeBox'
import ExpiredBox from '../components/expiredBox/expiredBox'
import SalesBox from '../components/salesBox/salesBox'
import HomeBoxList from '../components/homeBoxList/homeBosList'
import { useRecoilState, useRecoilValue } from 'recoil'
import token from '../../Atom/accessToken'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from './layout'
import Cookies from 'js-cookie'




export default function Home() {


  const [accessToken, setToken] = useRecoilState(token)
  const [data, setDate] = useState([])
  const [isLoading, setisLoading] = useState(true)

  async function getMedicine() {
    const options = {
      method: 'GET',
      url: `${BaseUrl}/medicine/get/all/`,
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },

    }
    let result = await axios.request(options)
      .then(function (response) {
        setisLoading(false)
        setDate(response.data.data)
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          Cookies.set("islogged", false)
          window.location.reload()
        }
      }
      );
  }



  useEffect(() => {
    getMedicine()
  }, [])

  return (
    <Layout>
      <section className="home h-[calc(100vh-140px)]">

        <div className="boxWrapper flex flex-wrap gap-x-[40px] gap-y-[30px]">
          <HomeBox type="orders" primary="Vilot" secondry="VilotLow" title="إجمالي المبيعات" />
          <HomeBox type="sales" primary="Red" secondry="RedLow" title="اجمالي الطلابات" />
          <HomeBox primary="Green" secondry="GreenLow" type="sales" />
          <HomeBoxList loading={isLoading} secondry="GreenLow" data={data} name=" الدواء المضاف حديثا" />
        </div>
        <div className="infoWrapper flex justify-between mt-10">
          <SalesBox />
          <ExpiredBox />
        </div>
      </section>
    </Layout>
  )
}
