import { getClasses } from 'apis/class';
import { ALERT_STATUS } from 'helpers/ui';
import { classActions } from 'redux/reducers/class-reducer';
import { uiActions } from 'redux/reducers/ui-reducer';

export const fetchClasses = () => {
  return async dispatch => {
    try {
      const res = await getClasses();
      const classes = res.data?.data?.classes || [];
      dispatch(classActions.setClasses({ classes }));
    } catch (error) {
      dispatch(
        uiActions.showAlert({
          message:
            error.response?.data?.message || 'Fetching faculties data failed!',
          severity: ALERT_STATUS.error
        })
      );
    }
  };
};