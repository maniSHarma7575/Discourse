import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import axios from "axios";
import validate from "validate.js";

const schema = {
    title: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 50,
        },
    },
    body: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 5000,
        },
    },
    image: {
        presence: { allowEmpty: false, message: "is required" },
    },
};

const EditPost = (props) => {
    const history = useHistory();
    const slug = props.match.params.slug;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [path, setPath] = useState("");
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const values = { title: title, body: body, image: image };
        const errors = validate(values, schema);
        console.log(errors);
        if (errors) {
            setIsValid(false);
            setErrors(errors);
        } else {
            setIsValid(true);
            setErrors({});
        }
    }, [title, body, image]);
    useEffect(() => {
        fetch(`/api/post/${slug}/`, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setTitle(result.title);
                setBody(result.body);
                setPath(result.image);
            });
    }, []);
    const editDetails = () => {
        if (!isValid) {
            M.toast({
                html: "All fields are required",
                classes: "#c62828 red darken-3",
            });
            return;
        }
        let form_data = new FormData();
        form_data.append("image", image);
        form_data.append("title", title);
        form_data.append("body", body);
        axios
            .put(`/api/post/${slug}/update`, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: "Token " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                M.toast({
                    html: "Post Updated success",
                    classes: "#00c853 green accent-4",
                });
                history.push("/");
            })
            .catch((err) => {
                console.log(err.toJSON());
            });
    };

    return (
        <div className="mycard">
            <div className="card auth-card ">
                <h4>Update Post</h4>
                <div class="input-field">
                    <input
                        type="text"
                        value={title}
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="validate"
                        required
                    />
                    <label for="title">Title</label>
                    <span
                        class="helper-text"
                        data-error={errors.title ? errors.title[0] : ""}
                        data-success="Looks good!"
                    ></span>
                </div>
                <div class="input-field">
                    <input
                        type="text"
                        value={body}
                        id="body"
                        onChange={(e) => setBody(e.target.value)}
                        className="validate"
                        required
                    />
                    <label for="body">Body</label>
                    <span
                        class="helper-text"
                        data-error={errors.body ? errors.body[0] : ""}
                        data-success="Looks good!"
                    ></span>
                </div>
                <div className="file-field input-field">
                    <div className="btn #1976d2 blue darken-2">
                        <span>Upload File</span>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                            class
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input
                            className="file-path validate"
                            type="text"
                            required
                        />
                        <span
                            class="helper-text"
                            data-error={errors.image ? errors.image[0] : ""}
                            data-success="Looks good!"
                        ></span>
                    </div>
                </div>
                <button
                    onClick={() => editDetails()}
                    className="btn waves-effect waves-light #1976d2 blue darken-2"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default EditPost;
