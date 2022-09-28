//contains post author avatar + handle, and media of post
//clicking on the avatar or the handle will direct you to that user's profile, but clicking on the post itself will not
//will also contain postAction component
import postActions from "./postActions";

const postDetails = ({})=>{
    return (
        <wrapper>
        <h1>post details</h1>
        <postActions/>
        </wrapper>
    )
}

export default postDetails;