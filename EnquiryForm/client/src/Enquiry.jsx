import React from "react";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import EnquiryList from "./components/EnquiryList";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'

function Enquiry() {

  let [enquiryList, setEnquiryList] = React.useState([])

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: ""
  });

  let saveEnquiry = (e) => {
    e.preventDefault();


    //Handling Data without states
    //     let formData = {
    //   name:e.target.name.value,
    //   email:e.target.email.value,
    //   phone:e.target.phone.value,
    //   message:e.target.message.value
    // }

    if (formData._id) {
      //Apply update logic
      axios
        .put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, formData)
        .then(() => {

          toast.success('Enquiry Updated Succesfully')
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: ""
          });
          getAllEnquiry()
        });
    }
    else {
      axios
        .post(`http://localhost:8020/api/website/enquiry/insert`, formData)
        .then((res) => {
          console.log(res.data);
          toast.success('Enquiry Saved succesfully')
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          getAllEnquiry()
        });
    }


  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let getAllEnquiry = () => {
    axios.get(`http://localhost:8020/api/website/enquiry/view`).then((res) => { return res.data }).then((finalData) => {
      setEnquiryList(finalData.enquiryList)
    }).catch((err) => { console.log(err) })
  }

  React.useEffect(() => { getAllEnquiry() }, [])

  return (
    <>
      <ToastContainer />
      <h1 className=" text-[40px] text-center py-6 font-bold">User Enquiry</h1>

      <div className="grid grid-cols-[30%_auto] gap-4">
        {/* Table  left part */}
        <div className="bg-gray-200 p-3">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>

          <form action="" onSubmit={saveEnquiry}>
            {/* Name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Name</Label>
              </div>
              <TextInput
                id="name"
                onChange={getValue}
                value={formData.name}
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput
                id="email"
                onChange={getValue}
                value={formData.email}
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone">Phone</Label>
              </div>
              <TextInput
                id="phone"
                onChange={getValue}
                value={formData.phone}
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Message */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="message">Message</Label>
              </div>
              <Textarea
                id="message"
                onChange={getValue}
                value={formData.message}
                name="message"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
            <Button type="submit" className="w-[100%] mt-4 cursor-pointer">
              {formData._id ? 'Update' : 'Save'}
            </Button>
          </form>
        </div>

        {/* Table Right Part */}

        <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={Swal} setFormData={setFormData} />
      </div>
    </>
  );
}

export default Enquiry;
