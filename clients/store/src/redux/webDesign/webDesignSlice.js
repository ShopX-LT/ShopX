import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hero: {
    heroActionButtonColor: '',
    heroActionButtonStyle: '',
    heroActionButtonText: '',
    heroActionButtonTextColor: '',
    heroImageCoverOpacity: 0.6,
    heroImageBlur: '1',
    heroImageUrl: '',
    heroHeadline: '',
    heroHeadlineColor: '',
    heroSecondaryButtonColor: '',
    heroSecondaryButtonTextColor: '',
    heroStyle: '',
    heroSubText: '',
    heroSubTextColor: '',
  },
  productContainer: {
    productActionButtonColor: '',
    productActionButtonStyle: '',
    productActionButtonText: '',
    productActionButtonTextColor: '',
    productBackgroundColor: '',
    productMainTextColor: '',
    productStyle: '',
    productSubTextColor: '',
  },
  nav: { navBackgroundColor: '', navTextColor: '' },
  mainBackgroundColor: '#ebebeb',
};

export const webDesignSlice = createSlice({
  name: 'webDesign',
  initialState,
  reducers: {
    setupSite: (state, action) => {
      const payload = action.payload;
      state.mainBackgroundColor = payload.mainBackgroundColor;
      state.hero = { ...payload.hero };
      state.nav = { ...payload.nav };
      state.productContainer = { ...payload.productContainer };
    },
  },
});

export const { setupSite } = webDesignSlice.actions;
export default webDesignSlice.reducer;
