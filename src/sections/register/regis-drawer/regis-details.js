import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
  Button,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const RegisDetails = (props) => {
  const { onApprove, onEdit, onReject, regis } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';
  // const created = parseISO(regis.createdAt);
  // const createdAt = format(created, 'dd/MM/yyyy HH:mm');
  const totalAmount = numeral(regis.totalAmount).format(`${regis.currency}0,0.00`);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">
            Details
          </Typography>
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={(
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            )}
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={regis.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Created By"
            value={regis.createdBy}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Customer"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {regis.customer.name}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {regis.customer.email}
            </Typography>
            
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date"
            value={regis.createdAt}
          />
           <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Coach"
            value={regis.coach}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Package"
            value={regis.package}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Amount"
            value={totalAmount}
          />     
        </PropertyList>

      </Stack>
      
    </Stack>
  );
};

RegisDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  regis: PropTypes.object
};
