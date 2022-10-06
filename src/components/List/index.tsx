import React, { MemoExoticComponent } from 'react';
import { CircularProgress } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  FixedSizeList,
  FixedSizeListProps,
  ListChildComponentProps,
} from 'react-window';

export type ListChildProps = ListChildComponentProps;

interface ListProps
  extends Omit<FixedSizeListProps, 'children' | 'height' | 'width'> {
  loading?: boolean;
  itemRender: MemoExoticComponent<(props: ListChildProps) => JSX.Element>;
  /* itemRender: (props: ListChildProps) => JSX.Element; */
}

const List: React.FC<ListProps> = ({ loading, itemRender, ...rest }) => {
  return (
    <>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: 'absolute',
            top: '50%',
            left: 'calc(50% - 12px)',
          }}
        />
      )}
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList height={height - 48} width={width} {...rest}>
            {itemRender}
          </FixedSizeList>
        )}
      </AutoSizer>
    </>
  );
};

export default List;
