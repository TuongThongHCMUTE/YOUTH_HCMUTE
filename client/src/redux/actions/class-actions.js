import { getClasses } from 'apis/class';
import { handleErrorResponse } from 'helpers/http';
import { classActions } from 'redux/reducers/class-reducer';

export const fetchClasses = () => {
  return async dispatch => {
    try {
      const res = await getClasses();
      const classes = res.data?.data?.classes || [];
      dispatch(classActions.setClasses({ classes }));
    } catch (error) {
      handleErrorResponse(error, 'Fetching classes data failed!', dispatch);
    }
  };
};