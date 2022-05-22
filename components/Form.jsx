import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export default function Form() {
  const CLOUDNAME = process.env.CLOUDINARY_CLOUDNAME;
  const PRESET = process.env.CLOUDINARY_PRESET_NAME;

  const placeholderImage = {
    url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
    width: 1245,
    height: 830,
  };
  const [previewImage, setPreviewImage] = useState(placeholderImage);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (watch('price') >= 0) {
      data.image = previewImage.url; //kann man das so machen?
      console.log(data);
    }
  };

  const uploadImage = async () => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
      const image = watch('image')[0];

      const fileData = new FormData();
      fileData.append('file', image);
      fileData.append('upload_preset', PRESET);
      fileData.append('folder', 'fish shop');

      const response = await fetch(url, {
        method: 'POST',
        /* headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify({ file: image, upload_preset: PRESET }), */
        body: fileData,
      });

      setPreviewImage(await response.json());
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          {...register('image')}
          onChange={uploadImage}
        />

        <ImageContainer>
          <Image
            src={previewImage.url}
            width={previewImage.width}
            height={previewImage.height}
          />
        </ImageContainer>
      </div>

      <button type="submit">Submit</button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
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

const ImageContainer = styled.div`
  max-width: 5rem;
  height: auto;
`;
