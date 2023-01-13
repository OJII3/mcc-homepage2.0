import { NextPage } from 'next';

import styles from './style.module.css';

import { SEO } from '~/features/SEO';
import { Footer } from '~/features/ui/Footer';
import { Navbar } from '~/features/ui/Navbar';
import { MetaData } from '~/types/meta';

const meta: MetaData = {
	title: '404',
	description: '404 Page Not Found',
};

const NotFoundPage: NextPage = () => {
	return (
		<>
			<SEO meta={meta} />
			<Navbar />
			<div className={styles.background} />
			<main>
				<div className={styles.mainContent}>
					<h1 className={styles.title}>404</h1>
					<h2 className={styles.subTitle}>Page not Found</h2>
				</div>
			</main>
			<Footer semitransparent />
		</>
	);
};

export default NotFoundPage;
