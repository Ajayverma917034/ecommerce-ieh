import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { newReview } from '../../Stores/actions/productAction';

const AddProductReview = ({ open, setOpen, id }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("");
    const dispatch = useDispatch()
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    }
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={setOpen(!open)}
        >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
                <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                />

                <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </DialogContent>
            <DialogActions>
                <Button onClick={setOpen(!open)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProductReview