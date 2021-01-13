import { invertBy } from 'lodash';

export const ProductDomain = {
  All: 0,
  NG: 1,
  CR: 2,
  PR: 3,
};

export const ProductDomainShortNames = {
  [ProductDomain.All]: 'All',
  [ProductDomain.NG]: 'NG',
  [ProductDomain.CR]: 'CR',
  [ProductDomain.PR]: 'PR',
};

export const ProductDomainReverseMap = invertBy(ProductDomainShortNames);

export const ProductDomainLongNames = {
  [ProductDomain.All]: 'All',
  [ProductDomain.NG]: 'NextGen',
  [ProductDomain.CR]: 'Compliance Review',
  [ProductDomain.PR]: 'Premium Reconciliation',
};
