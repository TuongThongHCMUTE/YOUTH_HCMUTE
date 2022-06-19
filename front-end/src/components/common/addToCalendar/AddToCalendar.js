//------------------------------------------------------------------------------
// Node modules ----------------------------------------------------------------
import React, { useState } from 'react';
import AddToCalendar from '@culturehq/add-to-calendar';
import clsx from 'clsx';
//------------------------------------------------------------------------------
// Styles ----------------------------------------------------------------------
import '@culturehq/add-to-calendar/dist/styles.css'
import './AddToCalendar.css';

//------------------------------------------------------------------------------
// Coponent --------------------------------------------------------------------
const MyAddToCalendar = (props) => {
  const { event, items, label, icon, className } = props;
  const cn = clsx({ [className]: className });

  return (
    <div className={cn}>
      <AddToCalendar event={event} >Thêm vào lịch</AddToCalendar>
    </div>
  );
};

//------------------------------------------------------------------------------
// Export ----------------------------------------------------------------------
export default MyAddToCalendar;
