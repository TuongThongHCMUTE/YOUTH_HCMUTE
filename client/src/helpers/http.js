import _ from 'lodash';

export const HTTP_RESPONSE_STATUS = {
  ok: 200,
  created: 201,
  unauthorized: 401
};

export const renderHttpRequestParams = (args = {}) => {
  const {
    limit,
    offset,
    sortBy,
    isDescending,
    hienThi,
    defaultSortBy = null,
    className,
    faculty
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

  return params;
};
