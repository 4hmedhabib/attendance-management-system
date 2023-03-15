import classes from './avator.module.css'

type Props = {}

const Avator = (props: Props) => {
    return (
        <div className={classes.avatarContainer}>
            <img src="/images/avatars/image-amyrobson.png" alt="avator profile" className={classes.avatarImg} />
        </div>
    )
}

export default Avator