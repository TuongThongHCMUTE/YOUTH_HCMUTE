export const yearsSelector = state => state.year.years;

export const activeYearsSelector = state =>
  state.year.years.filter(year => year.hienThi === true);

export const currentYearSelector = state => 
  state.year.years.find(year => year.namHocHienTai === true);