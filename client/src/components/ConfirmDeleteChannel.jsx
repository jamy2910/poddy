import StandardButton from "./StandardButton"
import { useContext, useState } from "react";
import { ChannelContext } from "../pages/MyChannels";
import PodcastLoadingSpinner from "./PodcastLoadingSpinner";

const ConfirmDeleteChannel = ({ id, toggleModal }) => {

    // Hooks
    const { deleteChannel } = useContext(ChannelContext);
    const [isDeleting, setIsDeleting] = useState(false);


    // Functions
    const deleteChannelExtend = async (id) => {
        setIsDeleting(true)
        try {
            await deleteChannel(id);
            toggleModal();
        } catch (error) {
            console.log(error);
        }
        setIsDeleting(false);
    }

    // JSX
    return (
        <div className=" fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-40 bg-black/50">
            <div className="bg-white border-solid border-emerald-700">
                <h2 className="bg-emerald-700 text-white m-0 p-4 box-border">Confirm you want to delete the channel</h2>

                <div className="p-10">
                    <h4 className="text-center text-base m-0 mb-5">This action cannot be undone.</h4>
                    {!isDeleting ? <div className="flex justify-around items-center">
                        <StandardButton onClick={() => { deleteChannelExtend(id) }}>Delete Channel</StandardButton>
                        <StandardButton onClick={toggleModal}>Cancel</StandardButton>
                    </div> : <PodcastLoadingSpinner />}
                </div>

            </div>
        </div>
    )
}

export default ConfirmDeleteChannel