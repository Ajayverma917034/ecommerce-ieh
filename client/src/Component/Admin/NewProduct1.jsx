import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { alertOption } from "../../Stores/actions/notificationAction";
import { ClearsErrors, createProduct } from "../../Stores/actions/productAction";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../Stores/constants/productContants";
import MetaData from "../metaData/MetaData";
import Sidebar from "./Sidebar";
import profileimg from "../../img/avtarimg.jpg"
import { AccountTree, AttachMoney, Description, Discount, Spellcheck, Storage } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [heading, setHeading] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors());
        }

        if (success) {
            dispatch(alertOption({ open: true, severity: 'error', message: "Product Created Successfully" }))
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("heading", heading);
        myForm.set("price", price);
        myForm.set("discount", discount);
        // myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const handleToggle = () => {
        setOpen(!open)
    }

    const Adddescription = () => {
        setDesc1({ image: image, desc: desc })
        setOpen(false)
        setDescription([...description, desc1])
        console.log(description)

    }

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <Discount />
                            <input
                                type="number"
                                placeholder="Discount without % sign"
                                required
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        {/* <div>
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div> */}

                        <div>
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <div>
                            <Button style={{ backgroundColor: '#ef9273' }} onClick={handleToggle}>
                                Add Description
                            </Button>
                            <Button style={{ backgroundColor: '#ef9273' }} >
                                View Description
                            </Button>
                        </div>

                        <Dialog
                            open={open}
                            onClose={handleToggle}

                        >
                            <DialogTitle>Add Description</DialogTitle>
                            <DialogContent className="submitDialog">
                                <div id="registerImage">
                                    <img src={imagePreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={setInputImage}
                                    />
                                </div>

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={Adddescription} color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;