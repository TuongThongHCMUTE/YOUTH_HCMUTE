import { getYears } from 'apis/year';
import { ALERT_STATUS } from 'helpers/ui';
import { yearActions } from 'redux/reducers/year-reducer';
import { uiActions } from 'redux/reducers/ui-reducer';

export const fetchYears = () => {
  return async dispatch => {
    try {
      const res = await getYears();
      const years = res.data?.data?.schoolYears || [];
      const currentYear = years.find(year => year.namHocHienTai === true);
      dispatch(yearActions.setYears({ years, currentYear }));
    } catch (error) {
      dispatch(
        uiActions.showAlert({
          message:
            error.response?.data?.message || 'Fetching years data failed!',
          severity: ALERT_STATUS.error
        })
      );
    }
  };
};
