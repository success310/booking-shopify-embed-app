import { Frame, Loading, Spinner } from '@shopify/polaris';
import { memo } from 'react';

export default memo(() => {
  return (
    <Frame>
      <Loading />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Spinner
          accessibilityLabel="Loading form field"
          hasFocusableParent={false}
        />
      </div>
    </Frame>
  );
});
