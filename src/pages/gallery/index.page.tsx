import { promises as fs } from 'fs';

import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

import styles from './style.module.css';

import { SEO } from '~/features/SEO';
import { Footer } from '~/features/ui/Footer';
import { Navbar } from '~/features/ui/Navbar';
import { PageTransition } from '~/features/ui/PageTransition';
import { MetaData } from '~/types/meta';

export type SandboxPageProps = {
	paths: string[];
};

const meta: MetaData = {
	title: 'Gallery',
	description: 'Gallery - where you can see webgl experiments',
};

const GalleryPage: FC<SandboxPageProps> = ({ paths }) => {
	return (
		<>
			<SEO meta={meta} />
			<Navbar />
			<PageTransition>
				<div className={styles.background} />
				<header>
					<div className={styles.headerContent}>
						<h1 className={styles.headerTitle}>Gallery</h1>
						<h2 className={styles.headerSubTitle}>デザイン・試作置き場</h2>
					</div>
				</header>

				<main>
					<div className={styles.mainContent}>
						<ul className={styles.list}>
							{paths.map((path) => (
								<li key={path} className={styles.listItem}>
									<Link href={path} className={styles.link}>
										{path}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</main>

				<Footer semitransparent />
			</PageTransition>
		</>
	);
};

export default GalleryPage;

export const getStaticProps: GetStaticProps<SandboxPageProps> = async () => {
	const paths = await fs.readdir('src/pages/gallery', { withFileTypes: true });
	const pathNames = paths.map((path) => `/gallery/${path.name}`);
	pathNames.splice(pathNames.indexOf('/gallery/index.page.tsx'), 1);
	pathNames.splice(pathNames.indexOf('/gallery/style.module.css'), 1);
	return {
		props: {
			paths: await Promise.all(pathNames),
		},
	};
};
