import classes from './actions.module.css'


const Edit = () => {
    return (
        <div className={classes.actionContainer}>
            <img className={''} src='/images/icon-edit.svg' />
            <span className={classes.editText}>Edit</span>
        </div>
    )
}

export default Edit