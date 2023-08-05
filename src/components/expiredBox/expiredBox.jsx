import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import token from "../../../Atom/accessToken";
import { BaseUrl } from "@/app/layout";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Cookies from "js-cookie";

function ExpiredBox() {
    const [data, setData] = useState([])
    const accessToken = useRecoilValue(token)
    const [isLoading, setisLoading] = useState(true)


    async function getData() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get/expire-soon/`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response)
                setisLoading(false)
                setData(response.data.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    Cookies.set("islogged", false)
                    window.location.reload()
                }
                console.log(error.response)
            }
            );
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="exipredBox bg-bgPrimary w-[49%] p-5 rounded-3xl">
            <h3>دواء ينتهي صلاحيتة قريبا</h3>
            <div className="details">
                <ul className="w-[100%]">
                    {
                        isLoading ?
                            <div className="skeletonContainer">
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                <Skeleton variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                            </div>
                            :
                            data?.map((product, index) => {
                                return (
                                    <li key={index} className="flex my-2 justify-between bg-[#ECC9C9] px-2 py-1 rounded-md">
                                        <span className="w-[30%]">{product.exp_date}</span>
                                        <span className="w-[30%] text-center" dir="ltr">{product.stock} units</span>
                                        <p className="w-[30%] text-left">{product.name}</p></li>

                                )
                            })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ExpiredBox