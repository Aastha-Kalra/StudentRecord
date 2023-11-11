import React, { useState, useEffect } from "react";
import {BiSolidPencil} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import  {toast}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    course:"",
    address:"",
    grade:"",
    gender:"",

  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []); 


  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      localStorage.setItem("tableData", JSON.stringify(tempTableData));
      setEditClick(false);
      setInputs({
        name: "",
        email: "",
        course:"",
        address:"",
        grade:"",
        gender:"",
      });
    } else {
      if(inputs.name.trim()!== ""  ||
      inputs.email.trim() !== "" ||
      inputs.course.trim() !== "" ||
      inputs.address.trim() !== "" ||
      inputs.grade.trim() !== "" ||
      inputs.gender.trim() !== ""){
        setTableData([...tableData, inputs]);
        localStorage.setItem("tableData", JSON.stringify([...tableData, inputs]));
        setInputs({
          name: "",
          email: "",
          course:"",
          address:"",
          grade:"",
          gender:"",
        })     
      }
      else{
 toast.error("Please fill the details...", {
  position:"top-left"
 })
      }
    }
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
    localStorage.setItem("tableData", JSON.stringify(filterData));

  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email, course: tempData.course, address: tempData.address, grade: tempData.grade, gender: tempData.gender });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="min-h-screen bg-indigo-950 pb-10">
      <h1 className="text-center text-white font-bold text-3xl py-5">Student Data Collection</h1>
    <div className="xl:px-44 lg:px-14 px-4">
    <div className="bg-[#e5e4e4]  m-auto p-3 sm:p-10">
        <form onSubmit={handleSubmit} >
          <div className="grid sm:grid-cols-2 grid-cols-1 justify-center items-center gap-10">
          <div className="flex flex-col w-full">
            <label className="text-indigo-950 font-semibold text-2xl ">Name</label>
            <input name="name" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl w-full" value={inputs.name} onChange={handleChange} />
          </div>
      
          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl">Email</label>
            <input name="email" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.email} onChange={handleChange} />
          </div>
   

          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl">Course</label>
            <input name="course" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.course} onChange={handleChange} />
          </div>


          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl">Address</label>
            <input name="address" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.address} onChange={handleChange} />
          </div>
         

          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl">Grade</label>
            <input name="grade" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.grade} onChange={handleChange} />
          </div>


          
          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl">Gender</label>
            <input name="gender" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.gender} onChange={handleChange} />
          </div>
       
          </div>
          
         
        <button type="submit" className="w-full bg-indigo-950 text-white mt-8 h-16 rounded text-3xl font-bold p-3">
            {editClick ? "update" : "Add"}
          </button>
        
        </form>
      </div>
    </div>
      <div className="xl:px-44 lg:px-14 px-4 md:overflow-hidden overflow-x-scroll w-full">
        <table className="w-full text-center bg-sky-600">
          <thead className="h-10">
            <tr className="text-indigo-950 text-3xl">
              <th className="bg-yellow-400 p-3">Name  </th>
              <th className="bg-blue-400">Email  </th>
              <th className="bg-red-400">Course </th>
              <th className="bg-white">Address  </th>
              <th className="bg-black">Grade  </th>
              <th className="bg-orange-400">Gender  </th>
              <th className="bg-yellow-400">Actions </th>
            </tr>
          </thead>
          <tbody className="text-red-900 font-semibold">
            {tableData.map((item, i) => (
              <tr key={i} className="bg-orange-200 border-4 border-green-700 my-3 text-2xl h-16">
                <td  className="bg-yellow-400 p-3">{item.name}</td>
                <td className="bg-blue-400">{item.email}</td>
                <td className="bg-red-400">{item.course}</td>
                <td  className="bg-white">{item.address}</td>
                <td className="bg-black">{item.grade}</td>
                <td className="bg-orange-400">{item.gender}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-green-600"
                  >
                   <BiSolidPencil/>
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    <AiFillDelete/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;