/**
 *
 * CR Permission Tokens
 *
 */

// has ability to see only assigned agent schedules, reviews and exam answers, own reviewer.
export const CR = 'cr';

// may see all scheduled reviews
export const CR_SCHEDULE_VIEW_ALL = 'cr.schedule-view-all';
// may use controls that add or edit scheduled review attributes
export const CR_SCHEDULE_EDIT = 'cr.schedule-view-all.edit';
// may remove a scheduled review from a schedule
export const CR_SCHEDULE_REMOVE = 'cr.schedule-view-all.edit.remove';

// may enter invoice detail and view their own invoice information
export const CR_INVOICE = 'cr.invoice';
// may view invoice information for a review or a reviewer
export const CR_INVOICE_VIEW_ALL = 'cr.invoice.view-all';
// may mark an invoice approved and update the “Review Cost” field
export const CR_INVOICE_APPROVE = 'cr.invoice.view-all.approve';

// may enter information about the scheduling and status of a review and use controls related to executing a review
export const REVIEW_MANAGE = 'cr.review-manage';

// may view review information
export const REVIEW_VIEW_ALL = 'cr.review-view-all';
// may enter information about the post-exam portion of a review and use controls related to finalizing a review
export const REVIEW_FINALIZE = 'cr.review-view-all.finalize';

// may enter, edit, and remove exam answers
export const EXAM_ANSWER = 'cr.exam-answer';

// may view configuration information for the CR product
export const CR_CONFIGURATION = 'cr.configuration';
// may edit configuration information for the CR product
export const CR_CONFIGURATION_EDIT = 'cr.configuration.edit';

// may view information pertaining to a reviewer (other than assigned reviews)
export const REVIEWER_VIEW_ALL = 'cr.reviewer-view-all';
// may enter, delete, or change information pertaining to a reviewer (other than assigned reviews AND removal or addition of a reviewer)
export const REVIEWER_EDIT = 'cr.reviewer-view-all.edit';
// may add a new reviewer
export const REVIEWER_ADD = 'cr.reviewer-view-all.edit.add';
// may mark an existing reviewer inactive
export const REVIEWER_REMOVE = 'cr.reviewer-view-all.edit.remove';

// may reset the password of any NextGen user
export const PASSWORD_ALL_USERS = 'password-all-users';

// may change personal user info for the logged in user
export const MANAGE = 'manage';

// may change personal user info for any user
export const MANAGE_ALL = 'manage.all';

// may add/remove users
export const MANAGE_ALL_ADD_REMOVE = 'manage.all.add-remove';

// may change permissions for any NextGen user (except themselves)
export const PERMISSIONS_ALL = 'permissions-all';

// may change cr related permissions for any user
export const PERMISSIONS_CR_ALL = 'permissions-cr-all';

// may change pr related permissions for any user
export const PERMISSIONS_PR_ALL = 'permissions-pr-all';

// may view configuration information for the CR product
export const PR_CONFIGURATION = 'pr.configuration';
// may edit configuration information for the CR product
export const PR_CONFIGURATION_EDIT = 'pr.configuration.edit';

// may view configuration information for the CR product
export const NG_CONFIGURATION = 'ng.configuration';
// may edit configuration information for the CR product
export const NG_CONFIGURATION_EDIT = 'ng.configuration.edit';
