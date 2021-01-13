import {
  ProductDomain,
  ProductDomainReverseMap,
} from 'constants/domainConstants';
import { Map } from 'immutable';

export const filterAndMapDomainToUserRoles = (rolesByName, userRoles) =>
  userRoles
    .filter(userRole => rolesByName.get(userRole.roleName))
    .map(userRole =>
      mapDomainToObject(userRole, rolesByName.get(userRole.roleName).domain),
    );

export const mapDomainToObjectFromName = (object, domainName) => {
  const newObj = object;
  let [domain] = ProductDomainReverseMap[domainName];
  domain = window.parseInt(domain, 10);
  newObj.domain = domain;
  return newObj;
};

export const mapDomainToObject = (object, domain) => {
  const newObj = object;
  newObj.domain = domain;
  return newObj;
};

export const reduceListByDomain = list =>
  list.reduce((itemsByDomain, item) => {
    let allItems = itemsByDomain.get(ProductDomain.All);
    if (allItems) allItems.push(item);
    else allItems = [item];

    let itemsInDomain = itemsByDomain.get(item.domain);
    if (itemsInDomain) itemsInDomain.push(item);
    else itemsInDomain = [item];

    return itemsByDomain
      .set(ProductDomain.All, allItems)
      .set(item.domain, itemsInDomain);
  }, new Map());

export const generateTokenTree = (
  permissionTokens,
  childTokensMemoized,
  parentNodeTokenName = 'None',
  depth = 0,
) => {
  if (!permissionTokens) return [];

  let nodeTokens = [];
  let childTokensByParentName = childTokensMemoized;

  if (!childTokensByParentName) {
    childTokensByParentName = permissionTokens.reduce(
      (tokensByParentName, token) => {
        const parentName = token.parentName || 'None';
        if (parentName === parentNodeTokenName) {
          nodeTokens.push(token);
        }
        let tokens = tokensByParentName.get(parentName);
        if (tokens) tokens.push(token);
        else tokens = [token];
        return tokensByParentName.set(parentName, tokens);
      },
      new Map(),
    );
  } else {
    nodeTokens = childTokensByParentName.get(parentNodeTokenName) || [];
  }

  return nodeTokens.map(token => ({
    token,
    parentNodeTokenName,
    depth,
    children: generateTokenTree(
      permissionTokens,
      childTokensByParentName,
      token.name,
      depth + 1,
    ),
  }));
};

export const userHasPermissionToken = (user, tokenName) =>
  user.permissions.filter(t => t === tokenName).length > 0;
