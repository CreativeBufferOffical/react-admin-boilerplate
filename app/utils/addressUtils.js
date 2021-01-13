export const formatAgentAddress = (address, includeZip = true) => {
  if (!address) return '--';
  return `${address.address1}${address.address2 ? ' ' : ''}, ${address.city}, ${
    address.state
  } ${includeZip ? address.zip : ''}`;
};
