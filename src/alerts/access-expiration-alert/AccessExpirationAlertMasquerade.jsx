import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from '@edx/frontend-platform/i18n';
import { Alert } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';

function AccessExpirationAlertMasquerade({ payload }) {
  const {
    accessExpiration,
    userTimezone,
  } = payload;

  if (!accessExpiration) {
    return null;
  }

  const {
    expirationDate,
    masqueradingExpiredCourse,
  } = accessExpiration;

  if (!masqueradingExpiredCourse) {
    return null;
  }

  const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};

  return (
    <Alert variant="info" icon={Info}>
      <FormattedMessage
        id="learning.accessExpiration.expired"
        defaultMessage="This learner does not have access to this course. Their access expired on {date}."
        values={{
          date: (
            <FormattedDate
              key="accessExpirationExpiredDate"
              day="numeric"
              month="short"
              year="numeric"
              value={expirationDate}
              {...timezoneFormatArgs}
            />
          ),
        }}
      />
    </Alert>
  );
}

AccessExpirationAlertMasquerade.propTypes = {
  payload: PropTypes.shape({
    accessExpiration: PropTypes.shape({
      expirationDate: PropTypes.string.isRequired,
      masqueradingExpiredCourse: PropTypes.bool.isRequired,
    }).isRequired,
    userTimezone: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccessExpirationAlertMasquerade;
