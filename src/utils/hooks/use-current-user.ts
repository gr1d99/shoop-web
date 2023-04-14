import React from 'react';
import { CurrentUserContext } from '../../contexts/current-user-context';
import { type CurrentUserCtx } from '../../contexts/types';

export const useCurrentUser = (): CurrentUserCtx => {
  const cxt = React.useContext<CurrentUserCtx>(CurrentUserContext);

  if (cxt === undefined) {
    throw Error('useCurrentUser has to be used within <CurrentUserContext.Provider>');
  }

  return cxt;
};
