import React, {useState} from 'react';
import {Comment, Avatar, Button, Input} from 'antd';
import Axios from "axios";
import { useSelector } from 'react-redux';

const {TextArea} = Input;

function SingleComment(props) {
  const user = useSelector(state => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  }

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  }

  const actions = [
    <span onClick={onClickReplyOpen}
          key="comment-basic-reply-to">Reply to</span>
  ]

  const onSubmit = (e) => {
    e.preventDefault();

    const commentVariable = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id
    }

    Axios.post('/api/comment/saveComment', commentVariable)
      .then(response => {
        if (response.data.success) {
          props.refreshFunction(response.data.success);
          setCommentValue("");
          setOpenReply(false);
        } else {
          alert('Failed to save Comment')
        }
    })
  }

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="comment"/>}
        content={<p> {props.comment.content}</p>}
      />
      {console.log('a', props.comment.writer.name)}

      {OpenReply &&
        <form style={{display: 'flex'}} onSubmit={onSubmit}>
          <textarea
            style={{width: '100%', borderRadius: '5px'}}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
          <br/>
          <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
        </form>
      }

    </div>
  );
}

export default SingleComment;