import classes from './actions.module.css';

type Props = {
    isMobileView?: boolean
}

const Vote = ({ isMobileView = false }: Props) => {
    return (
        <div className={isMobileView ? classes.mobileVoteContainer : classes.voteContainer}>
            <img src='/images/icon-plus.svg' className={classes.voteBtn} />
            <span className={classes.voteText}>4</span>
            <img src='/images/icon-minus.svg' className={classes.voteBtn} />
        </div>
    )
}

export default Vote