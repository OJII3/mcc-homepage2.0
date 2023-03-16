import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import styles from './style.module.css';

import { SEO } from '~/components/SEO';
import { Article, Collector } from '~/components/markdown-content/collector';
import { Footer } from '~/components/ui/Footer';
import { Navbar } from '~/components/ui/Navbar';
import { PageTransition } from '~/components/ui/PageTransition';
import { MetaData } from '~/types/meta';
import { classNames } from '~/utils/classNames';

const meta: MetaData = {
	title: 'Blog',
	description: '農工大公認サークルMCCのブログ記事の一覧です',
};

const BlogListPage: FC<{ articles: Article[] }> = ({ articles }) => {
	articles.sort((a, b) => ((a.meta?.date || 1) < (b.meta?.date || 1) ? 1 : -1));
	return (
		<>
			<SEO meta={meta} />
			<Navbar />
			<PageTransition>
				<Image
					alt=""
					src="/images/abstract-tech-image-6.webp"
					width={1000}
					height={500}
					role="presentation"
					className={styles.background}
				/>
				<header>
					<div className={styles.headerContent}>
						<h1 className={styles.headerTitle}>Blog</h1>
						<h2 className={styles.headerSubTitle}>ブログ</h2>
					</div>
				</header>
				<main>
					<div className={styles.mainContent}>
						<div className={styles.list}>
							{articles.map((article, _index) => {
								return (
									<Link href={article.targetPath} key={article.slug} className={styles.listItem}>
										<Image
											className={styles.image}
											src={article.meta.img || '/images/mcc-design.webp'}
											alt={article.meta.title}
											width={350}
											height={200}
											onError={(e) => {
												e.currentTarget.src = '/images/mcc-design.webp';
											}}
										/>
										<div className={styles.text}>
											<h2 className={styles.title}>{article.meta.title}</h2>
											<div className={styles.details}>
												{article.meta.date && (
													<div className={styles.date}>{article.meta.date}</div>
												)}
												{article.meta.author && (
													<div className={styles.author}>@ {article.meta.author}</div>
												)}
											</div>
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				</main>

				<Footer semitransparent />
			</PageTransition>
		</>
	);
};

// This function gets called at build time on server-side.
export const getStaticProps: GetStaticProps<{ articles: Article[] }> = () => {
	const articles = Collector('blog').getAll();
	return {
		props: {
			articles,
		},
	};
};

export default BlogListPage;
