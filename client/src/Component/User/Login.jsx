import React, { Fragment, useRef, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility } from "@mui/icons-material"

import { useDispatch, useSelector } from "react-redux";
import './Login.css'
import Loading from "../Loading/Loading"
import profileimg from "../../img/avtarimg.jpg"
import { ClearsErrors, login, register } from "../../Stores/actions/userAction";
import { alertOption } from "../../Stores/actions/notificationAction";
import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import InputFieldPassword from "./InputFieldPassword";

const CssTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== "focusColor"
})((p) => ({
    // input label when focused
    "& label.Mui-focused": {
        color: p.focusColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
        borderBottomColor: p.focusColor
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: p.focusColor
        }
    }
}));

const LoginSignUp = () => {
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );


    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
    });
    const navigate = useNavigate()

    const { name, email, password, confirmPass } = user;

    const [avatar, setAvatar] = useState(profileimg);
    const [avatarPreview, setAvatarPreview] = useState(profileimg);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        if (isAuthenticated)
            navigate('/account')
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        if (confirmPass !== password) {
            dispatch(alertOption({ open: true, severity: 'error', message: "Password and confirm Password must be same." }))
            return;
        }
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm))
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader?.readAsDataURL(e.target.files?.[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    // const location = useLocation()

    useEffect(() => {
        if (error) {
            dispatch(alertOption({ open: true, severity: 'error', message: error }))
            dispatch(ClearsErrors())
            return;

        }
        if (isAuthenticated) {
            navigate('/account')
        }

    }, [dispatch, error, isAuthenticated, navigate]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)
    const handleClick = () => {
        setShowPassword(!showPassword)
    }
    const handleClick2 = () => {
        setShowCPassword(!showCPassword)
    }
    const handleMouseDown = (e) => {
        e.preventDefault();
    }

    return (
        <Fragment>
            {loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <CssTextField
                                        focusColor='#ef9273'
                                        margin='normal'
                                        variant='standard'
                                        label="Email"
                                        type='email'
                                        placeholder="Enter your Email"
                                        fullWidth
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        inputProps={{ minLength: 6 }}
                                        required
                                        width={'100%'}
                                    />
                                </div>
                                <InputFieldPassword PassValue={loginPassword} fieldName='Password' PlaceHolder="Enter your password" setPassValue={setLoginPassword} />

                                <Link to="/password/forgot">Forget Password ?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <CssTextField
                                        focusColor='#ef9273'
                                        margin='normal'
                                        variant='standard'
                                        label="Name"
                                        type='text'
                                        placeholder="Enter your Name"
                                        fullWidth
                                        value={name}
                                        name="name"
                                        onChange={registerDataChange}
                                        inputProps={{ minLength: 6 }}
                                        required
                                        width={'100%'}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <CssTextField
                                        focusColor='#ef9273'
                                        margin='normal'
                                        variant='standard'
                                        label="Email"
                                        type='email'
                                        name="email"
                                        placeholder="Enter your Email"
                                        fullWidth
                                        value={email}
                                        onChange={registerDataChange}
                                        inputProps={{ minLength: 6 }}
                                        required
                                        width={'100%'}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <CssTextField
                                        margin='normal'
                                        focusColor='#ef9273'
                                        variant='standard'
                                        placeholder="Enter Password"
                                        label='password'
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                        inputProps={{ minLength: 6 }}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <CssTextField
                                        margin='normal'
                                        focusColor='#ef9273'
                                        variant='standard'
                                        placeholder="Enter Confirm Password"
                                        label='Confirm Password'
                                        type={showCPassword ? 'text' : 'password'}
                                        fullWidth
                                        name="confirmPass"
                                        value={confirmPass}
                                        onChange={registerDataChange}
                                        inputProps={{ minLength: 6 }}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleClick2} onMouseDown={handleMouseDown}>
                                                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>

                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LoginSignUp;