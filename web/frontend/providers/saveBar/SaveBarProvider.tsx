import { useCallback, useMemo, useRef, useState } from 'react';
import { SaveBarContext } from './SaveBar.context';
import { SaveBarConsumer } from './SaveBarConsumer';
import { setReset, setSubmit } from './SaveBar.types';
import { ContextualSaveBarProps } from '@shopify/polaris';

export const SaveBarProvider = ({ children }: any) => {
  const [dirty, setDirty] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);
  const [contextualSaveBar, setContextualSaveBar] =
    useState<ContextualSaveBarProps>();

  const submit = useRef<setSubmit>();
  const reset = useRef<setReset>();

  const setReset = useCallback((value: setReset) => {
    reset.current = value;
  }, []);

  const setSubmit = useCallback((value: setSubmit) => {
    submit.current = value;
  }, []);

  const value = useMemo(
    () => ({
      dirty,
      setDirty,
      show,
      setShow,
      submitting,
      setSubmitting,
      submit,
      reset,
      setReset,
      setSubmit,
      contextualSaveBar,
      setContextualSaveBar,
    }),
    [
      dirty,
      setDirty,
      show,
      setShow,
      submitting,
      setSubmitting,
      submit,
      reset,
      setReset,
      setSubmit,
      contextualSaveBar,
      setContextualSaveBar,
    ]
  );

  return (
    <SaveBarContext.Provider value={value}>
      <SaveBarConsumer></SaveBarConsumer>
      {children}
    </SaveBarContext.Provider>
  );
};