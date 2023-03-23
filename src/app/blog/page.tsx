import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import styles from './style.module.css';

import type { Metadata } from 'next';

import { allBlogs } from 'contentlayer/generated';
import { Footer } from '~/components/ui/Footer';
import { Navbar } from '~/components/ui/Navbar';

export const metadata: Metadata = {
	title: 'Blog',
	description: '農工大公認サークルMCCのブログ記事の一覧です',
};

const BlogListPage: FC = () => {
	allBlogs.sort((a, b) => ((a.date || 1) < (b.date || 1) ? 1 : -1));
	return (
		<>
			<Navbar theme="auto" />
			<Image
				alt=""
				src="/images/abstract-tech-image-6.webp"
				width={1920}
				height={1280}
				role="presentation"
				className={styles.background}
			/>
			<header>
				<div className={styles.headerContent}>
					<h1 className={styles.headerTitle}>BLOG</h1>
					<h2 className={styles.headerSubTitle}>MCC部員が書いた、技術ブログ・ポエム一覧です</h2>
				</div>
			</header>
			<main>
				<div className={styles.mainContent}>
					<div className={styles.list}>
						{allBlogs.map((post, _index) => {
							return (
								<Link href={post.rootPath} key={post.rootPath} className={styles.listItem}>
									<Image
										className={styles.image}
										src={post.img || '/ogp.png'}
										alt={post.title}
										width={350}
										height={200}
										// TODO: fallback
									/>
									<div className={styles.text}>
										<h2 className={styles.title}>{post.title}</h2>
										<div className={styles.details}>
											{post.date && <div className={styles.date}>{post.date}</div>}
											{post.author && <div className={styles.author}>@ {post.author}</div>}
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</main>

			<Footer semitransparent />
		</>
	);
};

export default BlogListPage;
