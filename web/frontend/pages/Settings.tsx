import FormStatus from '@components/FormStatus';
import LoadingPage from '@components/LoadingPage';
import { useTranslation, useSave } from '@hooks';
import { useSetting, useSettingUpdate } from '@services';
import {
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  PageActions,
  Select,
  SettingToggle,
  Stack,
  Text,
} from '@shopify/polaris';
import { useField, useForm } from '@shopify/react-form';
import { useCallback } from 'react';
import TimezoneSelect, { ITimezoneOption } from 'react-timezone-select';

export default () => {
  const { data } = useSetting();
  const { update } = useSettingUpdate();

  const { t } = useTranslation('settings');

  const languageOptions = [
    {
      label: t('store_settings.language.options.english'),
      value: 'en',
    },
    {
      label: t('store_settings.language.options.danish'),
      value: 'da',
    },
  ];

  //https://codesandbox.io/s/1wpxz?file=/src/MyForm.tsx:2457-2473
  const { fields, submit, submitErrors, submitting, dirty, reset } = useForm({
    fields: {
      timeZone: useField({
        value: data.timeZone,
        validates: [],
      }),
      language: useField({
        value: data.language,
        validates: [],
      }),
      status: useField({
        value: data.status,
        validates: [],
      }),
    },
    onSubmit: async (fieldValues) => {
      await update(fieldValues);
      return { status: 'success' };
    },
  });

  const { primaryAction, saveBar } = useSave({
    dirty,
    reset,
    submit,
    submitting,
  });

  const onChangeTimezone = useCallback(
    ({ value }: ITimezoneOption) => fields.timeZone.onChange(value),
    [fields.timeZone.onChange]
  );

  if (!data) {
    return <LoadingPage />;
  }

  return (
    <Form onSubmit={submit}>
      <Page title={t('title')}>
        {saveBar}
        <Layout>
          <FormStatus errors={submitErrors} success={submitting && dirty} />
          <Layout.AnnotatedSection
            title={t('store_settings.title')}
            description={t('store_settings.subtitle')}>
            <Card sectioned>
              <FormLayout>
                <Stack vertical spacing="extraTight">
                  <Stack.Item>{t('store_settings.timezone.label')}</Stack.Item>
                  <div style={{ zIndex: 99, position: 'relative' }}>
                    <TimezoneSelect
                      value={{
                        value: fields.timeZone.value,
                        label: fields.timeZone.value,
                      }}
                      onChange={onChangeTimezone}
                    />
                  </div>
                </Stack>
                <Select
                  label={t('store_settings.language.label')}
                  options={languageOptions}
                  {...fields.language}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title={t('store_status.title')}
            description={t('store_status.subtitle')}>
            <Card sectioned>
              <FormLayout>
                <SettingToggle
                  action={{
                    content: fields.status.value
                      ? t('store_status.status.disable')
                      : t('store_status.status.enable'),
                    onAction: () =>
                      fields.status.onChange(!fields.status.value),
                  }}
                  enabled={fields.status.value}>
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    {fields.status.value
                      ? t('store_status.status.enabled')
                      : t('store_status.status.disabled')}
                  </Text>
                  .
                </SettingToggle>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
        <br />
        <PageActions primaryAction={primaryAction} />
      </Page>
    </Form>
  );
};
