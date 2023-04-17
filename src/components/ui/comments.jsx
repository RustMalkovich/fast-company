import React, { useEffect } from "react";
// import api from "../../api";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
// import { useComments } from "../../hooks/useComments";
import { useSelector, useDispatch } from "react-redux";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    // const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    // const { createComment, comments, removeComment } = useComments();
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    // useEffect(() => {
    //     api.comments
    //         .fetchCommentsForUser(userId)
    //         .then((data) => setComments(data));
    // }, []);

    const handleSubmit = (data) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        dispatch(createComment(comment));

        // createComment(data);

        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
