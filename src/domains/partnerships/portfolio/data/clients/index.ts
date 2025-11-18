/**
 * Portfolio Domain - Client Data Exports
 */

import { PortfolioClient } from '../../types';

// Import all client data
import { mayorker } from './mayorker';
import { uberCrypt } from './uber-crypt';
import { shout } from './shout';
import { optimal } from './optimal';
import { nmConstruction } from './nm-construction';
import { letsGo } from './lets-go';
import { sisoInternal } from './siso-internal';
import { mooshin } from './mooshin';
import { gritness } from './gritness';
import { trojanMma } from './trojan-mma';
import { fiveStarHire } from './five-star-hire';
import { elementary } from './elementary';
import { teamApollo } from './team-apollo';
import { testClient } from './test-client';
import { goldenSpoonRestaurant } from './golden-spoon-restaurant';
import { cryptoTradePro } from './cryptotrade-pro';
import { creativeHubAgency } from './creative-hub-agency';

// Export all clients in an array
export const allClients: PortfolioClient[] = [
  testClient, // Featured test client with complete data
  mayorker,
  goldenSpoonRestaurant,
  cryptoTradePro,
  creativeHubAgency,
  uberCrypt,
  shout,
  optimal,
  nmConstruction,
  letsGo,
  sisoInternal,
  mooshin,
  gritness,
  trojanMma,
  fiveStarHire,
  elementary,
  teamApollo,
];

// Named exports for direct access
export {
  testClient,
  mayorker,
  goldenSpoonRestaurant,
  cryptoTradePro,
  creativeHubAgency,
  uberCrypt,
  shout,
  optimal,
  nmConstruction,
  letsGo,
  sisoInternal,
  mooshin,
  gritness,
  trojanMma,
  fiveStarHire,
  elementary,
  teamApollo,
};
