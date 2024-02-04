import { useEffect } from "react";
import { fetchOrderAction } from "../../../redux/slices/orders/orderSlices";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import {useDispatch, useSelector} from 'react-redux';
import NoDataFound from "../../NoDataFound/NoDataFound";


export default function Customers() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchOrderAction())
  },[dispatch])

  const {loading, error, allOrders} = useSelector(state=>state?.order)
  const customers = allOrders?.order;

  //remove duplicates
  const uniqueCustomers = customers?.filter((item,idx)=>{
    return customers?.map((customer)=>customer?.id).indexOf(item.id) === idx
  })

  return (
  <>
  {error && <ErrorMsg message={error.message}/>}
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">All Customers[{uniqueCustomers?.length}]</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                      UserName
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Postcode
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone number
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200 bg-white">
                {loading ? <LoadingComponent/> : uniqueCustomers?.length<=0?<NoDataFound/>:
                uniqueCustomers?.map((person) => (
                    <tr key={person?.user?.username}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {person?.user?.username}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.user?.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.user?.shippingAddress?.country}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.user?.shippingAddress?.city}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person?.user?.shippingAddress?.postalCode}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person?.user?.shippingAddress?.phone}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))
              
                }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>  
  );
}
