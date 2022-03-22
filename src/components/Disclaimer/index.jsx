import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import NavigationContext from '../../contexts/navigation';
import CustomDialog from '../CustomDialog';
import Typography from '../Typography';

/**
 * This component renders a disclaimer.
 */
export default function Disclaimer() {
  const {
    values: { isDisclaimerOpened },
    functions: { closeDisclaimer },
  } = useContext(NavigationContext);

  const { t } = useTranslation();

  return (
    <CustomDialog
      open={isDisclaimerOpened}
      title={t('specific.disclaimer.title')}
      onClose={closeDisclaimer}
      button={{ isEnabled: true, text: t('specific.disclaimer.button.text') }}
    >
      <Typography variant="body">
        {t('specific.disclaimer.content.p1')}
        <br />
        <br />
        {t('specific.disclaimer.content.p2')}
        <br />
        <br />
        {t('specific.disclaimer.content.p3')}
        <br />
        <br />
        {t('specific.disclaimer.content.p4')}
        <br />
        <br />
        {t('specific.disclaimer.content.p5')}
        <br />
        <br />
        {t('specific.disclaimer.content.p6')}
        <br />
        <br />
        {t('specific.disclaimer.content.p7')}
        <br />
        <br />
        {t('specific.disclaimer.content.p8')}
        <br />
        <br />
        {t('specific.disclaimer.content.p9')}
      </Typography>
    </CustomDialog>
  );
}
