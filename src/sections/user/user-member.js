import {  Card,  CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const UserMember = (props) => {
  const {useId, ...other} = props;
  
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...props}>
     
      <CardHeader title="Member" />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Menber Card"
          value="**** **** **** **** 4142"
        />
        <PropertyListItem
          align={align}
          divider
          label="Package"
          value="6 múi"
        />
        <PropertyListItem
          align={align}
          divider
          label="Registration date"
          value="1/7/2023"
        />
        <PropertyListItem
          align={align}
          divider
          label="Expiration date"
          value="1/8/2023"
        />
        <PropertyListItem
          align={align}
          divider
          label="Coach"
          value="Tống Văn Phúc"
        />
        <PropertyListItem
          align={align}
          divider
          label="Create by"
          value="Nguyễn Trọng Quang"
        />
      </PropertyList>
      <Divider />
    </Card>
  );
};
