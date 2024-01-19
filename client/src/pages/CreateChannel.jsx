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
  const [inputValues, setInputValues] = useState({ name: "", headline: "", description: "", image: {} });
  const [state, setState] = useState('idle');
  const navigate = useNavigate();

  // Functions
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputValues({ ...inputValues, image: file });
    console.log(inputValues)
  }

  const onSubmit = async () => {
    setState('submitting');
    const { name, headline, description, image } = inputValues;
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
      if (response.data.msg) {
        toast.error(response.data.msg)
      } else {
        toast.error('Error creating channel');
      }

    }

    setState('idle');
  }

  if (state === 'submitting') return <PodcastLoadingSpinner />

  return (
    <>
      <div className='md:w-3/4 mx-auto'>
        <h2>Create channel</h2>
        <InlineInput max={50} onChange={handleTextChange} name={'name'} value={inputValues.name} title={'Channel name'} />
        <InlineInput max={100} onChange={handleTextChange} name={'headline'} value={inputValues.headline} title={'Channel headline'} />
        <AccountDescriptionInput value={inputValues.description} name={'description'} onChange={handleTextChange} title={'Channel description'} />

        <h3 className='font-medium'>Choose an image</h3>
        <input accept='image/*' onChange={handleImageChange} type="file" />

      </div>

      <div className='text-center mt-4'>
        <StandardButton onClick={onSubmit}>Create channel</StandardButton>
      </div>
    </>
  )
}

export default CreateChannel