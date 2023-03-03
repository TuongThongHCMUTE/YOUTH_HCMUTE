export const classesSelector = state => state.class.classes;

export const activeClassesSelector = state =>
  state.class.classes.filter(c => c.hienThi === true);
