import React from 'react'
import MyButton from './UI/button/MyButton';
import {useHistory} from 'react-router-dom'

const PostItem = (props) => {
    const router = useHistory()
    const {number, remove, post} = props;
    const {title, body} = props.post;
    return (
        <div className='post'>
            <div className='post__content'>
                <strong>{post.id}. {title}</strong>
                <div>
                    {body}
                </div>
            </div>
            <div className='post__btns'>
                <MyButton onClick={()=>router.push(`/posts/${props.post.id}`)}>Open</MyButton>
                <MyButton onClick={()=>remove(post)}>Delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem
