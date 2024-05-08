import { Button } from '@mui/material';
import { getStoreName } from '../../../services/UtilityService';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useStoreName from '../hooks/useStoreName';

const VisitStore = () => {
  const axiosPrivate = useAxiosPrivate();
  const { storeName, retrieveStoreName } = useStoreName();
  const handleVisitMyStoreClicked = async () => {
    await retrieveStoreName();
    window.open(`https://${storeName}.myshopx.net`);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleVisitMyStoreClicked}>
        Visit My Store
      </Button>
    </div>
  );
};

export default VisitStore;
