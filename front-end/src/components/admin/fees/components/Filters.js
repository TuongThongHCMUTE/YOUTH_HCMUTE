// Node Modules ============================================================ //
import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './Filters.module.scss';
import { 
    Button, 
    Grid, 
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField, 
    // Typography
} from '@mui/material';
// import DateAdapter from '@mui/lab/AdapterMoment';
// import { LocalizationProvider, DatePicker} from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

// ============================|| FILTERS ||============================= //
const Filters = (props) => {
    const { searchValues, setSearchValues, faculties, classes, onSearch } = props;

    const [matchedClasses, setMatchedClasses] = useState([]);

    useEffect(() => {
        if (searchValues.donVi === 'all') {
            setMatchedClasses(classes);
        } else if (classes?.length > 0) {
            setMatchedClasses(classes.filter(i => i.donVi._id === searchValues.donVi));
        }
    }, [classes, searchValues.donVi])

    const handleChange = (field, value) => {
        setSearchValues(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Grid container className={styles.Filters}>
            <Grid container>
                <Grid item lg={1.5} md={12}><h1 className={styles.Title}>Tìm kiếm:</h1></Grid>
                <Grid item lg={10.5} md={12} className={styles.SearchArea}>
                <Grid container>
                    <Grid item lg={3} md={12} className={styles.Search}>
                        <TextField
                            className={styles.SearchField}
                            variant='outlined'
                            size='small'
                            placeholder='Nhập mã số sinh viên'
                            value={searchValues?.maSoSV}
                            onChange={e => handleChange("maSoSV", e.target.value)}
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
                    <Grid item lg={3}>
                        <FormControl fullWidth variant='outlined' size='small' className='text-field'>
                            <InputLabel id="faculty-group">Khoa</InputLabel>
                            <Select
                                name='donVi._id'
                                labelId="faculty-group"
                                id="input-faculty"
                                value={searchValues.donVi || "all"}
                                label="Khoa"
                                onChange={e => handleChange("donVi", e.target.value)}
                            >
                                {faculties?.length > 0 && 
                                [
                                    { _id: 'all', tenDonVi: 'Tất cả khoa'}, 
                                    ...faculties
                                ].map((f) => (
                                    <MenuItem key={f._id} value={f._id}>{f.tenDonVi}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={0.5} md={0} className={styles.Divider}></Grid>
                    <Grid item lg={3}>
                        <FormControl fullWidth variant='outlined' size='small' className='text-field'>
                            <InputLabel id="class-group">Lớp</InputLabel>
                            <Select
                                name='lopSV._id'
                                labelId="class-group"
                                id="input-class"
                                value={searchValues.lopSV || "all"}
                                label="Lớp"
                                onChange={e => handleChange("lopSV", e.target.value)}
                            >
                                {matchedClasses?.length > 0 && 
                                [
                                    { _id: 'all', tenLop: 'Tất cả lớp'}, 
                                    ...matchedClasses
                                ].map((f) => (
                                    <MenuItem key={f._id} value={f._id}>{f.tenLop}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            <Grid container mt={1}>
                <Grid item lg={4} md={12}>
                    <FormControl className={styles.RadioGroup}>
                        <FormLabel id="label" className={styles.Label}>Tình trạng đoàn phí: </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="label"
                            name="row-radio-buttons-group"
                            className={styles.Options}
                            value={searchValues?.doanPhi || 'all'}
                            onChange={e => handleChange("doanPhi", e.target.value)}
                        >
                            <FormControlLabel value="da-dong" control={<Radio className='radio' />} label="Đã đóng" />
                            <FormControlLabel value="chua-dong" control={<Radio className='radio' />} label="Chưa đóng" />
                            <FormControlLabel value="all" control={<Radio className='radio' />} label="Tất cả" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={12}>
                    <FormControl className={styles.RadioGroup}>
                        <FormLabel id="label" className={styles.Label}>Sổ đoàn: </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="label"
                            name="row-radio-buttons-group"
                            className={styles.Options}
                            value={searchValues?.soDoan || 'all'}
                            onChange={e => handleChange("soDoan", e.target.value)}
                        >
                            <FormControlLabel value="da-nop" control={<Radio className='radio' />} label="Đã nộp" />
                            <FormControlLabel value="chua-nop" control={<Radio className='radio' />} label="Chưa nộp" />
                            <FormControlLabel value="all" control={<Radio className='radio' />} label="Tất cả" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={12}>
                    <FormControl className={styles.RadioGroup}>
                        <FormLabel id="label" className={styles.Label}>Sinh viên: </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="label"
                            name="row-radio-buttons-group"
                            className={styles.Options}
                            value={searchValues?.doanVien || 'all'}
                            onChange={e => handleChange("doanVien", e.target.value)}
                        >
                            <FormControlLabel value={true} control={<Radio className='radio' />} label="Đã vào đoàn" />
                            <FormControlLabel value={false} control={<Radio className='radio' />} label="Chưa vào đoàn" />
                            <FormControlLabel value="all" control={<Radio className='radio' />} label="Tất cả" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Filters