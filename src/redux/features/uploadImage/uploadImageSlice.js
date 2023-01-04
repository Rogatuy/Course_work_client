import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const initialState = {
  urlImage: '',
  isLoading: false,
};

export const uploadImage = createAsyncThunk(
  'firebase/getImage',
  async (file) => { 
    try{
      const imageRef = ref(storage, `images/${file.name + v4()}`)
      await uploadBytes(imageRef, file);
      const newUrl = getDownloadURL(imageRef);  
      return newUrl;

    } catch(error) {
      console.log(error);
    }
})


export const uploadImageSlice = createSlice({
  name: 'uploadImage',
  initialState,
  reducers: {
    deleteUrl: (state) => {
      state.urlImage = '';
    },
  },
  extraReducers: {
    //uploadImage
    [uploadImage.pending]: (state) => {
      state.isLoading = true;
    },
    [uploadImage.fulfilled]: (state, action) => {
      state.urlImage = action.payload;
      state.isLoading = false;
    },
    [uploadImage.rejected]: (state, action) => {
      state.isLoading = false;
    },
  }
})

export default uploadImageSlice.reducer;
export const { deleteUrl } = uploadImageSlice.actions;
