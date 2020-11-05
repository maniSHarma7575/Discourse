import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("/api/post/list", {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                },
            })
            .then(
                (response) => {
                    setData(response.data.results);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);
    const editPost = (slug) => {
        history.push({ pathname: "/editpost/" + slug });
    };
    const deletePost = (slug) => {
        fetch(`/api/post/${slug}/delete`, {
            method: "delete",
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                const newData = data.filter((item) => {
                    return item.slug != slug;
                });
                setData(newData);
            });
    };
    return (
        <div className="">
            {data ? (
                data.map((item) => {
                    return (
                        <div
                            className="card home-card z-depth-5"
                            key={item.date_updated}
                        >
                            <div className="row">
                                <img
                                    src={
                                        "https://picsum.photos/40?u=" +
                                        item.username
                                    }
                                    alt="user"
                                    class="circle responsive-img col"
                                ></img>
                                <h5 className="font-bold col">
                                    {item.username}
                                </h5>
                            </div>
                            <div className="card-image">
                                <img src={item.image} />
                            </div>
                            <div className="card-content">
                                <h6 className="font-bold">{item.title}</h6>
                                <p>{item.body}</p>
                                {item.user_id == state.id && (
                                    <div className="post-btn">
                                        <button
                                            onClick={() => editPost(item.slug)}
                                            className="btn btn-small waves-effect waves-light blue darken-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() =>
                                                deletePost(item.slug)
                                            }
                                            className="delete-btn btn-small btn waves-light red darken-4"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Hurry be the first one to post</p>
            )}
        </div>
    );
};

export default Home;
