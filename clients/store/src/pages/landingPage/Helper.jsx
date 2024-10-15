import { Paper } from '@mui/material';
import FeatureStoreCard from './components/FeatureStoreCard';

const featuredStores = [
  {
    imageSource:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D',
    storeName: 'La Prisa',
    grossIncome: '₦1.5m',
    link: 'https://laprisa.myshopx.net',
  },
  {
    imageSource:
      'https://images.unsplash.com/photo-1624489173879-7cc62610ddea?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    storeName: 'Five-Girls',
    grossIncome: '₦1.8m',
    link: 'https://five-girls.myshopx.net',
  },
];

export const displayFeatureStore = (position) => {
  return (
    <FeatureStoreCard
      imageSource={featuredStores[position].imageSource}
      storeName={featuredStores[position].storeName}
      grossIncome={featuredStores[position].grossIncome}
      link={featuredStores[position].link}
    />
  );
};

export const displayMeme = (sourceImage) => {
  return (
    <Paper elevation={3}>
      <img style={{ objectFit: 'cover', width: '300px', height: '300px', borderRadius: '5px' }} src={sourceImage} />
    </Paper>
  );
};
