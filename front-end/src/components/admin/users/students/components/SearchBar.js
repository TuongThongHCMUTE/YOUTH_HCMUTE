// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './SearchBar.module.scss';
import { 
    Button, 
    Grid, 
    InputLabel,
    FormControl,
    MenuItem,
    Select,  
    TextField, 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// ============================|| SEARCH BAR ||============================= //
const SearchBar = (props) => {
    const { faculties, classes, searchValues, onChange, onSearch } = props;

    return (
        <Grid container className={styles.SearchBar}>
            <Grid item xs={2}><h1 className={styles.Title}>Tra cứu:</h1></Grid>
            <Grid item xs={10} className={styles.SearchArea}>
            <Grid container>
                <Grid item xs={3} className={styles.StudentSearch}>
                    <TextField
                        variant='outlined'
                        size='small'
                        label='Mã số sinh viên'
                        value={searchValues.studentId}
                        onChange={e => onChange("studentId", e.target.value)}
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
                <Grid item xs={1} className={styles.Divider}></Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth variant='outlined' size='small' className='text-field'>
                        <InputLabel id="faculty-group">Khoa</InputLabel>
                        <Select
                            name='donVi._id'
                            labelId="faculty-group"
                            id="input-faculty"
                            value={searchValues.faculty || "all"}
                            label="Khoa"
                            onChange={e => onChange("faculty", e.target.value)}
                        >
                            {[
                                { _id: 'all', tenDonVi: 'Tất cả khoa'}, 
                                ...faculties
                            ].map((f) => (
                                <MenuItem key={f._id} value={f._id}>{f.tenDonVi}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2} sx={{ marginLeft: "16px" }}>
                    <FormControl fullWidth variant='outlined' size='small' className='text-field'>
                        <InputLabel id="class-group">Lớp</InputLabel>
                        <Select
                            name='lopSV._id'
                            labelId="class-group"
                            id="input-class"
                            value={searchValues.studentClass || "all"}
                            label="Lớp"
                            onChange={e => onChange("studentClass", e.target.value)}
                        >
                            {[
                                { _id: 'all', tenLop: 'Tất cả lớp'}, 
                                ...classes
                            ].map((f) => (
                                <MenuItem key={f._id} value={f._id}>{f.tenLop}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchBar