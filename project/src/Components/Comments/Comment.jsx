import { CiUser } from "react-icons/ci";
import "./Comment.css"

function Comment({user_name, comment})
{
    return(
        <div className="comment">
            <div className="user">
                <CiUser />
                <strong>{user_name}</strong>
            </div>
            <div className="user_com">{comment}</div>
        </div>
    )
}

export default Comment