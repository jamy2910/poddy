import InlineInput from '../components/InlineInput'
import AccountDescriptionInput from '../components/AccountDescriptionInput'
import StandardButton from '../components/StandardButton'
import { useEffect, useState } from 'react'
import { customFetch } from '../utils/customFetch'
import { useParams } from 'react-router-dom'
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner'
import { scrollTop } from '../utils/scrollToTop'
import { toast } from 'react-toastify'

const UploadPodcast = () => {

    // Hooks
    const [inputValues, setInputValues] = useState({ name: "", description: "" });
    const [file, setFile] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [state, setState] = useState('idle');
    const { channelId } = useParams();

    useEffect(() => {
        scrollTop();
    }, []);

    // Functions
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    }

    const onSubmit = async () => {
        setState('submitting');
        const { name, headline, description } = inputValues;
        const formData = new FormData();
        formData.append('title', name);
        formData.append('subheading', headline);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('thumbnail', thumbnail);

        try {
            const response = await customFetch.post(`/podcast/${channelId}`, formData);
            toast.success('Podcast uploaded');
        } catch (error) {
            console.log(error);
        }

        setState('idle');
    }

    if (state === 'submitting') return (
        <div>
            <PodcastLoadingSpinner />
            <h2 className='text-center'>Uploading</h2>
        </div>)

    return (
        <>
            <div className='w-3/4 mx-auto'>
                <h2>Create channel</h2>
                <InlineInput onChange={handleTextChange} name={'name'} value={inputValues.name} title={'Podcast title'} />
                <AccountDescriptionInput value={inputValues.description} name={'description'} onChange={handleTextChange} title={'Podcast description'} />

                <h3 className='font-medium'>Upload thumbnail</h3>
                <input onChange={handleThumbnailChange} type="file" />

                <h3 className='font-medium'>Upload podcast</h3>
                <input onChange={handleFileChange} type="file" />

            </div>

            <div className='text-center'>
                <StandardButton onClick={onSubmit}>Create channel</StandardButton>
            </div>
        </>
    )
}

export default UploadPodcast