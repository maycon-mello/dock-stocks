import {IEXCLOUD_API_VERSION, IEXCLOUD_SECRET_KEY} from '@env';
import {IEXCloudClient} from 'node-iex-cloud';

const iex = new IEXCloudClient(fetch, {
  sandbox: true,
  publishable: IEXCLOUD_SECRET_KEY,
  version: IEXCLOUD_API_VERSION,
});

export default iex;
