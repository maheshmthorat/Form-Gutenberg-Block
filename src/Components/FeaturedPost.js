export default function FeaturedPost({ featuredPostData }) {
	return (
		<>
			{featuredPostData && (
				<div>
					<h2>{featuredPostData.title.rendered}</h2>
					<div
						dangerouslySetInnerHTML={{
							__html: featuredPostData.content.rendered,
						}}
					/>
				</div>
			)}
		</>
	);
}
