export const facultiesSelector = state => state.faculty.faculties;

export const activeFacultiesSelector = state =>
  state.faculty.faculties.filter(faculty => faculty.hienThi === true);

export const totalFacultiesSelector = state => state.faculty.faculties.length;
