import React from 'react';
import {Button, Icon} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

type ChipArgs = {
  children?: string | number;
  icon?: string;
  status?: string;
  appearance?: string;
  [key: string]: any;
};

export const Chip = ({
  children,
  icon,
  status = 'basic',
  appearance = 'outline',
  ...rest
}: ChipArgs) => (
  <Button
    status={status}
    appearance={appearance}
    size="tiny"
    style={styles.chip}
    accessoryLeft={() => <>{icon ? <Icon name={icon} /> : null}</>}
    {...rest}>
    {children}
  </Button>
);

const styles = StyleSheet.create({
  chip: {
    marginRight: 5,
    marginVertical: 5,
    padding: 0.5,
    lineHeight: 7,
  },
});
