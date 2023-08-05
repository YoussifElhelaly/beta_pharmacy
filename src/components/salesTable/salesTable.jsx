import { useRecoilState } from 'recoil'
import './salesTable.css'
import DetailsId from '../../../Atom/DetailsId'
import openDetails from '../../../Atom/openDetails'
import { Skeleton } from '@mui/material'

function SalesTable(props) {
    const [id, setId] = useRecoilState(DetailsId)
    const [DetailsOpen, setDestailsOpen] = useRecoilState(openDetails)
    let isLoading = props.loading
    console.log(props)

    return (
        <table className="salesTable border w-full bg-[#373854]">
            <thead>
                <tr>

                    <th></th>
                    <th>المستخدم</th>
                    <th>تاريخ الطلبية</th>
                    <th>وقت المبيعة</th>
                    <th>سعر المبيعة</th>
                    <th>الكمية</th>
                    <th>رقم الطلب</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {
                    isLoading ?
                        <>
                            <tr>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>
                            <tr>
                                <td>
                                    <Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} />
                                </td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                                <td><Skeleton sx={{ bgcolor: '#f1f1f170' }} variant="rectangular" className="my-2 rounded-md" width={"100%"} height={30} /></td>
                            </tr>

                        </>
                        :

                        props.data.map((sale, index) => {
                            console.log(sale)
                            return (
                                <tr key={index}>
                                    <td>
                                        <button onClick={() => {
                                            console.log("5lsaa")
                                            setId(sale.id)
                                            setDestailsOpen(true)
                                        }}>تفاصيل المبيعة</button>
                                    </td>
                                    <td>
                                        {sale.pharmacist}
                                    </td>
                                    <td>
                                        {sale.sold_at.split("T")[0]}
                                    </td>
                                    <td>
                                        {sale.sold_at.split("T")[1].split(".")[0]}
                                    </td>
                                    <td>
                                        {sale.total} $
                                    </td>
                                    <td>
                                        {sale.sold_items.length} units
                                    </td>
                                    <td>{sale.sold_number}</td>
                                </tr>
                            )
                        })
                }

            </tbody>
        </table>
    )
}

export default SalesTable