import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import validate from "validate.js";
import axios from "axios";

const schema = {
    name: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 64,
        },
    },
    email: {
        presence: { allowEmpty: false, message: "is required" },
        email: true,
        length: {
            maximum: 64,
        },
    },
    password: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 128,
        },
    },
    confirmPassword: {
        equality: "password",
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 128,
        },
    },
};

const SignUp = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const values = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };
        const errors = validate(values, schema);
        if (errors) {
            setIsValid(false);
            setErrors(errors);
        } else {
            setIsValid(true);
            setErrors({});
        }
    }, [email, password, name, confirmPassword]);
    const PostData = (e) => {
        if (!isValid) return;
        axios
            .post(
                "/api/account/register",
                {
                    username: name,
                    email: email,
                    password: password,
                    confirm_password: confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(
                (response) => {
                    console.log(response);
                    const data = response.data;
                    if (data.error) {
                        M.toast({
                            html: data.error_message,
                            classes: "#c62828 red darken-3",
                        });
                    } else {
                        M.toast({
                            html: data.response,
                            classes: "#00c853 green accent-4",
                        });
                        history.push("/login");
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    };
    return (
        <div className="mycard">
            <div className="card auth-card ">
                <h4>Discourse</h4>
                <div class="input-field">
                    <input
                        type="text"
                        value={name}
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="validate"
                        required
                    />
                    <label for="name">Name</label>
                    <span
                        class="helper-text"
                        data-error={errors.name ? errors.name[0] : ""}
                        data-success="Looks good!"
                    ></span>
                </div>
                <div class="input-field">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="validate"
                        required
                    />
                    <label for="email">Email</label>
                    <span
                        class="helper-text"
                        data-error={errors.email ? errors.email[0] : ""}
                        data-success="Looks good!"
                    ></span>
                </div>
                <div class="input-field">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="validate"
                        required
                    />
                    <label for="password">Password</label>
                    <span
                        class="helper-text"
                        data-error={errors.password ? errors.password[0] : ""}
                        data-success="Looks good!"
                    ></span>
                </div>
                <div class="input-field">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="validate"
                        required
                    />
                    <label for="confirm password">Confirm Password</label>
                    <span
                        class="helper-text"
                        data-error={
                            errors.confirmPassword
                                ? errors.confirmPassword[0]
                                : ""
                        }
                        data-success="Looks good!"
                    ></span>
                </div>
                <button
                    className="btn waves-effect waves-light blue darken-2"
                    onClick={() => PostData()}
                >
                    Register
                </button>
                <p>
                    <Link to="/login">
                        Already have an account?{" "}
                        <span className="blue-text text-darken-2">Login</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
