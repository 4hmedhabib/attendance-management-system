import classes from './actions.module.css'

type Props = {}

const Reply = (props: Props) => {
    return (
        <div className={`${classes.actionContainer}`}>
            <img src="/images/icon-reply.svg" alt="reply icon" className={classes.replyImg} />
            <span className={classes.replyText}>Reply</span>
        </div>
    )
}

export default Reply