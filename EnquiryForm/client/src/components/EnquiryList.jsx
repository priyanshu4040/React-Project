import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import '../index.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function EnquiryList({ data, getAllEnquiry, Swal, setFormData }) {



  let deleteRow = (delid) => {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`).then((delid) => {
          toast.success('Enquiry Deleted Successfully')
          getAllEnquiry()
        }).catch((err) => { console.log(err) })
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  let editRow = (editid) => {
    axios.get(`http://localhost:8020/api/website/enquiry/single/${editid}`).then((res) => {
      let data = res.data
      setFormData(data.enquiry)
    })

  }

  return (
    <div className='bg-purple-300 p-4'>

      <h2 className='text-[20px] font-bold p-2'>Enquiry Form</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr no.</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
            </TableRow>
          </TableHead>


          <TableBody className="divide-y">


            {
              data.length >= 1 ?
                data.map((item, index) => {
                  return (

                    <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>
                        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer" onClick={() => { deleteRow(item._id) }}>Delete</button>
                      </TableCell>
                      <TableCell>
                        <button onClick={() => { editRow(item._id) }} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointer">Update</button>
                      </TableCell>
                    </TableRow>

                  )
                })
                :
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell colSpan={7} className="text-center">No Data Found</TableCell>
                </TableRow>
            }


          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EnquiryList