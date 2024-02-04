import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        postsCount: null,
        postsCate: null,
        loading: false,
        isPostCreated: false,
        post: null,
    },
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setPostsCount(state, action) {
            state.postsCount = action.payload;
        },
        setPostsCate(state, action) {
            state.postsCate = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsPostCreated(state) {
            state.isPostCreated = true;
            state.loading = false;
        },
        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },
        setPost(state, action) {
            state.post = action.payload;
        },
        setLikes(state, action) {
            state.post.likes = action.payload;
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        addComment(state, action) {
            state.post.comments.push(action.payload);
        },
        updateComment(state, action) {
            state.post.comments = state.post.comments.map((comment) => {
                comment._id === action.payload._id ? action.payload : comment
            })
        },
        deleteComment(state, action) {
            state.post.comments = state.post.comments.filter((comment) => comment._id !== action.payload);

            // const comment = state.post.comments.find((comment) => comment._id === action.payload);
            // const commentIndex = state.post.comments.indexOf(comment);

            // state.post.comments.splice(commentIndex, 1);
        }
    },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postReducer, postActions }