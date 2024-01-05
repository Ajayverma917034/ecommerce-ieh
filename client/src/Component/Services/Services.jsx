import { CurrencyRupee, Handyman, LocalShipping, RateReviewOutlined, WebAsset } from '@mui/icons-material'
import React from 'react'
import './services.css'

const Services = () => {
    return (

        <div className="serviceContainer">
            <h2>Our Services</h2>
            <section className="services">
                <div className="serviceCard">
                    <div className="serviceContent">
                        <div className="icon"><CurrencyRupee /></div>
                        <div className="title">Case On Delivery</div>
                        <p>We offer Cash on Delivery option.</p>
                    </div>
                </div>
                <div className="serviceCard">
                    <div className="serviceContent">
                        <div className="icon"><WebAsset /></div>
                        <div className="title">Better UI Experience</div>
                        <p>We offer better user Experience.</p>
                    </div>
                </div>
                <div className="serviceCard">
                    <div className="serviceContent">
                        <div className="icon"><RateReviewOutlined /></div>
                        <div className="title">Ratting System</div>
                        <p>User can choose the product according to ratting.</p>
                    </div>
                </div>
                <div className="serviceCard">
                    <div className="serviceContent">
                        <div className="icon"><LocalShipping /></div>
                        <div className="title">Fast Home Delivery</div>
                        <p>Our service provide better home Delivery.</p>
                    </div>
                </div>
                

            </section>
        </div>

    )
}

export default Services