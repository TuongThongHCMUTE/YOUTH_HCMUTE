import { getFaculties } from 'apis/faculty';
import { ALERT_STATUS } from 'helpers/ui';

import { facultyActions } from 'redux/reducers/faculty-reducer';
import { uiActions } from 'redux/reducers/ui-reducer';

export const fetchFaculties = () => {
  return async dispatch => {
    try {
      const res = await getFaculties();
      const faculties = res.data?.data?.faculties || [];
      dispatch(facultyActions.setFaculties({ faculties }));
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
