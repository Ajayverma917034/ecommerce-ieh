import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch, } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { Home, LocationCity, Phone, PinDrop, Public, TransferWithinAStation } from '@mui/icons-material';
import { Country, State } from "country-state-city"

import { Box, Button } from '@mui/material';
import '../Place Order/Shipping/shipping.css'
import { saveShippingInfo } from '../../Stores/actions/cartAction';
import MetaData from '../metaData/MetaData';
import CheckoutSteps from '../Place Order/CheckoutSteps';
import { alertOption } from '../../Stores/actions/notificationAction';
import InputField from "../Place Order/Shipping/InputField"

const OrderShipping = () => {
    const dispatch = useDispatch()
    const { shippingInfo } = useSelector((state) => state.cart)
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const navigate = useNavigate()
    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            dispatch(alertOption({ open: true, severity: 'error', message: "Contact number must have be 10 digit" }))
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate('/order/order-confirm')
    };
    return (
        <Fragment>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={0} />
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
                <Box className="updateFormDesign">


                    <form onSubmit={shippingSubmit}>
                        <InputField PassValue={address} fieldName={"Address"} id={"address"} setPassValue={setAddress} startIcon={<Home />} />

                        <InputField PassValue={city} fieldName={"City"} id={"city"} setPassValue={setCity} startIcon={<LocationCity />} />

                        <InputField PassValue={pinCode} fieldName={"Pin Code"} id={"pincode"} setPassValue={setPinCode} startIcon={<PinDrop />} />

                        <InputField PassValue={phoneNo} fieldName={"Contact Number"} id={"phoneNo"} setPassValue={setPhoneNo} startIcon={<Phone />} Type={'Number'} />
                        <Box className="SelectBox" >
                            <Public />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </Box>
                        {country && (
                            <Box className="SelectBox" >
                                <TransferWithinAStation />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </Box>
                        )}
                        <Button type='submit' disabled={state ? false : true} variant='contained' style={{ backgroundColor: '#ef9273', marginTop: '20px' }}>
                            Continue
                        </Button>


                    </form>

                </Box>
            </Box>
        </Fragment>
    )
}

export default OrderShipping