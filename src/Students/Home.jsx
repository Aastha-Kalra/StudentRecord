import React, { useState } from "react";

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
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        email: "",
        course:"",
        address:"",
        grade:"",
        gender:"",
      });
    }
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="min-h-screen bg-indigo-950">
      <h1 className="text-center text-white font-bold text-3xl py-5">Student Data Collection</h1>
    <div className="px-44">
    <div className="bg-[#e5e4e4]  m-auto p-10">
        <form onSubmit={handleSubmit} >
          <div className="grid grid-cols-2 justify-center items-center gap-10">
          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl ">Name</label>
            <input name="name" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.name} onChange={handleChange} />
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
            <input name="address" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.course} onChange={handleChange} />
          </div>
         

          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl">Grade</label>
            <input name="grade" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.course} onChange={handleChange} />
          </div>


          
          <div className="flex flex-col">
            <label className="text-indigo-950 font-semibold text-2xl">Gender</label>
            <input name="gender" className="h-12 my-1 rounded focus:outline-none p-2 text-2xl" value={inputs.course} onChange={handleChange} />
          </div>
       
          </div>
          
         
        <button type="submit" className="w-full my-6 bg-indigo-950 text-white mt-3 h-16 rounded text-3xl font-bold p-3">
            {editClick ? "update" : "Add"}
          </button>
        
        </form>
      </div>
    </div>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Address</th>
              <th>Grade</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
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