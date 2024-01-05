import React, { useEffect, useState } from "react";

import "./dashboard.css";
import "./banner.css"

// import { useDispatch } from "react-redux";
import MetaData from "../metaData/MetaData.jsx";
import Sidebar from "./Sidebar";
import { Button, Typography } from "@mui/material";
import { bannerData } from "../../constant/carousel";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux"
import { ClearsErrors, createBanner, getAllBanner } from "../../Stores/actions/bannerAction";
import { alertOption } from "../../Stores/actions/notificationAction";
import { CREATE_BANNER_RESET } from "../../Stores/constants/bannerConstant";
import Loading from "../Loading/Loading";


const Banner = () => {
    const dispatch = useDispatch();
    const { success, loading, error } = useSelector((state) => state.newBanner)

    const { error: allBannerError, banner } = useSelector((state) => state.allBanner)
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const createBannerImagesChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                // console.log(reader.result)
                setImagePreview(reader.result);
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleAddImage = () => {
        const myForm = new FormData();
        myForm.set("image", image)
        dispatch(createBanner(myForm));
    }

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors)
        }
        if (success) {
            dispatch(alertOption({ open: true, severity: 'success', message: "Banner added Successfully" }))
            dispatch({ type: CREATE_BANNER_RESET });
        }
        getAllBanner()
    }, [dispatch, error, success, allBannerError,])

    return (
        <div className="dashboard">
            <MetaData title="Banner - Admin Panel" />
            <Sidebar />
            {
                loading ? <Loading /> :
                    <div className="dashboardContainer">
                        <Typography component="h1">Banner</Typography>
                        <Typography component="h1">Old image</Typography>
                        <div className="oldimg">

                            {
                                bannerData && bannerData.map((item, index) => (
                                    <div className="imgBox">
                                        <img src={item.url} alt="img" className="imgStyle" key={index} />
                                        <Delete />
                                    </div>

                                ))
                            }
                        </div>

                        {
                            imagePreview !== "" && <><Typography component="h1">Added image</Typography>
                                <div className="oldimg">


                                    <div className="imgBox">
                                        <img src={imagePreview} alt="Product Preview" className="imgStyle" />
                                    </div>

                                </div>
                            </>
                        }

                        <div id="addBannerimg">
                            <input
                                type="file"
                                name='avatar'
                                accept="image/*"
                                onChange={createBannerImagesChange}
                                multiple
                            />

                        </div>

                        {
                            image !== "" &&
                            <Button style={{ backgroundColor: 'tomato', color: '#fff' }} className="StyleButton" onClick={handleAddImage}>Add Now</Button>
                        }


                    </div>
            }

        </div>
    );
};

export default Banner;