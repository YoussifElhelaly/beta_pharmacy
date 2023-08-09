'use client'
import Image from "next/image"
import searchIcon from '../../Img/searchIcon.png'
import notifIcon from '../../Img/bellIcon.png'
import person from '../../Img/personIcon.png'
import { use, useEffect, useRef, useState } from "react"
import axios from "axios"
import { BaseUrl } from "@/app/layout"
import { useRecoilSnapshot, useRecoilState, useRecoilValue } from "recoil"
import token from "../../../Atom/accessToken"
import { Badge } from "@mui/material"
import DetailsProduct from "../DetailsProduct/DetailsProduct"
import search from "../../../Atom/search"
import { toast } from "react-toastify"


function Navbar() {

    const [isOpen, setOpen] = useState(false)
    const [data, setData] = useState([])
    const accessToken = useRecoilValue(token)
    const [isSearch, setSearch] = useRecoilState(search)
    const searchInp = useRef(null)
    const [searchProduct, setSearchProduct] = useState({})

    async function getNotifiction() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/notification/get/all/`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response.data.data)
                setData(response.data.data)

            })
            .catch(function (error) {

            }
            );
    }
    async function getProduct(id) {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get-barcode/${id}/`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {

                setSearchProduct(response.data.data)
                setSearch(true)
                toast.success("تم البحث عن الدواء")

            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    Cookies.set("islogged", false)
                    window.location.reload()
                }
                toast.error("لا يوجد منتج لهذا الكود")
            }
            );
    }




    useEffect(() => {
        getNotifiction()
    }, [])

    return (
        <>
            <nav className="flex bg-[#fff] items-center justify-between mb-8">
                <div className="search w-[450px] ">
                    <div className="input rounded-full bg-bgPrimary relative ">
                        <Image src={searchIcon} className="absolute right-5 top-[50%] translate-y-[-50%]" alt="icon"></Image>
                        <input ref={searchInp} onKeyUp={(e) => {

                            if (e.code == "Enter" || e.code == "NumpadEnter") {
                                getProduct(searchInp.current.value)
                            }
                        }} type="text" name="search" placeholder="بحث"
                            className="rounded-full w-full text-2xl py-2 pr-[50px] bg-bgPrimary placeholder:text-[#000] placeholder:text-[22px] " />
                    </div>
                </div>
                <div className="userInfo flex justify-between items-center">
                    <div className="notifictionBox relative">
                        <div className="icon">
                            <Badge badgeContent={data.length} className="z-[20]" color="error">

                                <Image onClick={() => setOpen(!isOpen)} src={notifIcon} className="w-[30px] h-[30px] cursor-pointer" alt="icon"></Image>
                            </Badge>
                        </div>
                        <div onMouseLeave={() => { setOpen(false) }} className={`notifictionWrapper absolute left-0 top-full
                     bg-[#fff]  w-[380px]
                     ${isOpen ? "h-[320px]" : "h-0"}
                     transition-[0.5s]
                     z-50
                      overflow-auto rounded-md shadow-md`}>
                            <ul className="notifictionList py-5">
                                {
                                    data?.map((notifi, index) => {
                                        return (
                                            <>
                                                <li key={index} className="notifictionItem text-secondary p-4 odd:bg-bgPrimary even:bg-[#fff]">
                                                    <h3 className="text-[24px]">{notifi.content}</h3>
                                                    <p>كود المنتج 225848964</p>
                                                </li>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="userImage mr-12 border-secondary border-4 rounded-full overflow-hidden">
                        <Image src={person} alt="profile-picture" ></Image>
                    </div>
                </div>
            </nav>
            {
                isSearch ? <DetailsProduct search={true} currentProduct={searchProduct} /> : null
            }
        </>
    )
}

export default Navbar