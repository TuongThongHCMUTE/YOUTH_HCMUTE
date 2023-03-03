import { getFaculties } from 'apis/faculty';
import { handleErrorResponse } from 'helpers/http';
import { facultyActions } from 'redux/reducers/faculty-reducer';

export const fetchFaculties = () => {
  return async dispatch => {
    try {
      const res = await getFaculties();
      const faculties = res.data?.data?.faculties || [];
      dispatch(facultyActions.setFaculties({ faculties }));
    } catch (error) {
      handleErrorResponse(error, 'Fetching faculties data failed!', dispatch);
    }
  };
};
