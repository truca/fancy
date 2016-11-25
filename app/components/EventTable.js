import React, { PropTypes } from 'react';
import EventRow from './EventRow';

const events = [
  { city: 'Concepción', distance: '50', stocked: true, name: 'Disco' },
  { city: 'Concepción', distance: '25', stocked: true, name: 'Bar' },
  { city: 'Concepción', distance: '29', stocked: false, name: 'Museo' },
  { city: 'Santiago', distance: '99.99', stocked: true, name: 'Parque' },
  { city: 'Santiago', distance: '399.99', stocked: false, name: 'Caminata' },
  { city: 'Santiago', distance: '199.99', stocked: true, name: 'Iglesias' },
  { city: 'Reñaca', distance: '79', stocked: true, name: 'Escalada' }
];

const EventTable = ({ filter }) => {
    let rows = [];

    events.forEach((p) => {
        const nameLC = (p.name + ', ' + p.city + '. ' + p.distance).toLowerCase();
        const filterLC = filter.toLowerCase();

        if (nameLC.indexOf(filterLC) !== -1) {
            rows.push(
                <EventRow key={p.name} data={p} />
            );
        }
    });

    return <div> {rows} </div>;
};

EventTable.propTypes = {
    filter: PropTypes.string
};

export default EventTable;
