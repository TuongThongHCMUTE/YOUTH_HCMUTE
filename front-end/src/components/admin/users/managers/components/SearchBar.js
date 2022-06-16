// Node Modules ============================================================ //
import React from 'react';
import clsx from 'clsx';
// Styles ================================================================== //
import styles from './SearchBar.module.scss';
// Constants =============================================================== //
import { USER_STATUSES } from 'helpers/constants/user';
// Material UI ============================================================= //
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
    const { faculties, searchValues, onChange, onSearch } = props;

    return (
        <Grid container className={styles.SearchBar}>
            <Grid item xs={2}><h1 className={styles.Title}>Tra cứu:</h1></Grid>
            <Grid item xs={10} className={styles.SearchArea}>
                <Grid item xs={3} className={styles.Email}>
                    <TextField
                        className={styles.EmailInput}
                        variant='outlined'
                        size='small'
                        label='Email'
                        value={searchValues.email}
                        onChange={e => onChange("email", e.target.value)}
                    />
                </Grid>
                <Grid item xs={0.5}>
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
                        <InputLabel id="status-group">Trạng thái</InputLabel>
                        <Select
                            name='status'
                            labelId="status-group"
                            id="input-status"
                            value={searchValues.status !== undefined ? searchValues.status : 'all'}
                            label="Trạng thái"
                            onChange={e => onChange("status", e.target.value)}
                        >
                            {[
                                { value: 'all', display: 'Tất cả'}, 
                                ...USER_STATUSES
                            ].map((i) => (
                                <MenuItem key={i.value} value={i.value}>{i.display}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchBar