import _ from 'lodash';
import { uiActions } from 'redux/reducers/ui-reducer';
import { ALERT_STATUS } from 'helpers/ui';

export const HTTP_RESPONSE_STATUS = {
  success: 200,
  created: 201,
  unauthorized: 401
};

export const DEFAULT_ERROR_MESSAGE = 'Đã xảy ra lỗi. Vui lòng thử lại!';

export const renderHttpRequestParams = (args = {}) => {
  const {
    limit,
    offset,
    sortBy,
    isDescending,
    hienThi,
    defaultSortBy = null,
    className,
    faculty,
    studentId,
    status,
    display,
  } = args;

  const params = {
    offset: offset || 0,
    limit: limit || null,
    hienThi: _.isBoolean(hienThi) ? hienThi : null,
    sortBy: sortBy || defaultSortBy
  };
  params.sortBy = isDescending ? params.sortBy + ':desc' : params.sortBy;

  if (className !== '') {
    params.tenLop = className;
  }
  if (faculty && faculty !== 'all') {
    params.donVi = faculty;
  }
  if (studentId && studentId !== '') {
    params.maSoSV = studentId;
  }
  if (status !== 'all') {
    params.trangThai = status;
  }
  if (display !== 'all') {
    params.hienThi = display;
  }

  return params;
};

export const handleErrorResponse = (
  error,
  errorMessage = 'Đã xảy ra lỗi!',
  dispatch,
  callback
) => {
  if (_.isFunction(dispatch)) {
    dispatch(
      uiActions.showAlert({
        message: error.response?.data?.message || errorMessage,
        errorCode: error.response?.status,
        severity: ALERT_STATUS.error
      })
    );
  }
  if (_.isFunction(callback)) {
    callback();
  }
};
