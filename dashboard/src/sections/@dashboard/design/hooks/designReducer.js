import { CHANGE_INPUT, FETCH_START } from './actions';

export const INITIAL_STATE = {
  mainBackgroundColor: '',
  navTextColor: '',
  navBackgroundColor: '',
  heroStyle: '',
  heroHeadline: '',
  heroHeadlineColor: '',
  heroSubText: '',
  heroSubTextColor: '',
  actionButtonText: '',
  actionButtonTextColor: '',
  actionButtonColor: '',
  heroImageUrl: '',
  heroImageBlur: '',
  heroImageCoverOpacity: '',
  productStyle: '',
  productBackgroundColor: '',
  productMainTextColor: '',
  productSubTextColor: '',
  productActionButtonColor: '',
  productActionButtonTextColor: '',
};

export const designReducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        ...action.payload.hero,
        ...action.payload.nav,
        ...action.payload.productContainer,
        mainBackgroundColor: action.payload.mainBackgroundColor,
      };
    case CHANGE_INPUT:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
