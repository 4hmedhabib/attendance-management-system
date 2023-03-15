import Delete from '../Actions/Delete'
import Edit from '../Actions/Edit'
import Reply from '../Actions/Reply'
import Vote from '../Actions/Vote'
import Header from '../Header'
import classes from './comment.module.css'

type Props = {}

const Comment = (props: Props) => {
    return (
        <div className={classes.comment}>
            {/* Vote Container */}
            <Vote />

            {/* Body Container */}
            <div className={classes.bodyContainer}>
                {/* Comment Header */}
                <Header />

                {/* Comment Body */}
                <div className={classes.commentBody}>
                    <p>
                        <strong className={classes.replyUser}>@amyrobson</strong>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum repudiandae nesciunt perferendis non a ipsum impedit ullam dicta quod, consectetur temporibus dolorum, provident itaque tempora tenetur at harum. Ipsum, quod!
                    </p>
                </div>

                <div className={classes.mobileContainer}>
                    {/* Vote Container */}
                    <Vote isMobileView />

                    {/* Action Container */}
                    <div className={`${classes.actionsMobileContainer}`}>
                        {/* Reply Action */}
                        <Reply />

                        {/* Delete Action */}
                        <Delete />

                        {/* Edit Action */}
                        <Edit />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment