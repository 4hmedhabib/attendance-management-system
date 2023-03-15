import classes from './actions.module.css'

type Props = {}

const Delete = (props: Props) => {
    return (
        <div className={classes.actionContainer}>
            <img className={classes.actionIcon} src='/images/icon-delete.svg' />
            <span className={classes.deleteText}>Delete</span>
        </div>
    )
}

export default Delete