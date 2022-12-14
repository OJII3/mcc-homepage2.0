import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import FullScreenNavigation from '../FullScreenNavigation/FullScreenNavigation';
import HumbergurIcon from '../HumbergurIcon/HumbergurIcon';

import styles from './style.module.css';

import { BASE_ROUTES_LIST, ROUTES } from '~/constants/routes';

export type HeaderProps = {};

const HeaderTop: FC<HeaderProps> = () => {
  const pathname = useRouter()
    .pathname.match(/\/.+?(\/|$)/)?.[0]
    .replace(/\/$/, '');
  console.log(pathname);
  const links = BASE_ROUTES_LIST.map((route) => {
    const isActive = route.PATH == pathname ? true : false;
    return (
      <li key={route.PATH} className={styles.listItem}>
        <Link href={route.PATH} className={`${styles.link} ${isActive && styles.active}`}>
          {route.LABEL}
        </Link>
      </li>
    );
  });

  return (
    <header>
      <nav className={styles.navbar}>
        <Link className={styles.brandLink} href={ROUTES.HOME.PATH}>
          <Image alt="" src="/mcc-logo.svg" width={48} height={48} className={styles.brandLogo} />
          <h1 className={styles.brandName}>MCC</h1>
        </Link>
        <ul className={styles.navIn}>{links}</ul>
      </nav>
    </header>
  );
};

export default HeaderTop;
