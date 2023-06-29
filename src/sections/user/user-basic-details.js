import PropTypes from 'prop-types';
import { Card, CardHeader, useMediaQuery } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const UserBasicDetails = (props) => {
  const { address1, address2, country, email, isVerified, phone, state, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const align = mdUp ? 'horizontal' : 'vertical';
  return (
    <Card {...other}>
      <CardHeader title="User Details" />
      <PropertyList>
        <PropertyListItem
            align={align}
            divider
            label="Gender"
            value={state}
          />
        <PropertyListItem
            align={align}
            divider
            label="Birthday"
            value={state}
          />
        <PropertyListItem
          align={align}
          divider
          label="Email"
          value={email}
        />
        <PropertyListItem
          align={align}
          divider
          label="Phone"
          value={phone}
        />
        <PropertyListItem
          align={align}
          divider
          label="Role"
          value={country}
        />
      </PropertyList>
    </Card>
  );
};

UserBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string
};
