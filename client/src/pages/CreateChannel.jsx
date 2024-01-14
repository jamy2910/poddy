import InlineInput from '../components/InlineInput'
import AccountDescriptionInput from '../components/AccountDescriptionInput'
import StandardButton from '../components/StandardButton'
import { useState } from 'react'
import { customFetch } from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import PodcastLoadingSpinner from '../components/PodcastLoadingSpinner'

const CreateChannel = () => {

  // Hooks
  const [inputValues, setInputValues] = useState({ name: "", headline: "", description: "" });
  const [image, setImage] = useState();
  const [state, setState] = useState('idle');
  const navigate = useNavigate();

  // Functions
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  const handleImageChange = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
    // setImage(e.target.files[0]);

  }

  const onSubmit = async () => {
    setState('submitting');
    const { name, headline, description } = inputValues;
    const formData = new FormData();
    formData.append('title', name);
    formData.append('subheading', headline);
    formData.append('description', description);
    formData.append('channelPic', image);

    try {
      const response = await customFetch.post('/channel', formData);
      toast.success('Channel created successfully');
      navigate('/mychannels');
    } catch ({ response }) {
      toast.error(response.data.msg);
    }

    setState('idle');
  }

  if (state === 'submitting') return <PodcastLoadingSpinner />

  return (
    <>
      <div className='w-3/4 mx-auto'>
        <h2>Create channel</h2>
        <InlineInput onChange={handleTextChange} name={'name'} value={inputValues.name} title={'Channel name'} />
        <InlineInput onChange={handleTextChange} name={'headline'} value={inputValues.headline} title={'Channel headline'} />
        <AccountDescriptionInput value={inputValues.description} name={'description'} onChange={handleTextChange} title={'Channel description'} />

        <h3 className='font-medium'>Choose an image</h3>
        <input onChange={handleImageChange} type="file" />

      </div>

      <div className='text-center'>
        <StandardButton onClick={onSubmit}>Create channel</StandardButton>
      </div>
    </>


  )
}

export default CreateChannel