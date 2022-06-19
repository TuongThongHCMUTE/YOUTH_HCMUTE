//------------------------------------------------------------------------------
// Node modules ----------------------------------------------------------------
import React, { useState } from 'react';
import ReactAddToCalendar from 'react-add-to-calendar';
import clsx from 'clsx';
//------------------------------------------------------------------------------
// Styles ----------------------------------------------------------------------
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import './AddToCalendar.css';

//------------------------------------------------------------------------------
// Coponent --------------------------------------------------------------------
const AddToCalendar = (props) => {
  const { event, items, label, icon, className } = props;
  const cn = clsx({ [className]: className });

  const [open, setOpen] = useState(true);

  return (
    <div className={cn} onClick={() => setOpen(prev => !prev)}>
      {
        open ?
        <ReactAddToCalendar
            event={event}
            // listItems={items}
            buttonLabel={label}
            buttonTemplate={icon}
            optionsOpen={true}
        /> :
        <ReactAddToCalendar
            event={event}
            // listItems={items}
            buttonLabel={label}
            buttonTemplate={icon}
            optionsOpen={false}
        />
      }

    </div>
  );
};

//------------------------------------------------------------------------------
// Export ----------------------------------------------------------------------
export default AddToCalendar;
