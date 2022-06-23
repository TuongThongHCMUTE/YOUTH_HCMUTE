// Node Modules ============================================================ //
import React from 'react';
// import moment from 'moment';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './SearchBar.module.scss';
import { 
    Button, 
    Grid, 
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField, 
    // Typography
} from '@mui/material';
// import DateAdapter from '@mui/lab/AdapterMoment';
// import { LocalizationProvider, DatePicker} from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

// ============================|| SEARCH BAR ||============================= //
const SearchBar = (props) => {
    const { searchValues, onChange, onSearch } = props;

    return (
        <Grid container className={styles.SearchBar}>
            <Grid item lg={1.5} md={12}><h1 className={styles.Title}>Tìm kiếm:</h1></Grid>
            <Grid item lg={10.5} md={12} className={styles.SearchArea}>
            <Grid container>
                <Grid item lg={5} md={12} className={styles.Search}>
                    <TextField
                        className={styles.SearchField}
                        variant='outlined'
                        size='medium'
                        placeholder='Nhập từ khóa cần tìm kiếm...'
                        value={searchValues?.searchString}
                        onChange={e => onChange("searchString", e.target.value)}
                        onKeyPress={(e) => { 
                            if(e.key === "Enter") {
                                onSearch();
                            }
                        }}
                    />
                    <Button 
                        variant="contained"
                        className={clsx("button", styles.SearchButton)}
                        sx={{ width: '100% !important' }}
                        onClick={() => onSearch()}
                    >
                        <SearchIcon />
                    </Button>
                </Grid>
                <Grid item lg={2} md={0} className={styles.Divider}></Grid>
                <Grid item lg={5} md={12}>
                    <FormControl className={styles.RadioGroup}>
                        <FormLabel id="label" className={styles.Label}>Hiển thị: </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="label"
                            name="row-radio-buttons-group"
                            className={styles.Options}
                            value={searchValues?.type || 'tat-ca'}
                            onChange={e => onChange("type", e.target.value)}
                        >
                            <FormControlLabel value="sap-dien-ra" control={<Radio className='radio' />} label="Sắp diễn ra" />
                            <FormControlLabel value="da-dien-ra" control={<Radio className='radio' />} label="Đã diễn ra" />
                            <FormControlLabel value="tat-ca" control={<Radio className='radio' />} label="Tất cả" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchBar