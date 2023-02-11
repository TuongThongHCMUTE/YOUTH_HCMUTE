import { getYears } from 'apis/year';
import { handleErrorResponse } from 'helpers/http';
import { yearActions } from 'redux/reducers/year-reducer';

export const fetchYears = () => {
  return async dispatch => {
    try {
      const res = await getYears();
      const years = res.data?.data?.schoolYears || [];
      const currentYear = years.find(year => year.namHocHienTai === true);
      dispatch(yearActions.setYears({ years, currentYear }));
    } catch (error) {
      handleErrorResponse(error, 'Fetching years data failed!', dispatch);
    }
  };
};
