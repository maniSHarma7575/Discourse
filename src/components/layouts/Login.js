import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";
import validate from "validate.js";
import axios from "axios";

const schema = {
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
};
const Login = () => {
    const { dispatch } = useContext(UserContext);
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const values = { email: email, password: password };
        const errors = validate(values, schema);
        if (errors) {
            setIsValid(false);
            setErrors(errors);
        } else {
            setIsValid(true);
            setErrors({});
        }
    }, [email, password]);
    const PostData = (e) => {
        if (!isValid) return;
        axios
            .post(
                "/api/account/login",
                {
                    username: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(
                (response) => {
                    const data = response.data;
                    if (data.error) {
                        M.toast({
                            html: data.error_message,
                            classes: "#c62828 red darken-3",
                        });
                    } else {
                        const user = {
                            email: data.email,
                            id: data.pk,
                            username: data.username,
                        };
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(user));
                        dispatch({ type: "USER", payload: user });
                        M.toast({
                            html: "Login successfull",
                            classes: "#00c853 green accent-4",
                        });
                        history.push("/");
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
                <button
                    onClick={() => PostData()}
                    className="btn waves-effect waves-light blue darken-2"
                >
                    Login
                </button>
                <p>
                    <Link to="/register">
                        Don't have an account?
                        <span className="blue-text text-darken-2">
                            Register
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
