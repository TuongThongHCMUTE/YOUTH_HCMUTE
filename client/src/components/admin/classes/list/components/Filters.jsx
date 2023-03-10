// Node Modules ============================================================ //
import React from 'react';
// Styles ================================================================== //
import styles from '../ClassManagementPage.module.scss';
// Material UI ============================================================= //
import { 
  Button, 
  Grid, 
  InputLabel,
  FormControl,
  MenuItem,
  Select,  
  Stack,
  TextField, 
} from '@mui/material';

// ============================|| SEARCH BAR ||============================= //
const Filters = (props) => {
  const { faculties, searchValues, onChange, onSearch } = props;

  return (
    <Stack 
      direction={{ md: 'row', xs: 'col' }}
      alignItems={{ xs: 'center' }}
      justifyContent={{ xs: 'space-between' }}
      className={styles.Filters}
    >
      <h1 className={styles.Title}>Bộ lọc</h1>
      <Stack className={styles.SearchAreas}>
        
      </Stack>
    </Stack>
  );
};

export default Filters;