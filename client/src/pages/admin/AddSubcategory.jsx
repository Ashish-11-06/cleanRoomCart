import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Input, Form, Button } from 'antd';
const { TextArea } = Input;
import axios from 'axios';

const AddSubcategory = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categories, setCategories] = useState([]); // Store categories
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [subcategories, setSubcategories] = useState([]); // Store subcategories
    const [subcategory, setSubcategory] = useState({
        categoryId: "",
        name: "",
        shortDescription: "",
        detailedDescription: "",
        image: null
    });

    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [editingSubcategory, setEditingSubcategory] = useState(null);


    // Fetch categories from DB
    useEffect(() => {
        axios.get("http://localhost:5001/api/category/get")
            .then((response) => {
                console.log("Fetched categories:", response.data); // Debugging log
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });

        fetchSubcategories();
    }, []);

    // Fetch subcategories from DB
    // const fetchSubcategories = (categoryId) => {
    //     axios.get(http://localhost:5001/api/subcategory/get/${categoryId})
    //         .then((response) => {
    //             console.log("Fetched subcategories:", response.data);
    //             setSubcategories(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching subcategories:", error);
    //             setSubcategories([]);
    //         });
    // };
    
    const fetchSubcategories = () => {
        axios.get("http://localhost:5001/api/subcategory/get")
        .then((response) => {
            console.log("Fetched subcategories:", response.data); 
            if (Array.isArray(response.data.subCategories)) {
                setSubcategories(response.data.subCategories); 
            } else {
                console.error("Subcategories is not an array:", response.data);
                setSubcategories([]); // Reset to an empty array if incorrect format
            }
        })
        .catch((error) => {
            console.error("Error fetching subcategories:", error);
            setSubcategories([]); // Reset to avoid undefined issues
        });
    };

    // const handleCategoryChange = (categoryId) => {
    //     const filteredSubcategories = allSubcategories.filter(sub => sub.categoryId === categoryId);
    //     setSubcategories(filteredSubcategories);
    // };

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubcategory((prev) => ({ ...prev, [name]: value }));
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        setSubcategory((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting subcategory:", subcategory);

        const formData = new FormData();
        formData.append("categoryId", subcategory.categoryId);
        formData.append("name", subcategory.name);
        formData.append("shortDescription", subcategory.shortDescription);
        formData.append("detailedDescription", subcategory.detailedDescription);
        formData.append("image", subcategory.image);

        axios.post("http://localhost:5001/api/subcategory/add", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((response) => {
            console.log("Subcategory added:", response.data);
            setIsFormOpen(false);
            setSubcategory({
                categoryId: "",
                name: "",
                shortDescription: "",
                detailedDescription: "",
                image: null
            });

            fetchSubcategories(); // Refresh subcategories after adding
        })
        .catch((error) => {
            console.error("Error adding subcategory:", error);
        });
    };

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const handleEdit = (subcategoryId) => {
        const subcategoryToEdit = subcategories.find(sub => sub._id === subcategoryId);
        setSelectedSubcategory(subcategoryToEdit);
    };

    // const handleUpdate = () => {
    //     axios.put(http://localhost:5001/api/subcategory/update/${selectedSubcategory._id}, selectedSubcategory)
    //         .then(response => {
    //             console.log("Subcategory updated:", response.data);
    //             setIsEditModalOpen(false); // Close the modal
    //             fetchSubcategories(); // Refresh subcategories after update
    //         })
    //         .catch(error => {
    //             console.error("Error updating subcategory:", error);
    //         });
    // };
   
   
    // const handleEditChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditingSubcategory((prev) => ({ ...prev, [name]: value }));
    // };

    const handleModalSubmit = () => {
        console.log("Updated Subcategory: ", selectedSubcategory); // Log data before submitting
        axios.put(`http://localhost:5001/api/subcategory/update/${selectedSubcategory._id}`, selectedSubcategory)
            .then(response => {
                console.log("Subcategory updated:", response.data);
                setSelectedSubcategory(null); // Close the modal
                fetchSubcategories(); // Refresh subcategories after update
            })
            .catch(error => {
                console.error("Error updating subcategory:", error);  // More detailed error logging
            });
    };
   
    const handleDelete = (subcategoryId) => {
        axios.delete(`http://localhost:5001/api/subcategory/delete/${subcategoryId}`)
            .then((response) => {
                console.log("Subcategory deleted:", response.data);
                fetchSubcategories(); // Refresh subcategories after deletion
            })
            .catch((error) => {
                console.error("Error deleting subcategory:", error);
            });
    };

    // Group subcategories by categoryId
    // const groupedSubcategories = categories.map(category => ({
    //     ...category,
    //     subcategories: subcategories.filter(sub => sub.categoryId === category._id)
    // }));

    return (
        <div>
            <div style={{display:'flex', justifyContent:'space-between',paddingRight:'20px', paddingLeft:'20px', backgroundColor:'#d8e4f2', borderRadius:'10px'}}>
                <h1>Sub-Categories</h1>
                <button style={{width:'200px', height:'50px', marginTop:'13px'}} onClick={toggleForm}>Add Subcategory</button>
            </div>

            {isFormOpen && (
                <div style={{ marginTop: "20px", padding: "10px", background: "#fff", borderRadius: "10px" }}>
                    <h2>Add Subcategory</h2>
                    <form style={{backgroundColor:'#d8e4f2', alignItems:'center'}} onSubmit={handleSubmit}>
                        <label style={{ padding: '0px 0px 8px 0px' }}>Select Category</label>
                        <select style={{padding:'5px 0px 5px 0px', borderRadius:'5px', width:'100%'}} name="categoryId" value={subcategory.categoryId} onChange={handleChange} required>
                            <option value="">-- Select a Category --</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                        <br />
                        <label style={{padding:'18px 0px 8px 0px'}}>Subcategory Name</label>
                        <input type="text" name="name" value={subcategory.name} onChange={handleChange} placeholder="Enter Subcategory name" required />
                        <br />
                        <label style={{padding:'10px 0px 8px 0px'}}>Short Description</label>
                        <textarea name="shortDescription" value={subcategory.shortDescription} onChange={handleChange} placeholder="Enter a short description"></textarea>
                        <br />
                        <label style={{padding:'10px 0px 8px 0px'}}>Detailed Description</label>
                        <textarea name="detailedDescription" value={subcategory.detailedDescription} onChange={handleChange} placeholder="Enter detailed description"></textarea>
                        <br />
                        <label style={{padding:'10px 0px 8px 0px'}}>Subcategory Image</label>
                        <input style={{padding:'0px 0px 20px 0px'}} type="file" onChange={handleFileChange} />
                        <br />
                        <button type="submit" style={{ background: "#40476D", color: "#fff", padding: "10px 20px", border: "none", cursor: "pointer" }}>
                            Save Subcategory
                        </button>
                    </form>
                </div>
            )}

            {/* Display Categories and Subcategories */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {categories.map(category => (
                    <div key={category._id} style={{
                        background: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        width: '300px'
                    }}>
                        {/* Category Header */}
                        <div style={{
                            backgroundColor: '#40476D',
                            color: '#fff',
                            padding: '10px',
                            textAlign: 'center',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                            fontWeight: 'bold'
                        }}>
                            {category.name}
                        </div>

                        {/* Subcategories List */}
                        <div style={{ padding: '10px' }}>
                            {subcategories.filter(sub => sub.categoryId === category._id).map((sub)=> (
                                <div key={sub._id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '5px 0',
                                    borderBottom: '1px solid #40476D'
                                }}>
                                    <span>{sub.name}</span>
                                    <div>
                                        <EditOutlined 
                                            style={{ cursor: 'pointer', marginRight: '10px', color: '#1890ff' }} 
                                            onClick={() => handleEdit(sub._id)} 
                                        />
                                        <DeleteOutlined 
                                            style={{ cursor: 'pointer', color: 'red' }} 
                                            onClick={() => handleDelete(sub._id)} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal for Editing Subcategory */}
            {selectedSubcategory && (
                <Modal
                    title="Edit Subcategory"
                    open={true}
                    onCancel={() => setSelectedSubcategory(null)}
                    onOk={handleModalSubmit}
                >
                    <Form style={{padding:'0px 10px 0px 0px', width:'400px'}}>
                        <Form.Item style={{padding:'10px 0px 0px 10px', width:'380px', marginBottom:'5px'}}
                        label="Subcategory Name">
                            <Input style={{display:'block'}}
                                value={selectedSubcategory.name}
                                onChange={(e) => setSelectedSubcategory({ ...selectedSubcategory, name: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item style={{padding:'0px 0px 0px 10px'}}
                        label="Short Description">
                            <TextArea
                                value={selectedSubcategory.shortDescription}
                                onChange={(e) => setSelectedSubcategory({ ...selectedSubcategory, shortDescription: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item style={{padding:'0px 0px 0px 10px'}}
                        label="Detailed Description">
                            <TextArea
                                value={selectedSubcategory.detailedDescription}
                                onChange={(e) => setSelectedSubcategory({ ...selectedSubcategory, detailedDescription: e.target.value })}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};

export default AddSubcategory;