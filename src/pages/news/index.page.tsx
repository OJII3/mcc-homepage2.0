import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import styles from './style.module.css';

import { useMediaQuery } from '~/features/MediaQuery';
import { SEO } from '~/features/SEO';
import { PostCollector, PostCollectorProps } from '~/features/markdown/post-collector';
import { Footer } from '~/features/ui/Footer';
import { Navbar } from '~/features/ui/Navbar';
import { PageTransition } from '~/features/ui/PageTransition';
import { MetaData } from '~/types/meta';
import classNames from '~/utils/classNames';

const meta: MetaData = {
	title: 'お知らせ',
	description: 'MCCからのお知らせ一覧です',
	img: '/mcc-logo.svg',
};

// posts will be populated at build time by getStaticProps()
const NewsPage: FC<PostCollectorProps> = ({ posts }) => {
	const { isMobile } = useMediaQuery();
	posts.sort((a, b) => ((a.frontmatter?.date || 1) < (b.frontmatter?.date || 1) ? 1 : -1));
	return (
		<>
			<SEO meta={meta} />
			<Navbar />
			<PageTransition>
				<div className={styles.background} />
				<header>
					<div className={styles.headerContent}>
						<h1 className={styles.headerTitle}>News</h1>
						<h2 className={styles.headerSubTitle}>お知らせ</h2>
					</div>
				</header>
				<div className={styles.activities}>
					<div className={styles.list}>
						{posts.map((post, index) => {
							return (
								<div key={post.slug}>
									<Link
										href={`news/${post.slug}`}
										key={post.slug}
										className={classNames(styles.listItem, !isMobile && index % 2 === 1 ? styles._reverse : '')}
									>
										{!isMobile &&
											(post.frontmatter.img ? (
												<Image
													className={styles.image}
													src={post.frontmatter.img}
													alt={post.frontmatter.title}
													width={350}
													height={200}
													onError={(e) => {
														e.currentTarget.src = '/mcc-design.webp';
													}}
												/>
											) : (
												<Image
													className={styles.image}
													src="/mcc-design.webp"
													alt={post.frontmatter.title}
													width={350}
													height={200}
												/>
											))}
										<div className={styles.text}>
											<h2 className={styles.title}>{post.frontmatter.title}</h2>
											{post.frontmatter.tags && !isMobile && (
												<div className={styles.tagList}>
													{post.frontmatter.tags.map((tag) => (
														<div className={styles.tag} key={tag}>
															{tag}
														</div>
													))}
												</div>
											)}
											{post.frontmatter.date && <div className={styles.date}>{post.frontmatter.date}</div>}
											{post.frontmatter.description && (
												<p className={styles.description}>{post.frontmatter.description}</p>
											)}
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
				<Footer semitransparent />
			</PageTransition>
		</>
	);
};

// This function gets called at build time on server-side.
export const getStaticProps = new PostCollector('news').getStaticProps;

export default NewsPage;
