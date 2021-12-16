import React from 'react';

import HeaderButton from './HeaderButton';
import useStyles from './styles';
import ThemeButton from './ThemeButton';
import TranslationMenu from './TranslationMenu';

/**
 * This component renders a Header
 * @returns Application's header
 */
export default function Header() {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <div className={classes.logoContainer}>
        <div className={classes.logoDetail} />
        <div>ORA</div>
      </div>
      <div className={classes.menuItems}>
        <div className={classes.initialItems}>
          <HeaderButton actived title="Monitoramento" />
          <HeaderButton title="Arquivos" />
          <HeaderButton title="Boletins" />
          <HeaderButton title="Sobre" />
          <HeaderButton title="API" />
        </div>
        <div className={classes.endItems}>
          <TranslationMenu />
          <span className={classes.separator} />
          <ThemeButton />
        </div>
      </div>
    </header>
  );
}
