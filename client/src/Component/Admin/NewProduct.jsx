import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";

import { useSelector, useDispatch } from "react-redux";
import { ClearsErrors, createProduct } from "../../Stores/actions/productAction";
import { alertOption } from "../../Stores/actions/notificationAction";
import { NEW_PRODUCT_RESET } from "../../Stores/constants/productContants";
import Sidebar from "./Sidebar";
import MetaData from "../metaData/MetaData";
import { AccountTree, AttachMoney, Description, Discount, Spellcheck, Storage } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// import profileimg from "../../img/avtarimg.jpg"
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, } from "@mui/material";

const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [open, setOpen] = useState(false)

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [offer, setOffer] = useState("")
    const [details, setDetails] = useState([]);

    const categories = [
        "Laptop",
        "TV",
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
            dispatch(alertOption({ open: true, severity: 'success', message: "Product Created Successfully" }))
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("heading", name);
        myForm.set("price", price);
        myForm.set("discount", discount)
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        details.forEach((detail) => {
            myForm.append("details", detail)
        })

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
        setOpen(false)
    }
    const handleDelete = (item) => {
        setDetails(oldValues => {
            return oldValues.filter(fruit => fruit !== item)
        })
    }
    const handleAdd = () => {
        details.push(
            offer
        )
        setOffer("")
    }
    const handleView = () => {
        setOpen(true)
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <Discount />
                            <input
                                type="number"
                                placeholder="Discount"
                                required
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        <div>
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

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
                        <div>
                            <Button style={{ backgroundColor: '#ef9273', }} onClick={handleToggle}>
                                Add Description
                            </Button>
                            <Button style={{ backgroundColor: '#ef9273' }} onClick={handleView}>
                                View Description
                            </Button>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleToggle}

                        >
                            <DialogTitle>Add Description</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Stack
                                    sx={{
                                        alignItems: 'center',
                                        "& .MuiTextField-root": { width: '100%', maxWidth: 500, m: 1 }
                                    }}
                                >
                                    {

                                        details && details.map((item) => (
                                            <Chip label={item} key={item} onDelete={() => handleDelete(item)} />
                                        ))
                                    }
                                </Stack>
                                <input
                                    type="text"
                                    placeholder="Offer"
                                    required
                                    onChange={(e) => setOffer(e.target.value)}
                                />
                                {
                                    offer.length > 0 &&
                                    <Button onClick={handleAdd}>Add</Button>
                                }
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