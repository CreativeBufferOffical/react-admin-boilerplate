/**
 *
 * LoadingPage
 *
 */

import React from 'react';

import LoadingSpinner from 'components/LoadingSpinner';
import { Container } from 'reactstrap';

function LoadingPage() {
  return (
    <Container>
      <LoadingSpinner hasBlanket />
    </Container>
  );
}

LoadingPage.propTypes = {};

export default LoadingPage;
