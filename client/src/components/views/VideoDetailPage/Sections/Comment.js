import React, {useState} from 'react';
import Axios from "axios";
import {useSelector} from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Button, Input} from 'antd';

const {TextArea} = Input;

function Comment(props) {

  const user = useSelector(state => state.user);
  const videoId = props.videoId;
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const commentVariable = {
      content: commentValue,
      writer: user.userData._id,
      videoId: videoId
    }
    Axios.post('/api/comment/saveComment', commentVariable)
      .then(response => {
        if (response.data.success) {
          props.refreshFunction(response.data.result);
          setCommentValue('');
        } else {
          alert('Failed to save Comment')
        }
      })
  }

  return (
    <div>
      <br/>
      <p> replies</p>
      <hr/>

      {/* Comment Lists  */}
      {props.commentLists && props.commentLists.map((comment, index) => (
        (!comment.responseTo &&
          <React.Fragment>
            <SingleComment comment={comment} videoId={props.videoId} refreshFunction={props.refreshFunction} />
            <ReplyComment commentLists={props.commentLists} videoId={props.videoId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
          </React.Fragment>
        )
      ))}

      {/* Root Comment Form */}
      <form style={{display: 'flex'}} onSubmit={onSubmit}>
        <TextArea
          style={{width: '100%', borderRadius: '5px'}}
          onChange={handleClick}
          value={commentValue}
          placeholder="write some comments"
        />
        <br/>
        <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
      </form>
    </div>
  );
}

export default Comment;