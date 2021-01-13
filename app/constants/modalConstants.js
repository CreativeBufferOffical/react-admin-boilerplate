export const ModalSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
  NO_MAX_WIDTH: 'no-max',
};

export const ModalMessages = {
  DEFAULT_TITLE: 'Are you sure?',
  DEFAULT_AFFIRMATIVE: 'Yes',
  DEFAULT_NEGATIVE: 'No',
  DEACTIVATE_USER_TEXT: user =>
    `Are you sure you want to deactivate user ${user.lastName}, ${
      user.firstName
    }? They will be unable to login without being reactivated.`,
  ACTIVATE_USER_TEXT: user =>
    `Are you sure you want to activate user ${user.lastName}, ${
      user.firstName
    }? This will enable them to access the product.`,
  CREATE_USER: 'Are you sure you want to add this user?',
};
