import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function Form() {
  const CLOUDNAME = process.env.CLOUDINARY_CLOUDNAME;
  const PRESET = process.env.CLOUDINARY_PRESET_NAME;

  //console.log(PRESET);

  const [cloudinaryImage, setCloudinaryImage] = useState({});
  console.log(cloudinaryImage.url);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (watch('price') >= 0) {
      console.log(data);
    }
  };

  const uploadImage = async (event) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
    const image = event.target.files[0];

    //console.log(image);

    const fileData = new FormData();
    fileData.append('file', image);
    fileData.append('upload_preset', PRESET);

    const response = await fetch(url, {
      method: 'POST',
      /* headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({ file: image, upload_preset: PRESET }), */
      body: fileData,
    });

    setCloudinaryImage(await response.json());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ----------NAME---------- */}
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        id="name"
        {...register('name', {
          required: 'A name is required!',
          minLength: {
            value: 2,
            message: 'The name must have minimum 2 characters',
          },
        })}
      />
      <span>{errors.name?.message}</span>

      {/* ----------PRICE---------- */}
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        {...register('price', { required: 'A price is required!' })}
      />
      <span>{errors.price?.message}</span>
      {watch('price') < 0 && <span>No negative prices, please!</span>}

      {/* ----------IMAGE---------- */}
      <label htmlFor="image">Image</label>
      <input
        type="file"
        id="image"
        {...register('image')}
        onChange={uploadImage}
      />
      {cloudinaryImage?.url && (
        <Image
          src={cloudinaryImage.url}
          width={cloudinaryImage.width}
          height={cloudinaryImage.height}
        />
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

/* const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: lightblue;
  padding: 1rem;

  label,
  legend {
    font-size: 1.2rem;
  }

  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  select,
  input,
  button {
    border-radius: 5px;
    border: 1px solid #cccccc;
  }

  span {
    color: red;
  }
`;
 */
