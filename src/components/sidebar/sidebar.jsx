'use client'

import Image from 'next/image'
import checkIcon from '../../Img/check icon.png'
import blockIcon from '../../Img/blockIcon.png'
import inventoryIcon from '../../Img/inventoryIcon.png'
import addUserIcon from '../../Img/addUserIcon.png'
import exitIcon from '../../Img/exitIcon.png'
import homeIcon from '../../Img/homeIcon.png'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { BaseUrl } from '@/app/layout'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import token from '../../../Atom/accessToken'

function Sidebar() {
    const pathName = usePathname();
    const tokken = useRecoilValue(token)

    async function logOut() {
        const options = {
            method: 'POST',
            url: `${BaseUrl}/auth/logout/`,
            data: {
                "refresh": Cookies.get("refreshToken")
            }
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response)
                Cookies.set("islogged", false)
                Cookies.set("accessToken", "")
                Cookies.set("refreshToken", "")
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error)
            });

    }


    return (
        <div className="sidebar fixed top-[25px] w-fit h-[100%] bg-bgPrimary rounded-[70px] w-[100%]">
            <ul className="flex justify-around h-full flex-col py-[50px] text-2xl 2xl:text-[28px]">
                <h2 className="text-center text-primary text-[40px] font-semibold" >Alarm</h2>
                <li className={` ${pathName === "/" || "" ? "bg-[#fff]" : ""} flex items-center pt-[10px] px-[35px] rounded-tr-full rounded-br-full 2xl:py-4 2xl:px-10 font-[500] mr-[50px]`}>
                    <Image className='ml-5' src={homeIcon} alt='icon'></Image>
                    <Link className=" block w-full " href="../../../">الرئيسية</Link>
                </li>
                <li className={` ${pathName === "/sales" || "" ? "bg-[#fff]" : ""} flex items-center pt-[10px] px-[35px] rounded-tr-full rounded-br-full 2xl:py-4 2xl:px-10 font-[500] mr-[50px]`}>
                    <Image className='ml-5' src={checkIcon} alt='icon'></Image>
                    <Link className=" block w-full " href="../sales">المبيعات</Link>
                </li>
                <li className={` ${pathName === "/inventory" || "" ? "bg-[#fff]" : ""} flex items-center pt-[10px] px-[35px] rounded-tr-full rounded-br-full 2xl:py-4 2xl:px-10 font-[500] mr-[50px]`}>
                    <Image className='ml-5' src={inventoryIcon} alt='icon'></Image>
                    <a className=" block w-full " href="../inventory">المخزون</a>
                </li>
                <li className={` ${pathName === "/block" || "" ? "bg-[#fff]" : ""} flex items-center pt-[10px] px-[35px] rounded-tr-full rounded-br-full 2xl:py-4 2xl:px-10 font-[500] mr-[50px]`}>
                    <Image className='ml-5' src={blockIcon} alt='icon'></Image>
                    <a className=" block w-full " href="../block">قائمة الحظر</a>
                </li>
                <li className={` ${pathName === "/adduser" || "" ? "bg-[#fff]" : ""} flex items-center pt-[10px] px-[35px] rounded-tr-full rounded-br-full 2xl:py-4 2xl:px-10 font-[500] mr-[50px]`}>
                    <Image className='ml-5' src={addUserIcon} alt='icon'></Image>
                    <a className=" block w-full " href="../addUser">إضافة صيدلي</a>
                </li>
                <li onClick={() => {
                    logOut()

                }} className={"flex items-center pt-[10px] px-[35px] rounded-tr-full rounded-br-full 2xl:py-4 2xl:px-10 font-[500] mr-[50px]"}>
                    <Image className='ml-5' src={exitIcon} alt='icon'></Image>
                    <a className=" block w-full " href="#">تسجيل الخروج</a>
                </li>
            </ul>
        </div >
    )
}

export default Sidebar