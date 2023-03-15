import Delete from './Actions/Delete'
import Edit from './Actions/Edit'
import Reply from './Actions/Reply'
import Avator from './Avator'
import classes from './header.module.css'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className={classes.commentHeader}>
            {/* Avator Container */}
            <div className={classes.profileContainer}>
                <Avator />

                <span className={classes.userName}>amyrobson</span>
                <div className='bg-moderateBlue h-5 flex justify-center items-center text-sm px-2 rounded text-white'>
                    <span>you</span>
                </div>
                <span className={classes.commentDate}>1 month ago</span>
            </div>

            {/* Actions Container */}
            <div className={classes.actionsContainer}>
                {/* Reply Action */}
                <Reply />

                {/* Delete Action */}
                <Delete />

                {/* Edit Action */}
                <Edit />
            </div>
        </div>
    )
}

export default Header