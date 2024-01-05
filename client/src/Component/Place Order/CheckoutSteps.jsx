import React, { Fragment } from "react";

import "./checkoutSteps.css";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { AccountBalance, LibraryAddCheck, LocalShipping } from "@mui/icons-material";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
        paddingTop: '30px',
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "#ef9273" : "rgba(0, 0, 0, 0.649)",
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
};

export default CheckoutSteps;