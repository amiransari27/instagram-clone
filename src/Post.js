import React, { useState, useEffect } from 'react'
import firebase from "firebase"
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"
import { db } from './firebase';

function Post(props) {
    const { postId, username, caption, imageUrl, user } = props

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    const comments = snapshot.docs.map(doc => ({ id: doc.id, comment: doc.data() }))
                    setComments(comments)
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = (event) => {
        event.preventDefault()

        db.collection("posts").doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        setComment('')
    }

    return (
        <div className="post">

            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            <img className="post__image" alt="" src={imageUrl} />


            <h4 className="post__text">
                <strong>{username} </strong> {caption}
            </h4>

            <div className="post__comments">
                {
                    comments.map(({ id, comment }) => (
                        <p key={id}>
                            <strong>{comment.username} </strong>{comment.text}
                        </p>
                    ))
                }

            </div>
            {
                user &&
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        placeholder="Write a comment"
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        type="submit"
                        disabled={!comment}
                        onClick={postComment}
                    >
                        Post
                </button>
                </form>
            }

        </div>
    )
}

export default Post
