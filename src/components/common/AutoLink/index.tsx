import Link from 'next/link';

import styles from './style.module.css';

export interface AutoLinkProps {
	href?: string;
	children?: string;
}

/**
 * 記事内のリンクを判別して、適切なコンポーネントを返すリンク。
 * @param props href, children
 * @returns
 */
export const AutoLink = ({ href = '', children = '' }: AutoLinkProps) => {
	if (href.startsWith('http')) {
		return (
			<a href={href} className={styles.externalLink} target="_brank" rel="noreferror">
				{children}
			</a>
		);
	} else {
		return (
			<Link href={href} className={styles.internalLink}>
				{children}
			</Link>
		);
	}
};