import { useCollectionProductUpdate } from '@services/product';
import {
  Banner,
  BannerStatus,
  Layout,
  SettingToggle,
  Text,
} from '@shopify/polaris';
import { useCallback } from 'react';

interface ExtendBanner {
  status: BannerStatus;
  title: string;
  errors: Array<{ message: string }>;
}
export default ({ product }: { product: Product }) => {
  const { update } = useCollectionProductUpdate({ productId: product._id });

  const handleToggle = useCallback(() => {
    update({
      active: !product.active,
    });
  }, [product]);

  const contentStatus = product.active ? 'Deaktivere' : 'Aktivere';
  const textStatus = product.active ? 'books' : 'ikke books';

  const banner: ExtendBanner =
    product.staff.length === 0
      ? {
          status: 'warning',
          title: 'Tilføj staff til produktet',
          errors: [{ message: 'Tilføj staff til produktet' }],
        }
      : null;

  return (
    <Layout>
      {banner && (
        <Layout.Section>
          <Banner title={banner.title} status={banner.status}>
            <p>
              Før denne service kan aktiveres, skal du først tilføje medarbejder
              til produktet
            </p>
            <ul>
              {banner.errors.map(({ message }, i) => (
                <li key={i}>{message}</li>
              ))}
            </ul>
          </Banner>
        </Layout.Section>
      )}
      <Layout.AnnotatedSection>
        <SettingToggle
          action={{
            content: contentStatus,
            onAction: handleToggle,
            disabled: product.staff.length === 0,
          }}
          enabled={product.active}>
          Dette product kan{' '}
          <Text variant="headingSm" as="span">
            {textStatus}
          </Text>{' '}
          online.
        </SettingToggle>
      </Layout.AnnotatedSection>
    </Layout>
  );
};
