import { ChannelProps } from '@linen/types';
import Channel from 'components/Pages/Channel';
import type { GetServerSideProps } from 'next/types';
import { channelGetServerSideProps } from 'services/ssr/channels';
import { trackPageView } from 'utilities/ssr-metrics';

export default Channel;

export const getServerSideProps: GetServerSideProps<ChannelProps> = async (
  context
) => {
  const data = await channelGetServerSideProps(
    context,
    context.query.customDomain === '1'
  );
  await trackPageView(context, (data as any)?.props?.permissions?.auth?.email);
  return data;
};
