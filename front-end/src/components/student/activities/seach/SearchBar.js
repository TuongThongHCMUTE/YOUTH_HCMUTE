// Node Modules ============================================================ //
import React from 'react';
import moment from 'moment';
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
    Typography
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider, DatePicker} from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

// ============================|| SEARCH BAR ||============================= //
const SearchBar = (props) => {
    const { searchValues, onChange, onSearch } = props;

    return (
        <Grid container className={styles.SearchBar}>
            <Grid item xs={1.5}><h1 className={styles.Title}>Tìm kiếm:</h1></Grid>
            <Grid item xs={10.5} className={styles.SearchArea}>
            <Grid container>
                <Grid item xs={3} className={styles.Search}>
                    <TextField
                        className={styles.SearchField}
                        variant='outlined'
                        size='medium'
                        placeholder='Nhập từ khóa cần tìm kiếm...'
                        value={searchValues?.searchString}
                        onChange={e => onChange("searchString", e.target.value)}
                    />
                    <Button 
                        variant="contained"
                        className={clsx("button", styles.SearchButton)}
                        sx={{ width: '100% !important' }}
                        onClick={() => onSearch(searchValues)}
                    >
                        <SearchIcon />
                    </Button>
                </Grid>
                <Grid item xs={0.5} className={styles.Divider}></Grid>
                <Grid item xs={5}>
                    <FormControl className={styles.RadioGroup}>
                        <FormLabel id="label" className={styles.Label}>Hiển thị: </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="label"
                            name="row-radio-buttons-group"
                            className={styles.Options}
                        >
                            <FormControlLabel value="female" control={<Radio className='radio' />} label="Sắp diễn ra" />
                            <FormControlLabel value="male" control={<Radio className='radio' />} label="Đã diễn ra" />
                            <FormControlLabel value="other" control={<Radio className='radio' />} label="Tất cả" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={0.5} className={styles.Divider}></Grid>
                <Grid item xs={3}>
                    <LocalizationProvider locale='vi' dateAdapter={DateAdapter}>
                        <div className={styles.DatePicker}>
                            <Typography variant="p" component="p">
                                Tháng:
                            </Typography>
                            <DatePicker
                                views={['year', 'month']}
                                inputFormat="MM/yyyy"
                                minDate={moment('2012-03-01')}
                                maxDate={moment('2023-06-01')}
                                value={moment()}
                                className='text-field'
                                onChange={(newValue) => {
                                    // setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </div>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchBar