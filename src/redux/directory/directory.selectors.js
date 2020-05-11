import { createSelector } from 'reselect';

const selectDirectroy = state => state.directory;

export const selectDirectroySections = createSelector(
 [selectDirectroy],
 directory => directory.sections,
);

