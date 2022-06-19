// Node Modules ============================================================ //
import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
// Styles ================================================================== //
import styles from './EventItem.module.scss';
// Assets ================================================================== //
import fallbackSrc from 'assets/images/default-cover.jpg';

const EventItem = (props) => {
    const { event, onClick } = props;

    return (
        <div>EventItem</div>
    )
}

export default EventItem