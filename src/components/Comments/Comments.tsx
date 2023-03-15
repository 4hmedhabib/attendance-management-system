import Comment from './Comment'
import classes from './comment.module.css'

type Props = {}

const Comments = (props: Props) => {
    return (
        <div className={classes.container}>
            <Comment />
            <Comment />
            <Comment />
            <div className='pl-9 border-l-2 w-full ml-auto pb-1' style={{
                maxWidth: '95%'
            }}>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    )
}

export default Comments