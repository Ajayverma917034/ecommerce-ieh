import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material"
import { Call, ContactMail, Email, Home, MapTwoTone, QueryBuilder } from '@mui/icons-material'
import InfoField from './InfoField'
import './contactus.css'
import { useDispatch, useSelector } from 'react-redux'
import { ClearsErrors, newQuery } from '../../Stores/actions/queryAction'
import { alertOption } from '../../Stores/actions/notificationAction'
import { QUERY_RESET } from '../../Stores/constants/queryContant'

const Contact = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [query, setQuery] = useState("")

    const { error, success } = useSelector((state) => state.query)
    const querySubmit = () => {
        const myForm = new FormData();
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("contactNo", mobile)
        myForm.set("message", query)
        dispatch(newQuery(myForm))


    }
    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch({ type: ClearsErrors })
            return;
        }
        if (success) {
            dispatch(alertOption({ open: true, severity: 'success', message: "Your Query has been registered" }))
            dispatch({ type: QUERY_RESET })
            setName("")
            setEmail("")
            setMobile("")
            setQuery("")
        }
    }, [dispatch, error, success]);
    return (
        // < div className="containerMain" >
        //     <div className="containerContact">
        //         <div class="content">
        //             <div class="left-side">
        //                 <div class="address details">
        //                     <MapTwoTone />
        //                     <div class="topic">Address</div>
        //                     <div class="text-one">Surkhet, NP12</div>
        //                     <div class="text-two">Birendranagar 06</div>
        //                 </div>
        //                 <div class="phone details">
        //                     <Call />
        //                     <div class="topic">Phone</div>
        //                     <div class="text-one">+0098 9893 5647</div>
        //                     <div class="text-two">+0096 3434 5678</div>
        //                 </div>
        //                 <div class="email details">
        //                     <Email />
        //                     <div class="topic">Email</div>
        //                     <div class="text-one">codinglab@gmail.com</div>
        //                     <div class="text-two">info.codinglab@gmail.com</div>
        //                 </div>
        //             </div>
        //             <div class="right-side">
        //                 <div class="topic-text">Send us a message</div>
        //                 <p>If you have any work from me or any types of quries related to my product, services, you can send me message from here. It's my pleasure to help you.</p>
        //                 <Container className='contactMain'>
        //                     <form>
        //                         <div class="input-box">
        //                             <InfoField PassValue={name} fieldName={"Name"} id={"name"} setPassValue={setName} startIcon={<Home />} placeHolderValue="Enter Your Name" />
        //                         </div>
        //                         <div class="input-box">
        //                             <InfoField PassValue={email} fieldName={"Email"} id={"email"} setPassValue={setEmail} startIcon={<Email />} Type='email' placeHolderValue="Enter Your Email" />
        //                         </div>
        //                         <InfoField PassValue={mobile} fieldName={"Contact Number"} id={"mobile"} setPassValue={setMobile} startIcon={<ContactMail />} minLength={10} Type='number' placeHolderValue="Enter Your Contact Number" />
        //                         <div class="input-box">
        //                             <InfoField PassValue={query} fieldName={"Query"} id={"query"} setPassValue={setQuery} startIcon={<QueryBuilder />} Rows={3} placeHolderValue="Enter Your Query" />
        //                         </div>
        //                     </form>

        //                     <Button type='submit' variant='contained' style={{ backgroundColor: '#ef9273', marginTop: '20px' }} onClick={querySubmit}>
        //                         Continue
        //                     </Button>
        //                 </Container>
        //             </div>
        //         </div>
        //     </div>
        // </div>


        < div className="containerMain" >
            <div className="containerContact">
                <div class="content">
                    <div class="left-side">
                        <div class="address details">
                            <MapTwoTone />
                            <div class="topic">Address</div>
                            <div class="text-one">Surkhet, NP12</div>
                            <div class="text-two">Birendranagar 06</div>
                        </div>
                        <div class="phone details">
                            <Call />
                            <div class="topic">Phone</div>
                            <div class="text-one">+0098 9893 5647</div>
                            <div class="text-two">+0096 3434 5678</div>
                        </div>
                        <div class="email details">
                            <Email />
                            <div class="topic">Email</div>
                            <div class="text-one">codinglab@gmail.com</div>
                            <div class="text-two">info.codinglab@gmail.com</div>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="topic-text">Send us a message</div>
                        <p>If you have any work from me or any types of quries related to my product, services, you can send me message from here. It's my pleasure to help you.</p>
                        <form>
                            <div class="input-box">
                                <InfoField PassValue={name} fieldName={"Name"} id={"name"} setPassValue={setName} startIcon={<Home />} placeHolderValue="Enter Your Name" />
                                {/* <input type="text" placeholder="Enter your name"/>  */}
                            </div>
                            <div class="input-box">
                                <InfoField PassValue={email} fieldName={"Email"} id={"email"} setPassValue={setEmail} startIcon={<Email />} Type='email' placeHolderValue="Enter Your Email" />
                                {/* <input type="text" placeholder="Enter your email"/> */}
                            </div>
                            <div class="input-box">
                                <InfoField PassValue={mobile} fieldName={"Contact Number"} id={"mobile"} setPassValue={setMobile} startIcon={<ContactMail />} minLength={10} Type='number' placeHolderValue="Enter Your Contact Number" />
                                {/* <textarea placeholder="Enter your message"></textarea> */}
                            </div>
                            <div class="input-box message-box">
                                <InfoField PassValue={query} fieldName={"Query"} id={"query"} setPassValue={setQuery} startIcon={<QueryBuilder />} Rows={3} placeHolderValue="Enter Your Message" />
                                {/* <textarea placeholder="Enter your message"></textarea> */}
                            </div>

                        </form>
                        <div class="button">
                            <Button type='submit' variant='contained' style={{ backgroundColor: '#ef9273', marginTop: '20px' }} onClick={querySubmit}>Send Now</Button>
                            {/* <input type="button" value="Send Now"/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default Contact


