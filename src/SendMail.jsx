import React from "react";
import "./SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import { db } from "./firebase";
import firebase from "firebase";

const SendMail = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    // console.log(formData);
    db.collection("emails").add({
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    dispatch(closeSendMessage());
  };

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="to"
          placeholder="To"
          ref={register({ required: true })}
        />
        {errors.to && <p className="sendMail__error">To is required</p>}

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          ref={register({ required: true })}
        />
        {errors.subject && (
          <p className="sendMail__error">Subject is required</p>
        )}

        <input
          type="text"
          name="message"
          placeholder="Message..."
          ref={register({ required: true })}
          className="sendMail__message"
        />
        {errors.message && (
          <p className="sendMail__error">Message is required</p>
        )}

        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
